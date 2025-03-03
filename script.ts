document.addEventListener("DOMContentLoaded", () => {
    // DOM Elements
    const form = document.getElementById("resumeForm") as HTMLFormElement | null
    const tabBtns = document.querySelectorAll<HTMLButtonElement>(".tab-btn")
    const tabContents = document.querySelectorAll<HTMLDivElement>(".tab-content")
    const formSteps = document.querySelectorAll<HTMLDivElement>(".form-step")
    const progressSteps = document.querySelectorAll<HTMLDivElement>(".progress-step")
    const nextBtns = document.querySelectorAll<HTMLButtonElement>(".next-btn")
    const prevBtns = document.querySelectorAll<HTMLButtonElement>(".prev-btn")
    const addEducationBtn = document.getElementById("addEducation") as HTMLButtonElement | null
    const addExperienceBtn = document.getElementById("addExperience") as HTMLButtonElement | null
    const addSkillBtn = document.getElementById("addSkill") as HTMLButtonElement | null
    const addHobbyBtn = document.getElementById("addHobby") as HTMLButtonElement | null
    const profilePictureInput = document.getElementById("profilePicture") as HTMLInputElement | null
    const profilePreview = document.getElementById("profilePreview") as HTMLImageElement | null
    const fileNameSpan = document.getElementById("file-name") as HTMLSpanElement | null
    const shareDownloadContainer = document.getElementById("shareDownloadContainer") as HTMLDivElement | null
    const shareableUrlInput = document.getElementById("shareableUrl") as HTMLInputElement | null
    const copyShareableUrlBtn = document.getElementById("copyShareableUrl") as HTMLButtonElement | null
    const downloadResumeBtn = document.getElementById("downloadResume") as HTMLButtonElement | null
    const printResumeBtn = document.getElementById("printResume") as HTMLButtonElement | null
    const toast = document.getElementById("toast") as HTMLDivElement | null
  
    // Tab Navigation
    tabBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        const tabId = btn.dataset.tab
        if (!tabId) return
  
        // Remove active class from all tabs
        tabBtns.forEach((btn) => btn.classList.remove("active"))
        tabContents.forEach((content) => content.classList.remove("active"))
  
        // Add active class to current tab
        btn.classList.add("active")
        const tabContent = document.getElementById(tabId)
        if (tabContent) {
          tabContent.classList.add("active")
        }
      })
    })
  
    // Form Step Navigation
    function goToStep(stepNumber: number): void {
      formSteps.forEach((step) => step.classList.remove("active"))
      progressSteps.forEach((step) => step.classList.remove("active", "completed"))
  
      // Set current step as active
      const currentStep = formSteps[stepNumber - 1]
      if (currentStep) {
        currentStep.classList.add("active")
      }
  
      // Update progress steps
      for (let i = 0; i < stepNumber; i++) {
        const progressStep = progressSteps[i]
        if (progressStep) {
          if (i === stepNumber - 1) {
            progressStep.classList.add("active")
          } else {
            progressStep.classList.add("completed")
          }
        }
      }
  
      // Scroll to top of form
      if (form) {
        form.scrollIntoView({ behavior: "smooth" })
      }
    }
  
    nextBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        const formStep = btn.closest(".form-step") as HTMLElement
        if (!formStep?.dataset?.step) return
   
        // @ts-ignore
        const currentStep = Number.parseInt(formStep.dataset.step, 10)
        const nextStep = currentStep + 1
  
        if (validateStep(currentStep)) {
          goToStep(nextStep)
        }
      })
    })
  
    prevBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        const formStep = btn.closest(".form-step") as HTMLElement
        if (!formStep?.dataset?.step) return
  
        // @ts-ignore
        const currentStep = Number.parseInt(formStep.dataset.step, 10)
        const prevStep = currentStep - 1
        goToStep(prevStep)
      })
    })
  
    // Validate form step
    function validateStep(stepNumber: number): boolean {
      const currentStep = document.querySelector(`.form-step[data-step="${stepNumber}"]`) as HTMLDivElement | null
      if (!currentStep) return false
  
      const inputs = currentStep.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>(
        "input[required], textarea[required]",
      )
      let isValid = true
  
      inputs.forEach((input) => {
        if (input.value.trim() === "") {
          isValid = false
          input.classList.add("error")
          showToast("Please fill in all required fields", "error")
        } else {
          input.classList.remove("error")
        }
      })
  
      return isValid
    }
  
    // Add/Remove Entry Functions
    function createRemovableEntry(containerId: string, entryHTML: string): void {
      const container = document.getElementById(containerId)
      if (!container) return
  
      const newEntry = document.createElement("div")
      newEntry.className = `${containerId.slice(0, -7)}-entry card`
      newEntry.innerHTML = entryHTML + '<button type="button" class="remove-entry"><i class="fas fa-times"></i></button>'
      container.appendChild(newEntry)
  
      // Add animation
      newEntry.style.animation = "fadeInUp 0.5s ease forwards"
  
      // Add event listener to remove button
      const removeButton = newEntry.querySelector(".remove-entry")
      if (removeButton) {
        removeButton.addEventListener("click", () => {
          newEntry.style.animation = "fadeOut 0.3s ease forwards"
          setTimeout(() => {
            container.removeChild(newEntry)
          }, 300)
        })
      }
    }
  
    // Add Education Entry
    if (addEducationBtn) {
      addEducationBtn.addEventListener("click", () => {
        createRemovableEntry(
          "educationEntries",
          `
                  <div class="form-row">
                      <div class="form-group">
                          <label>Qualification <span class="required">*</span></label>
                          <div class="input-group">
                              <i class="fas fa-graduation-cap input-icon"></i>
                              <input type="text" name="qualification[]" placeholder="e.g. Bachelor of Science" required>
                          </div>
                      </div>
                      
                      <div class="form-group">
                          <label>Year of Passing <span class="required">*</span></label>
                          <div class="input-group">
                              <i class="fas fa-calendar input-icon"></i>
                              <input type="number" name="year[]" placeholder="e.g. 2022" required>
                          </div>
                      </div>
                  </div>
                  
                  <div class="form-row">
                      <div class="form-group">
                          <label>Grade/Percentage <span class="required">*</span></label>
                          <div class="input-group">
                              <i class="fas fa-star input-icon"></i>
                              <input type="text" name="grade[]" placeholder="e.g. 3.8 GPA or 85%" required>
                          </div>
                      </div>
                      
                      <div class="form-group">
                          <label>School/Institution <span class="required">*</span></label>
                          <div class="input-group">
                              <i class="fas fa-university input-icon"></i>
                              <input type="text" name="school[]" placeholder="e.g. Harvard University" required>
                          </div>
                      </div>
                  </div>
              `,
        )
      })
    }
  
    // Add Experience Entry
    if (addExperienceBtn) {
      addExperienceBtn.addEventListener("click", () => {
        createRemovableEntry(
          "experienceEntries",
          `
                  <div class="form-row">
                      <div class="form-group">
                          <label>Company Name <span class="required">*</span></label>
                          <div class="input-group">
                              <i class="fas fa-building input-icon"></i>
                              <input type="text" name="company[]" placeholder="e.g. Google" required>
                          </div>
                      </div>
                      
                      <div class="form-group">
                          <label>Your Role <span class="required">*</span></label>
                          <div class="input-group">
                              <i class="fas fa-briefcase input-icon"></i>
                              <input type="text" name="role[]" placeholder="e.g. Software Engineer" required>
                          </div>
                      </div>
                  </div>
                  
                  <div class="form-row">
                      <div class="form-group">
                          <label>Start Date <span class="required">*</span></label>
                          <div class="input-group">
                              <i class="fas fa-calendar-alt input-icon"></i>
                              <input type="text" name="startDate[]" placeholder="MM/YYYY" required>
                          </div>
                      </div>
                      
                      <div class="form-group">
                          <label>End Date <span class="required">*</span></label>
                          <div class="input-group">
                              <i class="fas fa-calendar-check input-icon"></i>
                              <input type="text" name="endDate[]" placeholder="MM/YYYY or Present" required>
                          </div>
                      </div>
                  </div>
                  
                  <div class="form-group">
                      <label>Key Responsibilities <span class="required">*</span></label>
                      <div class="input-group textarea-group">
                          <i class="fas fa-tasks input-icon"></i>
                          <textarea name="responsibilities[]" placeholder="Describe your key responsibilities and achievements" rows="3" required></textarea>
                      </div>
                  </div>
              `,
        )
      })
    }
  
    // Add Skill Entry
    if (addSkillBtn) {
      addSkillBtn.addEventListener("click", () => {
        createRemovableEntry(
          "skillsEntries",
          `
                  <div class="input-group">
                      <i class="fas fa-code input-icon"></i>
                      <input type="text" name="skills[]" placeholder="Enter a skill (e.g. JavaScript)" required>
                  </div>
              `,
        )
      })
    }
  
    // Add Hobby Entry
    if (addHobbyBtn) {
      addHobbyBtn.addEventListener("click", () => {
        createRemovableEntry(
          "hobbiesEntries",
          `
                  <div class="input-group">
                      <i class="fas fa-heart input-icon"></i>
                      <input type="text" name="hobbies[]" placeholder="Enter a hobby (e.g. Photography)" required>
                  </div>
              `,
        )
      })
    }
  
    // Profile Picture Preview
    if (profilePictureInput && profilePreview && fileNameSpan) {
      profilePictureInput.addEventListener("change", (event) => {
        const files = profilePictureInput?.files
        if (files && files.length > 0) {
          const file = files[0]
          const reader = new FileReader()
          reader.onload = (e) => {
            if (profilePreview && e.target && typeof e.target.result === "string") {
              profilePreview.src = e.target.result
              fileNameSpan.textContent = file.name
            }
          }
          reader.readAsDataURL(file)
        }
      })
    }
  
    // Form Submission
    if (form) {
      form.addEventListener("submit", (event) => {
        event.preventDefault()
  
        // Get form data
        const usernameElement = document.getElementById("username") as HTMLInputElement | null
        const nameElement = document.getElementById("name") as HTMLInputElement | null
        const emailElement = document.getElementById("email") as HTMLInputElement | null
        const phoneElement = document.getElementById("phone") as HTMLInputElement | null
        const addressElement = document.getElementById("address") as HTMLInputElement | null
  
        if (!usernameElement || !nameElement || !emailElement || !phoneElement || !addressElement) {
          showToast("Required form elements are missing", "error")
          return
        }
  
        const username = usernameElement.value
        const name = nameElement.value
        const email = emailElement.value
        const phone = phoneElement.value
        const address = addressElement.value
  
        // Get education entries
        const educationEntries = document.querySelectorAll(".education-entry")
        let educationHTML = ""
  
        educationEntries.forEach((entry: Element) => {
          const inputs = entry.querySelectorAll("input")
          if (inputs.length >= 4) {
            const qualificationInput = inputs[0] as HTMLInputElement
            const yearInput = inputs[1] as HTMLInputElement
            const gradeInput = inputs[2] as HTMLInputElement
            const schoolInput = inputs[3] as HTMLInputElement
  
            educationHTML += `
                          <div class="education-item">
                              <p><strong contenteditable="true">${qualificationInput.value}</strong> - <span contenteditable="true">${yearInput.value}</span></p>
                              <p>Grade: <span contenteditable="true">${gradeInput.value}</span></p>
                              <p>Institution: <span contenteditable="true">${schoolInput.value}</span></p>
                          </div>
                      `
          }
        })
  
        // Get experience entries
        const experienceEntries = document.querySelectorAll(".experience-entry")
        let experienceHTML = ""
  
        experienceEntries.forEach((entry: Element) => {
          const inputs = entry.querySelectorAll("input")
          const textarea = entry.querySelector("textarea")
  
          if (inputs.length >= 4 && textarea) {
            const companyInput = inputs[0] as HTMLInputElement
            const roleInput = inputs[1] as HTMLInputElement
            const startDateInput = inputs[2] as HTMLInputElement
            const endDateInput = inputs[3] as HTMLInputElement
  
            experienceHTML += `
                          <div class="experience-item">
                              <p><strong contenteditable="true">${companyInput.value}</strong> - <span contenteditable="true">${roleInput.value}</span></p>
                              <p><span contenteditable="true">${startDateInput.value}</span> - <span contenteditable="true">${endDateInput.value}</span></p>
                              <p contenteditable="true">${textarea.value}</p>
                          </div>
                      `
          }
        })
  
// @ts-ignore
const skillInputs = document.querySelectorAll<HTMLInputElement>("#skillsEntries input")
// @ts-ignore        
const skills = Array.from(
          skillInputs,
          (input: HTMLInputElement) => `<span class="skill-tag" contenteditable="true">${input.value}</span>`,
        ).join(" ")
  
// @ts-ignore
const hobbyInputs = document.querySelectorAll<HTMLInputElement>("#hobbiesEntries input")
// @ts-ignore      
const hobbies = Array.from(
          hobbyInputs,
          (input: HTMLInputElement) => `<span class="hobby-tag" contenteditable="true">${input.value}</span>`,
        ).join(" ")
  
        // Profile picture
        let profilePictureURL = ""
        if (profilePictureInput && profilePictureInput.files && profilePictureInput.files.length > 0) {
          const profilePictureFile = profilePictureInput.files[0]
          profilePictureURL = URL.createObjectURL(profilePictureFile)
        }
  
        // Creating Resume Output
        const resumeOutput = `
                  <div class="resume-container">
                      <h2 class="resume-title">Professional Resume</h2>
                      ${profilePictureURL ? `<img src="${profilePictureURL}" alt="Profile Picture" class="profile-picture">` : ""}
                      
                      <div class="personal-info">
                          <p><i class="fas fa-user info-icon"></i> <strong>Name:</strong> <span contenteditable="true">${name}</span></p>
                          <p><i class="fas fa-envelope info-icon"></i> <strong>Email:</strong> <span contenteditable="true">${email}</span></p>
                          <p><i class="fas fa-phone info-icon"></i> <strong>Phone:</strong> <span contenteditable="true">${phone}</span></p>
                          <p><i class="fas fa-map-marker-alt info-icon"></i> <strong>Address:</strong> <span contenteditable="true">${address}</span></p>
                      </div>
                      
                      <div class="section">
                          <h3>Education</h3>
                          ${educationHTML || "<p>No education entries added</p>"}
                      </div>
                      
                      <div class="section">
                          <h3>Experience</h3>
                          ${experienceHTML || "<p>No experience entries added</p>"}
                      </div>
                      
                      <div class="section">
                          <h3>Skills</h3>
                          <div class="tags-display">
                              ${skills || "<p>No skills added</p>"}
                          </div>
                      </div>
                      
                      <div class="section">
                          <h3>Hobbies</h3>
                          <div class="tags-display">
                              ${hobbies || "<p>No hobbies added</p>"}
                          </div>
                      </div>
                  </div>
              `
  
        const resumeOutputElement = document.getElementById("resumeOutput")
        if (resumeOutputElement && shareableUrlInput && shareDownloadContainer) {
          resumeOutputElement.innerHTML = resumeOutput
          makeEditable()
  
          // Generate shareable URL
          const shareableUrl = `${window.location.origin}/resume/${username}`
          shareableUrlInput.value = shareableUrl
          shareDownloadContainer.style.display = "flex"
  
          // Save resume data to localStorage
          localStorage.setItem(
            `resume_${username}`,
            JSON.stringify({
              name,
              email,
              phone,
              address,
              educationHTML,
              experienceHTML,
              skills,
              hobbies,
              profilePictureURL,
            }),
          )
  
          // Show success toast
          showToast("Your resume has been generated successfully!", "success")
  
          // Switch to preview tab
          const previewTabBtn = document.querySelector<HTMLButtonElement>('.tab-btn[data-tab="preview-section"]')
          if (previewTabBtn) {
            previewTabBtn.click()
          }
        }
      })
    }
  
    // Copy Shareable URL
    if (copyShareableUrlBtn && shareableUrlInput) {
      copyShareableUrlBtn.addEventListener("click", () => {
        shareableUrlInput.select()
        document.execCommand("copy")
        showToast("Shareable URL copied to clipboard!", "success")
      })
    }
  
    // Download Resume
    if (downloadResumeBtn && profilePictureInput) {
      downloadResumeBtn.addEventListener("click", () => {
        const resumeOutput = document.getElementById("resumeOutput")
        if (!resumeOutput) return
  
        if (profilePictureInput.files && profilePictureInput.files.length > 0) {
          const profilePictureFile = profilePictureInput.files[0]
          const reader = new FileReader()
          reader.onloadend = () => {
            if (reader.result && typeof reader.result === "string") {
              generateResumeHTML(resumeOutput, reader.result)
            }
          }
          reader.readAsDataURL(profilePictureFile)
        } else {
          generateResumeHTML(resumeOutput)
        }
      })
    }
  
    // Print Resume
    if (printResumeBtn) {
      printResumeBtn.addEventListener("click", () => {
        const resumeOutput = document.getElementById("resumeOutput")
        if (!resumeOutput) return
  
        const printWindow = window.open("", "_blank")
        if (printWindow) {
          printWindow.document.write(`
                      <html>
                          <head>
                              <title>Print Resume</title>
                              <style>
                                  body { font-family: 'Arial', sans-serif; line-height: 1.6; color: #333; }
                                  .resume-container { max-width: 800px; margin: 20px auto; padding: 20px; }
                                  h2 { color: #2563eb; text-align: center; margin-bottom: 20px; }
                                  h3 { color: #2563eb; border-bottom: 1px solid #e2e8f0; padding-bottom: 5px; margin-top: 20px; }
                                  .profile-picture { width: 150px; height: 150px; border-radius: 50%; display: block; margin: 0 auto 20px; }
                                  .section { margin-bottom: 20px; }
                                  .tags-display { display: flex; flex-wrap: wrap; gap: 5px; }
                                  .skill-tag, .hobby-tag { background-color: #f1f5f9; padding: 5px 10px; border-radius: 20px; }
                                  @media print {
                                      body { -webkit-print-color-adjust: exact; }
                                  }
                              </style>
                          </head>
                          <body>
                              ${resumeOutput.innerHTML}
                          </body>
                      </html>
                  `)
          printWindow.document.close()
          printWindow.focus()
          setTimeout(() => {
            printWindow.print()
            printWindow.close()
          }, 500)
        }
      })
    }
  
    // Generate Resume HTML for Download
    function generateResumeHTML(resumeOutput: HTMLElement, profilePictureDataURL = ""): void {
      const resumeHtml = `
              <!DOCTYPE html>
              <html lang="en">
              <head>
                  <meta charset="UTF-8">
                  <meta name="viewport" content="width=device-width, initial-scale=1.0">
                  <title>My Professional Resume</title>
                  <style>
                      body { 
                          font-family: 'Arial', sans-serif; 
                          line-height: 1.6; 
                          color: #334155; 
                          margin: 0; 
                          padding: 0;
                          background-color: #f8fafc;
                      }
                      .resume-container { 
                          max-width: 800px; 
                          margin: 20px auto; 
                          padding: 30px; 
                          background-color: white;
                          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
                          border-radius: 8px;
                      }
                      h2 { 
                          color: #2563eb; 
                          text-align: center; 
                          margin-bottom: 20px;
                          font-size: 28px;
                      }
                      h3 { 
                          color: #2563eb; 
                          border-bottom: 2px solid #e2e8f0; 
                          padding-bottom: 8px; 
                          margin-top: 25px;
                          font-size: 20px;
                      }
                      .profile-picture { 
                          width: 150px; 
                          height: 150px; 
                          border-radius: 50%; 
                          display: block; 
                          margin: 0 auto 20px;
                          border: 3px solid #2563eb;
                      }
                      .personal-info {
                          display: grid;
                          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                          gap: 10px;
                          margin-bottom: 20px;
                      }
                      .section { margin-bottom: 25px; }
                      .education-item, .experience-item {
                          margin-bottom: 15px;
                          padding-left: 15px;
                          border-left: 2px solid #e2e8f0;
                      }
                      .tags-display { 
                          display: flex; 
                          flex-wrap: wrap; 
                          gap: 8px; 
                      }
                      .skill-tag, .hobby-tag { 
                          background-color: #f1f5f9; 
                          padding: 5px 12px; 
                          border-radius: 20px;
                          font-size: 14px;
                      }
                      .info-icon {
                          color: #2563eb;
                          margin-right: 5px;
                      }
                  </style>
              </head>
              <body>
                  <div class="resume-container">
                      ${resumeOutput.innerHTML.replace(/src="([^"]*)"/g, (match, src) =>
                        src.startsWith("blob:") ? `src="${profilePictureDataURL}"` : match,
                      )}
                  </div>
              </body>
              </html>
          `
  
      const blob = new Blob([resumeHtml], { type: "text/html" })
      const link = document.createElement("a")
      link.href = URL.createObjectURL(blob)
      link.download = "my_professional_resume.html"
      link.click()
      URL.revokeObjectURL(link.href)
  
      showToast("Resume downloaded successfully!", "success")
    }
  
    // Make Resume Editable
    function makeEditable(): void {
      const editableElements = document.querySelectorAll<HTMLElement>('[contenteditable="true"]')
      editableElements.forEach((element) => {
        element.addEventListener("input", () => {
          const usernameElement = document.getElementById("username") as HTMLInputElement | null
          if (!usernameElement) return
  
          const username = usernameElement.value
          const storedData = localStorage.getItem(`resume_${username}`)
          if (!storedData) return
  
          const resumeData = JSON.parse(storedData)
          const resumeOutputElement = document.getElementById("resumeOutput")
          if (resumeOutputElement && resumeData) {
            resumeData.resumeHtml = resumeOutputElement.innerHTML
            localStorage.setItem(`resume_${username}`, JSON.stringify(resumeData))
          }
        })
      })
    }
  
    // Show Toast Notification
    function showToast(message: string, type: "success" | "error" = "success"): void {
      if (!toast) return
  
      const toastIcon = toast.querySelector(".toast-icon") as HTMLElement | null
      const toastMessage = toast.querySelector(".toast-message") as HTMLElement | null
  
      if (!toastIcon || !toastMessage) return
  
      // Set icon and color based on type
      if (type === "success") {
        toastIcon.className = "fas fa-check-circle toast-icon"
        toastIcon.style.color = "var(--success-color)"
      } else {
        toastIcon.className = "fas fa-exclamation-circle toast-icon"
        toastIcon.style.color = "var(--error-color)"
      }
  
      // Set message
      toastMessage.textContent = message
  
      // Show toast
      toast.classList.add("show")
  
      // Hide toast after 3 seconds
      setTimeout(() => {
        toast.classList.remove("show")
      }, 3000)
    }
  })
  
  
