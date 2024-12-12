var form = document.getElementById('resumeForm');
var resumeDiv = document.getElementById('resume');
var innerContainer = document.getElementById('innerContainer');
document.addEventListener("DOMContentLoaded", function () {
    var profilepic = document.getElementById('pic');
    var inputFile = document.getElementById('profilePicture');
    inputFile.onchange = function () {
        if (inputFile.files && inputFile.files[0]) {
            profilepic.src = URL.createObjectURL(inputFile.files[0]);
        }
        else {
            console.log("You Didn't Selected an Profile pic.");
        }
    };
    form.addEventListener('submit', function (e) {
        var _a;
        e.preventDefault();
        var fileInput = document.getElementById('profilePicture');
        var file = (_a = fileInput.files) === null || _a === void 0 ? void 0 : _a[0];
        var reader = new FileReader();
        reader.onload = function () {
            var formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                profilePicture: reader.result,
                school: document.getElementById('school').value,
                degree: document.getElementById('degree').value,
                jobTitle: document.getElementById('jobTitle').value,
                company: document.getElementById('company').value,
                skills: document.getElementById('skills').value.split(',').map(function (skill) { return skill.trim(); }),
            };
            generateResume(formData);
        };
        if (file) {
            reader.readAsDataURL(file); // Read the image file
        }
        else {
            var formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                profilePicture: '',
                school: document.getElementById('school').value,
                degree: document.getElementById('degree').value,
                jobTitle: document.getElementById('jobTitle').value,
                company: document.getElementById('company').value,
                skills: document.getElementById('skills').value.split(',').map(function (skill) { return skill.trim(); }),
            };
            generateResume(formData);
        }
    });
    function generateResume(data) {
        var imageHTML = data.profilePicture ? "<img src=\"".concat(data.profilePicture, "\" class=\"image\">") : '';
        resumeDiv.innerHTML = "\n      <div class=\"resumeContainer\">\n          <div class=\"information\">\n              <div class=\"nameAndImage\">\n                  <div>".concat(imageHTML, "</div>\n                  <h2 id=\"editable-name\">").concat(data.name, "</h2>\n                  <input type=\"text\" id=\"name-input\" value=\"").concat(data.name, "\" class=\"hidden\">\n                  <p id=\"editable-jobTitle\">").concat(data.jobTitle, "</p>\n                  <input type=\"text\" id=\"jobTitle-input\" value=\"").concat(data.jobTitle, "\" class=\"hidden\">\n              </div>\n              <div class=\"Contact\">\n                <div class=\"box\">\n                <i class=\"fa-solid fa-paper-plane\"></i>\n                <p>").concat(data.email, "</p>\n                </div>\n                <div class=\"box\">\n                <i class=\"fa-solid fa-phone\"></i>\n                <p>").concat(data.phone, "</p>\n                </div>\n              </div>\n          </div>\n          <div class=\"data\">\n              <div class=\"education space\">\n                <h2>Education</h2>\n                <p id=\"editable-education\">").concat(data.degree, " from ").concat(data.school, "</p>\n                <input type=\"text\" id=\"education-input\" value=\"").concat(data.degree, " from ").concat(data.school, "\" class=\"hidden\">\n              </div>\n              <div class=\"experience space\">\n                <h2>Experience</h2>\n                <p id=\"editable-experience\">").concat(data.jobTitle, " at ").concat(data.company, "</p>\n                <input type=\"text\" id=\"experience-input\" value=\"").concat(data.jobTitle, " at ").concat(data.company, "\" class=\"hidden\">\n              </div>\n              <div class=\"skills space\">\n                <h2>Skills</h2>\n                <ul id=\"editable-skills\">\n                  ").concat(data.skills.map(function (skill) { return "<li>".concat(skill, "</li>"); }).join(''), "\n                </ul>\n                <input type=\"text\" id=\"skills-input\" value=\"").concat(data.skills.join(', '), "\" class=\"hidden\">\n              </div>\n          </div>\n      </div>\n    ");
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
    function makeSectionEditable(textId, inputId, isList) {
        if (isList === void 0) { isList = false; }
        var textElement = document.getElementById(textId);
        var inputElement = document.getElementById(inputId);
        textElement === null || textElement === void 0 ? void 0 : textElement.addEventListener('click', function () {
            // Show the input, hide the text element
            textElement.classList.add('hidden');
            inputElement.classList.remove('hidden');
            inputElement.focus();
        });
        inputElement === null || inputElement === void 0 ? void 0 : inputElement.addEventListener('blur', function () {
            if (isList) {
                // If it's the skills section, split the input by commas and update the list
                var updatedSkills = inputElement.value.split(',').map(function (skill) { return skill.trim(); });
                textElement.innerHTML = updatedSkills.map(function (skill) { return "<li>".concat(skill, "</li>"); }).join('');
            }
            else {
                textElement.textContent = inputElement.value;
            }
            // Hide the input, show the updated text
            textElement.classList.remove('hidden');
            inputElement.classList.add('hidden');
        });
    }
});
