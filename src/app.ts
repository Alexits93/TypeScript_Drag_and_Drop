class ProjectInput {
    templateElement: HTMLTemplateElement; // gives access to the temlpate that holds the content
    hostElement: HTMLDivElement; // holds a reference to the element to where I want to render my template content
    element: HTMLFormElement;

    constructor() {
        this.templateElement = document.getElementById('project-input')! as HTMLTemplateElement;
        this.hostElement = document.getElementById('app')! as HTMLDivElement;

        const importedNode = document.importNode(this.templateElement.content, true);
        this.element = importedNode.firstElementChild as HTMLFormElement;

        this.attach();
    }

    private attach(): void {
        this.hostElement.insertAdjacentElement('afterbegin', this.element);
    }
}

const projection = new ProjectInput();