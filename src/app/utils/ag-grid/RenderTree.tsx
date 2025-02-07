import IconComponent from "../../utils/IconComponent";
import { handleTreeDragStart } from "./ag-grid-drag-handlers";
import { useState } from "react";
import { GridApi, IRowNode } from "ag-grid-enterprise";

export const RenderTree = ({ gridApi }: { gridApi: GridApi | null }) => {
  if (!gridApi) return null;

  // Collect top level nodes in an array
  const topLevelNodes: IRowNode[] = [];
  gridApi.forEachNode((node) => {
    if (node.level === 0) {
      topLevelNodes.push(node);
    }
  });

  const TreeNodeComponent = ({ node }: { node: IRowNode }) => {
    const [isExpanded, setIsExpanded] = useState(node.expanded);

    const toggleExpand = () => {
      setIsExpanded(!isExpanded);
    };

    return (
      <div className="text-sm">
        <div
          className={`flex items-center gap-2 ${
            (node.childrenAfterGroup && node.childrenAfterGroup.length > 0) || node.data.type === "item"
              ? "cursor-grab"
              : "cursor-default"
          } hover:bg-gray-100 dark:hover:bg-gray-800 px-2 py-1 rounded`}
          onClick={toggleExpand}
          draggable={true}
          onDragStart={(e) => handleTreeDragStart(e, node)}
        >
          {node.data.type === "group" && (
            <span
              className={`${
                node.childrenAfterGroup && node.childrenAfterGroup.length > 0
                  ? isExpanded && "rotate-90 text-cerulean-500 dark:text-cerulean-400"
                  : "text-transparent"
              }`}
            >
              <IconComponent type={"chevronright"} className="w-4 h-4" />
            </span>
          )}
          <span
            className={`${
              node.data.type === "item"
                ? `text-green-500 dark:text-green-400`
                : node.childrenAfterGroup && node.childrenAfterGroup.length > 0
                ? isExpanded && "text-cerulean-500 dark:text-cerulean-400"
                : "text-gray-500 dark:text-gray-400"
            }`}
          >
            {node.data.name}
          </span>
        </div>

        {isExpanded && node.childrenAfterGroup && (
          <div className={`ml-4 pl-2 border-l border-cerulean-400 dark:border-cerulean-500`}>
            {/* sort by type === item first then alphanumeric */}
            {node.childrenAfterGroup
              .sort((a, b) => {
                if (a.data.type === b.data.type) {
                  return a.data.name.localeCompare(b.data.name);
                }
                return a.data.type === "item" ? -1 : 1;
              })
              .map((child) => (
                <TreeNodeComponent key={child.id} node={child} />
              ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="p-2">
      {topLevelNodes
        .sort((a, b) => a.data.name.localeCompare(b.data.name))
        .map((node) => (
          <TreeNodeComponent key={node.id} node={node} />
        ))}
    </div>
  );
};
