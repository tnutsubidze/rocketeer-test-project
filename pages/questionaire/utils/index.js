export const mapFormValuesToApiInput = (values) => {
    const workPreference = {
        'home': 'from_home',
        'office': 'from_office',
        'hybrid': 'hybrid'
    };
    const data = {
        first_name: values['first-name'],
        last_name: values['last-name'],
        email: values.email,
        skills: values.selectedSkills.map((selectedSkill) => {
            return {
                id: selectedSkill.id,
                experience: selectedSkill.experience
            };
        }),
        work_preference: workPreference[values.work_preference],
        had_covid: values.had_covid === 'yes',
        vaccinated: values.vaccinated === 'yes',
        will_organize_devtalk: values.attend_devtalks === 'yes',
        something_special: values.something_special
    };

    if (values.phone) {
        data.phone = '+9955' + values.phone;
    }

    if (data.had_covid) {
        data.had_covid_at = values.covid_date;
    }

    if (data.vaccinated) {
        data.vaccinated_at = values.vaccine_date;
    }

    if (data.will_organize_devtalk) {
        data.devtalk_topic = values.devtalk_topic;
    }

    return data;
};