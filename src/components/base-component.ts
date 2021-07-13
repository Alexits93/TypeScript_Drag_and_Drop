// Component Base Class
export abstract class Component<T extends HTMLElement, U extends HTMLElement> {
    templateElement: HTMLTemplateElement; // gives access to the temlpate that holds the content
    hostElement: T; // holds a reference to the element to where I want to render my template content
    element: U;

    constructor(templateId: string, hostElementId: string, instertAtStart: boolean, newElementId?: string) {
        this.templateElement = document.getElementById(templateId)! as HTMLTemplateElement;
        this.hostElement = document.getElementById(hostElementId)! as T;

        const importedNode = document.importNode(this.templateElement.content, true);
        this.element = importedNode.firstElementChild as U;
        if (newElementId) {
            this.element.id = newElementId
        }

        this.attach(instertAtStart);
    }

    private attach(instertAtStart: boolean): void {
        this.hostElement.insertAdjacentElement(instertAtStart ? 'afterbegin' : 'beforeend', this.element);
    }

    abstract configure(): void;
    abstract renderContent(): void;
}