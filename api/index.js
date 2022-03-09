import {API_BASE_URL, API_TOKEN} from '../constants/index.js';

export const api = {
    getSkills() {
        return fetch(`${API_BASE_URL}/api/skills`).then((res) => res.json());
    },
    getApplications() {
        return fetch(`${API_BASE_URL}/api/applications?token=${API_TOKEN}`).then((res) => res.json());
    },
    submitApplication(data) {
        return fetch(`${API_BASE_URL}/api/application`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        });
    }
};