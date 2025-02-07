import { GridApi } from "ag-grid-enterprise";
import { ChangeRecord, getAllAgGridChildren, replaceIds, RowDataType, updateChangeRecord } from "./ag-grid-utils";
import { useCallback, useEffect, useState } from "react";

export const useClipboard = (
  gridApi: GridApi | null,
  setUndoState: React.Dispatch<React.SetStateAction<ChangeRecord[] | null>>,
  setRedoState: React.Dispatch<React.SetStateAction<ChangeRecord[] | null>>
) => {
  const [clipboard, setClipboard] = useState<RowDataType[] | null>(null);

  const getAllRowsAndChildren = useCallback(() => {
    if (!gridApi) return;
    const selectedNode = gridApi.getSelectedNodes()[0];
    const allRowsAndChildren = [{ ...selectedNode.data }] as RowDataType[];
    getAllAgGridChildren(selectedNode, allRowsAndChildren);
    return allRowsAndChildren;
  }, [gridApi]) as () => RowDataType[];

  const handleCopy = useCallback(() => {
    if (!gridApi) return;
    setClipboard(getAllRowsAndChildren());
  }, [gridApi]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleCut = useCallback(() => {
    if (!gridApi) return;
    const allRowsToCut = getAllRowsAndChildren();
    gridApi.applyTransaction({ remove: allRowsToCut });
    updateChangeRecord("delete", allRowsToCut, setUndoState, setRedoState);
    setClipboard(allRowsToCut);
  }, [gridApi]); // eslint-disable-line react-hooks/exhaustive-deps

  const handlePaste = useCallback(() => {
    if (!gridApi || !clipboard) return;
    const selectedNode = gridApi.getSelectedNodes()[0];
    const targetPath = selectedNode
      ? selectedNode.data.type === "group"
        ? selectedNode.data.path
        : selectedNode.data.path.slice(0, -1)
      : [];

    const rowsToPaste = replaceIds(clipboard).map((row) => {
      return { ...row, path: [...targetPath, ...row.path] };
    });

    updateChangeRecord("add", rowsToPaste, setUndoState, setRedoState);
    gridApi.applyTransaction({ add: rowsToPaste });
    gridApi.setRowNodeExpanded(selectedNode, true);
  }, [gridApi, clipboard]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Handle both Windows (Ctrl) and Mac (Cmd/Meta) keyboard shortcuts
      if (e.ctrlKey || e.metaKey) {
        switch (e.key.toLowerCase()) {
          case "c":
            e.preventDefault();
            handleCopy();
            break;
          case "x":
            e.preventDefault();
            handleCut();
            break;
          case "v":
            e.preventDefault();
            handlePaste();
            break;
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleCopy, handleCut, handlePaste]);
};
