let form = document.querySelector("#Register form");
let formInputs = form.querySelectorAll("input"),
    studentsArr = [],
    id = 0,
    tableBody = document.querySelector("tbody"),
    regexInputs = {
        firstName: /^[A-Za-z]+$/,
        lastName: /^[A-Za-z]+$/,
        Email: /^[A-Za-z][A-Za-z0-9.-]+@(gmail|yahoo)\.(com|org|io|edu|gov)$/,
        age: /^[0-9]{1,3}$/,
        phone: /^(010|011|012|015)[0-9]{8}$/
    },
    searchInput = document.querySelector("#searchInput");

if (localStorage.getItem(`studentsArr`) === null) {
    updateLocalStrorage();
} else {
    studentsArr = JSON.parse(localStorage.getItem(`studentsArr`));
    id = studentsArr[studentsArr.length - 1]?.id ?? 0;
    showStudentsArr(studentsArr);
}


form.addEventListener("submit", function (e) {
    e.preventDefault();
    let typeOfForm = form.getAttribute(`data-type`);


    if (typeOfForm == `add`) {
        addStudent();
    }
    else if (typeOfForm == `edit`) {
        editStudent();
    }


});

searchInput.addEventListener("keyup", function () {
    search(this.value);
});
