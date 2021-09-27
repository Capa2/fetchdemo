import "./style.css";
import "bootstrap/dist/css/bootstrap.css";
import jokeFacade from "./jokeFacade";
import userFacade from "./userFacade";

document.getElementById("all-content").style.display = "block";

/* JS For Exercise-1 below */
function makeListItems() {
	const jokes = jokeFacade.getJokes();
	const jokeLis = jokes.map((joke) => "<li>" + joke + "</li>");
	const listItemAsStr = jokeLis.join("");
	document.getElementById("jokes").innerHTML = listItemAsStr;
}
makeListItems();
/* JS For Exercise-2 below */
function loadChuckJoke() {
	fetch("https://api.chucknorris.io/jokes/random")
		.then((response) => response.json())
		.then(
			(data) =>
				(document.getElementById("ex2p").innerHTML = JSON.stringify(data.value))
		);
}
loadChuckJoke();
document.getElementById("ex2b").onclick = loadChuckJoke;

/* JS For Exercise-3 below */
// HELPER FUNCTIONS
function buildUserFromInputs(inputClass) {
	const user = new Object();
	const inputs = document.getElementsByClassName(inputClass);
	for (let input of inputs) {
		user[input.getAttribute("name")] = input.value;
		input.value = "";
	}
	return user;
}

function setAlert(id, status, text) {
	const alert = document.getElementById(id);
	alert.innerHTML = text;
	alert.classList.remove("alert-success");
	alert.classList.remove("alert-danger");
	alert.classList.remove("alert-info");
	switch (status) {
		case "success":
			alert.classList.add("alert-success");
			break;
		case "fail":
			alert.classList.add("alert-danger");
			break;
		default:
			alert.classList.add("alert-info");
			break;
	}
}

// CREATE/UPDATE USER LIST
function updateUserList() {
	const usertable = document.querySelector("#allUserRows");
	const scrollBox = document.querySelector(".pre-scrollable");
	const scrollPos = scrollBox.scrollTop;
	usertable.innerHTML = "";
	userFacade.getUsers().then((users) => {
		users.map((user) => {
			const row = document.createElement("tr");
			const columns = [];
			const attr = [user.id, user.age, user.name, user.gender, user.email];
			for (let i = 0; i < attr.length; i++) {
				columns.push(document.createElement("td"));
				const text = document.createTextNode(attr[i]);
				columns[i].appendChild(text);
				row.appendChild(columns[i]);
			}
			usertable.insertAdjacentElement("beforeend", row);
		});
		scrollBox.scrollTop = scrollPos;
	});
}
updateUserList();

// GET USER
document.getElementById("getBtn").addEventListener("click", () => {
	var targetId = document.getElementById("getTarget").value;
	userFacade.getUser(targetId).then((user) => {
		if (user != undefined) {
			setAlert(
				"getUserAlert",
				"info",
				`Id: ${user.id} <br> Name: ${user.name} <br> Age: ${user.age} <br> Gender: ${user.gender} <br> Email: ${user.email}`
			);
		} else {
			setAlert("getUserAlert", "fail", "Failed to get user id: " + targetId);
		}
		targetId = "";
	});
});

// ADD USER
document.getElementById("addBtn").addEventListener("click", () => {
	const user = buildUserFromInputs("addUserInput");
	userFacade.addUser(user).then((res) => {
		if (res != undefined) {
			setAlert(
				"addUserAlert",
				"success",
				"Succesfully added user " + user.name
			);
		} else {
			setAlert("addUserAlert", "fail", "Failed to add user " + user.name);
		}
		updateUserList();
	});
});

// EDIT USER
document.getElementById("editBtn").addEventListener("click", () => {
	const user = buildUserFromInputs("editUserInput");
	userFacade.editUser(user).then((res) => {
		if (res != undefined) {
			setAlert(
				"editUserAlert",
				"success",
				"Succesfully updated id: " + user.id
			);
		} else {
			setAlert("editUserAlert", "fail", "Failed to update id: " + user.id);
		}
		updateUserList();
	});
});

// DELETE USER
document.getElementById("delBtn").addEventListener("click", () => {
	let targetId = document.getElementById("delTarget").value;
	userFacade.deleteUser(targetId).then((res) => {
		if (res != undefined) {
			setAlert(
				"delUserAlert",
				"success",
				"Succesfully deleted id: " + targetId
			);
		} else {
			setAlert("delUserAlert", "fail", "Failed to delete id: " + targetId);
		}
		targetId = "";
		updateUserList();
	});
});

// SITE NAVIGATION
function hideAllShowOne(idToShow) {
	document.getElementById("about_html").style = "display:none";
	document.getElementById("ex1_html").style = "display:none";
	document.getElementById("ex2_html").style = "display:none";
	document.getElementById("ex3_html").style = "display:none";
	document.getElementById(idToShow).style = "display:block";
}

function menuItemClicked(evt) {
	const id = evt.target.id;
	switch (id) {
		case "ex1":
			hideAllShowOne("ex1_html");
			break;
		case "ex2":
			hideAllShowOne("ex2_html");
			break;
		case "ex3":
			hideAllShowOne("ex3_html");
			break;
		default:
			hideAllShowOne("about_html");
			break;
	}
	evt.preventDefault();
}
document.getElementById("menu").onclick = menuItemClicked;
hideAllShowOne("about_html");
