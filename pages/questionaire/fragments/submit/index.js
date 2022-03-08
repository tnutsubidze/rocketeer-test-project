import {form} from '../form';
import {questionaireStepper} from '../steps';
import {data} from '../data';
import {mapFormValuesToApiInput, mapSelectedSkillsToApiInput} from '../../utils';
import {API_TOKEN} from '../../../../constants';
import {api} from '../../../../api';
import {questionaireSteps} from '../../constants';

const submitBtn = document.querySelector('.submit-btn');
const goBackBtn = document.querySelector('.go-back-btn');

submitBtn.addEventListener('click', async () => {
    const apiData = {
        ...mapFormValuesToApiInput(form.getValues()),
        ...mapSelectedSkillsToApiInput(data.selectedSkills),
        token: API_TOKEN,
    };

    await api.submitApplication(apiData);

    questionaireStepper.moveToNextStep();
});

goBackBtn.addEventListener('click', () => {
    questionaireStepper.moveToPrevStep();
});

questionaireStepper.onActivateStepHooks.push(() => {
    if (questionaireStepper.activeStep === questionaireSteps.THANK_YOU) {
        setTimeout(() => {
            window.location.href = '../../index.html';
        }, 3000);
    }
});