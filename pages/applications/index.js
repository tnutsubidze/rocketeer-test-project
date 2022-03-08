import {API_BASE_URL, API_TOKEN} from '../../constants';
import {api} from '../../api';
import {apiWorkPreference} from '../questionaire/constants';

async function main() {
    const skillInfos = await api.getSkills();
    const applications = await api.getApplications();
    const applicationsContainerEl = document.querySelector('.applications-container');
    applicationsContainerEl.innerHTML = '';

    console.log(applications, skillInfos);

    applications.forEach((application, applicationIndex) => {
        const skillsContent = application.skills.map((skill) => {
            const skillInfo = skillInfos.find((skillInfo) => skillInfo.id === skill.id);

            return `
                <p class="info-label">
                    ${skillInfo.title}
                </p>
                <p class="info-value">
                    Years of Experience: ${skill.experience}
                </p>
            `;
        }).join('');

        applicationsContainerEl.innerHTML += `
            <div class="application">
                <div class="application-header">
                    <p class="application-title">${applicationIndex + 1}</p>
                    <svg class="application-arrow" width="13" height="8" viewBox="0 0 13 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6.01 7.425L12.02 1.415L10.607 0L6.01 4.6L1.414 0L0 1.414L6.01 7.425Z" fill="white"/>
                    </svg>
                </div>
                <div class="application-content application-grid">
                    <div>
                        <h4 class="info-title">Personal Information</h4>

                        <div class="info-grid">
                            <p class="info-label">
                                First Name
                            </p>
                            <p class="info-value">
                                ${application.first_name}
                            </p>
                            <p class="info-label">
                                Last Name
                            </p>
                            <p class="info-value">
                                ${application.last_name}
                            </p>
                            <p class="info-label">
                                E Mail
                            </p>
                            <p class="info-value">
                                ${application.email}
                            </p>
                            <p class="info-label">
                                Phone
                            </p>
                            ${application.phone ? (
            `<p class="info-value">
                                    ${application.phone}
                                </p>`
        ) : ''}
                        </div>
                    </div>
                    <div>
                        <h4 class="info-title">Skillset</h4>

                        <div class="info-grid">
                            ${skillsContent}
                        </div>
                    </div>

                    <div>
                        <h4 class="info-title">Covid Situation</h4>

                        <div class="form-container covid">
                            <div class="input-container">
                                <label class="label">How would you prefer to work?</label>
                                <div class="field radio">
                                    <input class="input" type="radio" value="office" ${application.work_preference === apiWorkPreference.FROM_OFFICE ? 'checked' : ''} disabled/>
                                    <label class="label">From Sairme Office</label>
                                </div>
                                <div class="field radio">
                                    <input class="input" type="radio" value="home" ${application.work_preference === apiWorkPreference.FROM_HOME ? 'checked' : ''} disabled />
                                    <label class="label">From Home</label>
                                </div>
                                <div class="field radio">
                                    <input class="input" type="radio" value="hybrid" ${application.work_preference === apiWorkPreference.HYBRID ? 'checked' : ''} disabled />
                                    <label class="label">Hybrid</label>
                                </div>
                            </div>
                            <div class="input-container">
                                <label class="label">Did you have covid 19? :(</label>
                                <div class="field radio">
                                    <input class="input" type="radio" value="yes" ${application.had_covid ? 'checked' : ''} disabled />
                                    <label class="label">Yes</label>
                                </div>
                                <div class="field radio">
                                    <input class="input" type="radio" value="no" ${!application.had_covid ? 'checked' : ''} disabled />
                                    <label class="label">No</label>
                                </div>
                            </div>
                            
                            ${application.had_covid ? (
            `<div class="input-container">
                                    <label class="label">When did you have covid 19?</label>
                                    <div class="field">
                                        <input class="input" type="date" placeholder="Date"
                                               value="${application.had_covid_at}" disabled/>
                                    </div>
                                </div>`
        ) : ''}
                            

                            <div class="input-container">
                                <label class="label">Have you been vaccinated?</label>
                                <div class="field radio">
                                    <input class="input" type="radio" value="yes" ${application.vaccinated ? 'checked' : ''} disabled />
                                    <label class="label">Yes</label>
                                </div>
                                <div class="field radio">
                                    <input class="input" type="radio" value="no" ${!application.vaccinated ? 'checked' : ''} disabled />
                                    <label class="label">No</label>
                                </div>
                            </div>

                            ${application.vaccinated ? (
            `<div class="input-container">
                                    <label class="label">When did you get covid vaccine?</label>
                                    <div class="field">
                                        <input class="input" type="date" placeholder="Date" value="${application.vaccinated_at}" disabled />
                                    </div>
                                </div>`
        ) : ''}
                            
                        </div>
                    </div>

                    <div>
                        <h4 class="info-title">Insights</h4>

                        <div class="form-container about">
                            <div class="input-container">
                                <label class="label">Would you attend Devtalks and maybe also organize your own?</label>
                                <div class="field radio">
                                    <input class="input" type="radio" value="yes" ${application.will_organize_devtalk ? 'checked' : ''} disabled />
                                    <label class="label">Yes</label>
                                </div>
                                <div class="field radio">
                                    <input class="input" type="radio" value="no" ${!application.will_organize_devtalk ? 'checked' : ''} disabled />
                                    <label class="label">No</label>
                                </div>
                                <p class="error"></p>
                            </div>
                            <div class="input-container">
                                <label class="label">What would you speak about at Devtalk?</label>
                                <div class="field">
                                    <textarea class="input" rows="4" disabled>${application.devtalk_topic}</textarea>
                                </div>
                                <p class="error"></p>
                            </div>
                            <div class="input-container">
                                <label class="label">Tell us something special</label>
                                <div class="field">
                                    <textarea class="input" rows="3" disabled>${application.something_special}</textarea>
                                </div>
                                <p class="error"></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    });

    const applicationHeaderEls = document.querySelectorAll('.application-header');

    applicationHeaderEls.forEach((applicationHeaderEl) => {
        applicationHeaderEl.addEventListener('click', () => {
            applicationHeaderEl.parentElement.classList.toggle('selected');
        });
    });
}

main();