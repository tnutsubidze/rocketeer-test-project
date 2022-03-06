import {form} from "../form";
import {questionaireFormStepper, questionaireStepper} from "../steps";
import {data} from "../data";
import {mapFormValuesToApiInput} from "../../utils";
import {API_BASE_URL, API_TOKEN} from "../../../../constants";

const submitBtn = document.querySelector('.submit-btn');
const goBackBtn = document.querySelector('.go-back-btn');

submitBtn.addEventListener('click', async () => {
    // const formValues = {
    //     attend_devtalks: true,
    //     covid_date: "",
    //     devtalk_topic: "",
    //     email: "application_0@gmail.com",
    //     experience: "",
    //     'first-name': "Application 0 First Name",
    //     had_covid: false,
    //     'last-name': "Application 0 Last Name",
    //     phone: "",
    //     'selected-skill': "",
    //     something_special: "Something special",
    //     vaccinated: false,
    //     vaccine_date: "",
    //     work_preference: "office",
    // }
    // const selectedSkills = [{id: 2, experience: 1}]
    const apiData = {
        ...mapFormValuesToApiInput({
            ...form.getValues(),
            selectedSkills: data.selectedSkills
        }),
        token: API_TOKEN,
    }
    await fetch(`${API_BASE_URL}/api/application`, {
        method: 'POST',
        body: JSON.stringify(apiData),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    });

    questionaireStepper.moveToNextStep();
})

goBackBtn.addEventListener('click', () => {
    questionaireStepper.moveToPrevStep();
})

questionaireStepper.onActivateStepHooks.push(() => {
    if (questionaireStepper.activeStep === 2) {
        setTimeout(() => {
            window.location.href = '../../index.html'
        }, 3000)
    }
})