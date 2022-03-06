const interactionHandler = (element) => {
    if (!element.hasAttribute('interacted')) {
        element.setAttribute('interacted', '1')
    }
}

export const form = {
    formEl: document.querySelector('#questionaire-form'),
    getValues() {
        const formData = new FormData(this.formEl);
        return Object.fromEntries(formData.entries())
    },
    getFragment(formSelector, validators) {
        return {
            registerFormEvents() {
                this.inputs.forEach((input) => {
                    input.inputEl.addEventListener('input', () => {
                        input.interactionHandler()
                        input.validator()
                    });
                    input.inputEl.addEventListener('blur', () => input.validator());
                    input.registerChangeHandler(() => input.validator());
                })
            },
            inputs: Array.from(document.querySelectorAll(`${formSelector} .input-container`)).map((containerEl) => {
                const inputElements = containerEl.querySelectorAll('.input');
                const inputEl = inputElements[0];
                const name = inputEl.getAttribute('name');
                const errorEl = containerEl.querySelector('.error');

                return {
                    name,
                    containerEl,
                    inputElements,
                    inputEl,
                    errorEl,
                    hasInteractionHandler() {
                        return ['text', 'number', 'email'].includes(inputEl.getAttribute('type'))
                    },
                    interactionHandler() {
                        if (!this.hasInteractionHandler()) return;

                        interactionHandler(inputEl)
                    },
                    validator() {
                        if (!validators[name]) return;

                        const formValues = form.getValues();
                        const error = validators[name](formValues[name]);
                        const isInteracted = inputEl.hasAttribute('interacted') || !this.hasInteractionHandler();

                        if (error && isInteracted) {
                            containerEl.classList.add('invalid')
                            errorEl.textContent = error.message
                        } else {
                            containerEl.classList.remove('invalid')
                        }
                    },
                    registerChangeHandler(callback) {
                        inputElements.forEach((inputEl) => {
                            inputEl.addEventListener('change', callback)
                        })
                    },
                    getValue() {
                        return form.getValues()[name]
                    }
                };
            }),
            validateForm() {
                this.inputs.forEach((input) => {
                    input.interactionHandler()
                    input.validator()
                })

                const invalidFields = document.querySelectorAll('.input-container.invalid');

                return invalidFields.length === 0
            },
            clearValues() {
                this.inputs.forEach((input) => {
                    input.inputEl.value = ""
                })
            },
            getInput(name) {
                return this.inputs.find((input) => input.name === name);
            }
        }
    }
}