// Promises com Axios | Async - Await
import axios from "axios"
// Usando de forma simples
axios.get("https://api.github.com/users/moutinhofuturedev")
.then(response => axios.get(response.data.repos_url)) // fazendo uma nova chamada
.then(repositories => console.log(repositories.data)) // devolvendo um array com a quantidade de repositórios

// Usando async/await dentro de uma function
async function showApi() { //função assíncrona
  const response = await axios.get("https://api.github.com/users/moutinhofuturedev")
  const data = await response.data

  const callingAgain = await axios.get(data.repos_url) // nova chamada passando os repositórios

  return document.querySelector('#app').innerHTML = `${callingAgain.data.length} repositórios`
}

showApi().then(repo => {
  repo
}).catch(err => {
  console.log(err)
})

// PROMISE ALL
// Executando Promessas em paralelo com Promise All (duas promessas sendo executada juntas)
Promise.all([
  axios.get("https://api.github.com/users/moutinhofuturedev"),
  axios.get("https://api.github.com/users/moutinhofuturedev/repos")
]).then(
  respos => {
    console.log(respos[0].data.company)
    console.log(`${respos[1].data.length} repositories`)
  }
).finally(() => {
  console.log('Finalizou!')
})

// ASYNC/AWAIT
// => uma maneira de escrever promises
// => syntactic sugar: trocar then por await         

const aPromise = new Promise((resolve, reject) => {
  return resolve('ok')
})

async function start() {
  const result = await aPromise
  console.log(`Nova promessa ${result}`)
}

start()

// ASYNC/AWAIT
// => exemplo com fatch

// fetch('https://api.github.com/users/moutinhofuturedev')
// .then(response => response.json())
// .then(data => fetch(data.repos_url))
// .then(res => res.json())
// .then(d => console.log(d))  => desse jeito funciona mas não é o adequado

// maneira melhor de escrever uma promoses  
async function starting() {
  const response = await fetch('https://api.github.com/users/moutinhofuturedev').then(res => res.json())
  const reposResponse = await fetch(response.repos_url).then(repo => repo.json())

  return console.log(reposResponse)
}

starting()

// ASYNC/AWAIT
// => exemplo com Axios

async function fecthRepos() {
  const user = await axios.get('https://api.github.com/users/moutinhofuturedev')
  const repos = await axios.get(user.data.repos_url)

  return console.log(repos)
}

fecthRepos()
