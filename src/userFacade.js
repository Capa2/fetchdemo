import httpUtil from "./httpUtil.js"

const url = "http://localhost:3333/api/users"

function getUsers() {
  return fetch(url)
    .then(res => httpUtil.handleHttpErrors(res))
    .catch(httpUtil.errCatch);
}

function getUser(id) {
  return fetch(url + "/" + id)
    .then(res => httpUtil.handleHttpErrors(res))
    .catch(httpUtil.errCatch);
}

function addUser(user) {
  return fetch(url, httpUtil.makeOptions("POST", user))
    .then(res => httpUtil.handleHttpErrors(res))
    .catch(httpUtil.errCatch);
}

function editUser(user){
  fetch(url + "/" + user.id, httpUtil.makeOptions("PUT", user))
  .then(res => httpUtil.handleHttpErrors(res))
  .catch(httpUtil.errCatch);
}

function deleteUser(id){
  return fetch(url + "/" + id, httpUtil.makeOptions("DELETE"))
  .then(res => httpUtil.handleHttpErrorsGetStatus(res))
  .catch(httpUtil.errCatch);
}

const userFacade = {
  getUser,
  getUsers,
  addUser,
  editUser,
  deleteUser,
}

export default userFacade;