import Component from "./base-component";
import { DragTarget } from "../models/drag-drop";
import { Project, ProjectStatus } from "../models/project";
import { Autobind } from "../decorators/autobind";
import { projectState } from "../state/project-state";
import { ProjectItem } from "./project-item";
// ProjectList class
export class ProjectList extends Component<HTMLDivElement, HTMLElement> implements DragTarget {
    private assignedProjects: Project[];

    constructor(private type: 'active' | 'finished') {
        super('project-list', 'app', false, `${type}-projects`);
        this.assignedProjects = [];

        this.configure();
        this.renderContent();
    }

    /**
     * 
     * @param event -
     * Fires when you enter a draggable area with an item attached to the mouse.
     */
    @Autobind
    dragOverHandler(event: DragEvent): void {
        /**
         * Is the data attached to the drag event is a certain format?
         * We just allow dropping off plain text, no images etc...
         */
        if (event.dataTransfer && event.dataTransfer.types[0] === 'text/plain') {
            event.preventDefault();
            const listEl = this.element.querySelector('ul')!;
            listEl.classList.add('droppable');
        }
    }

    /**
     * 
     * @param event the dataTransfer property of DragEvent, you can attach data
     * to the DragEvent and you can extract this data upon a drop. The browser and js
     * behind the scene will store the data during the drag operation and ensure
     * that the data you get when the drop happens is the same data you get here.
     */
    @Autobind
    dropHandler(event: DragEvent): void {
        const prjId = event.dataTransfer!.getData('text/plain');
        projectState.moveProject(prjId, this.type === 'active' ? ProjectStatus.Active : ProjectStatus.Finished);
    }

    @Autobind
    dragLeaveHandler(_: DragEvent): void {
        console.log('dragLeave');
        const listEl = this.element.querySelector('ul')!;
        listEl.classList.remove('droppable');
    }

    configure() {
        this.element.addEventListener('dragover', this.dragOverHandler);
        this.element.addEventListener('dragleave', this.dragLeaveHandler);
        this.element.addEventListener('drop', this.dropHandler);

        projectState.addListener((projects: Project[]) => {
            const relevantProjects = projects.filter(prj => {
                if (this.type === 'active') {
                    return prj.status === ProjectStatus.Active;
                }
                return prj.status === ProjectStatus.Finished;
            });
            this.assignedProjects = relevantProjects;
            this.renderProjects();
        });
    }

    renderContent(): void {
        const listId = `${this.type}-projects-list`;
        this.element.querySelector('ul')!.id = listId;
        this.element.querySelector('h2')!.textContent = this.type.toUpperCase() + 'PROJECTS';
    }

    private renderProjects(): void {
        const listEl = document.getElementById(`${this.type}-projects-list`)! as HTMLUListElement;
        listEl.innerHTML = '';
        for (const prjItem of this.assignedProjects) {
            new ProjectItem(this.element.querySelector('ul')!.id, prjItem);
        }
    }
}