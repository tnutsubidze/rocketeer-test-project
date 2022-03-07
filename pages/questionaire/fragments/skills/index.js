import {questionaireFormStepper} from '../steps';
import {form} from '../form';
import {data} from '../data';
import {API_BASE_URL} from '../../../../constants';
import {api} from '../../../../api';

async function main() {
    const skillsSelectEl = document.querySelector('.input[name="selected-skill"]');
    const addSkillBtn = document.querySelector('#add-skill-btn');
    const validators = {
        'selected-skill': (value) => {
            if (!value) {
                return {
                    message: 'Skill is required'
                };
            }

            if (data.selectedSkills.find((selectedSkill) => selectedSkill.id === Number(value))) {
                return {
                    message: 'Skill already selected'
                };
            }
        },
        'experience': (value) => {
            if (!value) {
                return {
                    message: 'Experience is required'
                };
            }
        }
    };
    const skillsFormFragment = form.getFragment('.form-container.skills', validators);
    const renderSelectedSkills = () => {
        const skillsContainerEl = document.querySelector('.skills-container');
        skillsContainerEl.innerHTML = '';

        data.selectedSkills.forEach((selectedSkill, index) => {
            const skillInfo = skills.find((skill) => skill.id === selectedSkill.id);
            const div = document.createElement('div');
            div.setAttribute('class', 'selected-skill');

            const pName = document.createElement('p');
            pName.setAttribute('class', 'name');
            pName.textContent = skillInfo.title;

            const pExperience = document.createElement('p');
            pExperience.setAttribute('class', 'experience');
            pExperience.textContent = `Years of Experience: ${selectedSkill.experience}`;

            const button = document.createElement('button');
            button.setAttribute('class', 'remove-btn');
            button.setAttribute('type', 'button');
            button.innerHTML = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10 20C4.47715 20 0 15.5228 0 10C0 4.47715 4.47715 0 10 0C15.5228 0 20 4.47715 20 10C19.9939 15.5203 15.5203 19.9939 10 20ZM2 10.172C2.04732 14.5732 5.64111 18.1095 10.0425 18.086C14.444 18.0622 17.9995 14.4875 17.9995 10.086C17.9995 5.68451 14.444 2.10977 10.0425 2.086C5.64111 2.06246 2.04732 5.59876 2 10V10.172ZM15 11H5V9H15V11Z" fill="#EB3535"/>
                        </svg>`;
            const removeSkill = () => {
                data.selectedSkills.splice(index, 1);
                renderSelectedSkills();
            };

            button.addEventListener('click', removeSkill);

            div.appendChild(pName);
            div.appendChild(pExperience);
            div.appendChild(button);

            skillsContainerEl.appendChild(div);
        });
    };
    const onFormSubmit = () => {
        if (data.selectedSkills.length === 0) return;

        questionaireFormStepper.moveToNextStep();
    };

    skillsFormFragment.registerFormEvents();
    questionaireFormStepper.onActivateStepHooks.push(() => {
        if (questionaireFormStepper.activeStep === 1) {
            questionaireFormStepper.nextBtn.addEventListener('click', onFormSubmit);
        } else {
            questionaireFormStepper.nextBtn.removeEventListener('click', onFormSubmit);
        }
    });
    const skills = await api.getSkills();
    skillsSelectEl.innerHTML = '<option value>Skills</option>';
    skills.forEach((skill) => {
        const optionEl = document.createElement('option');
        optionEl.setAttribute('value', skill.id);
        optionEl.textContent = skill.title;

        skillsSelectEl.appendChild(optionEl);
    });

    addSkillBtn.addEventListener('click', () => {
        const isValid = skillsFormFragment.validateForm();
        const formValues = form.getValues();

        if (!isValid) return;

        data.selectedSkills.push({
            id: Number(formValues['selected-skill']),
            experience: Number(formValues.experience)
        });

        skillsFormFragment.clearValues();

        renderSelectedSkills();
    });
}

main();