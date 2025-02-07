import { CellClassParams, ColDef, GridApi } from "ag-grid-enterprise";
import { ValueFormatterLiteParams, DataTypeDefinition, IRowNode } from "ag-grid-community";

export type RowDataType = {
  id: string;
  name: string;
  type: string;
  path: string[];
  price?: number;
  quantity?: number;
  colour?: string;
  year?: number;
};

export type FormDataType = {
  name: string;
  type: string;
  price: string;
  quantity: string;
  colour: string;
  year: string;
};

export type ChangeRecord = {
  transaction: "add" | "update" | "delete";
  rows: RowDataType[];
  newRows?: RowDataType[];
  timestamp: number;
};

export const replaceIds = (rowsToChange: RowDataType[]) => {
  const idMap = {} as Record<string, string>;
  for (const row of rowsToChange) {
    idMap[row.id] = crypto.randomUUID();
  }

  // console.log(111, rowsToChange);
  return rowsToChange.map((row) => {
    const newRow = { ...row };
    newRow.id = idMap[row.id];
    const newPath = row.path.map((id) => idMap[id]).filter((id) => id); // Remove empty IDs
    newRow.path = newPath;
    return newRow;
  });
};

export const updateChangeRecord = (
  transaction: ChangeRecord["transaction"],
  rows: RowDataType[],
  setUndoState: React.Dispatch<React.SetStateAction<ChangeRecord[] | null>>,
  setRedoState: React.Dispatch<React.SetStateAction<ChangeRecord[] | null>>,
  newRows?: RowDataType[]
) => {
  setUndoState((prev: ChangeRecord[] | null) => [
    ...(prev || []),
    { transaction, rows, newRows, timestamp: Date.now() },
  ]);
  setRedoState(null);
};

export const getAllAgGridChildren = (node: IRowNode, rowsArray: RowDataType[]) => {
  if (node.childrenAfterGroup) {
    for (const child of node.childrenAfterGroup) {
      rowsArray.push(child.data);
      getAllAgGridChildren(child, rowsArray);
    }
  }
};

export const deleteRowsViaTransaction = (
  params: IRowNode,
  gridApi: GridApi,
  setUndoState: React.Dispatch<React.SetStateAction<ChangeRecord[] | null>>,
  setRedoState: React.Dispatch<React.SetStateAction<ChangeRecord[] | null>>
) => {
  const rowData = params.data as RowDataType;
  if (rowData.type === "item") {
    gridApi!.applyTransaction({ remove: [params] });

    updateChangeRecord("delete", [rowData], setUndoState, setRedoState);
  } else if (rowData.type === "group") {
    const rowsToDelete = [{ ...rowData }] as RowDataType[];
    getAllAgGridChildren(params, rowsToDelete);
    gridApi!.applyTransaction({ remove: rowsToDelete });
    updateChangeRecord("delete", rowsToDelete, setUndoState, setRedoState);
  }
};

export const agGridSortAlphaNumPushBlankDown = (
  valueA: string | number | null | undefined,
  valueB: string | number | null | undefined
): number => {
  const isValueAEmpty = valueA == null || valueA === "";
  const isValueBEmpty = valueB == null || valueB === "";

  if (isValueAEmpty && isValueBEmpty) {
    return 0;
  }
  if (isValueAEmpty) {
    return 1;
  }
  if (isValueBEmpty) {
    return -1;
  }
  if (valueA < valueB) {
    return -1;
  }
  if (valueA > valueB) {
    return 1;
  }
  return 0;
};

export const agGridDataTypes = <T extends object>(): { [key: string]: DataTypeDefinition<T> } => ({
  percentage: {
    extendsDataType: "number",
    baseDataType: "number",
    valueFormatter: (params: ValueFormatterLiteParams<T, number>) => {
      if (params.value == null || typeof params.value === "string") return ""; // Handle null or undefined
      return `${params.value}%`; // Format as percentage
    },
  },
  currency: {
    extendsDataType: "number",
    baseDataType: "number",
    valueFormatter: (params: ValueFormatterLiteParams<T, number>) => {
      if (params.value == null || typeof params.value === "string") return ""; // Handle null or undefined
      return `£${new Intl.NumberFormat("en-GB", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(params.value)}`;
    },
  },
});

export const defaultColDef: ColDef = {
  sortable: true,
  width: 150,
  hide: false,
  filter: true,
  cellDataType: "text",
  editable: (params) => params.data?.type === "item",
  suppressMovable: false,
  resizable: true,
  pinned: false,
  singleClickEdit: true,
  comparator: agGridSortAlphaNumPushBlankDown,
};

export const deleteColDef: ColDef = {
  headerName: "Delete",
  field: "id",
  editable: false,
  width: 35,
  sortable: false,
  filter: false,
  resizable: false,
  suppressMovable: true,
  pinned: "right",
};

export const autoGroupColumnDef: ColDef = {
  headerName: "Group / Item Hierarchy",
  cellDataType: "text",
  editable: false,
  pinned: "left",
  width: 400,
  rowDrag: true,
  initialSort: "asc",
  cellRendererParams: {
    suppressCount: true,
    innerRenderer: (params: CellClassParams) => {
      return params.data?.name || "Unknown"; // Fallback to "Unknown"
    },
  },
  comparator: (valueA, valueB, nodeA, nodeB) => {
    // Sort items above groups
    const typeA = nodeA.data?.type;
    const typeB = nodeB.data?.type;

    if (typeA === "item" && typeB === "group") {
      return -1; // Item comes before group
    }
    if (typeA === "group" && typeB === "item") {
      return 1; // Group comes after item
    }

    // Fall back to alphabetical sorting
    const nameA = nodeA.data?.name?.toLowerCase() || "";
    const nameB = nodeB.data?.name?.toLowerCase() || "";
    return nameA.localeCompare(nameB);
  },
};
