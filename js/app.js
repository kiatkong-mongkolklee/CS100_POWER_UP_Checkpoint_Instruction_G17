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

// Make one portfolio item object from the form data
function makeItem(data, number) {
    return {
        id: "item" + String(number).padStart(3, "0"),
        title: data.title,
        type: data.type,
        date: data.date,
        role: data.role,
        description: data.description,
        skills: toList(data.skills),
        reflection: {
            whatIDid: data.whatIDid,
            whatILearned: data.whatILearned,
            challenge: data.challenge,
            nextStep: data.nextStep
        },
        evidence: toList(data.evidence),
        photos: data.photos,
        files: data.files
    };
}

const STORAGE_KEY = "portfolios";

let portfolios = loadData();

// Read data from localStorage. If there is nothing, return {}
function loadData() {
    const text = localStorage.getItem(STORAGE_KEY);
    if (text === null) {
        return {};
    }
    try {
        return JSON.parse(text);
    } catch (error) {
        return {};
    }
}

// Save data to localStorage. Return true if OK, false if storage is full
function saveData() {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(portfolios));
        return true;
    } catch (error) {
        portfolios = loadData();
        return false;
    }
}

// Clear only the item inputs (keep the profile inputs)
function clearItemFields() {
    const fields = document.querySelectorAll("#item-section input, #item-section textarea, #item-section select");
    for (let i = 0; i < fields.length; i++) {
        if (fields[i].tagName === "SELECT") {
            fields[i].selectedIndex = 0;
        } else {
            fields[i].value = "";
        }
    }
    toggleOtherType();
}

// Save the profile and the new item in the selected portfolio
function saveItem(data) {
    const id = createSelect.value;
    const old = portfolios[id];

    let items = [];
    if (old !== undefined) {
        items = old.items;
    }

    items.push(makeItem(data, items.length + 1));

    portfolios[id] = {
        id: id,
        displayName: data.displayName,
        whatIEnjoy: data.whatIEnjoy,
        whatIveTried: data.whatIveTried,
        whatImCuriousAbout: data.whatImCuriousAbout,
        items: items
    };

    if (saveData() === false) {
        showMessage("Could not save: browser storage is full.", "danger");
        return;
    }

    clearItemFields();
    renderView();
    showMessage("Portfolio saved!", "success");
}

const NO_INFO = "No information available.";
const emptyHtml = document.getElementById("view-items").innerHTML;

// Change special characters so user text cannot break our HTML
function esc(text) {
    return String(text)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}

// Make the HTML card of one item
function itemCard(item) {
    const r = item.reflection;

    let skills = "";
    for (let i = 0; i < item.skills.length; i++) {
        skills += '<span class="badge text-bg-secondary skill-tag me-1">' + esc(item.skills[i]) + "</span>";
    }

    let links = "";
    for (let i = 0; i < item.evidence.length; i++) {
        const url = esc(item.evidence[i]);
        links += '<li><a href="' + url + '" target="_blank" rel="noopener noreferrer">' + url + "</a></li>";
    }

    let photos = "";
    for (let i = 0; i < item.photos.length; i++) {
        photos += "<li>" + esc(item.photos[i]) + "</li>";
    }
    if (photos !== "") {
        photos = '<h6 class="mt-3">Photos</h6><ul>' + photos + "</ul>";
    }

    let files = "";
    for (let i = 0; i < item.files.length; i++) {
        files += "<li>" + esc(item.files[i]) + "</li>";
    }
    if (files !== "") {
        files = '<h6 class="mt-3">Files</h6><ul>' + files + "</ul>";
    }

    let note = "";
    if (photos !== "" || files !== "") {
        note = '<p class="text-body-secondary small">Only file names are saved. Files are not uploaded yet.</p>';
    }

    return `
        <div class="col-12 col-lg-6">
            <div class="card h-100 item-card">
                <div class="card-header"><h5 class="mb-0">${esc(item.title)}</h5></div>
                <div class="card-body">
                    <p class="text-body-secondary small">${esc(item.type)} · ${esc(item.date)} · ${esc(item.role)}</p>
                    <p>${esc(item.description)}</p>
                    <div class="mb-3">${skills}</div>
                    <p class="mb-1"><b>What I did:</b> ${esc(r.whatIDid)}</p>
                    <p class="mb-1"><b>What I learned:</b> ${esc(r.whatILearned)}</p>
                    <p class="mb-1"><b>Challenge:</b> ${esc(r.challenge)}</p>
                    <p class="mb-1"><b>Next step:</b> ${esc(r.nextStep)}</p>
                    <h6 class="mt-3">Evidence</h6>
                    <ul>${links}</ul>
                    ${photos}
                    ${files}
                    ${note}
                </div>
            </div>
        </div>`;
}

// Show the selected portfolio in the "View" section
function renderView() {
    const p = portfolios[viewSelect.value];

    if (p === undefined) {
        document.getElementById("view-profile-name").textContent = "Portfolio Name";
        document.getElementById("view-enjoy").textContent = NO_INFO;
        document.getElementById("view-tried").textContent = NO_INFO;
        document.getElementById("view-curious").textContent = NO_INFO;
        document.getElementById("item-count").textContent = "0 Items";
        document.getElementById("view-items").innerHTML = emptyHtml;
        return;
    }

    document.getElementById("view-profile-name").textContent = p.displayName;
    document.getElementById("view-enjoy").textContent = p.whatIEnjoy;
    document.getElementById("view-tried").textContent = p.whatIveTried;
    document.getElementById("view-curious").textContent = p.whatImCuriousAbout;

    const count = p.items.length;
    if (count === 1) {
        document.getElementById("item-count").textContent = "1 Item";
    } else {
        document.getElementById("item-count").textContent = count + " Items";
    }

    if (count === 0) {
        document.getElementById("view-items").innerHTML = emptyHtml;
    } else {
        let html = "";
        for (let i = 0; i < p.items.length; i++) {
            html += itemCard(p.items[i]);
        }
        document.getElementById("view-items").innerHTML = html;
    }
}

// When the user picks a portfolio: fill the profile inputs, clear the item inputs
function selectPortfolio(id) {
    const p = portfolios[id];
    createSelect.value = id;
    viewSelect.value = id;

    if (p === undefined) {
        document.getElementById("profile-name").value = "";
        document.getElementById("what-i-enjoy").value = "";
        document.getElementById("what-ive-tried").value = "";
        document.getElementById("what-curious").value = "";
    } else {
        document.getElementById("profile-name").value = p.displayName;
        document.getElementById("what-i-enjoy").value = p.whatIEnjoy;
        document.getElementById("what-ive-tried").value = p.whatIveTried;
        document.getElementById("what-curious").value = p.whatImCuriousAbout;
    }

    clearItemFields();
    clearErrors();
    renderView();
}

createSelect.addEventListener("change", function () {
    selectPortfolio(createSelect.value);
});
viewSelect.addEventListener("change", function () {
    selectPortfolio(viewSelect.value);
});

form.addEventListener("submit", function (event) {
    event.preventDefault();

    if (validateForm() === false) {
        showMessage("Please check the highlighted fields. Nothing was saved.", "danger");
        return;
    }

    const data = readForm();
    saveItem(data);
});

toggleOtherType();
selectPortfolio(createSelect.value);
