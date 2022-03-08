import {questionaireFormStepper} from '../steps';
import {form} from '../form';
import {formFields, PHONE_PREFIX, questionaireFormSteps} from '../../constants';

const validators = {
    [formFields.FIRST_NAME]: (value) => {
        if (!value) {
            return {
                message: 'First name is required'
            };
        }

        if (value && value.length >= 2) {
            return;
        }

        return {
            message: 'First name must be at least 2 letters long'
        };
    },
    [formFields.LAST_NAME]: (value) => {
        if (!value) {
            return {
                message: 'Last name is required'
            };
        }

        if (value && value.length >= 2) {
            return;
        }

        return {
            message: 'Last name must be at least 2 letters long'
        };
    },
    [formFields.EMAIL]: (value) => {
        if (!value) {
            return {
                message: 'Email is required'
            };
        }

        const isIncorrectFormat = !value.match(
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );

        if (!isIncorrectFormat) {
            return;
        }

        return {
            message: 'Email format is incorrect'
        };
    },
    [formFields.PHONE]: (value) => {
        if (!value) {
            return;
        }

        const formatError = {
            message: 'Phone format is incorrect'
        };

        try {
            const valueWithPrefix = PHONE_PREFIX + value;
            const parsedPhoneNumber = libphonenumber.parsePhoneNumber(valueWithPrefix);

            if (parsedPhoneNumber && parsedPhoneNumber.country === 'GE' && parsedPhoneNumber.isValid()) {
                return;
            }

            return formatError;
        } catch (e) {
            return formatError;
        }
    }
};
const personalInfoFormFragment = form.getFragment('.form-container.personal-info', validators);
personalInfoFormFragment.registerFormEvents();

const onFormSubmit = () => {
    const isValid = personalInfoFormFragment.validateForm();

    if (!isValid) return;

    questionaireFormStepper.moveToNextStep();
};


questionaireFormStepper.onActivateStepHooks.push(() => {
    if (questionaireFormStepper.activeStep === questionaireFormSteps.PERSONAL_INFO) {
        questionaireFormStepper.nextBtn.addEventListener('click', onFormSubmit);
    } else {
        questionaireFormStepper.nextBtn.removeEventListener('click', onFormSubmit);
    }
});