import "./style.css"
import "bootstrap/dist/css/bootstrap.css"
import jokeFacade from "./jokeFacade"
import userFacade from "./userFacade"

document.getElementById("all-content").style.display = "block"

/* JS For Exercise-1 below */
function makeListItems() {
  const jokes = jokeFacade.getJokes();
  let jokeLis = jokes.map(joke => "<li>" + joke + "</li>"); // alternative: `<li> ${joke} </li>`
  const listItemAsStr = jokeLis.join("");
  document.getElementById("jokes").innerHTML = listItemAsStr;
}
makeListItems();
/* JS For Exercise-2 below */
function loadChuckJoke() {
  fetch('https://api.chucknorris.io/jokes/random')
    .then(response => response.json())
    .then(data => document.getElementById("ex2p").innerHTML = JSON.stringify(data.value));
}
loadChuckJoke();
document.getElementById("ex2b").onclick = loadChuckJoke;

/* JS For Exercise-3 below */
// GET ALL
function updateUserList() {
  userFacade.getUsers()
    .then(users => {
      const userRows = users.map(user => `<tr>
      <td>${user.id}</td>
      <td>${user.age}</td>
      <td>${user.name}</td>
      <td>${user.gender}</td>
      <td>${user.email}</td></tr>`)
      const userRowsAsString = userRows.join("");
      document.getElementById("allUserRows").innerHTML = userRowsAsString;
    });
}
updateUserList();
// GET SINGLE
document.getElementById("getBtn").addEventListener("click", function () {
  userFacade.getUser(document.getElementById("getTarget").value)
    .then(user => {
      if (user != undefined) updateAlert("getUserAlert", "info", `Id: ${user.id} <br> Name: ${user.name} <br> Age: ${user.age} <br> Gender: ${user.gender} <br> Email: ${user.email}`);
      else updateAlert("getUserAlert", "fail", "Failed to get user");
      document.getElementById("getTarget").value = "";
    });
});

// ADD
document.getElementById("addBtn").addEventListener("click", function () {
  const user = buildUserFromInputs("addUserInput");
  userFacade.addUser(user).then(res => {
    if (res != undefined) updateAlert("addUserAlert", "success", "Succesfully added id user " + user.name);
    else updateAlert("addUserAlert", "fail", "Failed to add user " + user.name);
    var addUserInputs = document.getElementsByClassName("addUserInput");
    updateUserList();
  });
});

// EDIT
document.getElementById("editBtn").addEventListener("click", function () {
  const user = buildUserFromInputs("editUserInput");
  userFacade.editUser(user).then(res => {
    if (res != undefined) updateAlert("editUserAlert", "success", "Succesfully updated id: " + user.id);
    else updateAlert("editUserAlert", "fail", "Failed to update id: " + user.id);
    updateUserList();
  });
});

// DELETE
document.getElementById("delBtn").addEventListener("click", function () {
  const id = document.getElementById("delTarget").value;
  userFacade.deleteUser(id).then(res => {
    if (res != undefined) updateAlert("delUserAlert", "success", "Succesfully deleted id: " + id);
    else updateAlert("delUserAlert", "fail", "Failed to delete id: " + id);
    document.getElementById("delTarget").value = "";
    updateUserList();
  });
});

function buildUserFromInputs(inputClass) {
  let user = new Object;
  let inputs = document.getElementsByClassName(inputClass);
  for (let input of inputs) {
    user[input.getAttribute("name")] = input.value;
    input.value = "";
  }
  return user;
}

function updateAlert(id, status, text) {
  document.getElementById(id).innerHTML = text;
  document.getElementById(id).classList.remove("alert-success");
  document.getElementById(id).classList.remove("alert-danger");
  document.getElementById(id).classList.remove("alert-info");
  switch (status) {
    case "success":
      document.getElementById(id).classList.add("alert-success"); break
    case "fail":
      document.getElementById(id).classList.add("alert-danger"); break
    default:
      document.getElementById(id).classList.add("alert-info"); break
  }
}
/* 
Do NOT focus on the code below, UNLESS you want to use this code for something different than
the Period2-week2-day3 Exercises
*/

function hideAllShowOne(idToShow) {
  document.getElementById("about_html").style = "display:none"
  document.getElementById("ex1_html").style = "display:none"
  document.getElementById("ex2_html").style = "display:none"
  document.getElementById("ex3_html").style = "display:none"
  document.getElementById(idToShow).style = "display:block"
}

function menuItemClicked(evt) {
  const id = evt.target.id;
  switch (id) {
    case "ex1": hideAllShowOne("ex1_html"); break
    case "ex2": hideAllShowOne("ex2_html"); break
    case "ex3": hideAllShowOne("ex3_html"); break
    default: hideAllShowOne("about_html"); break
  }
  evt.preventDefault();
}
document.getElementById("menu").onclick = menuItemClicked;
hideAllShowOne("about_html");



