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

let toastTimer = null;

// Show a message box at the top (type = "danger" or "success")
function showMessage(text, type) {
    const box = document.getElementById("error-toast");
    box.textContent = text;
    box.className = "alert alert-" + type;
    box.scrollIntoView({ behavior: "smooth", block: "center" });
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
        box.classList.add("d-none");
    }, 5000);
}

// Show a red border and an error message under the input
function setError(input, message) {
    input.classList.add("is-invalid");
    let feedback = input.parentElement.querySelector(".invalid-feedback");
    if (feedback === null) {
        feedback = document.createElement("div");
        feedback.className = "invalid-feedback";
        input.parentElement.appendChild(feedback);
    }
    feedback.textContent = message;
}

// Remove all red borders
function clearErrors() {
    const bad = form.querySelectorAll(".is-invalid");
    for (let i = 0; i < bad.length; i++) {
        bad[i].classList.remove("is-invalid");
    }
}

// Check that the text is a link starting with http:// or https://
function isValidUrl(text) {
    try {
        const url = new URL(text);
        const okProtocol = url.protocol === "http:" || url.protocol === "https:";
        return okProtocol && url.hostname.includes(".");
    } catch (error) {
        return false;
    }
}

// Check the date format YYYY-MM-DD and that the day really exists
// (for example 2026-02-31 is not allowed)
function isValidDate(text) {
    if (text.length !== 10) {
        return false;
    }
    const parts = text.split("-");
    const year = Number(parts[0]);
    const month = Number(parts[1]);
    const day = Number(parts[2]);
    const d = new Date(year, month - 1, day);
    return d.getFullYear() === year && d.getMonth() === month - 1 && d.getDate() === day;
}

// "HTML, CSS" -> ["HTML", "CSS"]  (remove spaces, empty and duplicate values)
function toList(text) {
    const parts = text.split(",");
    const list = [];
    for (let i = 0; i < parts.length; i++) {
        const word = parts[i].trim();
        if (word !== "" && list.indexOf(word) === -1) {
            list.push(word);
        }
    }
    return list;
}

// Check the whole form. Return true if everything is OK
function validateForm() {
    clearErrors();
    let ok = true;

    const required = [
        ["profile-name", "Please enter a display name."],
        ["what-i-enjoy", "Please tell us what you enjoy."],
        ["what-ive-tried", "Please tell us what you've tried."],
        ["what-curious", "Please tell us what you are curious about."],
        ["item-title", "Please enter a title."],
        ["item-type", "Please select a type."],
        ["item-date", "Please select a date."],
        ["item-role", "Please enter your role."],
        ["item-description", "Please describe what you did."],
        ["item-skills", "Please enter at least one skill, e.g. HTML, CSS."],
        ["what-i-did", "Please fill in what you did."],
        ["what-i-learned", "Please fill in what you learned."],
        ["challenge", "Please fill in the challenge you faced."],
        ["next-step", "Please fill in your next step."],
        ["item-evidence", "Please add at least one evidence link."]
    ];

    for (let i = 0; i < required.length; i++) {
        const input = document.getElementById(required[i][0]);
        if (input.value.trim() === "") {
            setError(input, required[i][1]);
            ok = false;
        }
    }

    if (typeSelect.value === "Other" && otherType.value.trim() === "") {
        setError(otherType, "Please type your own type.");
        ok = false;
    }

    const dateInput = document.getElementById("item-date");
    if (dateInput.value !== "" && !isValidDate(dateInput.value)) {
        setError(dateInput, "Invalid date. Please use the format YYYY-MM-DD.");
        ok = false;
    }

    const evidenceInput = document.getElementById("item-evidence");
    const links = toList(evidenceInput.value);
    for (let i = 0; i < links.length; i++) {
        if (!isValidUrl(links[i])) {
            setError(evidenceInput, '"' + links[i] + '" is not a valid link. It must start with http:// or https:// (separate links with a comma).');
            ok = false;
            break;
        }
    }

    const firstError = form.querySelector(".is-invalid");
    if (firstError !== null) {
        firstError.focus();
    }
    return ok;
}

// When the user fixes an input, remove its red border
form.addEventListener("input", function (event) {
    event.target.classList.remove("is-invalid");
});
form.addEventListener("change", function (event) {
    event.target.classList.remove("is-invalid");
});

// The Clear button (type="reset"): hide "Other" and remove red borders
form.addEventListener("reset", function () {
    setTimeout(function () {
        toggleOtherType();
        clearErrors();
    }, 0);
});

form.addEventListener("submit", function (event) {
    event.preventDefault();

    if (validateForm() === false) {
        showMessage("Please check the highlighted fields. Nothing was saved.", "danger");
        return;
    }

    const data = readForm();
    console.log(data);
});

toggleOtherType();
