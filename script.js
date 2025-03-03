document.addEventListener("DOMContentLoaded", function () {
    // DOM Elements
    var form = document.getElementById("resumeForm");
    var tabBtns = document.querySelectorAll(".tab-btn");
    var tabContents = document.querySelectorAll(".tab-content");
    var formSteps = document.querySelectorAll(".form-step");
    var progressSteps = document.querySelectorAll(".progress-step");
    var nextBtns = document.querySelectorAll(".next-btn");
    var prevBtns = document.querySelectorAll(".prev-btn");
    var addEducationBtn = document.getElementById("addEducation");
    var addExperienceBtn = document.getElementById("addExperience");
    var addSkillBtn = document.getElementById("addSkill");
    var addHobbyBtn = document.getElementById("addHobby");
    var profilePictureInput = document.getElementById("profilePicture");
    var profilePreview = document.getElementById("profilePreview");
    var fileNameSpan = document.getElementById("file-name");
    var shareDownloadContainer = document.getElementById("shareDownloadContainer");
    var shareableUrlInput = document.getElementById("shareableUrl");
    var copyShareableUrlBtn = document.getElementById("copyShareableUrl");
    var downloadResumeBtn = document.getElementById("downloadResume");
    var printResumeBtn = document.getElementById("printResume");
    var toast = document.getElementById("toast");
    // Tab Navigation
    tabBtns.forEach(function (btn) {
        btn.addEventListener("click", function () {
            var tabId = btn.dataset.tab;
            if (!tabId)
                return;
            // Remove active class from all tabs
            tabBtns.forEach(function (btn) { return btn.classList.remove("active"); });
            tabContents.forEach(function (content) { return content.classList.remove("active"); });
            // Add active class to current tab
            btn.classList.add("active");
            var tabContent = document.getElementById(tabId);
            if (tabContent) {
                tabContent.classList.add("active");
            }
        });
    });
    // Form Step Navigation
    function goToStep(stepNumber) {
        formSteps.forEach(function (step) { return step.classList.remove("active"); });
        progressSteps.forEach(function (step) { return step.classList.remove("active", "completed"); });
        // Set current step as active
        var currentStep = formSteps[stepNumber - 1];
        if (currentStep) {
            currentStep.classList.add("active");
        }
        // Update progress steps
        for (var i = 0; i < stepNumber; i++) {
            var progressStep = progressSteps[i];
            if (progressStep) {
                if (i === stepNumber - 1) {
                    progressStep.classList.add("active");
                }
                else {
                    progressStep.classList.add("completed");
                }
            }
        }
        // Scroll to top of form
        if (form) {
            form.scrollIntoView({ behavior: "smooth" });
        }
    }
    nextBtns.forEach(function (btn) {
        btn.addEventListener("click", function () {
            var _a;
            var formStep = btn.closest(".form-step");
            if (!((_a = formStep === null || formStep === void 0 ? void 0 : formStep.dataset) === null || _a === void 0 ? void 0 : _a.step))
                return;
            // @ts-ignore
            var currentStep = Number.parseInt(formStep.dataset.step, 10);
            var nextStep = currentStep + 1;
            if (validateStep(currentStep)) {
                goToStep(nextStep);
            }
        });
    });
    prevBtns.forEach(function (btn) {
        btn.addEventListener("click", function () {
            var _a;
            var formStep = btn.closest(".form-step");
            if (!((_a = formStep === null || formStep === void 0 ? void 0 : formStep.dataset) === null || _a === void 0 ? void 0 : _a.step))
                return;
            // @ts-ignore
            var currentStep = Number.parseInt(formStep.dataset.step, 10);
            var prevStep = currentStep - 1;
            goToStep(prevStep);
        });
    });
    // Validate form step
    function validateStep(stepNumber) {
        var currentStep = document.querySelector(".form-step[data-step=\"".concat(stepNumber, "\"]"));
        if (!currentStep)
            return false;
        var inputs = currentStep.querySelectorAll("input[required], textarea[required]");
        var isValid = true;
        inputs.forEach(function (input) {
            if (input.value.trim() === "") {
                isValid = false;
                input.classList.add("error");
                showToast("Please fill in all required fields", "error");
            }
            else {
                input.classList.remove("error");
            }
        });
        return isValid;
    }
    // Add/Remove Entry Functions
    function createRemovableEntry(containerId, entryHTML) {
        var container = document.getElementById(containerId);
        if (!container)
            return;
        var newEntry = document.createElement("div");
        newEntry.className = "".concat(containerId.slice(0, -7), "-entry card");
        newEntry.innerHTML = entryHTML + '<button type="button" class="remove-entry"><i class="fas fa-times"></i></button>';
        container.appendChild(newEntry);
        // Add animation
        newEntry.style.animation = "fadeInUp 0.5s ease forwards";
        // Add event listener to remove button
        var removeButton = newEntry.querySelector(".remove-entry");
        if (removeButton) {
            removeButton.addEventListener("click", function () {
                newEntry.style.animation = "fadeOut 0.3s ease forwards";
                setTimeout(function () {
                    container.removeChild(newEntry);
                }, 300);
            });
        }
    }
    // Add Education Entry
    if (addEducationBtn) {
        addEducationBtn.addEventListener("click", function () {
            createRemovableEntry("educationEntries", "\n                  <div class=\"form-row\">\n                      <div class=\"form-group\">\n                          <label>Qualification <span class=\"required\">*</span></label>\n                          <div class=\"input-group\">\n                              <i class=\"fas fa-graduation-cap input-icon\"></i>\n                              <input type=\"text\" name=\"qualification[]\" placeholder=\"e.g. Bachelor of Science\" required>\n                          </div>\n                      </div>\n                      \n                      <div class=\"form-group\">\n                          <label>Year of Passing <span class=\"required\">*</span></label>\n                          <div class=\"input-group\">\n                              <i class=\"fas fa-calendar input-icon\"></i>\n                              <input type=\"number\" name=\"year[]\" placeholder=\"e.g. 2022\" required>\n                          </div>\n                      </div>\n                  </div>\n                  \n                  <div class=\"form-row\">\n                      <div class=\"form-group\">\n                          <label>Grade/Percentage <span class=\"required\">*</span></label>\n                          <div class=\"input-group\">\n                              <i class=\"fas fa-star input-icon\"></i>\n                              <input type=\"text\" name=\"grade[]\" placeholder=\"e.g. 3.8 GPA or 85%\" required>\n                          </div>\n                      </div>\n                      \n                      <div class=\"form-group\">\n                          <label>School/Institution <span class=\"required\">*</span></label>\n                          <div class=\"input-group\">\n                              <i class=\"fas fa-university input-icon\"></i>\n                              <input type=\"text\" name=\"school[]\" placeholder=\"e.g. Harvard University\" required>\n                          </div>\n                      </div>\n                  </div>\n              ");
        });
    }
    // Add Experience Entry
    if (addExperienceBtn) {
        addExperienceBtn.addEventListener("click", function () {
            createRemovableEntry("experienceEntries", "\n                  <div class=\"form-row\">\n                      <div class=\"form-group\">\n                          <label>Company Name <span class=\"required\">*</span></label>\n                          <div class=\"input-group\">\n                              <i class=\"fas fa-building input-icon\"></i>\n                              <input type=\"text\" name=\"company[]\" placeholder=\"e.g. Google\" required>\n                          </div>\n                      </div>\n                      \n                      <div class=\"form-group\">\n                          <label>Your Role <span class=\"required\">*</span></label>\n                          <div class=\"input-group\">\n                              <i class=\"fas fa-briefcase input-icon\"></i>\n                              <input type=\"text\" name=\"role[]\" placeholder=\"e.g. Software Engineer\" required>\n                          </div>\n                      </div>\n                  </div>\n                  \n                  <div class=\"form-row\">\n                      <div class=\"form-group\">\n                          <label>Start Date <span class=\"required\">*</span></label>\n                          <div class=\"input-group\">\n                              <i class=\"fas fa-calendar-alt input-icon\"></i>\n                              <input type=\"text\" name=\"startDate[]\" placeholder=\"MM/YYYY\" required>\n                          </div>\n                      </div>\n                      \n                      <div class=\"form-group\">\n                          <label>End Date <span class=\"required\">*</span></label>\n                          <div class=\"input-group\">\n                              <i class=\"fas fa-calendar-check input-icon\"></i>\n                              <input type=\"text\" name=\"endDate[]\" placeholder=\"MM/YYYY or Present\" required>\n                          </div>\n                      </div>\n                  </div>\n                  \n                  <div class=\"form-group\">\n                      <label>Key Responsibilities <span class=\"required\">*</span></label>\n                      <div class=\"input-group textarea-group\">\n                          <i class=\"fas fa-tasks input-icon\"></i>\n                          <textarea name=\"responsibilities[]\" placeholder=\"Describe your key responsibilities and achievements\" rows=\"3\" required></textarea>\n                      </div>\n                  </div>\n              ");
        });
    }
    // Add Skill Entry
    if (addSkillBtn) {
        addSkillBtn.addEventListener("click", function () {
            createRemovableEntry("skillsEntries", "\n                  <div class=\"input-group\">\n                      <i class=\"fas fa-code input-icon\"></i>\n                      <input type=\"text\" name=\"skills[]\" placeholder=\"Enter a skill (e.g. JavaScript)\" required>\n                  </div>\n              ");
        });
    }
    // Add Hobby Entry
    if (addHobbyBtn) {
        addHobbyBtn.addEventListener("click", function () {
            createRemovableEntry("hobbiesEntries", "\n                  <div class=\"input-group\">\n                      <i class=\"fas fa-heart input-icon\"></i>\n                      <input type=\"text\" name=\"hobbies[]\" placeholder=\"Enter a hobby (e.g. Photography)\" required>\n                  </div>\n              ");
        });
    }
    // Profile Picture Preview
    if (profilePictureInput && profilePreview && fileNameSpan) {
        profilePictureInput.addEventListener("change", function (event) {
            var files = profilePictureInput === null || profilePictureInput === void 0 ? void 0 : profilePictureInput.files;
            if (files && files.length > 0) {
                var file_1 = files[0];
                var reader = new FileReader();
                reader.onload = function (e) {
                    if (profilePreview && e.target && typeof e.target.result === "string") {
                        profilePreview.src = e.target.result;
                        fileNameSpan.textContent = file_1.name;
                    }
                };
                reader.readAsDataURL(file_1);
            }
        });
    }
    // Form Submission
    if (form) {
        form.addEventListener("submit", function (event) {
            event.preventDefault();
            // Get form data
            var usernameElement = document.getElementById("username");
            var nameElement = document.getElementById("name");
            var emailElement = document.getElementById("email");
            var phoneElement = document.getElementById("phone");
            var addressElement = document.getElementById("address");
            if (!usernameElement || !nameElement || !emailElement || !phoneElement || !addressElement) {
                showToast("Required form elements are missing", "error");
                return;
            }
            var username = usernameElement.value;
            var name = nameElement.value;
            var email = emailElement.value;
            var phone = phoneElement.value;
            var address = addressElement.value;
            // Get education entries
            var educationEntries = document.querySelectorAll(".education-entry");
            var educationHTML = "";
            educationEntries.forEach(function (entry) {
                var inputs = entry.querySelectorAll("input");
                if (inputs.length >= 4) {
                    var qualificationInput = inputs[0];
                    var yearInput = inputs[1];
                    var gradeInput = inputs[2];
                    var schoolInput = inputs[3];
                    educationHTML += "\n                          <div class=\"education-item\">\n                              <p><strong contenteditable=\"true\">".concat(qualificationInput.value, "</strong> - <span contenteditable=\"true\">").concat(yearInput.value, "</span></p>\n                              <p>Grade: <span contenteditable=\"true\">").concat(gradeInput.value, "</span></p>\n                              <p>Institution: <span contenteditable=\"true\">").concat(schoolInput.value, "</span></p>\n                          </div>\n                      ");
                }
            });
            // Get experience entries
            var experienceEntries = document.querySelectorAll(".experience-entry");
            var experienceHTML = "";
            experienceEntries.forEach(function (entry) {
                var inputs = entry.querySelectorAll("input");
                var textarea = entry.querySelector("textarea");
                if (inputs.length >= 4 && textarea) {
                    var companyInput = inputs[0];
                    var roleInput = inputs[1];
                    var startDateInput = inputs[2];
                    var endDateInput = inputs[3];
                    experienceHTML += "\n                          <div class=\"experience-item\">\n                              <p><strong contenteditable=\"true\">".concat(companyInput.value, "</strong> - <span contenteditable=\"true\">").concat(roleInput.value, "</span></p>\n                              <p><span contenteditable=\"true\">").concat(startDateInput.value, "</span> - <span contenteditable=\"true\">").concat(endDateInput.value, "</span></p>\n                              <p contenteditable=\"true\">").concat(textarea.value, "</p>\n                          </div>\n                      ");
                }
            });
            // @ts-ignore
            var skillInputs = document.querySelectorAll("#skillsEntries input");
            // @ts-ignore        
            var skills = Array.from(skillInputs, function (input) { return "<span class=\"skill-tag\" contenteditable=\"true\">".concat(input.value, "</span>"); }).join(" ");
            // @ts-ignore
            var hobbyInputs = document.querySelectorAll("#hobbiesEntries input");
            // @ts-ignore      
            var hobbies = Array.from(hobbyInputs, function (input) { return "<span class=\"hobby-tag\" contenteditable=\"true\">".concat(input.value, "</span>"); }).join(" ");
            // Profile picture
            var profilePictureURL = "";
            if (profilePictureInput && profilePictureInput.files && profilePictureInput.files.length > 0) {
                var profilePictureFile = profilePictureInput.files[0];
                profilePictureURL = URL.createObjectURL(profilePictureFile);
            }
            // Creating Resume Output
            var resumeOutput = "\n                  <div class=\"resume-container\">\n                      <h2 class=\"resume-title\">Professional Resume</h2>\n                      ".concat(profilePictureURL ? "<img src=\"".concat(profilePictureURL, "\" alt=\"Profile Picture\" class=\"profile-picture\">") : "", "\n                      \n                      <div class=\"personal-info\">\n                          <p><i class=\"fas fa-user info-icon\"></i> <strong>Name:</strong> <span contenteditable=\"true\">").concat(name, "</span></p>\n                          <p><i class=\"fas fa-envelope info-icon\"></i> <strong>Email:</strong> <span contenteditable=\"true\">").concat(email, "</span></p>\n                          <p><i class=\"fas fa-phone info-icon\"></i> <strong>Phone:</strong> <span contenteditable=\"true\">").concat(phone, "</span></p>\n                          <p><i class=\"fas fa-map-marker-alt info-icon\"></i> <strong>Address:</strong> <span contenteditable=\"true\">").concat(address, "</span></p>\n                      </div>\n                      \n                      <div class=\"section\">\n                          <h3>Education</h3>\n                          ").concat(educationHTML || "<p>No education entries added</p>", "\n                      </div>\n                      \n                      <div class=\"section\">\n                          <h3>Experience</h3>\n                          ").concat(experienceHTML || "<p>No experience entries added</p>", "\n                      </div>\n                      \n                      <div class=\"section\">\n                          <h3>Skills</h3>\n                          <div class=\"tags-display\">\n                              ").concat(skills || "<p>No skills added</p>", "\n                          </div>\n                      </div>\n                      \n                      <div class=\"section\">\n                          <h3>Hobbies</h3>\n                          <div class=\"tags-display\">\n                              ").concat(hobbies || "<p>No hobbies added</p>", "\n                          </div>\n                      </div>\n                  </div>\n              ");
            var resumeOutputElement = document.getElementById("resumeOutput");
            if (resumeOutputElement && shareableUrlInput && shareDownloadContainer) {
                resumeOutputElement.innerHTML = resumeOutput;
                makeEditable();
                // Generate shareable URL
                var shareableUrl = "".concat(window.location.origin, "/resume/").concat(username);
                shareableUrlInput.value = shareableUrl;
                shareDownloadContainer.style.display = "flex";
                // Save resume data to localStorage
                localStorage.setItem("resume_".concat(username), JSON.stringify({
                    name: name,
                    email: email,
                    phone: phone,
                    address: address,
                    educationHTML: educationHTML,
                    experienceHTML: experienceHTML,
                    skills: skills,
                    hobbies: hobbies,
                    profilePictureURL: profilePictureURL,
                }));
                // Show success toast
                showToast("Your resume has been generated successfully!", "success");
                // Switch to preview tab
                var previewTabBtn = document.querySelector('.tab-btn[data-tab="preview-section"]');
                if (previewTabBtn) {
                    previewTabBtn.click();
                }
            }
        });
    }
    // Copy Shareable URL
    if (copyShareableUrlBtn && shareableUrlInput) {
        copyShareableUrlBtn.addEventListener("click", function () {
            shareableUrlInput.select();
            document.execCommand("copy");
            showToast("Shareable URL copied to clipboard!", "success");
        });
    }
    // Download Resume
    if (downloadResumeBtn && profilePictureInput) {
        downloadResumeBtn.addEventListener("click", function () {
            var resumeOutput = document.getElementById("resumeOutput");
            if (!resumeOutput)
                return;
            if (profilePictureInput.files && profilePictureInput.files.length > 0) {
                var profilePictureFile = profilePictureInput.files[0];
                var reader_1 = new FileReader();
                reader_1.onloadend = function () {
                    if (reader_1.result && typeof reader_1.result === "string") {
                        generateResumeHTML(resumeOutput, reader_1.result);
                    }
                };
                reader_1.readAsDataURL(profilePictureFile);
            }
            else {
                generateResumeHTML(resumeOutput);
            }
        });
    }
    // Print Resume
    if (printResumeBtn) {
        printResumeBtn.addEventListener("click", function () {
            var resumeOutput = document.getElementById("resumeOutput");
            if (!resumeOutput)
                return;
            var printWindow = window.open("", "_blank");
            if (printWindow) {
                printWindow.document.write("\n                      <html>\n                          <head>\n                              <title>Print Resume</title>\n                              <style>\n                                  body { font-family: 'Arial', sans-serif; line-height: 1.6; color: #333; }\n                                  .resume-container { max-width: 800px; margin: 20px auto; padding: 20px; }\n                                  h2 { color: #2563eb; text-align: center; margin-bottom: 20px; }\n                                  h3 { color: #2563eb; border-bottom: 1px solid #e2e8f0; padding-bottom: 5px; margin-top: 20px; }\n                                  .profile-picture { width: 150px; height: 150px; border-radius: 50%; display: block; margin: 0 auto 20px; }\n                                  .section { margin-bottom: 20px; }\n                                  .tags-display { display: flex; flex-wrap: wrap; gap: 5px; }\n                                  .skill-tag, .hobby-tag { background-color: #f1f5f9; padding: 5px 10px; border-radius: 20px; }\n                                  @media print {\n                                      body { -webkit-print-color-adjust: exact; }\n                                  }\n                              </style>\n                          </head>\n                          <body>\n                              ".concat(resumeOutput.innerHTML, "\n                          </body>\n                      </html>\n                  "));
                printWindow.document.close();
                printWindow.focus();
                setTimeout(function () {
                    printWindow.print();
                    printWindow.close();
                }, 500);
            }
        });
    }
    // Generate Resume HTML for Download
    function generateResumeHTML(resumeOutput, profilePictureDataURL) {
        if (profilePictureDataURL === void 0) { profilePictureDataURL = ""; }
        var resumeHtml = "\n              <!DOCTYPE html>\n              <html lang=\"en\">\n              <head>\n                  <meta charset=\"UTF-8\">\n                  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n                  <title>My Professional Resume</title>\n                  <style>\n                      body { \n                          font-family: 'Arial', sans-serif; \n                          line-height: 1.6; \n                          color: #334155; \n                          margin: 0; \n                          padding: 0;\n                          background-color: #f8fafc;\n                      }\n                      .resume-container { \n                          max-width: 800px; \n                          margin: 20px auto; \n                          padding: 30px; \n                          background-color: white;\n                          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);\n                          border-radius: 8px;\n                      }\n                      h2 { \n                          color: #2563eb; \n                          text-align: center; \n                          margin-bottom: 20px;\n                          font-size: 28px;\n                      }\n                      h3 { \n                          color: #2563eb; \n                          border-bottom: 2px solid #e2e8f0; \n                          padding-bottom: 8px; \n                          margin-top: 25px;\n                          font-size: 20px;\n                      }\n                      .profile-picture { \n                          width: 150px; \n                          height: 150px; \n                          border-radius: 50%; \n                          display: block; \n                          margin: 0 auto 20px;\n                          border: 3px solid #2563eb;\n                      }\n                      .personal-info {\n                          display: grid;\n                          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));\n                          gap: 10px;\n                          margin-bottom: 20px;\n                      }\n                      .section { margin-bottom: 25px; }\n                      .education-item, .experience-item {\n                          margin-bottom: 15px;\n                          padding-left: 15px;\n                          border-left: 2px solid #e2e8f0;\n                      }\n                      .tags-display { \n                          display: flex; \n                          flex-wrap: wrap; \n                          gap: 8px; \n                      }\n                      .skill-tag, .hobby-tag { \n                          background-color: #f1f5f9; \n                          padding: 5px 12px; \n                          border-radius: 20px;\n                          font-size: 14px;\n                      }\n                      .info-icon {\n                          color: #2563eb;\n                          margin-right: 5px;\n                      }\n                  </style>\n              </head>\n              <body>\n                  <div class=\"resume-container\">\n                      ".concat(resumeOutput.innerHTML.replace(/src="([^"]*)"/g, function (match, src) {
            return src.startsWith("blob:") ? "src=\"".concat(profilePictureDataURL, "\"") : match;
        }), "\n                  </div>\n              </body>\n              </html>\n          ");
        var blob = new Blob([resumeHtml], { type: "text/html" });
        var link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "my_professional_resume.html";
        link.click();
        URL.revokeObjectURL(link.href);
        showToast("Resume downloaded successfully!", "success");
    }
    // Make Resume Editable
    function makeEditable() {
        var editableElements = document.querySelectorAll('[contenteditable="true"]');
        editableElements.forEach(function (element) {
            element.addEventListener("input", function () {
                var usernameElement = document.getElementById("username");
                if (!usernameElement)
                    return;
                var username = usernameElement.value;
                var storedData = localStorage.getItem("resume_".concat(username));
                if (!storedData)
                    return;
                var resumeData = JSON.parse(storedData);
                var resumeOutputElement = document.getElementById("resumeOutput");
                if (resumeOutputElement && resumeData) {
                    resumeData.resumeHtml = resumeOutputElement.innerHTML;
                    localStorage.setItem("resume_".concat(username), JSON.stringify(resumeData));
                }
            });
        });
    }
    // Show Toast Notification
    function showToast(message, type) {
        if (type === void 0) { type = "success"; }
        if (!toast)
            return;
        var toastIcon = toast.querySelector(".toast-icon");
        var toastMessage = toast.querySelector(".toast-message");
        if (!toastIcon || !toastMessage)
            return;
        // Set icon and color based on type
        if (type === "success") {
            toastIcon.className = "fas fa-check-circle toast-icon";
            toastIcon.style.color = "var(--success-color)";
        }
        else {
            toastIcon.className = "fas fa-exclamation-circle toast-icon";
            toastIcon.style.color = "var(--error-color)";
        }
        // Set message
        toastMessage.textContent = message;
        // Show toast
        toast.classList.add("show");
        // Hide toast after 3 seconds
        setTimeout(function () {
            toast.classList.remove("show");
        }, 3000);
    }
});
