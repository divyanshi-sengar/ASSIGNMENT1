
const arrowBtn = document.getElementById("arrowBtn");
const logoutBox = document.getElementById("logoutBox");
let records = document.querySelector('#records');

let form = document.querySelector("#docForm");
const statusSelect = document.getElementById("statusSelect");
const personsField = document.getElementById("personsField");
const personsInput = document.getElementById("personsInput");
const dateinput = document.getElementById('dateinput');
const searchdata = document.getElementById('searchdata');


let today = new Date().toISOString().split("T")[0];
let date = today.split("-").reverse().join("-");

let doc = document.querySelector('#docinput');
let savebtn = document.querySelector('.btn-primary');
let menu_dots = document.querySelector('.menu-dots');
let dots_menu = document.querySelector('.dots-menu');

let dot_wrapper = document.querySelector('.dots-wrapper');

const addBtn = document.getElementById("addBtn");
const formData = document.getElementById("formData");
const cancelBtn = document.getElementById("cancelBtn");
arrowBtn.addEventListener("click", () => {
    logoutBox.classList.toggle("active");
});

records.addEventListener("click", function (e) {
    if (e.target.classList.contains("menu-dots")) {
        let wrapper = e.target.closest(".dots-wrapper");
        let menu = wrapper.querySelector(".dots-menu");

        menu.style.display =
            menu.style.display === "flex" ? "none" : "flex";
    }
});

// menu_dots.addEventListener("click",function(){
//     dots_menu.style.display="flex";
//     dot_wrapper.style.display="flex;"
// })


addBtn.addEventListener("click", () => {
    formData.classList.add("active");
    form.reset();

});

cancelBtn.addEventListener("click", () => {
    formData.classList.remove("active");
    form.reset();
});

formData.addEventListener("click", (e) => {
    if (e.target === formData) {
        formData.classList.remove("active");
    }
});

// Show / Hide on status change
statusSelect.addEventListener("change", function () {
    if (this.value === "pending") {
        personsField.style.display = "block";
        personsInput.setAttribute("required", "true");
    } else {
        personsField.style.display = "none";
        personsInput.removeAttribute("required");
        personsInput.value = "";
    }
});


form.addEventListener("submit", function (e) {
    e.preventDefault();

    // alert("submitted");

    // form.reset();

    personsField.style.display = "none";
    personsInput.removeAttribute("required");
});


//   form-data



let userArray = JSON.parse(localStorage.getItem('users'))
    || [];
let edit_id = null;

displayData();
//  console.log("useArray initially: ", userArray)

// let userArray=[];

form.addEventListener("submit", function (evt) {
    evt.preventDefault();

    let docinput = document.querySelector('#docinput').value;
    let selectinput = document.querySelector('#statusSelect').value;
    let personsinput = document.querySelector('#personsInput').value;

    let newObj = {
        name: docinput,
        input: selectinput,
        date: date,
        personInput: personsinput
    };

    if (edit_id !== null) {
        userArray[edit_id] = newObj;
        edit_id = null;
    } else {
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
    let newData = userArray.filter((user, i) => {
        return user.name.startsWith(searchdata.value);
    })

    console.log(newData)
    let titledata = '';
    newData.forEach((user, i) => {

        if (user.input === 'pending') {

        }


        let statusText = "";
        if (user.input === "sign") statusText = "Needs Signing";
        if (user.input === "pending") statusText = "Pending";
        if (user.input === "complete") statusText = "Completed";

        let btnText = "";
        if (user.input === "sign") btnText = "Sign now";
        if (user.input === "pending") btnText = "Preview";
        if (user.input === "complete") btnText = "Download PDF";

        titledata += `<tr>
                            <td><input type="checkbox" /></td>
                            <td class="doc-title">${user.name}</td>
                            <td>
                                <div class="italictext">
                                    <div class="pending"><span class="badge badge-${user.input}">${statusText}</span></div>
  ${user.input === "pending"
                ? `<div class="subtext"><i>Waiting for</i> <i id="italic">${user.personInput} people</i></div>`
                : ""
            }
                                </div>
                            </td>
                            <td class="date">
                                ${date}<br><span class="time">2:01 pm</span>
                            </td>
                            <td class="action-cell">
                                <div class="action-wrapper">
                                    <button class="btn">${btnText}</button>
                                    <div class="dots-wrapper">
                                        <button class="menu-dots">⋮</button>
                                        <div class="dots-menu">
                                            <button class="dots-btn edit" onclick='editData(${i})'>Edit</button>
                                            <button class="dots-btn delete" onclick='deleteInfo(${i})'>Delete</button>
                                        </div>
                                    </div>
                                </div>
                            </td>

                        </tr>`
    });
    records.innerHTML = titledata;
})


function displayData() {
    let statement = '';

    userArray.forEach((user, i) => {
        // console.log(user.input);
        // let innertxt=document.getElementById('subtext');
        // if(user.input==="pending"){
        //     innertxt.style.display="block";
        // }
        // else{
        //     innertxt.style.display="none";
        // }


        if (user.input === 'pending') {

        }


        let statusText = "";
        if (user.input === "sign") statusText = "Needs Signing";
        if (user.input === "pending") statusText = "Pending";
        if (user.input === "complete") statusText = "Completed";

        let btnText = "";
        if (user.input === "sign") btnText = "Sign now";
        if (user.input === "pending") btnText = "Preview";
        if (user.input === "complete") btnText = "Download PDF";


        statement += `
         <tr>
                            <td><input type="checkbox" /></td>
                            <td class="doc-title">${user.name}</td>
                            <td>
                                <div class="italictext">
                                    <div class="pending"><span class="badge badge-${user.input}">${statusText}</span></div>
  ${user.input === "pending"
                ? `<div class="subtext"><i>Waiting for</i> <i id="italic">${user.personInput} people</i></div>`
                : ""
            }
                                </div>
                            </td>
                            <td class="date">
                                ${date}<br><span class="time">2:01 pm</span>
                            </td>
                            <td class="action-cell">
                                <div class="action-wrapper">
                                    <button class="btn">${btnText}</button>
                                    <div class="dots-wrapper">
                                        <button class="menu-dots">⋮</button>
                                        <div class="dots-menu">
                                            <button class="dots-btn edit" onclick='editData(${i})'>Edit</button>
                                            <button class="dots-btn delete" onclick='deleteInfo(${i})'>Delete</button>
                                        </div>
                                    </div>
                                </div>
                            </td>

                        </tr>`
    });
    records.innerHTML = statement;
}

function editData(id) {
    edit_id = id;

    let user = userArray[id];
    // console.log(user)

    formData.classList.add("active");

    doc.value = user.name;
    statusSelect.value = user.input;
    personsInput.value = user.personInput || "";

    if (user.input === "pending") {
        personsField.style.display = "block";
    } else {
        personsField.style.display = "none";
    }
}


function deleteInfo(id) {
    userArray.splice(id, 1);
    saveData(userArray);
    displayData();
}










