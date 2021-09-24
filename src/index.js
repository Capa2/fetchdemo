import "./style.css"
import "bootstrap/dist/css/bootstrap.css"
import jokeFacade from "./jokeFacade"
import userFacade from "./userFacade"

document.getElementById("all-content").style.display = "block"

/* 
  Add your JavaScript for all exercises Below or in separate js-files, which you must the import above
*/

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
function getAll() {
  userFacade.getUsers()
    .then(users => {
      const userRows = users.map(user => `
      <tr>
      <td>${user.id}</td>
      <td>${user.age}</td>
      <td>${user.name}</td>
      <td>${user.gender}</td>
      <td>${user.email}</td>
      </tr>
    `)
      const userRowsAsString = userRows.join("");
      document.getElementById("allUserRows").innerHTML = userRowsAsString;
    });
}
getAll();
// GET SINGLE
document.getElementById("findBtn").addEventListener("click", function () {
  userFacade.getUser(document.getElementById("findThisId").value)
    .then(user => {
      if (user.id > 0) {
        document.getElementById("foundUser").innerHTML = `Id: ${user.id} <br> Name: ${user.name} <br> Age: ${user.age} <br> Gender: ${user.gender} <br> Email: ${user.email}`;
        document.getElementById("foundUser").classList.remove("alert-danger");
        document.getElementById("foundUser").classList.add("alert-info");
      } else {
        document.getElementById("foundUser").innerHTML = "Failed to get user";
        document.getElementById("foundUser").classList.add("alert-danger");
        document.getElementById("foundUser").classList.remove("alert-info");
      }
      document.getElementById("findThisId").value = "";
    });
});

// ADD
document.getElementById("addBtn").addEventListener("click", function () {
  const user = {
    name: document.getElementById("addUserName").value,
    age: document.getElementById("addUserAge").value,
    gender: document.getElementById("addUserGender").value,
    email: document.getElementById("addUserEmail").value
  };
  userFacade.addUser(user).then(status => {
    if (status == 200) {
      document.getElementById("addStatus").innerHTML = "Succesfully added id user " + user.name;
      document.getElementById("addStatus").classList.remove("alert-danger");
      document.getElementById("addStatus").classList.add("alert-success");
    } else {
      document.getElementById("addStatus").innerHTML = "Failed to add user " + user.name;
      document.getElementById("addStatus").classList.remove("alert-success");
      document.getElementById("addStatus").classList.add("alert-danger");
    }
    document.getElementById("addUserName").value = "";
    document.getElementById("addUserAge").value = "";
    document.getElementById("addUserGender").value = "";
    document.getElementById("addUserEmail").value = "";
    getAll();
  });
});

// EDIT
document.getElementById("editBtn").addEventListener("click", function () {
  const user = {
    id: document.getElementById("editUserId").value,
    name: document.getElementById("editUserName").value,
    age: document.getElementById("editUserAge").value,
    gender: document.getElementById("editUserGender").value,
    email: document.getElementById("editUserEmail").value
  };
  const status = userFacade.editUser(user).then(status => {
    if (status == 200) {
      document.getElementById("editStatus").innerHTML = "Succesfully updated id: " + user.id;
      document.getElementById("editStatus").classList.remove("alert-danger");
      document.getElementById("editStatus").classList.add("alert-success");
    } else {
      document.getElementById("editStatus").innerHTML = "Failed to update id: " + user.id;
      document.getElementById("editStatus").classList.remove("alert-success");
      document.getElementById("editStatus").classList.add("alert-danger");
    }
    document.getElementById("editUserName").value = "";
    document.getElementById("editUserAge").value = "";
    document.getElementById("editUserGender").value = "";
    document.getElementById("editUserEmail").value = "";
    getAll();
  });
});

// DELETE
document.getElementById("delBtn").addEventListener("click", function () {
  const id = document.getElementById("delThisId").value;
  userFacade.deleteUser(id).then(status => {
    if (status == 200) {
      document.getElementById("delStatus").innerHTML = "Succesfully deleted id: " + id;
      document.getElementById("delStatus").classList.remove("alert-danger");
      document.getElementById("delStatus").classList.add("alert-success");
    } else {
      document.getElementById("delStatus").innerHTML = "Failed to delete id: " + id;
      document.getElementById("delStatus").classList.remove("alert-success");
      document.getElementById("delStatus").classList.add("alert-danger");
    }
    document.getElementById("delThisId").value = "";
    getAll();
  });
});
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



