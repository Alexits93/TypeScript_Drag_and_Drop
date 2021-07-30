import { Project, ProjectStatus } from './../models/project';
/**
 * To encode a function type for the listeners.
 * We don't care what the function might return.
 * We only expect to get some items back when the listener fires.
 */
type Listener<T> = (items: T[]) => void;

class State<T> {
    /**
     * An array of function references. Every time something changes
     * we call all listener functions.
     */
    protected listeners: Listener<T>[] = [];

    addListener(listenerFn: Listener<T>): void {
        this.listeners.push(listenerFn);
    }
}
export class ProjectState extends State<Project> {

    // list of projects
    private projects: Project[] = [];

    private static instance: ProjectState;

    private constructor() { super(); }



    static getInstance(): ProjectState {
        if (this.instance) {
            return this.instance
        }
        this.instance = new ProjectState();
        return this.instance;
    }



    addProject(title: string, description: string, numOfPeople: number): void {
        const newProject = new Project(
            Math.random().toString(),
            title,
            description,
            numOfPeople,
            ProjectStatus.Active
        );
        this.projects.push(newProject);
        this.updateListeners();
    }

    moveProject(projectId: string, newStatus: ProjectStatus): void {
        const project = this.projects.find(prj => prj.id === projectId);
        if (project && project.status !== newStatus) {
            project.status = newStatus;
            this.updateListeners();
        }
    }

    private updateListeners(): void {
        for (const listenerFn of this.listeners) {
            /**
             * Only return a copy of the projects array, so it cannot be edited
             * from the place where the listener functions are coming from.
             * Objects and arrays are reference values and we would pass the original array,
             * we could edit it from outside and if we push something to it from inside the Class,
             * it would already change everywhere else in the app, but these placeswouldn't notice that
             * it changed, so sideeffect might would occur.
             */
            listenerFn(this.projects.slice());
        }
    }
}
 /**
  * To guarantee that we are working with the exact same object
  * and to always have one object in the application.
  */
export const projectState = ProjectState.getInstance();