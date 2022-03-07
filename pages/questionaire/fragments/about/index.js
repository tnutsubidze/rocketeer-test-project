import {form} from '../form';
import {questionaireFormStepper, questionaireStepper} from '../steps';

const aboutFormFragment = form.getFragment('.form-container.about', {
    'attend_devtalks': (value) => {
        if (!value) {
            return {
                message: 'Information is required'
            };
        }
    },
    'devtalk_topic': (value) => {
        if (aboutFormFragment.getInput('attend_devtalks').getValue() !== 'yes') return;

        if (!value) {
            return {
                message: 'Information is required'
            };
        }
    },
    'something_special': (value) => {
        if (!value) {
            return {
                message: 'Information is required'
            };
        }
    }
});
aboutFormFragment.registerFormEvents();

console.log(aboutFormFragment);
const onFormSubmit = () => {
    const isValid = aboutFormFragment.validateForm();

    if (!isValid) return;

    questionaireStepper.moveToNextStep();
};


questionaireFormStepper.onActivateStepHooks.push(() => {
    if (questionaireFormStepper.activeStep === 3) {
        questionaireFormStepper.nextBtn.addEventListener('click', onFormSubmit);
    } else {
        questionaireFormStepper.nextBtn.removeEventListener('click', onFormSubmit);
    }
});