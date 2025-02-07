import { GridApi, IRowNode, RowDragEndEvent } from "ag-grid-enterprise";
import {
  ChangeRecord,
  FormDataType,
  RowDataType,
  getAllAgGridChildren,
  replaceIds,
  updateChangeRecord,
} from "./ag-grid-utils";

export const handleDragStart = (e: React.DragEvent<HTMLDivElement>, formData: FormDataType) => {
  if (!formData.type) {
    alert("Please select a type");
    return;
  }

  if (!formData.name) {
    alert("Please enter a name");
    return;
  }

  const id = crypto.randomUUID();

  const data = {
    id,
    type: formData.type.toLowerCase() || "",
    name: formData.name || "",
    path: [id],
  };

  if (formData.type.toLowerCase() === "group") {
    e.dataTransfer.setData("text/plain", JSON.stringify({ dragType: "form", data }));
  } else {
    console.log(1, formData);

    const itemData = {
      ...data,
      price: parseFloat(formData.price) || 0,
      quantity: parseInt(formData.quantity) || 0,
      colour: formData.colour || "",
      year: parseInt(formData.year) || "",
    };
    e.dataTransfer.setData("text/plain", JSON.stringify({ dragType: "form", data: itemData }));
  }
};

export const handleTreeDragStart = (e: React.DragEvent<HTMLDivElement>, draggedNode: IRowNode) => {
  e.dataTransfer.setData("text/plain", JSON.stringify({ dataType: "tree", data: draggedNode.data }));
};

export const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
  e.preventDefault();
};

export const handleOnDrop = async (
  e: React.DragEvent<HTMLDivElement>,
  gridApi: GridApi,
  setUndoState: React.Dispatch<React.SetStateAction<ChangeRecord[] | null>>,
  setRedoState: React.Dispatch<React.SetStateAction<ChangeRecord[] | null>>
) => {
  e.preventDefault();

  const draggedData = JSON.parse(e.dataTransfer.getData("text/plain"));
  const gridElement = document.querySelector(".ag-center-cols-container");
  if (!gridElement) return null;
  let rowId = null;
  for (let i = 0; i < gridElement.children.length; i++) {
    const rect = gridElement.children[i].getBoundingClientRect();
    if (e.clientY > rect.top && e.clientY < rect.bottom) {
      rowId = gridElement.children[i].getAttribute("row-id"); // Exits the loop and the function
    }
  }

  const dataToAdd = [];

  if (draggedData.dataType === "tree") {
    const node = gridApi?.getRowNode(draggedData.data.id);
    if (!node) return;
    const treeDataRows = [{ ...node.data }] as RowDataType[];
    getAllAgGridChildren(node, treeDataRows);
    dataToAdd.push(...replaceIds(treeDataRows));
  } else if (draggedData.dragType === "form") {
    dataToAdd.push({ ...draggedData.data });
  }

  console.log(dataToAdd);

  if (rowId !== null) {
    const rowNode = gridApi?.getRowNode(rowId);
    if (!rowNode) return;
    gridApi!.setRowNodeExpanded(rowNode, true);
    dataToAdd.forEach((row, index) => {
      const dropRowData = rowNode.data;
      const targetPath = dropRowData.type !== "group" ? [...dropRowData.path].slice(0, -1) : dropRowData.path;
      dataToAdd[index] = { ...row, path: [...targetPath, ...row.path] };
    });
  }

  gridApi!.applyTransaction({ add: dataToAdd });
  updateChangeRecord("add", dataToAdd, setUndoState, setRedoState);
};

export const handleDragMove = (
  params: RowDragEndEvent,
  gridApi: GridApi,
  setUndoState: React.Dispatch<React.SetStateAction<ChangeRecord[] | null>>,
  setRedoState: React.Dispatch<React.SetStateAction<ChangeRecord[] | null>>
) => {
  const draggedData = { ...params.node.data };
  const currentPathIndex = draggedData.path.length - 1;

  const allRowsToUpdate = [{ ...draggedData }] as RowDataType[];
  getAllAgGridChildren(params.node, allRowsToUpdate);

  const cloneBeforeUpdate = structuredClone(allRowsToUpdate);
  const targetNode = params.overNode ? { ...params.overNode.data } : null;

  const targetPath = targetNode
    ? targetNode.type !== "group"
      ? [...targetNode.path].slice(0, -1)
      : [...targetNode.path]
    : [];

  // Stops higher level groups from being dragged into lower level groups
  if (targetPath.join().startsWith(draggedData.path.join())) return;
  // Stops items from being dragged into the same group
  if (draggedData.type === "item" && targetPath.join() === draggedData.path.slice(0, -1).join()) return;

  allRowsToUpdate.forEach((row) => {
    row.path = [...targetPath, ...row.path.slice(currentPathIndex)];
  });

  updateChangeRecord("update", cloneBeforeUpdate, setUndoState, setRedoState, [...allRowsToUpdate]);
  gridApi!.applyTransaction({ update: allRowsToUpdate });
  if (params.overNode) gridApi!.setRowNodeExpanded(params.overNode, true);
};
