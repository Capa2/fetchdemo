const url = "http://localhost:3333/api/users";

function getUser(id) {
}

function getUsers() {
  return fetch(url)
    .then(res => res.json());
}

function addUser(user) {
}

function editUser(id){
}

function deleteUser(id){
}

const userFacade = {
  getUser,
  getUsers,
  addUser,
  editUser,
  deleteUser,
}

export default userFacade;