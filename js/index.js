// Elementos
const form = document.querySelector('#form')
const formEdit = document.querySelector('#formEdit')
const tbody = document.querySelector('#tbody')
const btnSubmitForm = document.querySelector('.btnSubmitForm')
const btnUpdateForm = document.querySelector('.btnUpdateForm')
const btnDelete = document.querySelector('.btnDelete')
const btnCancel = document.querySelector('.btnCancel')
const btnClose = document.querySelector('.btnClose')

// All Users
let allUsers = []

// Funções
function createTable() {
  tbody.innerHTML = '';

  for (let i = 0; i < allUsers.length; i++) {
    let tr = tbody.insertRow();
    let td_id = tr.insertCell();
    let td_name = tr.insertCell();
    let td_email = tr.insertCell();
    let td_actions = tr.insertCell();

    td_id.innerText = allUsers[i].id;
    td_id.classList.add('id');
    td_name.innerText = allUsers[i].name;
    td_email.innerText = allUsers[i].email;

    td_actions.classList.add('btnsAction');
    td_actions.innerHTML = `
      <button onclick="removeUser(${allUsers[i].id})" class="btn btnDelete"><i class="bi bi-trash-fill"></i></button>
      <button onclick="updateUser(${i})" class="btn btnUpdate"><i class="bi bi-pencil-fill"></i></button>
    `;
  }
}


function addUser(nameValue, emailValue) {
  const idUser = (Math.random() * 100_000_000).toFixed(0)
  console.log("Nome: " + nameValue)
  console.log("E-mail: " + emailValue)

  allUsers.push({
    id: idUser,
    name: nameValue,
    email: emailValue,
  })

  createTable()
}

// Deletar
function removeUser(id) {
  if (confirm('Deseja mesmo DELETAR este usuário?')) {
    for (let i = 0; i < allUsers.length; i++) {
      if (allUsers[i].id == id) {
        allUsers.splice(i, 1)
        tbody.deleteRow(i)
      }
    }
  }
}


// Update
function updateUser(index) {
  const nameEdit = document.querySelector('#nameEdit')
  const emailEdit = document.querySelector('#emailEdit')
  formEdit.style.display = 'flex'

  nameEdit.value = allUsers[index].name
  emailEdit.value = allUsers[index].email

  btnUpdateForm.addEventListener("click", () => {
    // Atualize os valores no array allUsers
    allUsers[index].name = nameEdit.value
    allUsers[index].email = emailEdit.value

    // Atualize os valores na tabela
    updateTable()

    formEdit.style.display = 'none'
  })
}


function updateTable() {
  createTable()
}


// Eventos
// Submit
form.addEventListener("submit", (e) => {
  e.preventDefault()

  const name = document.querySelector('#name')
  const email = document.querySelector('#email')
  const alertSuccess = document.querySelector('.alertSuccess')

  const nameValue = name.value
  const emailValue = email.value

  if (nameValue == '' || emailValue == '') {
    alert('Digite o nome ou/e o e-mail do usuário!')
    return
  }

  addUser(nameValue, emailValue)

  alertSuccess.classList.add('open')

  function closeAlertTimer(timer) {
    setInterval(() => {
      alertSuccess.classList.remove('open')
    }, timer)
  }

  closeAlertTimer(5000)

  name.value = ''
  email.value = ''
})

// update
formEdit.addEventListener("submit", (e) => {
  e.preventDefault()
})

btnClose.addEventListener("click", () => {
  formEdit.style.display = 'none'
})

// btn Cancelar
btnCancel.addEventListener("click", () => {
  const name = document.querySelector('#name')
  const email = document.querySelector('#email')

  name.value = ''
  email.value = ''
})

// btn close alert
const bi_x_lg = document.querySelector('.bi-x-lg')
bi_x_lg.addEventListener('click', () => {
  const alertSuccess = document.querySelector('.alertSuccess')
  alertSuccess.classList.remove('open')
})