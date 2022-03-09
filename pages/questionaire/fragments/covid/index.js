import {form} from '../form/index.js';
import {questionaireFormStepper} from '../steps/index.js';
import {boolText, formFields, questionaireFormSteps} from '../../constants/index.js';

const covidFormFragment = form.getFragment('.form-container.covid', {
    [formFields.WORK_PREFERENCE]: (value) => {
        if (!value) {
            return {
                message: 'Information is required'
            };
        }
    },
    [formFields.HAD_COVID]: (value) => {
        if (!value) {
            return {
                message: 'Information is required'
            };
        }
    },
    [formFields.VACCINATED]: (value) => {
        if (!value) {
            return {
                message: 'Information is required'
            };
        }
    },
    [formFields.COVID_DATE]: (value) => {
        if (covidFormFragment.getInput(formFields.HAD_COVID).getValue() !== boolText.TRUE) return;

        if (!value) {
            return {
                message: 'Covid date is required'
            };
        }
    },
    [formFields.VACCINE_DATE]: (value) => {
        if (covidFormFragment.getInput(formFields.VACCINATED).getValue() !== boolText.TRUE) return;

        if (!value) {
            return {
                message: 'Last vaccine date is required'
            };
        }
    }
});
covidFormFragment.registerFormEvents();
const covidInput = covidFormFragment.getInput(formFields.HAD_COVID);
const covidDateInput = covidFormFragment.getInput(formFields.COVID_DATE);
const vaccinatedInput = covidFormFragment.getInput(formFields.VACCINATED);
const vaccineDateInput = covidFormFragment.getInput(formFields.VACCINE_DATE);
covidInput.registerChangeHandler(() => {
    covidDateInput.containerEl.classList.toggle('hidden', covidInput.getValue() === boolText.FALSE);
});
vaccinatedInput.registerChangeHandler(() => {
    vaccineDateInput.containerEl.classList.toggle('hidden', vaccinatedInput.getValue() === boolText.FALSE);
});


const onFormSubmit = () => {
    const isValid = covidFormFragment.validateForm();

    if (!isValid) return;

    questionaireFormStepper.moveToNextStep();
};


questionaireFormStepper.onActivateStepHooks.push(() => {
    if (questionaireFormStepper.activeStep === questionaireFormSteps.COVID) {
        questionaireFormStepper.nextBtn.addEventListener('click', onFormSubmit);
    } else {
        questionaireFormStepper.nextBtn.removeEventListener('click', onFormSubmit);
    }
});