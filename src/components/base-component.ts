/**
 * The base component class, where the other project classes are inheriting their base logic and structure from.
 * We don't want to export it as a named import - default tells js, that it is the
 * main export of the file.
 */
export default abstract class Component<T extends HTMLElement, U extends HTMLElement> {
    protected templateElement: HTMLTemplateElement; // gives access to the temlpate that holds the content
    protected hostElement: T; // holds a reference to the element to where I want to render my template content
    protected element: U; // The HTML element we want to insert into the host element

    constructor(templateId: string, hostElementId: string, instertAtStart: boolean, newElementId?: string) {
        this.templateElement = document.getElementById(templateId)! as HTMLTemplateElement;
        this.hostElement = document.getElementById(hostElementId)! as T;

        // passing a pointer to the template element's content
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