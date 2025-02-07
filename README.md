# AG Grid Enhanced Data Management

This project demonstrates an enhanced implementation of AG-Grid with additional features for improved data manipulation and user experience.

## Features

### Drag and Drop

- Drag external data directly into the grid
- Drop data into specific groups or nested subgroups
- Data automatically adapts to the target hierarchical structure

### Enhanced In-Grid Dragging

- Extends AG-Grid's native drag functionality
- Move rows between different groups
- Drag items to top level
- Maintains all subgroups and leaf items during moves

### Cut, Copy, and Paste

- Full support for keyboard shortcuts:
  - Cut: Ctrl/Cmd + X
  - Copy: Ctrl/Cmd + C
  - Paste: Ctrl/Cmd + V
- Preserves hierarchical structure during operations
- Intelligently handles paste location context

### Delete Operations

- Remove any selected row with delete button
- Cascading deletion for groups:
  - Removes selected group
  - Automatically removes all subgroups
  - Removes all associated leaf items

### Undo/Redo Functionality

- Undo any grid manipulation action
- Redo previously undone actions
- Clear redo stack on new actions for logical consistency

## Technical Details

This application is built with:

- Next.js 15
- AG-Grid Enterprise
- React 19
- TypeScript
- TailwindCSS

## Getting Started

First, install the dependencies:

```bash
npm install
```

Then, either run the development server or build the project, then start the server:

```bash
npm run dev
```

```bash
npm run build
```

```bash
npm run start
```

Then, open the browser and navigate to `http://localhost:3000` to view the project.
