namespace App {
    // ProjectState class
    type Listener<T> = (items: T[]) => void;

    class State<T> {
        protected listeners: Listener<T>[] = [];

        addListener(listenerFn: Listener<T>): void {
            this.listeners.push(listenerFn);
        }
    }
    export class ProjectState extends State<Project> {

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
                listenerFn(this.projects.slice());
            }
        }
    }

    export const projectState = ProjectState.getInstance();
}