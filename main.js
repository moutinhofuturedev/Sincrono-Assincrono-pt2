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

