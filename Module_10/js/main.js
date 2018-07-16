/*
  Написать приложение для работы с REST сервисом, 
  все функции делают запрос и возвращают Promise 
  с которым потом можно работать. 
  
  Реализовать следующий функционал:
  - функция getAllUsers() - должна вернуть текущий список всех пользователей в БД.
  
  - функция getUserById(id) - должна вернуть пользователя с переданным id.
  
  - функция addUser(name, age) - должна записывать в БД юзера с полями name и age.
  
  - функция removeUser(id) - должна удалять из БД юзера по указанному id.
  
  - функция updateUser(id, user) - должна обновлять данные пользователя по id. 
    user это объект с новыми полями name и age.
  Документацию по бэкенду и пример использования прочитайте 
  в документации https://github.com/trostinsky/users-api#users-api.
  Сделать минимальный графический интерфейс в виде панели с полями и кнопками. 
  А так же панелью для вывода результатов операций с бэкендом.
*/
'use strict'

const btnGetUsers = document.querySelector(".getUsers");

const btnGetUser = document.querySelector(".getUser");
const getUserId = document.querySelector(".get_user_id");

const addName = document.querySelector(".add_name");
const addAge = document.querySelector(".add_age");
const addBtn = document.querySelector(".addUser");

const removeId = document.querySelector(".remove_id");
const removeBtn = document.querySelector(".removeUser");

const updateId = document.querySelector(".update_id");
const updateName = document.querySelector(".update_name");
const updateAge = document.querySelector(".update_age");
const updateBtn = document.querySelector(".updateUser");

// const result = document.querySelector(".js-result");
const resultBody = document.querySelector(".js-tBody");
const table = document.querySelector("table");

const myModal = document.querySelector("#myModal");
const contentModal = document.querySelector(".modal-content");
const closeModal = document.querySelector(".close");
const textContentModal = document.querySelector(".text-content");

const loader = document.querySelector(".overlay-loader");


const restUrl = "https://test-users-api.herokuapp.com/users/";

btnGetUsers.addEventListener("click", getUsers);
btnGetUser.addEventListener("click", handleSubmitUser);
addBtn.addEventListener("click", handleSubmit);
removeBtn.addEventListener("click", handleDeleteUser);
updateBtn.addEventListener("click", handleUpdateUser);

//==================== MODAL WINDOW =========================
const createModalContent = text => {
    const makeupModal = `
        <h4>Notice:</h4>
        <p>${text}</p>
    `;
    return makeupModal;
};

const updateModalContent = markup => {
    textContentModal.innerHTML = markup;
};

closeModal.addEventListener('click', hideModal);
contentModal.addEventListener('click', handleModelClick);

  function handleModelClick(event) {
    if (this !== event.target) return;

    hideModal();
  }

  function showModal(message) {
      const markup =  createModalContent(message);
      updateModalContent(markup);
      myModal.style.display = 'block';
  }

  function hideModal() {
    myModal.style.display = 'none';
  }

//==================== LOADER  ==============================
const toggleLoader = () => loader.classList.toggle("visible_loader");

//==================== GET ALL USERS ========================
function getUsers(e) {
    e.preventDefault();
    table.classList.add = "visible";
   return fetch(restUrl, {
        method: 'GET'
    }).then(response => {
        if(response.ok) return response.json();

        throw new Error ('Error' + response.statusText);
    }).then(data => { 
        renderData(data)
        console.log(data);
    })
    .catch(error => console.log('Error:', error));
};

function renderData(data){
    table.classList.remove("visible");
    let users = data.data;
    let htmlString = '';
    users.forEach(user => 
        htmlString += `<tr>
                         <td>${user.id}</td>
                         <td>${user.name}</td>
                         <td>${user.age}</td>
                      </tr>`);
    resultBody.innerHTML += htmlString;
    
};

// function createUserCards(users) {
//     let htmlString = '';
//     return users.forEach(user => 
//         htmlString += `<tr>
//                          <td>${user.id}</td>
//                          <td>${user.name}</td>
//                          <td>${user.age}</td>
//                       </tr>`);
// };

// const updateUserCards = markup => {
//     resultBody.innerHTML = updateUserCards(markup);
// };

// function handleUsersSubmit (e) {
//     e.preventDefault();
//     toggleLoader();
//     getUsers().then(users => {
//         const markup = createUserCards(users);
//         updateUserCards(markup);
//         toggleLoader();
//     })

// }

//==================== GET ONE USER BY ID =========================
function getUser(id) {
    table.classList.add = "visible";
    return fetch(`${restUrl}${id}`)
    .then(response => {
        if(response.ok) return response.json();

        throw new Error ('Error' + response.statusText);
    })
    .then(data => {
        console.log(data);
        return data.data})
    .catch(error => console.log('Error:', error));
};

function createUserCard (user) {
    table.classList.remove("visible");
    const userCardMackup = `<tr>
                                <td>${user.id}</td>
                                <td>${user.name}</td>
                                <td>${user.age}</td>
                            </tr>`;
    resultBody.innerHTML = userCardMackup;
};

function handleSubmitUser(e) {
    e.preventDefault();

    const userId = getUserId.value;

    if(userId === '') return console.log("Fill in the fild!");
    
    getUser(userId).then(user => {
        if(user === undefined || user === null){
            console.log(`User with id ${userId} does not exised`);
        }
        createUserCard(user);
    })
    getUserId.value = '';
};

//==================== ADD NEW USER ========================
function addUser(name, age) {
    const newUser = {
        name,
        age
    };
    const options = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            },
        body: JSON.stringify(newUser)
    };


    return fetch(restUrl, options)
        .then(response => {
            if(response.ok) return response.json();
            throw new Error ('Error' + response.statusText);
        })
        .then(data => data.data)
        .catch(error => console.log('Error:', error));
} 
     
function handleSubmit(e) {
    e.preventDefault();

    const userName = addName.value;
    const userAge = addAge.value;

    if(userName === '' && userAge === '') {
        console.log("Fill in all the filds!");
    }
    else {
        addUser(userName, userAge).then(user => {
            showModal(`User ${userName} was added with age ${userAge}`);
            console.log(`User ${userName} was added with age ${userAge}`);
            return user;
        }) 
    }
    addName.value = '';
    addAge.value = '';
};

//==================== REMOVE USER BY ID ========================
function removeUser(id){
    const options = {
        method: "DELETE"
    };

    fetch(`${restUrl}${id}`, options)
        .then(response => {
            if(response.ok) return response.json();
            throw new Error ('Error' + response.statusText);
        })
        .then(data => {
            console.log(data);
            return data})
        .catch(error => console.log('Error:', error));
};

function handleDeleteUser(e){
    e.preventDefault();

    const userId = removeId.value;

    if(userId === '') return console.log("Fill in the fild!");
 
    removeUser(userId).then(user => {
        if(user === undefined || user === null){
            showModal(`User with id ${userId} does not exised`);
            // console.log(`User with id ${userId} does not exised`);
        }
        showModal(`User with id ${user.id} was deleted`); 
        // console.log(`User with id ${user.id} was deleted`);
    });
    removeId.value = '';
};

//==================== UPDATE USER WITH NAME & ID========================
function updateUser (name, age, id) {
    const newUser = {
        name,
        age
    };
    const options = {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            },
        body: JSON.stringify(newUser)
    };

    fetch(`${restUrl}${id}`, options)
        .then(response => {
            if(response.ok) return response.json();
            // console.log(response)
            throw new Error ('Error' + response.statusText);
        })
        .then(data => data)
        .catch(error => console.log('Error:', error));
};

function handleUpdateUser(e) {
    e.preventDefault();
    const userId = updateId.value;
    const userName = updateName.value;
    const userAge = updateAge.value;

    if(userId === '' && userName === '' && userAge === '') {
        console.log("Fill in all the filds!");
    }
    else {
        updateUser(userName, userAge, userId).then(user => {
            if(user === undefined) {
                showModal(`User with id ${userId} does not exised`);
                // console.log(`User with id ${userId} does not exised`);
            }  
            showModal(`User ${userName} was updated with age ${userAge} and ${userId}`);
            // console.log(`User ${userName} was updated with age ${userAge} and ${userId}`);
            return user; 
        })

    }
    userId.value = '';
    userName.value = '';
    userAge.value = '';
};