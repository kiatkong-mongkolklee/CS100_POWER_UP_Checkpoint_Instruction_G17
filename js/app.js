const form = document.getElementById("portfolio-profile-form");
const createSelect = document.getElementById("portfolio-select");
const viewSelect = document.getElementById("view-portfolio-select");
const typeSelect = document.getElementById("item-type");
const otherType = document.getElementById("other-type");

form.noValidate = true;

// Show the "Other" input only when the type is "Other"
function toggleOtherType() {
    if (typeSelect.value === "Other") {
        otherType.classList.remove("d-none");
    } else {
        otherType.classList.add("d-none");
    }
}

typeSelect.addEventListener("change", toggleOtherType);

// Take the names of the selected files -> ["pic1.png", "pic2.png"]
function getFileNames(input) {
    const names = [];
    for (let i = 0; i < input.files.length; i++) {
        names.push(input.files[i].name);
    }
    return names;
}

// Read every value from the form and return them in one object
function readForm() {
    let type = typeSelect.value;
    if (type === "Other") {
        type = otherType.value.trim();
    }

    return {
        displayName: document.getElementById("profile-name").value.trim(),
        whatIEnjoy: document.getElementById("what-i-enjoy").value.trim(),
        whatIveTried: document.getElementById("what-ive-tried").value.trim(),
        whatImCuriousAbout: document.getElementById("what-curious").value.trim(),
        title: document.getElementById("item-title").value.trim(),
        type: type,
        date: document.getElementById("item-date").value,
        role: document.getElementById("item-role").value.trim(),
        description: document.getElementById("item-description").value.trim(),
        skills: document.getElementById("item-skills").value,
        whatIDid: document.getElementById("what-i-did").value.trim(),
        whatILearned: document.getElementById("what-i-learned").value.trim(),
        challenge: document.getElementById("challenge").value.trim(),
        nextStep: document.getElementById("next-step").value.trim(),
        evidence: document.getElementById("item-evidence").value,
        photos: getFileNames(document.getElementById("item-photo")),
        files: getFileNames(document.getElementById("item-file"))
    };
}

form.addEventListener("submit", function (event) {
    event.preventDefault();

    const data = readForm();
    console.log(data);
});

toggleOtherType();
