"use client";

import "ag-grid-enterprise";
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-enterprise/styles/ag-theme-alpine.css"; // Optional: Enterprise theme
import "./utils/ag-grid/ag-grid-custom-theme.css"; // Custom Theme
import { CellClassParams, CellStyle, ColDef, GridReadyEvent, RowDragEndEvent } from "ag-grid-enterprise";
import { AgGridReact } from "ag-grid-react"; // React Data Grid Component
import React, { useEffect, useRef, useState } from "react";
import { GridApi, RowClassParams } from "ag-grid-enterprise";
import {
  RowDataType,
  FormDataType,
  ChangeRecord,
  deleteRowsViaTransaction,
  agGridDataTypes,
  defaultColDef,
  deleteColDef,
  autoGroupColumnDef,
} from "./utils/ag-grid/ag-grid-utils";
import { useTheme } from "./ThemeContext";
import { initialRowData } from "./utils/ag-grid/initial-row-data";
import { CustomInputField, CustomDropdown } from "./utils/ag-grid/CustomFields";
import { handleDragStart, handleDragOver, handleOnDrop, handleDragMove } from "./utils/ag-grid/ag-grid-drag-handlers";
import IconComponent from "./utils/IconComponent";
import { useClipboard } from "./utils/ag-grid/ag-grid-cut-copy-paste";
import { RenderTree } from "./utils/ag-grid/RenderTree";
import WebpageOverview from "./utils/ag-grid/WebpageOverview";

export default function AgGridDragDrop() {
  const rowData = initialRowData;
  const gridRef = useRef<AgGridReact>(null);
  const [gridApi, setGridApi] = useState<GridApi | null>(null);
  const { theme, toggleTheme } = useTheme();
  const [formData, setFormData] = useState<FormDataType>({ name: "test", type: "Group" } as FormDataType);
  const [undoRecord, setUndoRecord] = useState<ChangeRecord[] | null>(null);
  const [redoRecord, setRedoRecord] = useState<ChangeRecord[] | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  useEffect(() => {
    const hasExplanationBeenShown = localStorage.getItem("hasExplanationBeenShown");
    if (!hasExplanationBeenShown) {
      setShowExplanation(true);
      localStorage.setItem("hasExplanationBeenShown", "true");
    }
  }, []);

  useClipboard(gridApi, setUndoRecord, setRedoRecord);

  const updateField = (key: keyof RowDataType, value: string | number) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const onGridReady = (params: GridReadyEvent) => {
    setGridApi(params.api);
  };

  const colDefs = [
    { field: "price", header: "Price", cellDataType: "currency" },
    { field: "quantity", header: "Quantity" },
    {
      field: "totalPrice",
      header: "Total Price",
      cellDataType: "currency",
      editable: false,
      aggFunc: "sum",
      valueGetter: (params) => {
        const quantity = params.data?.quantity || 0;
        const price = params.data?.price || 0;
        return quantity * price; // Calculate total cost
      },
    },
    {
      field: "colour",
      header: "Colour",
      cellStyle: (params: CellClassParams): CellStyle => {
        if (params.data?.colour) {
          return {
            color: params.data?.colour.toLowerCase(),
          };
        }
        return {};
      },
    },
    { field: "year", header: "Year" },
    {
      ...deleteColDef,
      cellRenderer: (params: CellClassParams) => {
        return (
          <div className="flex w-full h-full items-center justify-center">
            <button
              onClick={() => {
                deleteRowsViaTransaction(params.node, gridApi as GridApi, setUndoRecord, setRedoRecord);
              }}
              className="flex items-center justify-center text-center align-center"
            >
              <IconComponent type="close" className="w-6 h-6 text-red-400 hover:text-red-500" />
            </button>
          </div>
        );
      },
    },
  ] as ColDef[];

  const handleUndo = () => {
    if (!undoRecord || undoRecord?.length === 0) return;
    const record = { ...undoRecord?.[undoRecord.length - 1] };
    const transaction = record?.transaction;
    const rows = record?.rows;

    if (transaction === "add") {
      gridApi?.applyTransaction({ remove: rows });
    } else if (transaction === "delete") {
      gridApi?.applyTransaction({ add: rows });
    } else if (transaction === "update") {
      gridApi?.applyTransaction({ update: rows });
    }

    setUndoRecord((prev) => {
      const newChangeRecord = [...(prev || [])];
      newChangeRecord.pop();
      return newChangeRecord;
    });

    setRedoRecord((prev) => {
      const newRedoRecord = [...(prev || [])];
      newRedoRecord.push(record as ChangeRecord);
      return newRedoRecord;
    });
  };

  const handleRedo = () => {
    if (!redoRecord || redoRecord?.length === 0) return;
    if (Object.keys(redoRecord?.[0]).length === 0) return;
    const record = { ...redoRecord?.[redoRecord.length - 1] };
    const transaction = record?.transaction;

    if (transaction === "add") {
      const rows = record?.rows;
      gridApi?.applyTransaction({ add: rows });
    } else if (transaction === "delete") {
      const rows = record?.rows;
      gridApi?.applyTransaction({ remove: rows });
    } else if (transaction === "update") {
      const rows = record?.newRows;
      gridApi?.applyTransaction({ update: rows });
    }

    setRedoRecord((prev) => {
      const newRedoRecord = [...(prev || [])];
      newRedoRecord.pop();
      return newRedoRecord;
    });

    setUndoRecord((prev) => {
      const newChangeRecord = [...(prev || [])];
      newChangeRecord.push(record as ChangeRecord);
      return newChangeRecord;
    });
  };

  const icons = [
    {
      id: "filedownload",
      onClick: () => {
        const link = document.createElement("a");
        link.href =
          "https://github.com/Medge2000/ag-grid-drag-drop-cut-copy-paste-undo-redo/archive/refs/heads/master.zip";
        link.download =
          "https://github.com/Medge2000/ag-grid-drag-drop-cut-copy-paste-undo-redo/archive/refs/heads/master.zip"; // Name for the downloaded file
        document.body.appendChild(link); // Append to document
        link.click();
        document.body.removeChild(link); // Clean up
      },
    },
    { id: "question", onClick: () => setShowExplanation(!showExplanation) },
  ];

  const undoRedoIcons = [
    { id: "undo", onClick: handleUndo },
    { id: "redo", onClick: handleRedo },
  ];

  return (
    <div className="flex flex-grow flex-col w-full h-full rounded-md overflow-hidden py-4 gap-12 px-4 md:px-[10%]">
      <div className="absolute top-0 right-0 z-50 pr-4 pt-4">
        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg hover:bg-cerulean-200 text-cerulean-600 dark:text-cerulean-400 dark:hover:bg-gray-700 transition-colors duration-200"
          aria-label="Toggle theme"
        >
          {theme === "light" ? (
            <IconComponent type="moon" className="w-8 h-8" />
          ) : (
            <IconComponent type="sun" className="w-8 h-8" />
          )}
        </button>
      </div>

      {showExplanation && (
        <div className="absolute top-0 left-0 w-screen h-screen z-50 items-center justify-center">
          <div className="absolute inset-0 bg-white dark:bg-black  bg-opacity-80 dark:bg-opacity-70 backdrop-blur-extra-sm" />

          <div className="relative z-50">
            <button
              onClick={() => setShowExplanation(!showExplanation)}
              className="absolute top-0 right-0 z-50 pr-5 pt-4"
            >
              <IconComponent type="close" className="w-8 h-8 text-red-400 hover:text-red-500" />
            </button>
            <span className="relative">
              <WebpageOverview />
            </span>
          </div>
        </div>
      )}

      <div className="flex flex-col md:flex-row flex-grow w-full h-full md:h-[calc(100vh-8rem)] bg-cerulean-125 dark:bg-gray-800 p-4 rounded-lg shadow-md gap-4">
        <div className="flex flex-col gap-4 items-center w-full md:w-128">
          <div className="flex w-full gap-4 justify-between">
            <div className="flex gap-1">
              {icons.map((icon) => (
                <button
                  key={icon.id}
                  onClick={icon.onClick}
                  className={`rounded-md font-semibolds p-1 rounded-full text-cerulean-700 dark:text-cerulean-200 hover:text-cerulean-400 dark:hover:text-cerulean-400 hover:bg-cerulean-100 dark:hover:bg-gray-700
                  `}
                >
                  <IconComponent type={icon.id} className="w-6 h-6" />
                </button>
              ))}
            </div>

            <div
              className={`flex w-full py-1 px-4 rounded-md justify-center items-center text-base font-semibold cursor-move border hover:dark:bg-gray-700 overflow-hidden ${
                formData.type === "Group"
                  ? "border-cerulean-500 text-cerulean-500 dark:border-cerulean-400 dark:text-cerulean-400"
                  : "border-green-500 text-green-500 dark:border-green-400 dark:text-green-400"
              }`}
              draggable={true}
              onDragStart={(e) => handleDragStart(e, formData)}
            >
              <div className="overflow-hidden text-ellipsis whitespace-nowrap">{formData.name || "Enter Name"}</div>
            </div>

            <div className="flex gap-1">
              {undoRedoIcons.map((icon) => (
                <button
                  key={icon.id}
                  onClick={icon.onClick}
                  className="rounded-md font-semibolds text-cerulean-700 dark:text-cerulean-200 hover:text-cerulean-400 dark:hover:text-cerulean-400
                  hover:bg-cerulean-100 dark:hover:bg-gray-700 p-2 rounded-full"
                >
                  <IconComponent type={icon.id} className="w-5 h-5" />
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col w-full gap-2 items-center">
            <CustomDropdown
              label="Type"
              options={["Group", "Item"]}
              selected={formData.type}
              onSelect={(value) => updateField("type", value)}
              placeholder="Select Type"
            />
            <CustomInputField
              label="Name"
              value={formData.name}
              onChange={(value) => updateField("name", value)}
              placeholder="Enter Name"
              cursor="cursor-text"
            />
            <CustomInputField
              label="Price"
              value={formData.price || ""}
              type="number"
              onChange={(value) => updateField("price", value)}
              placeholder={formData.type === "Item" ? "Enter Price" : "Select Item"}
              disabled={formData.type !== "Item"}
              className={formData.type !== "Item" ? "opacity-50 cursor-not-allowed" : ""}
              cursor={formData.type !== "Item" ? "cursor-not-allowed" : "cursor-text"}
              step={0.01}
            />
            <CustomInputField
              label="Quantity"
              value={formData.quantity || ""}
              type="number"
              onChange={(value) => updateField("quantity", value)}
              placeholder={formData.type === "Item" ? "Enter Quantity" : "Select Item"}
              disabled={formData.type !== "Item"}
              className={formData.type !== "Item" ? "opacity-50 cursor-not-allowed" : ""}
              cursor={formData.type !== "Item" ? "cursor-not-allowed" : "cursor-text"}
              step={1}
            />
            <CustomInputField
              label="Colour"
              value={formData.colour || ""}
              onChange={(value) => updateField("colour", value)}
              placeholder={formData.type === "Item" ? "Enter Colour" : "Select Item"}
              disabled={formData.type !== "Item"}
              className={formData.type !== "Item" ? "opacity-50 cursor-not-allowed" : ""}
              cursor={formData.type !== "Item" ? "cursor-not-allowed" : "cursor-text"}
            />
            <CustomInputField
              label="Year"
              value={formData.year || ""}
              type="number"
              onChange={(value) => updateField("year", value)}
              placeholder={formData.type === "Item" ? "Enter Year" : "Select Item"}
              disabled={formData.type !== "Item"}
              className={formData.type !== "Item" ? "opacity-50 cursor-not-allowed" : ""}
              cursor={formData.type !== "Item" ? "cursor-not-allowed" : "cursor-text"}
              step={1}
            />
          </div>

          <div className="flex flex-col gap-4 flex-grow w-full h-128 md:h-full bg-white dark:bg-gray-900 overflow-y-auto overflow-x-hidden rounded-md text-xs p-2">
            <RenderTree gridApi={gridApi} />
          </div>
        </div>

        <div
          className={`ag-theme-alpine ag-theme-custom-foundation ${
            theme === "dark" ? "ag-theme-custom-dark" : "ag-theme-custom-light"
          } w-full h-192 md:h-full`}
          onDragOver={(e) => handleDragOver(e)} // Allow drop
          onDrop={(e) => handleOnDrop(e, gridApi as GridApi, setUndoRecord, setRedoRecord)}
        >
          <AgGridReact
            ref={gridRef}
            onGridReady={onGridReady}
            rowSelection="single"
            rowData={rowData}
            columnDefs={colDefs}
            defaultColDef={defaultColDef}
            dataTypeDefinitions={agGridDataTypes()}
            getRowStyle={(params: RowClassParams) => {
              if (params.data?.type === "group") {
                return {
                  backgroundColor: `var(--ag-group-background-color)`,
                  color: `var(--ag-group-foreground-color)`,
                };
              }
              if (params.data?.type === "item") {
                return {
                  backgroundColor: `var(--ag-background-color)`,
                  color: `var(--ag-item-foreground-color)`,
                };
              }
              return undefined;
            }}
            getDataPath={(data) => data.path} //setGridDataPath(data)}
            autoGroupColumnDef={autoGroupColumnDef}
            getRowId={(params) => params.data.id}
            groupDefaultExpanded={2}
            treeData={true}
            groupDisplayType="singleColumn"
            onRowDragEnd={(params: RowDragEndEvent) =>
              handleDragMove(params, gridApi as GridApi, setUndoRecord, setRedoRecord)
            }
            // onSelectionChanged={(params: SelectionChangedEvent) => setSelectedRow(params.api.getSelectedRows()[0])}
            suppressClipboardPaste={true}
            suppressCutToClipboard={true}
            suppressClipboardApi={true}
          />
        </div>
      </div>
    </div>
  );
}
