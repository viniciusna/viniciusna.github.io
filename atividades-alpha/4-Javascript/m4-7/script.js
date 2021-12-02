const myName = document.querySelector('#name')
const age = document.getElementById('age')
const state = document.getElementById('state')
const photo = document.getElementById('photo')

myName.innerHTML = 'Vinicius'
age.innerHTML = '23 anos'
state.innerHTML = 'Minas Gerais'
photo.src = 'https://conteudo.imguol.com.br/c/entretenimento/fd/2021/01/04/gato-1609773071379_v2_450x337.jpg'

const sections = document.querySelector('.sections')
const band = document.getElementById('band')
const gender = document.getElementById('gender')
const links = document.querySelectorAll('.links')
const images = document.querySelectorAll('.images')


band.innerHTML = 'Banda favorita: Death'
gender.innerHTML = "Gênero: death metal"
links[0].target = 'blank';
links[1].target = 'blank';

for (i = 0; i < images.length; i++) {
    images[i].style.width = '300px';
}

const span = document.querySelector('span')

span.style.margin = '20px 0 0'
span.style.fontSize = '18px'
span.style.color = 'whitesmoke'