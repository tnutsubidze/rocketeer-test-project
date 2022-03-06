import {form} from "../form";
import {questionaireFormStepper} from "../steps";

const covidFormFragment = form.getFragment('.form-container.covid', {
    'work_preference': (value) => {
        if (!value) {
            return {
                message: 'Information is required'
            }
        }
    },
    'had_covid': (value) => {
        if (!value) {
            return {
                message: 'Information is required'
            }
        }
    },
    'vaccinated': (value) => {
        if (!value) {
            return {
                message: 'Information is required'
            }
        }
    },
    'covid_date': (value) => {
        if (covidFormFragment.getInput('had_covid').getValue() !== 'yes') return;

        if (!value) {
            return {
                message: 'Covid date is required'
            }
        }
    },
    'vaccine_date': (value) => {
        if (covidFormFragment.getInput('vaccinated').getValue() !== 'yes') return;

        if (!value) {
            return {
                message: 'Last vaccine date is required'
            }
        }
    }
});
covidFormFragment.registerFormEvents();
const covidInput = covidFormFragment.getInput('had_covid');
const covidDateInput = covidFormFragment.getInput('covid_date');
const vaccinatedInput = covidFormFragment.getInput('vaccinated');
const vaccineDateInput = covidFormFragment.getInput('vaccine_date');
covidInput.registerChangeHandler(() => {
    covidDateInput.containerEl.classList.toggle('hidden', covidInput.getValue() === 'no')
})
vaccinatedInput.registerChangeHandler(() => {
    vaccineDateInput.containerEl.classList.toggle('hidden', vaccinatedInput.getValue() === 'no')
})


const onFormSubmit = () => {
    const isValid = covidFormFragment.validateForm();

    if (!isValid) return;

    questionaireFormStepper.moveToNextStep();
}


questionaireFormStepper.onActivateStepHooks.push(() => {
    if (questionaireFormStepper.activeStep === 2) {
        questionaireFormStepper.nextBtn.addEventListener('click', onFormSubmit)
    } else {
        questionaireFormStepper.nextBtn.removeEventListener('click', onFormSubmit)
    }
})