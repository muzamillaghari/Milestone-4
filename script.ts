interface ResumeData {
  name: string;
  email: string;
  phone: string;
  profilePicture?: string;
  school: string;
  degree: string;
  jobTitle: string;
  company: string;
  skills: string[];
}

const form = document.getElementById('resumeForm') as HTMLFormElement;
const resumeDiv = document.getElementById('resume') as HTMLDivElement;
const innerContainer = document.getElementById('innerContainer') as HTMLDivElement;

document.addEventListener("DOMContentLoaded", () => {
  const profilepic = document.getElementById('pic') as HTMLImageElement;
  const inputFile = document.getElementById('profilePicture') as HTMLInputElement;

  inputFile.onchange = () => {
    if (inputFile.files && inputFile.files[0]) {
      profilepic.src = URL.createObjectURL(inputFile.files[0]);
    } else {
      console.log("You Didn't Selected an Profile pic.");
    }
  };
  

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const fileInput = document.getElementById('profilePicture') as HTMLInputElement;
    const file = fileInput.files?.[0];

    const reader = new FileReader();
    reader.onload = function () {
      const formData: ResumeData = {
        name: (document.getElementById('name') as HTMLInputElement).value,
        email: (document.getElementById('email') as HTMLInputElement).value,
        phone: (document.getElementById('phone') as HTMLInputElement).value,
        profilePicture: reader.result as string, // Image data URL
        school: (document.getElementById('school') as HTMLInputElement).value,
        degree: (document.getElementById('degree') as HTMLInputElement).value,
        jobTitle: (document.getElementById('jobTitle') as HTMLInputElement).value,
        company: (document.getElementById('company') as HTMLInputElement).value,
        skills: (document.getElementById('skills') as HTMLInputElement).value.split(',').map(skill => skill.trim()),
      };
      generateResume(formData);
    };

    if (file) {
      reader.readAsDataURL(file); // Read the image file
    } else {
      const formData: ResumeData = {
        name: (document.getElementById('name') as HTMLInputElement).value,
        email: (document.getElementById('email') as HTMLInputElement).value,
        phone: (document.getElementById('phone') as HTMLInputElement).value,
        profilePicture: '',
        school: (document.getElementById('school') as HTMLInputElement).value,
        degree: (document.getElementById('degree') as HTMLInputElement).value,
        jobTitle: (document.getElementById('jobTitle') as HTMLInputElement).value,
        company: (document.getElementById('company') as HTMLInputElement).value,
        skills: (document.getElementById('skills') as HTMLInputElement).value.split(',').map(skill => skill.trim()),
      };

      generateResume(formData);
    }
  });

  function generateResume(data: ResumeData) {
    const imageHTML = data.profilePicture ? `<img src="${data.profilePicture}" class="image">` : '';

    resumeDiv.innerHTML = `
      <div class="resumeContainer">
          <div class="information">
              <div class="nameAndImage">
                  <div>${imageHTML}</div>
                  <h2 id="editable-name">${data.name}</h2>
                  <input type="text" id="name-input" value="${data.name}" class="hidden">
                  <p id="editable-jobTitle">${data.jobTitle}</p>
                  <input type="text" id="jobTitle-input" value="${data.jobTitle}" class="hidden">
              </div>
              <div class="Contact">
                <div class="box">
                <i class="fa-solid fa-paper-plane"></i>
                <p>${data.email}</p>
                </div>
                <div class="box">
                <i class="fa-solid fa-phone"></i>
                <p>${data.phone}</p>
                </div>
              </div>
          </div>
          <div class="data">
              <div class="education space">
                <h2>Education</h2>
                <p id="editable-education">${data.degree} from ${data.school}</p>
                <input type="text" id="education-input" value="${data.degree} from ${data.school}" class="hidden">
              </div>
              <div class="experience space">
                <h2>Experience</h2>
                <p id="editable-experience">${data.jobTitle} at ${data.company}</p>
                <input type="text" id="experience-input" value="${data.jobTitle} at ${data.company}" class="hidden">
              </div>
              <div class="skills space">
                <h2>Skills</h2>
                <ul id="editable-skills">
                  ${data.skills.map(skill => `<li>${skill}</li>`).join('')}
                </ul>
                <input type="text" id="skills-input" value="${data.skills.join(', ')}" class="hidden">
              </div>
          </div>
      </div>
    `;

    innerContainer.style.display = "none";

    // Add edit functionality for the Name section
    makeSectionEditable('editable-name', 'name-input');
    // Add edit functionality for the Job Title section
    makeSectionEditable('editable-jobTitle', 'jobTitle-input');
    // Add edit functionality for the Education section
    makeSectionEditable('editable-education', 'education-input');
    // Add edit functionality for the Experience section
    makeSectionEditable('editable-experience', 'experience-input');
    // Add edit functionality for the Skills section
    makeSectionEditable('editable-skills', 'skills-input', true);
  }

  function makeSectionEditable(textId: string, inputId: string, isList: boolean = false) {
    const textElement = document.getElementById(textId) as HTMLElement;
    const inputElement = document.getElementById(inputId) as HTMLInputElement;

    textElement?.addEventListener('click', () => {
      // Show the input, hide the text element
      textElement.classList.add('hidden');
      inputElement.classList.remove('hidden');
      inputElement.focus();
    });

    inputElement?.addEventListener('blur', () => {
      if (isList) {
        // If it's the skills section, split the input by commas and update the list
        const updatedSkills = inputElement.value.split(',').map(skill => skill.trim());
        textElement.innerHTML = updatedSkills.map(skill => `<li>${skill}</li>`).join('');
      } else {
        textElement.textContent = inputElement.value;
      }

      // Hide the input, show the updated text
      textElement.classList.remove('hidden');
      inputElement.classList.add('hidden');
    });
  }
});
