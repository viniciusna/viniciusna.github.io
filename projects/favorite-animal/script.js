function getId (id) {
    return document.getElementById(id)
}

function write(id, text) {
    return getId(id).innerHTML = text
}

function applyImage (id, src) {
    getId(id).src = src
}

function linkar(id, href) {
    return getId(id).href = href
}

//section #presentation

getId("presentation").style.backgroundImage = "url('https://www.premierpet.com.br/wp-content/uploads/2020/10/banner-gato-1-1.jpg')"

write('title', "A melhor espécie <br> do universo ")
getId('title').style.color = 'whitesmoke'

//section #description
linkar("wiki", "https://pt.wikipedia.org/wiki/Gato")

//section #images-container

applyImage('image1', "images/img1.jpg")
applyImage('image2', "images/img2.jpg")
applyImage('image3', "images/img3.jpg")
applyImage('image4', "images/img4.jpg")
applyImage('image5', "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPwG-u1CF5huUuXtlOozphz1k4wuooqLZS7A&usqp=CAU")
applyImage('image6', "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRGgKmvCJ9a7XMbh92gxUTqgsd9cBvB0Zr1w&usqp=CAU")

//section #emmy-container

applyImage('emmy-photo1', "images/photo1.jpg")
applyImage('emmy-photo2', "images/photo2.jpg")
applyImage('emmy-photo3', "images/photo3.jpg")

linkar("emmy-link", "https://pt.wikipedia.org/wiki/Emmy_Noether")
linkar("theorem-link", "https://pt.wikipedia.org/wiki/Teorema_de_Noether")