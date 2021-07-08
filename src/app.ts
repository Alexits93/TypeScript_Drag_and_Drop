import { Validatable } from './interfaces/validatable';
module AppModule {

    function validate(validatableInput: Validatable) {
        let isValid = true;
        if (validatableInput.required) {
            isValid = isValid && !!validatableInput.value.toString().trim().length;
        }
        if (validatableInput.minLenght && typeof validatableInput.value === 'string') {
            isValid = isValid && validatableInput.value.length >= validatableInput.minLenght;
        }
        if (validatableInput.maxLength && typeof validatableInput.value === 'string') {
            isValid = isValid && validatableInput.value.length <= validatableInput.maxLength;
        }
        if (validatableInput.min && typeof validatableInput.value === 'number') {
            isValid = isValid && validatableInput.value >= validatableInput.min;
        }
        if (validatableInput.max && typeof validatableInput.value === 'number') {
            isValid = isValid && validatableInput.value <= validatableInput.max;
        }
        return isValid;
    }
    // Autobind decorator
    function Autobind(target: any, methodName: string, descriptor: PropertyDescriptor) {
        const originalMethod = descriptor.value;
        const adjDescriptor: PropertyDescriptor = {
            configurable: true,
            get() {
                const boundFn = originalMethod.bind(this);
                return boundFn;
            }
        };
        return adjDescriptor;
    }
    class ProjectInput {

        templateElement: HTMLTemplateElement; // gives access to the temlpate that holds the content
        hostElement: HTMLDivElement; // holds a reference to the element to where I want to render my template content
        element: HTMLFormElement;

        titleInputElement: HTMLInputElement;
        descriptionInputElement: HTMLInputElement;
        peopleInputElement: HTMLInputElement;

        constructor() {
            this.templateElement = document.getElementById('project-input')! as HTMLTemplateElement;
            this.hostElement = document.getElementById('app')! as HTMLDivElement;

            const importedNode = document.importNode(this.templateElement.content, true);
            this.element = importedNode.firstElementChild as HTMLFormElement;
            this.element.id = 'user-input';

            this.titleInputElement = this.element.querySelector('#title') as HTMLInputElement;
            this.descriptionInputElement = this.element.querySelector('#description') as HTMLInputElement;
            this.peopleInputElement = this.element.querySelector('#people') as HTMLInputElement;

            this.configure();
            this.attach();
        }

        @Autobind
        private submitHandler(event: Event): void {
            event.preventDefault();
            const userInput = this.gatherUserInput();
            if (Array.isArray(userInput)) {
                const [title, desc, people] = userInput;
                console.log(title, desc, people);
                this.clearInputs();
            }
        }

        private gatherUserInput(): [string, string, number] | void {
            const enteredTitle = this.titleInputElement.value;
            const enteredDescription = this.descriptionInputElement.value;
            const enteredPeople = +this.peopleInputElement.value;

            const titleValidatable: Validatable = {
                value: enteredTitle,
                required: true
            };
            const descriptionValidatable: Validatable = {
                value: enteredDescription,
                required: true,
                minLenght: 5
            };
            const peopleValidatable: Validatable = {
                value: enteredPeople,
                required: true,
                min: 3,
                max: 5
            };

            if (
                !validate(titleValidatable) ||
                !validate(descriptionValidatable) ||
                !validate(peopleValidatable)
            ) {
                alert('Invalid input, please try again!');
                return;
            } else {
                return [enteredTitle, enteredDescription, +enteredPeople];
            }
        }

        private clearInputs() {
            this.titleInputElement.value = '';
            this.descriptionInputElement.value = '';
            this.peopleInputElement.value = '';
        }

        private configure(): void {
            this.element.addEventListener('submit', this.submitHandler);
        }

        private attach(): void {
            this.hostElement.insertAdjacentElement('afterbegin', this.element);
        }
    }

    const projection = new ProjectInput();
}