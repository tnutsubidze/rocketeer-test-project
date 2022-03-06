export const mapFormValuesToApiInput = (values) => {
    const workPreference = {
        'home': 'from_home',
        'office': 'from_office',
        'hybrid': 'hybrid'
    }

    return {
        first_name: values['first-name'],
        last_name: values['last-name'],
        email: values.email,
        phone: values.phone ? '+9955' + values.phone : '',
        skills: values.selectedSkills.map((selectedSkill) => {
            return {
                id: selectedSkill.id,
                experience: selectedSkill.experience
            }
        }),
        work_preference: workPreference[values.work_preference],
        had_covid: values.had_covid === 'yes',
        had_covid_at: values.covid_date,
        vaccinated: values.vaccinated === 'yes',
        vaccinated_at: values.vaccine_date,
        will_organize_devtalk: values.attend_devtalks === 'yes',
        devtalk_topic: values.devtalk_topic,
        something_special: values.something_special
    }
}