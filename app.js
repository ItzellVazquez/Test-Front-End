

const productContainers = document.querySelectorAll('.product-container');
const nxtBtn = document.querySelectorAll('.nxt-btn');
const preBtn = document.querySelectorAll('.pre-btn');


productContainers.forEach((item, i) => {
    let containerDimensions = item.getBoundingClientRect();
    let containerWidth = containerDimensions.width;

    nxtBtn[i].addEventListener('click', () => {
        item.scrollLeft += containerWidth;
    })

    preBtn[i].addEventListener('click', () => {
        item.scrollLeft -= containerWidth;
    })
})

obtenerProductos()
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
                const span = document.createElement('i')
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
                        '<button class="product-btn" id="'+element.productId+'">Comprar</button>'+
                    '</div>'+
                '</div>'
            listProducts.appendChild(div);
            })
        }
    }).fail(function (response) {

    })
}

