
import { Draggable } from '../models/drag-drop';
import Component from './base-component';
import { Project } from '../models/project';
import { Autobind } from '../decorators/autobind';

// ProjectItem class
export class ProjectItem extends Component<HTMLUListElement, HTMLLIElement> implements Draggable {
    private project: Project;

    get persons() {
        return this.project.people === 1 ? '1 person' : `${this.project.people} persons`;
    }

    constructor(hostId: string, project: Project) {
        super('single-project', hostId, false, project.id);
        this.project = project;

        this.configure();
        this.renderContent();
    }

    /**
     * 
     * @param event the dataTransfer property of DragEvent, you can attach data
     * to the DragEvent and you can extract this data upon a drop. The browser and js
     * behind the scene will store the data during the drag operation and ensure
     * that the data you get when the drop happens is the same data you get here.
     */
    @Autobind
    dragStartHandler(event: DragEvent): void {
        console.log(event);
        event.dataTransfer!.setData('text/plain', this.project.id);
        /**
         * This controls how the cursor will look like and tells the browser
         * about our intentions, that we plan to move an element from A to B.
         * This means upon a drop we remove the element from it's original place
         * and move it to it's new place.
         */
        event.dataTransfer!.effectAllowed = "move";
    }

    dragEndHandler() {
        console.log('dragEnd');
    }

    // dragEndHandler(_: DragEvent): void { }

    configure(): void {
        this.element.addEventListener('dragstart', this.dragStartHandler);
        this.element.addEventListener('dragend', this.dragEndHandler);
    }

    renderContent(): void {
        this.element.querySelector('h2')!.textContent = this.project.title;
        this.element.querySelector('h3')!.textContent = this.persons + ' assigned';
        this.element.querySelector('p')!.textContent = this.project.description;
    }
}