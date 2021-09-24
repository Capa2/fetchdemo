import "./style.css"
import "bootstrap/dist/css/bootstrap.css"
import "./jokeFacade"
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

/* JS For Exercise-3 below */
userFacade.getUsers()
  .then(users=>{
    const userRows = users.map(user =>`
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
  })
  
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



