const addBtn = document.querySelectorAll(".employee__add");
const removeBtn = document.querySelector(".employee__delete");
const submitBtn = document.querySelector(".employee__submit");
const updatedBtn = document.querySelector(".employee__update");
const menuBtn = document.querySelector(".menu-icon");

const employeeForm = document.querySelector(".employee__form--form");
const formContainers = document.querySelector(".employee__form");
const formEditContainers = document.querySelector(".employee__form--edit");

const employeeMenu = document.querySelector(".employee__list--menu");

const employeeUl = document.querySelector(".employee__list__body");
const employeeMenuUl = document.querySelector(".employee__list__body--menu");
const employeeDetails = document.querySelector(".employee__detail__body");

let employees = JSON.parse(localStorage.getItem("employees")) || [];
let img =
  "https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg";

function init() {
  renderMemberships(employees);
  renderMembershipsMenu(employees);
}

submitBtn.addEventListener("click", function (e) {
  e.preventDefault();

  const fname = document.querySelector(".employee__form--fname").value;
  const lname = document.querySelector(".employee__form--lname").value;
  const email = document.querySelector(".employee__form--email").value;
  const address = document.querySelector(".employee__form--address").value;
  const dob = document.querySelector(".employee__form--dob").value;
  const phoneNumber = document.querySelector(".employee__form--phone").value;
  const salary = document.querySelector(".employee__form--salary").value;
  const imgUrl = document.querySelector(".employee__form--img").value || img;

  if (!fname || !lname || !address) {
    alert("Please fill out all the fields");
    return;
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    alert("Please enter a valid email address");
    return;
  }

  if (!/^\d{4}-\d{2}-\d{2}$/.test(dob)) {
    alert("Please enter a valid date of birth");
    return;
  }

  if (isNaN(salary) || salary <= 0) {
    alert("Please enter a valid salary");
    return;
  }

  if (!/^\d{10}$/.test(phoneNumber)) {
    alert("Please enter a valid phone number");
    return;
  }

  const employee = {
    eID: employees.length + 1 || 0,
    fname,
    lname,
    imgUrl,
    email,
    address,
    phoneNumber,
    dob,
    salary,
  };

  employees.push(employee);
  localStorage.setItem("employees", JSON.stringify(employees));

  renderMemberships(employees);
  renderMembershipsMenu(employees);
  employeeForm.reset();
});

function renderMemberships(employees) {
  employeeUl.innerHTML = "";

  employees.forEach((employee) => {
    const li = document.createElement("li");
    li.classList.add("employee__list__body__li");
    li.setAttribute("data-index", employees.indexOf(employee));
    li.innerHTML = `
            <div class="li__name">${employee.fname} ${employee.lname}</div>
            <div class="li__btn">
              <div class="employee__edit"><i class="fa-solid fa-pen-to-square"></i></div>
              <div class="employee__delete"><i class="fa-solid fa-xmark"></i></div>
            </div>
        `;
    employeeUl.appendChild(li);

    li.querySelector(".employee__delete").addEventListener(
      "click",
      deleteEmployee(employee)
    );

    li.querySelector(".employee__edit").addEventListener(
      "click",
      editEmployee(employee)
    );

    li.addEventListener("click", displayEmployee(employee));
  });
}

function renderMembershipsMenu(employees) {
  employeeMenuUl.innerHTML = "";

  employees.forEach((employee) => {
    const li = document.createElement("li");
    li.classList.add("employee__list__body__li--menu");
    li.setAttribute("data-index", employees.indexOf(employee));
    li.innerHTML = `
            <div class="li__name">${employee.fname} ${employee.lname}</div>
            <div class="li__btn">
              <div class="employee__edit"><i class="fa-solid fa-pen-to-square"></i></div>
              <div class="employee__delete"><i class="fa-solid fa-xmark"></i></div>
            </div>
        `;
    employeeMenuUl.appendChild(li);

    li.querySelector(".employee__delete").addEventListener(
      "click",
      deleteEmployee(employee)
    );

    li.querySelector(".employee__edit").addEventListener(
      "click",
      editEmployee(employee)
    );

    li.addEventListener("click", displayEmployee(employee));
  });
}

function editEmployee(employee) {
  return function () {
    formEditContainers.classList.remove("hidden");
    document.querySelector(".employee__formEdit--fname").value = employee.fname;
    document.querySelector(".employee__formEdit--lname").value = employee.lname;
    document.querySelector(".employee__formEdit--email").value = employee.email;
    document.querySelector(".employee__formEdit--address").value =
      employee.address;
    document.querySelector(".employee__formEdit--dob").value = employee.dob;
    document.querySelector(".employee__formEdit--phone").value =
      employee.phoneNumber;
    document.querySelector(".employee__formEdit--salary").value =
      employee.salary;
    document.querySelector(".employee__formEdit--img").value = employee.imgUrl;

    updatedBtn.addEventListener("click", function (e) {
      e.preventDefault();
      const fname = document.querySelector(".employee__formEdit--fname").value;
      const lname = document.querySelector(".employee__formEdit--lname").value;
      const email = document.querySelector(".employee__formEdit--email").value;
      const address = document.querySelector(
        ".employee__formEdit--address"
      ).value;
      const dob = document.querySelector(".employee__formEdit--dob").value;
      const phoneNumber = document.querySelector(
        ".employee__formEdit--phone"
      ).value;
      const salary = document.querySelector(
        ".employee__formEdit--salary"
      ).value;
      const imgUrl = document.querySelector(".employee__formEdit--img").value;

      if (!fname || !lname || !address) {
        alert("Please fill out all the fields");
        return;
      }

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        alert("Please enter a valid email address");
        return;
      }

      if (!/^\d{4}-\d{2}-\d{2}$/.test(dob)) {
        alert("Please enter a valid date of birth");
        return;
      }

      if (isNaN(salary) || salary <= 0) {
        alert("Please enter a valid salary");
        return;
      }

      if (!/^\d{10}$/.test(phoneNumber)) {
        alert("Please enter a valid phone number");
        return;
      }

      employee.fname = fname;
      employee.lname = lname;
      employee.email = email;
      employee.address = address;
      employee.dob = dob;
      employee.phoneNumber = phoneNumber;
      employee.salary = salary;
      employee.imgUrl = imgUrl;
      const index = employee.eID;

      localStorage.setItem("employees", JSON.stringify(employees));
      renderMemberships(employees);
      renderMembershipsMenu(employees);

      employeeDetails.innerHTML =
        '<h3 class="heading__secondery">No Employee</h3>';
      displayEmployee(employees[index]);
      formEditContainers.classList.add("hidden");
    });
  };
}

function deleteEmployee(employee) {
  return function () {
    employees.splice(employees.indexOf(employee), 1);
    localStorage.setItem("employees", JSON.stringify(employees));
    renderMemberships(employees);
    renderMembershipsMenu(employees);
  };
}

function displayEmployee(employee) {
  return function () {
    employeeMenu.classList.add("hidden");
    if (employees.includes(employee)) {
      employeeDetails.innerHTML = "";
      employeeDetails.innerHTML = `
        <img src="${employee.imgUrl}" alt="${employee.fname} ${
        employee.lname
      }" class="employee__detail__body__img">
        <h1 class="heading__primary e_name">${
          employee.fname + " " + employee.lname
        }</h1>
        <p class="employee__detail__body__info">Address - <span class="e_address">${
          employee.address
        }</span></p>
        <p class="employee__detail__body__info">Email - <span class="e_email">${
          employee.email
        }</span></p>
        <p class="employee__detail__body__info">Phone - <span class="e_phone">${
          employee.phoneNumber
        }</span></p>
        <p class="employee__detail__body__info">Salary - <span class="e_salary">${
          employee.salary
        }</span></p>
        <p class="employee__detail__body__info">DOB - <span class="e_dob">${
          employee.dob
        }</span></p>
    `;
    } else {
      employeeDetails.innerHTML =
        '<h3 class="heading__secondery">No Employee</h3>';
    }
  };
}

// addBtn.addEventListener("click", function () {
//   formContainers.classList.remove("hidden");
// });
//all addBtn
addBtn.forEach((btn) => {
  btn.addEventListener("click", function () {
    formContainers.classList.remove("hidden");
  });
});

formContainers.addEventListener("click", function (e) {
  if (e.target === this) {
    formContainers.classList.add("hidden");
  }
});

formEditContainers.addEventListener("click", function (e) {
  if (e.target === this) {
    formEditContainers.classList.add("hidden");
  }
});

menuBtn.addEventListener("click", function (e) {
  e.preventDefault();
  employeeMenu.classList.remove("hidden");
});

employeeMenu.addEventListener("click", function (e) {
  employeeMenu.classList.add("hidden");
});
init();
