// Component Base Class
export default abstract class Component<T extends HTMLElement, U extends HTMLElement> {
    protected templateElement: HTMLTemplateElement; // gives access to the temlpate that holds the content
    protected hostElement: T; // holds a reference to the element to where I want to render my template content
    protected element: U; // property that points at the node we want to insert into the hostElement.

    constructor(templateId: string, hostElementId: string, instertAtStart: boolean, newElementId?: string) {
        this.templateElement = document.getElementById(templateId)! as HTMLTemplateElement;
        this.hostElement = document.getElementById(hostElementId)! as T;

        /**
         * We need to import the content of the template element and render it to the DOM.
         * We pass a pointer at the templateElement's content. It gives a reference to the content of the template.
         * 2nd argument defines if we want a deep clone of the object.
         */
        const importedNode = document.importNode(this.templateElement.content, true);
        this.element = importedNode.firstElementChild as U;
        if (newElementId) {
            this.element.id = newElementId
        }

        this.attach(instertAtStart);
    }

    /**
     * 
     * @param instertAtStart 
     * To insert an HTML element and define where to insert it.
     */
    private attach(instertAtStart: boolean): void {
        this.hostElement.insertAdjacentElement(instertAtStart ? 'afterbegin' : 'beforeend', this.element);
    }

    abstract configure(): void;
    abstract renderContent(): void;
}