document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('resumeForm') as HTMLFormElement;
    const addEducationBtn = document.getElementById('addEducation') as HTMLButtonElement;
    const addExperienceBtn = document.getElementById('addExperience') as HTMLButtonElement;
    const addSkillBtn = document.getElementById('addSkill') as HTMLButtonElement;
    const addHobbyBtn = document.getElementById('addHobby') as HTMLButtonElement;
    const shareDownloadContainer = document.getElementById('shareDownloadContainer') as HTMLDivElement;
    const shareableUrlInput = document.getElementById('shareableUrl') as HTMLInputElement;
    const copyShareableUrlBtn = document.getElementById('copyShareableUrl') as HTMLButtonElement;
    const downloadResumeBtn = document.getElementById('downloadResume') as HTMLButtonElement;

    function createRemovableEntry(containerId: string, entryHTML: string) {
        const container = document.getElementById(containerId);
        if (container) {
            const newEntry = document.createElement('div');
            newEntry.className = `${containerId.slice(0, -7)}-entry`;
            newEntry.innerHTML = entryHTML;
            container.appendChild(newEntry);

            const removeButton = newEntry.querySelector('.remove-entry');
            if (removeButton) {
                removeButton.addEventListener('click', function() {
                    container.removeChild(newEntry);
                });
            }
        }
    }

    if (addEducationBtn) {
        addEducationBtn.addEventListener('click', function() {
            createRemovableEntry('educationEntries', `
                <input type="text" name="qualification[]" placeholder="Qualification" required>
                <input type="number" name="year[]" placeholder="Year of Passing" required>
                <input type="text" name="grade[]" placeholder="Grade/Percentage" required>
                <input type="text" name="school[]" placeholder="School/Institution Name" required>
                <button type="button" class="remove-entry">Remove</button>
            `);
        });
    }

    if (addExperienceBtn) {
        addExperienceBtn.addEventListener('click', function() {
            createRemovableEntry('experienceEntries', `
                <input type="text" name="company[]" placeholder="Company Name" required>
                <input type="text" name="role[]" placeholder="Your Role" required>
                <input type="text" name="startDate[]" placeholder="Start Date (MM/YYYY)" required>
                <input type="text" name="endDate[]" placeholder="End Date (MM/YYYY or Present)" required>
                <textarea name="responsibilities[]" placeholder="Key Responsibilities" rows="3" required></textarea>
                <button type="button" class="remove-entry">Remove</button>
            `);
        });
    }

    if (addSkillBtn) {
        addSkillBtn.addEventListener('click', function() {
            createRemovableEntry('skillsEntries', `
                <input type="text" name="skills[]" placeholder="Enter a skill" required>
                <button type="button" class="remove-entry">Remove</button>
            `);
        });
    }

    if (addHobbyBtn) {
        addHobbyBtn.addEventListener('click', function() {
            createRemovableEntry('hobbiesEntries', `
                <input type="text" name="hobbies[]" placeholder="Enter a hobby" required>
                <button type="button" class="remove-entry">Remove</button>
            `);
        });
    }

    if (form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault();
            
            const usernameElement = document.getElementById('username') as HTMLInputElement;
            const profilePictureInput = document.getElementById('profilePicture') as HTMLInputElement;
            const nameElement = document.getElementById('name') as HTMLInputElement;
            const emailElement = document.getElementById('email') as HTMLInputElement;
            const phoneElement = document.getElementById('phone') as HTMLInputElement;
            const addressElement = document.getElementById('address') as HTMLInputElement;

            if (usernameElement && profilePictureInput && nameElement && emailElement && phoneElement && addressElement) {
                const username = usernameElement.value;
                const name = nameElement.value;
                const email = emailElement.value;
                const phone = phoneElement.value;
                const address = addressElement.value;

                // Get education entries
                const educationEntries = document.querySelectorAll('.education-entry');
                let educationHTML = '';
                educationEntries.forEach((entry: Element) => {
                    const inputs = entry.querySelectorAll('input');
                    educationHTML += `
                        <div class="education-item">
                            <p><strong contenteditable="true">${(inputs[0] as HTMLInputElement).value}</strong> - <span contenteditable="true">${(inputs[1] as HTMLInputElement).value}</span></p>
                            <p>Grade: <span contenteditable="true">${(inputs[2] as HTMLInputElement).value}</span>, Institution: <span contenteditable="true">${(inputs[3] as HTMLInputElement).value}</span></p>
                        </div>
                    `;
                });

                // Get experience entries
                const experienceEntries = document.querySelectorAll('.experience-entry');
                let experienceHTML = '';
                experienceEntries.forEach((entry: Element) => {
                    const inputs = entry.querySelectorAll('input');
                    const textarea = entry.querySelector('textarea');
                    experienceHTML += `
                        <div class="experience-item">
                            <p><strong contenteditable="true">${(inputs[0] as HTMLInputElement).value}</strong> - <span contenteditable="true">${(inputs[1] as HTMLInputElement).value}</span></p>
                            <p><span contenteditable="true">${(inputs[2] as HTMLInputElement).value}</span> - <span contenteditable="true">${(inputs[3] as HTMLInputElement).value}</span></p>
                            <p contenteditable="true">${(textarea as HTMLTextAreaElement).value}</p>
                        </div>
                    `;
                });

                // Get skills
                const skillInputs = document.querySelectorAll('#skillsEntries input');
                const skills = Array.prototype.map.call(skillInputs, (input: HTMLInputElement) => input.value).join(', ');

                // Get hobbies
                const hobbyInputs = document.querySelectorAll('#hobbiesEntries input');
                const hobbies = Array.prototype.map.call(hobbyInputs, (input: HTMLInputElement) => input.value).join(', ');

                // Profile picture
                const profilePictureFile = profilePictureInput.files?.[0];
                const profilePictureURL = profilePictureFile ? URL.createObjectURL(profilePictureFile) : '';

                // Creating Resume Output
                const resumeOutput = `
                    <div class="resume-container">
                        <h2 class="resume-title">Resume</h2>
                        ${profilePictureURL ? `<img src="${profilePictureURL}" alt="Profile Picture" class="profile-picture">` : ""}
                        <div class="personal-info">
                            <p><strong>Name:</strong> <span contenteditable="true">${name}</span></p>
                            <p><strong>Email:</strong> <span contenteditable="true">${email}</span></p>
                            <p><strong>Phone Number:</strong> <span contenteditable="true">${phone}</span></p>
                            <p><strong>Address:</strong> <span contenteditable="true">${address}</span></p>
                        </div>
                        <div class="section">
                            <h3>Education</h3>
                            ${educationHTML}
                        </div>
                        <div class="section">
                            <h3>Experience</h3>
                            ${experienceHTML}
                        </div>
                        <div class="section">
                            <h3>Skills</h3>
                            <p contenteditable="true">${skills}</p>
                        </div>
                        <div class="section">
                            <h3>Hobbies</h3>
                            <p contenteditable="true">${hobbies}</p>
                        </div>
                    </div>
                `;

                const resumeOutputElement = document.getElementById('resumeOutput');
                if (resumeOutputElement) {
                    resumeOutputElement.innerHTML = resumeOutput;
                    makeEditable();

                    // This will Generate a shareable URL based on username of user choice
                    const shareableUrl = `${window.location.origin}/resume/${username}`;
                    shareableUrlInput.value = shareableUrl;
                    shareDownloadContainer.style.display = 'flex';

                    // Here it will save resume data to localStorage for download
                    localStorage.setItem(`resume_${username}`, JSON.stringify({
                        name, email, phone, address, educationHTML, experienceHTML, skills, hobbies, profilePictureURL
                    }));
                } else {
                    console.error('The resume output element is missing');
                }
            } 
            else {
                console.error('One or more form elements are missing');
            }
        });
    }
    if (copyShareableUrlBtn) {
        copyShareableUrlBtn.addEventListener('click', function() {
            shareableUrlInput.select();
            document.execCommand('copy');
            alert('Shareable URL copied to clipboard!');
        });
    }

    if (downloadResumeBtn) {
        downloadResumeBtn.addEventListener('click', function() {
            const resumeOutput = document.getElementById('resumeOutput');
            if (resumeOutput) {
                const profilePictureFile = (document.getElementById('profilePicture') as HTMLInputElement).files?.[0];
                let profilePictureDataURL = '';
                
                if (profilePictureFile) {
                    const reader = new FileReader();
                    reader.onloadend = function() {
                        profilePictureDataURL = reader.result as string;
                        
                        const resumeHtml = `
                            <html>
                                <head>
                                    <style>
                                        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
                                        .resume-container { max-width: 800px; margin: 20px auto; padding: 20px; border: 1px solid #ddd; border-radius: 5px; }
                                        h2 { color: #2c3e50; border-bottom: 2px solid #ddd; padding-bottom: 5px; margin-bottom: 10px; }
                                        h3 { color: #2c3e50; margin-top: 20px; border-bottom: 1px solid #ddd; padding-bottom: 5px; }
                                        .profile-picture { width: 150px; height: 150px; border-radius: 50%; display: block; margin: 0 auto; }
                                        .personal-info p, .section p { margin: 5px 0; }
                                        .section { margin-top: 20px; padding-top: 10px; }
                                        .section:before { content: ""; display: block; width: 100%; height: 1px; background: #ddd; margin-bottom: 10px; }
                                        .resume-title { text-align: center; }
                                    </style>
                                </head>
                                <body>
                                    <div class="resume-container">
                                        <h2 class="resume-title"></h2>
                                        ${resumeOutput.innerHTML.replace(/src="([^"]*)"/g, (match, src) => src.startsWith('blob:') ? `src="${profilePictureDataURL}"` : match)}
                                    </div>
                                </body>
                            </html>
                        `;
                        const blob = new Blob([resumeHtml], { type: 'text/html' });
                        const link = document.createElement('a');
                        link.href = URL.createObjectURL(blob);
                        link.download = 'resume.html';
                        link.click();
                        URL.revokeObjectURL(link.href);
                    };
                    reader.readAsDataURL(profilePictureFile);
                } else {
                    const resumeHtml = `
                        <html>
                            <head>
                                <title>My Resume</title>
                                <style>
                                    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
                                    .resume-container { max-width: 800px; margin: 20px auto; padding: 20px; border: 1px solid #ddd; border-radius: 5px; }
                                    h2 { color: #2c3e50; border-bottom: 2px solid #e84e3d; padding-bottom: 5px; margin-bottom: 10px; }
                                    h3 { color: #2c3e50; margin-top: 20px; border-bottom: 1px solid #ddd; padding-bottom: 5px; }
                                    .profile-picture { width: 150px; height: 150px; border-radius: 50%; display: block; margin: 0 auto; }
                                    .personal-info p, .section p { margin: 5px 0; }
                                    .section { margin-top: 20px; padding-top: 10px; }
                                    .section:before { content: ""; display: block; width: 100%; height: 1px; background: #ddd; margin-bottom: 10px; }
                                    .resume-title { text-align: center; }
                                </style>
                            </head>
                            <body>
                                <div class="resume-container">
                                    <h2 class="resume-title">Resume</h2>
                                    ${resumeOutput.innerHTML}
                                </div>
                            </body>
                        </html>
                    `;
                    const blob = new Blob([resumeHtml], { type: 'text/html' });
                    const link = document.createElement('a');
                    link.href = URL.createObjectURL(blob);
                    link.download = 'resume.html';
                    link.click();
                    URL.revokeObjectURL(link.href);
                }
            } else {
                console.error('Resume output not found for download');
            }
        });
    }
    

    function makeEditable() {
        const editableElements = document.querySelectorAll('[contenteditable="true"]');
        editableElements.forEach(element => {
            element.addEventListener('input', () => {
                const usernameElement = document.getElementById('username') as HTMLInputElement;
                if (usernameElement) {
                    const username = usernameElement.value;
                    const resumeData = JSON.parse(localStorage.getItem(`resume_${username}`) || '{}');
                    if (resumeData) {
                        const resumeOutputElement = document.getElementById('resumeOutput');
                        if (resumeOutputElement) {
                            resumeData.resumeHtml = resumeOutputElement.innerHTML;
                            localStorage.setItem(`resume_${username}`, JSON.stringify(resumeData));
                        }
                    }
                }
            });
        });
    }
});
