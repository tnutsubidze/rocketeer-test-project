import {form} from '../form/index.js';
import {questionaireStepper} from '../steps/index.js';
import {data} from '../data/index.js';
import {mapFormValuesToApiInput, mapSelectedSkillsToApiInput} from '../../utils/index.js';
import {API_TOKEN} from '../../../../constants/index.js';
import {api} from '../../../../api/index.js';
import {questionaireSteps} from '../../constants/index.js';

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