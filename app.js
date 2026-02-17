"use strict";
// console.log("hello")
const arrowBtn = document.getElementById('arrowBtn');
const logoutBox = document.getElementById('logoutBox');
const records = document.querySelector('#records');
const form = document.querySelector("#mainForm");
const statusSelect = document.getElementById('statusSelect');
const personsField = document.getElementById("personsField");
const personsInput = document.getElementById("personsInput");
const searchdata = document.getElementById('searchdata');
const doc = document.getElementById('docinput');
const savebtn = document.querySelector('.btn-primary');
const menu_dots = document.querySelector('.menu-dots');
const dots_menu = document.querySelector('.dots-menu');
const dot_wrapper = document.querySelector('.dots-wrapper');
const addBtn = document.getElementById("addBtn");
const formData = document.getElementById("formData");
const cancelBtn = document.getElementById('cancelBtn');
const statusselect = document.querySelector('.selectstatus');
const selectstatus = document.getElementById("selectstatus");
let userArray = JSON.parse(localStorage.getItem('users') || "[]");
let edit_id = null;
displayData();
if (arrowBtn && logoutBox) {
    arrowBtn.addEventListener("click", () => {
        logoutBox.classList.toggle("active");
    });
}
if (records) {
    records.addEventListener("click", function (e) {
        const dot = e.target.closest(".menu-dots");
        if (!dot)
            return;
        e.stopPropagation();
        const wrapper = dot.closest(".dots-wrapper");
        const menu = wrapper?.querySelector(".dots-menu");
        if (!menu)
            return;
        document.querySelectorAll(".dots-menu").forEach(menudot => {
            menudot.style.display = "none";
        });
        menu.style.display = "flex";
    });
}
window.addEventListener("click", () => {
    document.querySelectorAll(".dots-menu").forEach(menu => {
        menu.style.display = "none";
    });
});
if (addBtn && formData && form && selectstatus instanceof HTMLSelectElement) {
    addBtn.addEventListener("click", () => {
        formData.classList.add("active");
        if (form instanceof HTMLFormElement) {
            form.reset();
        }
        selectstatus.value = "all";
        displayData();
    });
}
if (cancelBtn && formData && form) {
    cancelBtn.addEventListener("click", () => {
        formData.classList.remove("active");
        if (form instanceof HTMLFormElement) {
            form.reset();
        }
    });
}
if (formData) {
    formData.addEventListener("click", (e) => {
        // console.log(e);
        if (e.target === formData) {
            formData.classList.remove("active");
        }
    });
}
if (statusSelect instanceof HTMLSelectElement &&
    personsField instanceof HTMLElement &&
    personsInput instanceof HTMLInputElement) {
    statusSelect.addEventListener("change", function () {
        if (statusSelect.value === "pending") {
            personsField.style.display = "block";
            personsInput.setAttribute("required", "true");
        }
        else {
            personsField.style.display = "none";
            personsInput.removeAttribute("required");
            personsInput.value = "";
        }
    });
}
if (form instanceof HTMLFormElement &&
    formData instanceof HTMLElement &&
    doc instanceof HTMLInputElement &&
    personsInput instanceof HTMLInputElement &&
    statusSelect instanceof HTMLSelectElement &&
    personsField instanceof HTMLElement) {
    form.addEventListener("submit", function (evt) {
        evt.preventDefault();
        personsField.style.display = "none";
        personsInput.removeAttribute("required");
        let docinput = doc.value;
        let selectinput = statusSelect.value;
        let personsinput = personsInput.value;
        if (selectinput !== "sign" &&
            selectinput !== "pending" &&
            selectinput !== "complete")
            return;
        let now = new Date();
        let date = now.toLocaleDateString("en-GB");
        let Time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
        let newObj = {
            id: Date.now(),
            name: docinput,
            input: selectinput,
            date: date,
            time: Time,
            personInput: personsinput
        };
        if (edit_id !== null) {
            userArray = userArray.map(user => user.id === edit_id ? { ...newObj, id: edit_id } : user);
            edit_id = null;
        }
        else {
            userArray.push(newObj);
        }
        saveData(userArray);
        displayData();
        if (form instanceof HTMLFormElement) {
            form.reset();
        }
        formData.classList.remove("active");
    });
}
function saveData(userArray) {
    const str = JSON.stringify(userArray);
    localStorage.setItem('users', str);
    // console.log(userArray);
}
if (searchdata instanceof HTMLInputElement && selectstatus instanceof HTMLSelectElement) {
    searchdata.addEventListener("input", function () {
        selectstatus.value = "all";
        const newData = userArray.filter((user, i) => {
            return user.name.toLowerCase().includes(searchdata.value);
        });
        // console.log(newData)
        userTable(newData);
    });
}
function displayData() {
    userTable(userArray);
}
function editData(id) {
    document.querySelectorAll(".dots-menu").forEach(menu => {
        menu.style.display = "none";
    });
    let user = (userArray.find(user => user.id === id));
    if (!user)
        return;
    edit_id = id;
    if (formData instanceof HTMLElement &&
        doc instanceof HTMLInputElement &&
        statusSelect instanceof HTMLSelectElement &&
        personsInput instanceof HTMLInputElement &&
        personsField instanceof HTMLElement) {
        formData.classList.add("active");
        doc.value = user.name;
        statusSelect.value = user.input;
        personsInput.value = user.personInput || "";
        if (user.input === "pending") {
            personsField.style.display = "block";
        }
        else {
            personsField.style.display = "none";
        }
    }
}
function deleteInfo(id) {
    userArray = userArray.filter(user => user.id !== id);
    saveData(userArray);
    displayData();
}
function userTable(userdata) {
    let titledata = '';
    userdata.forEach((user) => {
        let statusText = "";
        if (user.input === "sign")
            statusText = "Needs Signing";
        if (user.input === "pending")
            statusText = "Pending";
        if (user.input === "complete")
            statusText = "Completed";
        let btnText = "";
        if (user.input === "sign")
            btnText = "Sign now";
        if (user.input === "pending")
            btnText = "Preview";
        if (user.input === "complete")
            btnText = "Download PDF";
        titledata += `<tr>
                            <td><input type="checkbox" /></td>
                            
                            <td class="doc-title">${user.name}</td>
                            <td>
                                <div class="italictext">
                                    <div class="pending"><span class="badge badge-${user.input}">${statusText}</span></div>
  ${user.input === "pending"
            ? `<div class="subtext"><i>Waiting for</i> <i id="italic">${user.personInput} people</i></div>`
            : ""}
                                </div>
                            </td>
                            <td class="date">
                                ${user.date}<br><span class="time">${user.time}</span>
                            </td>
                            <td class="action-cell">
                                <div class="action-wrapper">
                                    <button class="btn">${btnText}</button>
                                    <div class="dots-wrapper">
                                        <button class="menu-dots">⋮</button>
                                        <div class="dots-menu">
                                            <button class="dots-btn edit" onclick='editData(${user.id})'>Edit</button>
                                            <button class="dots-btn delete" onclick='deleteInfo(${user.id})'>Delete</button>
                                        </div>
                                    </div>
                                </div>
                            </td>

                        </tr>`;
    });
    if (records) {
        records.innerHTML = titledata;
    }
}
// filtering on basis of status
// type filterstatusvalue = Status | "all";
if (selectstatus instanceof HTMLSelectElement) {
    selectstatus.addEventListener("change", function () {
        const statusvalue = selectstatus.value;
        if (statusvalue === "all") {
            displayData();
        }
        else {
            const filteredarray = userArray.filter(user => user.input === statusvalue);
            userTable(filteredarray);
        }
    });
}
//# sourceMappingURL=app.js.map