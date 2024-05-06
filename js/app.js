
let tablePanier = [];
const nom = document.getElementById('nom');
const infos = document.getElementById('infos')
const prenom = document.getElementById('prenom');
const envoie = document.getElementById('envoie');
const adresse = document.getElementById('adresse');
const commander = document.getElementById('commander');
const table = document.getElementById('table')

let tableProduit = [
    {
        id: 1,
        image: '../img/image1.jpg',
        libelle: 'Mackbook Pro',
        prix: 300000,
        stock: 10
    },
    {
        id: 2,
        image: '../img/image2.jpg',
        libelle: 'Dell Pro',
        prix: 200000,
        stock: 15
    },
    {
        id: 3,
        image: '../img/image3.jpg',
        libelle: 'HP ',
        prix: 350000,
        stock: 11
    },
    {
        id: 4,
        image: '../img/image4.jpg',
        libelle: 'Mackbook ',
        prix: 250000,
        stock: 13
    },
    {
        id: 5,
        image: '../img/image5.jpg',
        libelle: 'Jeu video ',
        prix: 250000,
        stock: 20
    },
    {
        id: 6,
        image: '../img/image6.jpg',
        libelle: 'Souris',
        prix: 2500,
        stock: 14
    }
];

function desactiveBtn(id) {
    btn = document.querySelector(`#btnAjout-${id}`)
    btn.setAttribute('disabled','')
}

function alertMessage(){
    let alert = document.querySelector('.alert')
    setTimeout(() => {
        alert.removeAttribute('hidden')
    }, 10);

    setTimeout(() => {
        alert.setAttribute('hidden','')
    }, 3000);
}

qte.value = 1
let elements = []
function addCart(product) {
    elements.push(product)
    tablePanier = Array.from(new Set(elements)); 
    qte.textContent = tablePanier.length;
    alertMessage()
    desactiveBtn(product)
}

function add(id,alerte){
    alerte = document.getElementById('alerte')
    addCart(id)
    alerte.removeAttribute('hidden')
    window.scrollTo({
        top : alerte.offsetTop,
        behavior : 'smooth'
    })
}

function loadProduct() {
    for (let index = 0; index < tableProduit.length; index++) {
        const element = tableProduit[index];
        contenu.innerHTML += `
        <div  class="card col-md-3 mx-3 mt-3 product" data-id="'${element.id}'" style="width: 18rem;">
        <img class="card-img-top"  src="${element.image}" width="180" height="180" alt="Card image cap">
        <div class="card-body">
          <p class="card-text"> Nom : <b>${element.libelle}</b></p>
          <p class="card-text">Prix : <b class="text-primary">${element.prix} € </b></p>
          <p class="card-text">Stock : <b id="stock-${element.id}">${element.stock} </b></p>
          <div class="row">
          <span class="col-md-4"> Qte </span> <button class="btn btn-danger " id="moins-${element.id}" onclick="removeQuantity('${element.id}')">-</button>
            <input type="text" id="quantite-${element.id}" class="mx-1" min="1" max="10" value="0" style="width: 30px;border: none;padding-left:10px">
            <button class="btn btn-primary" id="plus-${element.id}" onclick="addQuantity('${element.id}')">+</button>
            <p class="text-danger" hidden id="qteFini-${element.id}"> </p>
          </div>
        </div>
        <button class="btn  btn-info my-1" disabled id="btnAjout-${element.id}" onmouseenter="btnActive('${element.id}')" onclick="add('${element.id}','alerte')">AJouter au panier</button>
      </div> `
    }
}

function showCart() {
    montant = 0
    table.innerHTML = "";
    for (let index = 0; index < tablePanier.length; index++) {
        const element = tablePanier[index];
        var product = tableProduit.find(a => a.id == element)
        var qte = document.getElementById(`quantite-${product.id}`).value
        montant += qte * product.prix
        table.innerHTML += `
        <tr>
        <td id="img-${product.id}"><img src="${product.image}" alt="image" width="100" height="80" ></td>
        <td>${product.libelle}</td>
        <td id="montant-${product.id}">${product.prix} </td>
        <td id="qte-${product.id}">${qte}</td>
        <td id="btnRetire-${product.id}">
        <button class="btn btn-danger bi bi-trash" id="btnRetrait-${product.id}" onclick="removed('${product.id}')"></button>
        </td>
      </tr>
    `
    }
    total.innerHTML =`
    <tr>
    <td colspan="2">Total</td>
    <td  id="totale">${montant}</td>
    </tr>
    ` 
}


function initializeVariable(id){
    btn = document.querySelector(`#btnAjout-${id}`)
    var plus = document.getElementById(`plus-${id}`)
    var product = tableProduit.find(a => a.id == id)
    var moins = document.getElementById(`moins-${id}`)
    var stock = document.getElementById(`stock-${id}`)
    var qteFini = document.getElementById(`qteFini-${id}`)
    var quantite = document.getElementById(`quantite-${id}`)
    return { plus, moins, qteFini, quantite, stock, product,btn }
}

function addQuantity(id) {
    var { plus, moins, qteFini, quantite, stock,product,btn} = initializeVariable(id) 
    btn.removeAttribute('disabled')
    quantite.style.color = '#007bff'

    if (quantite.value < product.stock) {
        quantite.value++;
        qteFini.setAttribute('hidden','')
        moins.removeAttribute('disabled')
    }
    else{
        plus.setAttribute('disabled','')
        qteFini.textContent = 'quantité fini'
        qteFini.removeAttribute('hidden')
        return
    }  
    stock.textContent--;
}

function removeQuantity(id) {
    var { plus, moins, qteFini, quantite, stock,product,btn} = initializeVariable(id) 
    btn.removeAttribute('disabled')
    if (quantite.value > 1) {
        quantite.value--;
        qteFini.setAttribute('hidden','')
        plus.removeAttribute('disabled')
        stock.textContent++;
    }
    else if (stock.textContent == product.stock - 1) {
        stock.textContent++;
    }
    else{
        quantite.style.color = 'red'
        moins.setAttribute('disabled','');
        qteFini.textContent = ' quantité impossible';
        qteFini.removeAttribute('hidden')
    } 
}

function btnActive(id){ 
    var {qteFini, btn} = initializeVariable(id) 
    if (btn.hasAttribute('disabled')) { 
        qteFini.removeAttribute('hidden')
        qteFini.textContent = 'choisi la quantité'
        setTimeout(() => {
            qteFini.setAttribute('hidden','')
        }, 2000); 
    }
}

function removed(id){
    let btn = document.getElementById(`btnRetrait-${id}`);
    let qte = document.getElementById(`qte-${id}`).textContent;
    var montant = document.getElementById('totale').textContent
    console.log(montant);
    let tdMontant = document.getElementById(`montant-${id}`);
    let demande = confirm('Voulez-vous vraiment supprimer ???');
    if (demande){ 
        montant -= parseInt(tdMontant.textContent) * qte;
        console.log(montant);
        document.getElementById('totale').textContent = montant
        btn.parentElement.parentElement.remove();
    } 
}

function showInformation(){
    let info = document.getElementById('info')
    infos.removeAttribute('hidden')
    info.innerHTML +=`
    <tr>
        <td>${nom.value}</td>
        <td>${prenom.value}</td>
        <td>${adresse.value}</td>
        <td>${new Date().toLocaleDateString()}</td>
    </tr>
    `
}

(document.getElementById('btnPanier')).addEventListener('click',()=>{
    infos.setAttribute('hidden','')
    commander.textContent = 'Commander'
})

envoie.addEventListener('click',()=>{
    const annonce = document.getElementById('annonce')
    infos.removeAttribute('hidden')
    commander.textContent = 'Telecharger'
    annonce.textContent = 'Votre Commande'
    fieldHidden()
    showInformation()
})

function fieldHidden(){
    for (const i of tablePanier) {
        document.getElementById(`img-${i}`).setAttribute('hidden','')
        document.getElementById(`btnRetire-${i}`).setAttribute('hidden','')
    }
    image = document.getElementById('image')
    action = document.getElementById('action')
    image.setAttribute('hidden','')
    action.setAttribute('hidden','')
}

function convertirEnPDF() {
    const container = document.body;
    const options = {
        margin: 0.5,
        filename: 'commande.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    html2pdf().from(container).set(options).save();
}

commander.addEventListener('click',()=>{
    if (commander.textContent == 'Telecharger') {
        convertirEnPDF()
        commander.removeAttribute('data-target')
    }
})

function verifyFirstName(){
    const nomInvalid = document.getElementById('nomInvalid')
    if (nom.value.trim() == '') {
        nomInvalid.removeAttribute('hidden')
        nom.style.borderColor = 'red'
        return false
    }else{
        nomInvalid.setAttribute('hidden','')
        nom.style.borderColor = 'gray'
        return true
    }
}

function verifyLastName(){
    const prenomInvalid = document.getElementById('prenomInvalid')
    if (prenom.value.trim() == '') {
        prenomInvalid.removeAttribute('hidden')
        prenom.style.borderColor = 'red'
        return false
    }else{
        prenomInvalid.setAttribute('hidden','')
        prenom.style.borderColor = 'gray'
        return true
    }
}

function verifyAddress(){
    const adresseInvalid = document.getElementById('adresseInvalid')
    if (adresse.value.trim() == '') {
       adresseInvalid.removeAttribute('hidden')
        adresse.style.borderColor = 'red'
        envoie.setAttribute('disabled','')
    }else{
       adresseInvalid.setAttribute('hidden','')
        adresse.style.borderColor = 'gray'
        envoie.removeAttribute('disabled')
    }
}
