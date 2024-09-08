var _a;
(_a = document.getElementById('resumeForm')) === null || _a === void 0 ? void 0 : _a.addEventListener('submit', function (event) {
    var _a;
    event.preventDefault();
    // Select the form elements
    var profilePictureInput = document.getElementById('profilePicture');
    var nameElement = document.getElementById('name');
    var emailElement = document.getElementById('email');
    var phoneElement = document.getElementById('phone');
    var addressElement = document.getElementById('address');
    var educationElement = document.getElementById('education');
    var experienceElement = document.getElementById('experience');
    var skillsElement = document.getElementById('skills');
    var hobbiesElement = document.getElementById('hobbies');
    var userNameElement = document.getElementById('username');
    // Check if elements are present
    if (profilePictureInput && nameElement && emailElement && phoneElement && addressElement && educationElement && experienceElement && skillsElement && hobbiesElement && userNameElement) {
        var name_1 = nameElement.value;
        var email_1 = emailElement.value;
        var phone_1 = phoneElement.value;
        var address_1 = addressElement.value;
        var education_1 = educationElement.value;
        var experience_1 = experienceElement.value;
        var skills_1 = skillsElement.value;
        var hobbies_1 = hobbiesElement.value;
        // Create the download filename
        var username_1 = userNameElement.value;
        var uniquePath_1 = "resumes/".concat(username_1.replace(/[^a-zA-Z0-9\s]/g, '').replace(/\s+/g, '__'), "_cv.html");
        var profilePictureFile = (_a = profilePictureInput.files) === null || _a === void 0 ? void 0 : _a[0];
        if (profilePictureFile) {
            var reader = new FileReader();
            reader.onload = function (s) {
                var _a;
                var profilePictureBase64 = (_a = s.target) === null || _a === void 0 ? void 0 : _a.result;
                // Create Resume Output with Base64 image
                var resumeOutput = "\n                    <h2>Resume</h2>\n                    ".concat(profilePictureBase64 ? "<img src=\"".concat(profilePictureBase64, "\" alt=\"Profile Picture\" class=\"profilePicture\" style=\"max-width: 150px;\"/>") : "", "\n                    <p><strong>Name:</strong> ").concat(name_1, " </p>\n                    <p><strong>Email:</strong> ").concat(email_1, " </p>\n                    <p><strong>Phone Number:</strong> ").concat(phone_1, " </p>\n                    <p><strong>Address:</strong> ").concat(address_1, " </p>\n                    <h3>Education</h3>\n                    <p>").concat(education_1, "</p>\n                    <h3>Experience</h3>\n                    <p>").concat(experience_1, "</p>\n                    <h3>Skills</h3>\n                    <p>").concat(skills_1, "</p>\n                    <h3>Hobbies</h3>\n                    <p>").concat(hobbies_1, "</p>\n                ");
                // Create a download link for the resume
                var downloadLink = document.createElement('a');
                downloadLink.href = 'data:text/html;charset=utf-8,' + encodeURIComponent(resumeOutput);
                downloadLink.download = uniquePath_1;
                downloadLink.textContent = 'Download Your Resume';
                downloadLink.style.backgroundColor = '#008CBE';
                downloadLink.style.color = 'white';
                downloadLink.style.padding = '10px 15px';
                downloadLink.style.border = 'none';
                downloadLink.style.borderRadius = '5px';
                downloadLink.style.cursor = 'pointer';
                downloadLink.style.marginRight = '10px';
                // Generate a unique shareable link
                var sanitizedUsername = username_1.replace(/[^a-zA-Z0-9\s]/g, '').replace(/\s+/g, '__');
                var uniqueURL = "https://yourdomain.vercel.app/resume/".concat(sanitizedUsername);
                // Create a share button
                var shareButton = document.createElement('button');
                shareButton.textContent = 'Share Resume';
                shareButton.style.backgroundColor = '#4CAF50';
                shareButton.style.color = 'white';
                shareButton.style.padding = '10px 20px';
                shareButton.style.border = 'none';
                shareButton.style.borderRadius = '5px';
                shareButton.style.cursor = 'pointer';
                shareButton.addEventListener('click', function () {
                    var shareInput = document.createElement('input');
                    shareInput.value = uniqueURL;
                    document.body.appendChild(shareInput);
                    shareInput.select();
                    document.execCommand('copy');
                    document.body.removeChild(shareInput);
                    alert('Your resume link has been copied to the clipboard!');
                });
                // Display the resume output
                var resumeOutputElement = document.getElementById('resumeOutput');
                if (resumeOutputElement) {
                    resumeOutputElement.innerHTML = resumeOutput;
                    resumeOutputElement.appendChild(downloadLink);
                    resumeOutputElement.appendChild(shareButton);
                    resumeOutputElement.style.display = 'block';
                }
            };
            reader.readAsDataURL(profilePictureFile);
        }
        else {
            console.error('Profile picture is missing!');
        }
    }
    else {
        console.error('One or more form elements are missing in your resume!');
    }
});
