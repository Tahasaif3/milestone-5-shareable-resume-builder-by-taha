document.getElementById('resumeForm')?.addEventListener('submit', function (event) {
    event.preventDefault();

    // Select the form elements
    const profilePictureInput = document.getElementById('profilePicture') as HTMLInputElement;
    const nameElement = document.getElementById('name') as HTMLInputElement;
    const emailElement = document.getElementById('email') as HTMLInputElement;
    const phoneElement = document.getElementById('phone') as HTMLInputElement;
    const addressElement = document.getElementById('address') as HTMLInputElement;
    const educationElement = document.getElementById('education') as HTMLTextAreaElement;
    const experienceElement = document.getElementById('experience') as HTMLTextAreaElement;
    const skillsElement = document.getElementById('skills') as HTMLTextAreaElement;
    const hobbiesElement = document.getElementById('hobbies') as HTMLTextAreaElement;
    const userNameElement = document.getElementById('username') as HTMLInputElement;

    // Check if elements are present
    if (profilePictureInput && nameElement && emailElement && phoneElement && addressElement && educationElement && experienceElement && skillsElement && hobbiesElement && userNameElement) {
        const name = nameElement.value;
        const email = emailElement.value;
        const phone = phoneElement.value;
        const address = addressElement.value;
        const education = educationElement.value;
        const experience = experienceElement.value;
        const skills = skillsElement.value;
        const hobbies = hobbiesElement.value;

        // Create the download filename
        const username = userNameElement.value;
        const uniquePath = `resumes/${username.replace(/[^a-zA-Z0-9\s]/g, '').replace(/\s+/g, '__')}_cv.html`;

        const profilePictureFile = profilePictureInput.files?.[0];

        if (profilePictureFile) {
            const reader = new FileReader();

            reader.onload = function (s) {
                const profilePictureBase64 = s.target?.result as string;

                // Create Resume Output with Base64 image
                const resumeOutput = `
                    <h2>Resume</h2>
                    ${profilePictureBase64 ? `<img src="${profilePictureBase64}" alt="Profile Picture" class="profilePicture" style="max-width: 150px;"/>` : ""}
                    <p><strong>Name:</strong> ${name} </p>
                    <p><strong>Email:</strong> ${email} </p>
                    <p><strong>Phone Number:</strong> ${phone} </p>
                    <p><strong>Address:</strong> ${address} </p>
                    <h3>Education</h3>
                    <p>${education}</p>
                    <h3>Experience</h3>
                    <p>${experience}</p>
                    <h3>Skills</h3>
                    <p>${skills}</p>
                    <h3>Hobbies</h3>
                    <p>${hobbies}</p>
                `;

                // Create a download link for the resume
                const downloadLink = document.createElement('a');
                downloadLink.href = 'data:text/html;charset=utf-8,' + encodeURIComponent(resumeOutput);
                downloadLink.download = uniquePath;
                downloadLink.textContent = 'Download Your Resume';
                downloadLink.style.backgroundColor = '#008CBE';
                downloadLink.style.color = 'white';
                downloadLink.style.padding = '10px 15px';
                downloadLink.style.border = 'none';
                downloadLink.style.borderRadius = '5px';
                downloadLink.style.cursor = 'pointer';
                downloadLink.style.marginRight = '10px';

                // Generate a unique shareable link
                const sanitizedUsername = username.replace(/[^a-zA-Z0-9\s]/g, '').replace(/\s+/g, '__');
                const uniqueURL = `https://yourdomain.vercel.app/resume/${sanitizedUsername}`;

                // Create a share button
                const shareButton = document.createElement('button');
                shareButton.textContent = 'Share Resume';
                shareButton.style.backgroundColor = '#4CAF50'; 
                shareButton.style.color = 'white';
                shareButton.style.padding = '10px 20px'; 
                shareButton.style.border = 'none';
                shareButton.style.borderRadius = '5px';
                shareButton.style.cursor = 'pointer';

                shareButton.addEventListener('click', function () {
                    const shareInput = document.createElement('input');
                    shareInput.value = uniqueURL;
                    document.body.appendChild(shareInput);
                    shareInput.select();
                    document.execCommand('copy');
                    document.body.removeChild(shareInput);
                    alert('Your resume link has been copied to the clipboard!');
                });

                // Display the resume output
                const resumeOutputElement = document.getElementById('resumeOutput');
                if (resumeOutputElement) {
                    resumeOutputElement.innerHTML = resumeOutput;
                    resumeOutputElement.appendChild(downloadLink);
                    resumeOutputElement.appendChild(shareButton);
                    resumeOutputElement.style.display = 'block';
                }
            };

            reader.readAsDataURL(profilePictureFile);
        } else {
            console.error('Profile picture is missing!');
        }
    } else {
        console.error('One or more form elements are missing in your resume!');
    }
});
