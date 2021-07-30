/**
 * Event listeners, handlers.
 * The thing you want to drag require listeners to know when we start to drag
 * and when we do end dragging.
 * Dragevent ships with Typescript and coming from the "libs" we have configured
 * in tsconfig.
 */
export interface Draggable {
    dragStartHandler(event: DragEvent): void;
    dragEndHandler(event: DragEvent): void;
}

/**
 * dragOverHandler - to signal to the browser or js, that what you are dragging
 * over is a valid drag target. If not for this handler, dropping will not be possible.
 * dropHandler - to react to the actual drop that happens. updating data, UI etc...
 * dragLeaveHandler - useful if we give a feedback while dragging over, if no drop
 * happens, with this handler, we can revert the visual changes.
 */
export interface DragTarget {
    dragOverHandler(event: DragEvent): void;
    dropHandler(event: DragEvent): void;
    dragLeaveHandler(event: DragEvent): void;
}