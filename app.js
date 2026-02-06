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
arrowBtn.addEventListener("click", () => {
    logoutBox.classList.toggle("active");
});
records.addEventListener("click", function (e) {
    const target = e.target;
    if (target.classList.contains("menu-dots")) {
        let wrapper = target.closest(".dots-wrapper");
        let menu = wrapper.querySelector(".dots-menu");
        menu.style.display =
            menu.style.display === "flex" ? "none" : "flex";
    }
});
addBtn.addEventListener("click", () => {
    formData.classList.add("active");
    form.reset();
    selectstatus.value = "all";
    // displayData();
});
cancelBtn.addEventListener("click", () => {
    formData.classList.remove("active");
    form.reset();
});
formData.addEventListener("click", (e) => {
    // console.log(e);
    if (e.target === formData) {
        formData.classList.remove("active");
    }
});
// window.addEventListener("click", (e) => {
//     const target=e.target as HTMLElement;
//     if (!logoutBox.contains(target) && !arrowBtn.contains(target)) {
//         logoutBox.classList.remove("active");
//     }
// });
// logoutBox.addEventListener("click", (e) => {
//     e.stopPropagation(); 
//     logoutBox.classList.toggle("active");
// });
statusSelect.addEventListener("change", function () {
    if (this.value === "pending") {
        personsField.style.display = "block";
        personsInput.setAttribute("required", "true");
    }
    else {
        personsField.style.display = "none";
        personsInput.removeAttribute("required");
        personsInput.value = "";
    }
});
form.addEventListener("submit", function (evt) {
    evt.preventDefault();
    personsField.style.display = "none";
    personsInput.removeAttribute("required");
    let docinput = document.querySelector('#docinput').value;
    let selectinput = document.querySelector('#statusSelect').value;
    let personsinput = document.querySelector('#personsInput').value;
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
    form.reset();
    formData.classList.remove("active");
});
function saveData(userArray) {
    const str = JSON.stringify(userArray);
    localStorage.setItem('users', str);
    // console.log(userArray);
}
searchdata.addEventListener("input", function () {
    selectstatus.value = "all";
    const newData = userArray.filter((user, i) => {
        return user.name.toLowerCase().includes(searchdata.value);
    });
    // console.log(newData)
    userTable(newData);
});
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
    // console.log(user)
    // dot_wrapper.classList.remove("dots-menu");
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
    records.innerHTML = titledata;
}
// filtering on basis of status
selectstatus.addEventListener("change", function () {
    let statusvalue = selectstatus.value;
    if (statusvalue === "all") {
        displayData();
    }
    else if (statusvalue === "sign") {
        const signArray = userArray.filter(user => {
            return user.input === "sign";
        });
        userTable(signArray);
    }
    else if (statusvalue === "pending") {
        const pendingArray = userArray.filter(user => {
            return user.input === "pending";
        });
        userTable(pendingArray);
    }
    else if (statusvalue === "complete") {
        const completeArray = userArray.filter(user => {
            return user.input === "complete";
        });
        userTable(completeArray);
    }
});
//# sourceMappingURL=app.js.map