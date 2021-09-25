const getElements = elem => document.querySelector(elem);
getElements('.editUser').style.visibility = 'hidden';

let loginRegExp = /^[a-zA-Z]{4,16}$/
let passwordRegExp = /^[\w+\d+\_\-\.]{4,16}$/;
let emailRegExp = /^[\w+-.]+@\w+\.\w+$/;

let myArr = [];
let userIndex;
getElements('.addUser').addEventListener('click', addUser);

class User {
    constructor(login, password, email) {
        this.login = login;
        this.password = password;
        this.email = email;
    }
}

function render() {
    let trs = document.querySelectorAll('tr');
    for (let i = 0; i < trs.length; i++) {
        trs[i].remove();
    }
    getElements('table').innerHTML += ` <tr>
    <th>#</th>
    <th>Login</th>
    <th>Password</th>
    <th>Email</th>
    <th>Edit</th>
    <th>Delete</th>
   </tr>`
    for (let i = 0; i < myArr.length; i++) {
        getElements('table').innerHTML += `<tr>
        <td>${i+1}</td>
        <td>${myArr[i].login}</td>
        <td>${myArr[i].password}</td>
        <td>${myArr[i].email}</td>
        <td><button type="button" class="btn btn-warning" onclick="editUser(${i})">Edit</button></td>
        <td><button type="button" class="btn btn-danger" onclick="deleteUser(${i})">Delete</button></td>
        </tr>`
    }
}

function addUser() {
    let loginTest = loginRegExp.test(getElements('.login').value);
    let passwordTest = passwordRegExp.test(getElements('.password').value);
    let emailTest = emailRegExp.test(getElements('.email').value);
    if (loginTest && passwordTest && emailTest) {
        myArr.push({
            login: getElements('.login').value,
            password: getElements('.password').value,
            email: getElements('.email').value
        })
    } else {
        alert("Невірно введені дані");
    }
    getElements('form').reset();
    render();
}

function deleteUser(elem) {
    myArr.splice(elem, 1);
    render();
}

function editUser(index) {
    userIndex = index;
    getElements('.editUser').style.visibility = 'visible';
    getElements('.addUser').style.visibility = 'hidden';
    getElements('.login').value = myArr[index].login;
    getElements('.password').value = myArr[index].password;
    getElements('.email').value = myArr[index].email;
}

function saveEditUser() {
    getElements('.editUser').style.visibility = 'hidden';
    getElements('.addUser').style.visibility = 'visible';
    let user = new User(getElements('.login').value, getElements('.password').value, getElements('.email').value);
    myArr[userIndex] = user;
    getElements('form').reset();
    render();
}