import React from "react";

export default function WebpageOverview() {
  return (
    <div className="flex flex-col gap-12 max-h-screen py-24 px-[25%] overflow-y-auto">
      <h1 className="text-3xl font-bold">Overview: AG-Grid Drag / Drop / Cut / Copy / Paste / Undo / Redo</h1>

      <div className="flex flex-col gap-2">
        <h2 className="text-xl font-bold">The Grid (AG-Grid Integration)</h2>
        <p>
          The core of this webpage is built around <strong>AG-Grid</strong>, a powerful library for creating and
          managing complex data tables, however, it does not natively support the features that I have implemented on
          this webpage for better User Experience, allowing you to easily manipulate the grid structure as follows:
        </p>

        <ul className="flex flex-col gap-2 list-disc pl-12">
          <li>
            <strong>Drag and Drop: </strong> You can drag and drop data directly into the grid, even into groups or
            nested subgroups, the data will be copied and pathed to sit within the designated hierarchical group.
          </li>
          <li>
            <strong>Dragging within the Grid: </strong> Dragging within the grid is natively supported by AG-Grid,
            however is limited to only reordering rows within the same group. My implementation allows you to drag and
            drop rows into different groups, and to the top level, moving all sub-groups and leaf items with it.
          </li>
          <li>
            <strong>Cut, Copy, and Paste: </strong> You can cut, copy, and paste groups and items within the grid using
            the keyboard shortcuts <strong>Ctrl/Cmd + X, Ctrl/Cmd + C, Ctrl/Cmd + V</strong>. Again, this will also
            affect all subgroups and leaf items, and the paste functionality will take into account the selected
            location.
          </li>
          <li>
            <strong>Delete Button:</strong> You can easily delete any selected row from the grid. If a group is deleted,
            all its subgroups and items are also removed.
          </li>
          <li>
            <strong>Undo and Redo: </strong> You can undo any action and redo previously undone actions. Note that
            performing a new action clears the redo stack to maintain logical flow.
          </li>
        </ul>
      </div>

      <div className="flex flex-col gap-2">
        <h2 className="text-xl font-bold">Top Left Row Features (Left to Right)</h2>
        <ul className="flex flex-col gap-2 list-disc pl-12">
          <li>
            <strong>Download Files Button:</strong> Clicking this button will download a zip file containing the current
            webpage&apos;s code.
          </li>
          <li>
            <strong>Help/Info Button:</strong> Opens this information panel providing an overview of the webpage&apos;s
            features and functionality.
          </li>
          <li>
            <strong>Draggable Component:</strong> A draggable element for dragging and dropping the form into the grid,
            facilitating an intuitive and flexible feature for manipulating the AG-Grid.
          </li>
          <li>
            <strong>Undo and Redo Buttons:</strong> You can undo any action and redo previously undone actions. Note
            that performing a new action clears the redo stack to maintain logical flow.
          </li>
        </ul>
      </div>

      <div className="flex flex-col gap-2">
        <h2 className="text-xl font-bold">Form Creation Input Fields</h2>
        <p>Below the top row, input fields are available for you to create structured data forms.</p>
        <ul className="flex flex-col gap-2 list-disc pl-12">
          <li>
            <strong>Groups:</strong> Can contain subgroups and items, allowing hierarchical structuring in the grid.
          </li>
          <li>
            <strong>Items:</strong> Can store additional data, editable through both the input fields and the grid.
          </li>
        </ul>
      </div>

      <div className="flex flex-col gap-2">
        <h2 className="text-xl font-bold">Custom Grid Hierarchy Render (Bottom Right)</h2>
        <p>
          In the bottom right, a custom render of the grid&apos;s hierarchy enables you to drag and drop any segment of
          the tree, including subgroups, into the grid. If you drag a group into the grid, all subgroups and leaf items
          will also be copied into the grid following the original structure.
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <h2 className="text-xl font-bold">Tech Stack</h2>
        <ul className="flex flex-col gap-2 list-disc pl-12">
          <li>ag-grid-enterprise: ^32.3.2</li>
          <li>ag-grid-react: ^32.3.2</li>
          <li>next: ^15.1.6</li>
          <li>react: ^19</li>
          <li>react-dom: ^19</li>
          <li>react-icons: ^5.4.0</li>
          <li>tailwindcss/aspect-ratio: ^0.4.2</li>
          <li>tailwindcss/forms: ^0.5.10</li>
        </ul>
      </div>
    </div>
  );
}
