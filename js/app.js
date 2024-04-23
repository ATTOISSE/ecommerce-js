let tablePanier = [];
const contenu = document.querySelector('#contenu');
const card_panier = document.querySelector('#card_panier');

let tableProduit = [
    {
        id: 1,
        image: 'img/image1.jpg',
        libelle : 'Mackbook Pro',
        prix : 300000,
        stock: 10
    },
    {
        id: 2,
        image: 'img/image2.jpg',
        libelle : 'Dell Pro',
        prix : 200000,
        stock: 15
    },
    {
        id: 3,
        image: 'img/image3.jpg',
        libelle : 'HP ',
        prix : 350000,
        stock: 11
    },
    {
        id: 4,
        image: 'img/image4.jpg',
        libelle : 'Mackbook ',
        prix : 250000,
        stock: 13
    },
    {
        id: 5,
        image: 'img/image5.jpg',
        libelle : 'Jeu video ',
        prix : 250000,
        stock: 20
    }
];


function loadProduct() {
    for (let index = 0; index < tableProduit.length; index++) {
        const element = tableProduit[index];
        contenu.innerHTML += `
       
        <div  class="card col-md-3 " style="width: 18rem;">
        <img class="card-img-top" src="${element.image}" alt="Card image cap">
        <div class="card-body">
          <p class="card-text"> Nom : <b>${element.libelle}</b></p>
          <p class="card-text">Prix : <b class="text-primary">${element.prix} € </b></p>
          <p class="card-text">Stock : <b>${element.stock} </b></p>
        </div>
        <button class=" btn  btn-outline-primary" onclick="addCart('${element.id}')">AJouter au panier</button>
      </div>
        `
    }
}

function addCart(product) {
    tablePanier.push(product);
}

function showCart() {
    for (let index = 0; index < tablePanier.length; index++) {
        const element = tablePanier[index];
        let product = tableProduit.find(a => a.id == element)
    }
}