function addStudent() {
    let currentInput = form.querySelector("input:focus"),
        falseInput = form.querySelector(`input[data-valid="false"]`);
    currentInput?.blur();

    let invalidinput = form.querySelector("input.is-invalid");
    if (invalidinput !== null || falseInput != null) {
        return;
    }

    let student = getStudent(++id);

    studentsArr.push(student);
    updateLocalStrorage();

    showStudent(student);
    checkEmptyTable(studentsArr);
    resetForm();

}

function getStudent(id) {
    let Student = { id: id };
    formInputs.forEach(function (formInputs) {
        let key = formInputs.name,
            value = formInputs.value.trim();

        Student[key] = value;
    });
    return Student;
}
function showStudent(student) {
    tableBody.innerHTML += ` <tr data-student-id=${student.id}>
                            <th>${student.id}</th>
                            <td>${student.firstName}</td>
                            <td>${student.lastName}</td>
                            <td>${student.Email}</td>
                            <td>${student.age}</td>
                            <td>${student.phone}</td>
                            <td>
                                <div class="buttons">
                                    <button
                                        class="btn btn-info text-light me-2" onclick = "  insertStudentIntoForm(${student.id})">Edit</button>
                                    <button
                                        class="btn btn-danger" onclick = "deleteStudent(${student.id} , this)">Delete</button>
                                </div>
                            </td>
                        </tr>`
}
function checkInput(input) {
    let inputName = input.name;
    let inputValue = input.value.trim();
    let isEmpty = inputValue === "";
    let errorEle = document.querySelector(`p.alert[data-error-name="${inputName}"]`);
    let isInvalid = !regexInputs[inputName].test(inputValue);
    let errorMsg = "";

    if (isEmpty) {
        errorMsg = "This field is required.";
    } else if (isInvalid) {
        errorMsg = "Is Invalid.";
    }

    if (isEmpty || isInvalid) {
        input.classList.add("is-invalid");
        input.classList.remove("is-valid");
        errorEle.classList.remove("d-none");
        errorEle.textContent = errorMsg;
        input.dataset.valid = "false";
    } else {
        input.classList.remove("is-invalid");
        input.classList.add("is-valid");
        errorEle.classList.add("d-none");
        input.dataset.valid = "true";
    }
}


function resetForm() {
    form.reset();
    formInputs.forEach(function (input) {
        input.classList.remove(`is-valid`);
        input.classList.remove(`is-invalid`);
        document.querySelector(`p.alert[data-error-name = "${input.name}"]`).classList.add("d-none");

    });
    form.setAttribute(`data-type`, `add`);
};
function updateLocalStrorage() {
    localStorage.setItem(`studentsArr`, JSON.stringify(studentsArr))
}


function getStudentIndex(id) {
    return studentsArr.findIndex(function (student) {
        return student.id == id;
    });
}
function showStudentsArr(data) {

    tableBody.innerHTML = ` <td id="tableAlert" class="table-warning text-center"
                            colspan="7">There Are No Data</td>`;
    data.forEach(function (student) {
        showStudent(student);
    });
    checkEmptyTable(data);
};
function deleteStudent(id, that) {
    if (!confirm("Are you Sure")) {
        return;
    }
    let deletedStudent = getStudentIndex(id);
    let trEle = that.closest(`tr`);
    studentsArr.splice(deletedStudent, 1);
    trEle.remove();
    updateLocalStrorage();

    checkEmptyTable(studentsArr);
}

function checkEmptyTable(data) {
    let tableAlert = document.querySelector("#tableAlert");
    if (data.length == 0) {
        tableAlert.classList.remove(`d-none`);
    }
    else {
        tableAlert.classList.add(`d-none`);
    }
}
function insertStudentIntoForm(id) {

    resetForm();
    let editStudent = studentsArr.find(function (student) {
        return student.id == id
    }),
        formBtn = form.querySelector("button");



    for (let input of formInputs) {
        input.value = editStudent[input.name];
    }
    formBtn.textContent = "Edit";
    formBtn.classList.remove(`btn-success`);
    formBtn.classList.add(`btn-info`, `text-light`);
    form.setAttribute(`data-type`, `edit`);
    form.setAttribute(`data-student-id`, id);

    let allButtons = tableBody.querySelectorAll(".buttons button");
    allButtons.forEach(function (btn) {
        btn.setAttribute(`disabled`, ``);
    });
    let formIconClear = form.querySelector(".fa-rotate-left");
    formIconClear.classList.add("show");
}


function editStudent() {
    let studentId = form.dataset.studentId,
        student = getStudent(studentId),
        studentIndex = getStudentIndex(studentId),
        trEle = tableBody.querySelector(`tr[data-student-id = "${studentId}"]`);

    studentsArr[studentIndex] = student;



    trEle.innerHTML = ` <th>${student.id}</th>
                            <td>${student.firstName}</td>
                            <td>${student.lastName}</td>
                            <td>${student.Email}</td>
                            <td>${student.age}</td>
                            <td>${student.phone}</td>
                            <td>
                                <div class="buttons">
                                    <button
                                        class="btn btn-info text-light me-2" onclick = "  insertStudentIntoForm(${student.id})">Edit</button>
                                    <button
                                        class="btn btn-danger" onclick = "deleteStudent(${student.id} , this)">Delete</button>
                                </div>
                            </td>`
    updateLocalStrorage();


    let allButtons = tableBody.querySelectorAll(".buttons button");
    allButtons.forEach(function (btn) {
        btn.removeAttribute(`disabled`, ``);
    });


    let formBtn = form.querySelector("button");

    for (let input of formInputs) {
        input.value = editStudent[input.name];
    }
    formBtn.textContent = "Add";
    formBtn.classList.add(`btn-success`);
    formBtn.classList.remove(`btn-info`, `text-light`);

    resetForm();

}


function search(searchKey) {
    const key = searchKey.toLowerCase();

    let filterStudents = studentsArr.filter(function (student) {
        return student.firstName.toLowerCase().includes(key) ||
            student.lastName.toLowerCase().includes(key) ||
            student.Email.toLowerCase().includes(key) ||
            student.age.toString().toLowerCase().includes(key) ||
            student.phone.toString().toLowerCase().includes(key);
    });

    showStudentsArr(filterStudents);
}

function showIcon() {
    let formIconClear = form.querySelector(".fa-rotate-left");
    formIconClear.classList.add(`show`);
}
function cancelEdit() {

    resetForm();
}