// ------------------------VARIABLES----------------------------

//Navegacion del slider productos
const productContainers = document.querySelectorAll('.product-container');
const nxtBtn = document.querySelectorAll('.nxt-btn');
const preBtn = document.querySelectorAll('.pre-btn');

//Carrito
const listaProductos = document.querySelector('#products')
const contCarritoW = document.querySelector('#contadorW')
const contCarritoM = document.querySelector('#contadorM')
let cantProductos = 0
let contLocal = localStorage.getItem('contLocal',cantProductos)


const form = document.querySelector('.form')
listeners()
contadorCarrito()
obtenerProductos()

//eventos
function listeners(){
    
    listaProductos.addEventListener('click',ev=>{
        cantProductos += 1 
        contCarritoW.innerHTML = cantProductos
        contCarritoM.innerHTML = cantProductos
        localStorage.setItem('contLocal',cantProductos)
    })
    enviar.addEventListener('click',validarCampos)
}

// verifica si hay articulos contados en el carrito y si es así lo muestra
 function contadorCarrito(){
    if(contLocal != null){
        cantProductos = contLocal*1
        contCarritoW.innerHTML = cantProductos
        contCarritoM.innerHTML = cantProductos
    }
 }

 //valida que los campos sean correctos 
function validarCampos(){
    
    let camposCorrectos = true

    if(nombre.value != '' && /^[a-zA-ZáéíóúÁÉÍÓÚñÑ.\s]+$/.test(nombre.value) == false){
        errornombre.innerHTML = 'Nombre inválido'
        camposCorrectos = false
    }
    else{
        errornombre.innerHTML = ''
        camposCorrectos = true
    }
    if(nombre.value == ''){
        errornombre.innerHTML = 'Nombre vacío'
        camposCorrectos = false
    }
    if (email.value != '' && /^([\da-z_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(email.value) == false){
        erroremail.innerHTML = 'Email inválido'
        camposCorrectos = false
    }else{
        erroremail.innerHTML = ''
        camposCorrectos = true
    }
    if(email.value == ''){
        erroremail.innerHTML = 'Email vacío'
        camposCorrectos = false
    }
    if (camposCorrectos) {
        suscribir()   
    }   
}

//envia los datos del formulario
function suscribir(){

}

 //Se genera la vitrina con el catalogo de productos 
function obtenerProductos() {
    $.ajax({
        url: 'https://corebiz-test.herokuapp.com/api/v1/products',
        type: 'GET',
        dataType: 'json',
        beforeSend: function () {    
        },
        success: function (response) {
            response.forEach(element => {
                const div = document.createElement('div')
                div.innerHTML =                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
                '<div class="product-card">'+
                    '<div class="product-image">'+(element.listPrice != null ? '<span class="off-tag" id=""><span class="off-text">OFF</span></span>' : '')+
                        '<img src="'+element.imageUrl+'" class="cont-image" alt="">'+
                    '</div>'+
                    '<div class="product-info text-center">'+
                        '<span class="description">'+element.productName+'</span><br>'+
                        '<span>'+
                            ('<i class="bi bi-star-fill stars"></i>'.repeat(element.stars))+
                            ('<i class="bi bi-star stars"></i>'.repeat((5-element.stars)))+
                        '</span><br>'+
                        '<span class="prev-price">'+(element.listPrice != null ? 'de $'+element.listPrice : '&nbsp') +'</span><br>'+
                        '<span class="price">por $'+element.price+'</span><br>'+
                        '<span class="promo">'+(element.installments != '' ? 'o en '+element.installments[0].quantity+ 'de R$ '+element.installments[0].value : '') +'</span><br>'+
                        '<button class="product-btn comprar" data-id="'+element.productId+'">Comprar</button>'+
                    '</div>'+
                '</div>'
            listProducts.appendChild(div);
            })
        }
    }).fail(function (response) {
    })
}

// navegacion slider
productContainers.forEach((item, i) => {
    let dimensionesContainer = item.getBoundingClientRect();
    let anchoContainer = dimensionesContainer.width;
    nxtBtn[i].addEventListener('click', () => {
        item.scrollLeft += anchoContainer;
    })
    preBtn[i].addEventListener('click', () => {
        item.scrollLeft -= anchoContainer;
    })
})

