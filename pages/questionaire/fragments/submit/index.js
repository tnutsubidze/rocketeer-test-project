import {form} from '../form';
import {questionaireStepper} from '../steps';
import {data} from '../data';
import {mapFormValuesToApiInput} from '../../utils';
import {API_TOKEN} from '../../../../constants';
import {api} from '../../../../api';

const submitBtn = document.querySelector('.submit-btn');
const goBackBtn = document.querySelector('.go-back-btn');

submitBtn.addEventListener('click', async () => {
    const apiData = {
        ...mapFormValuesToApiInput({
            ...form.getValues(),
            selectedSkills: data.selectedSkills
        }),
        token: API_TOKEN,
    };

    await api.submitApplication(apiData);

    questionaireStepper.moveToNextStep();
});

goBackBtn.addEventListener('click', () => {
    questionaireStepper.moveToPrevStep();
});

questionaireStepper.onActivateStepHooks.push(() => {
    if (questionaireStepper.activeStep === 2) {
        setTimeout(() => {
            window.location.href = '../../index.html';
        }, 3000);
    }
});