const productId = new URLSearchParams(window.location.search).get('id')

if (productId) {
	fetch(`https://fakestoreapi.com/products/${productId}`)
		.then((response) => response.json())
		.then((product) => {
			document.getElementById('product-detail').innerHTML = `
                <div class='img-product'>
                    <img src="${product.image}" alt="${product.title}" width="200">
                </div>
                <div class='description-product'>
                    <div class= 'rate'>
                        <h1>${product.title}</h1>
                        <p>${product.rating.rate} ⭐⭐⭐⭐⭐ (${product.rating.count} avaliações)</p>
                        <p class='category'><strong>Categoria:</strong> ${product.category}</p>
                    </div>
                    <hr>
                    <div class="description">
                        <p>${product.description}</p>
                    </div>
                    <div class="price">
                        <p >R$ ${product.price.toFixed(2)}</p>
                    </div>
                </div>
            `
		})
		.catch((error) => console.error('Erro ao carregar produto:', error))
}

function goBack() {
	window.history.back()
}

function addCart() {
	alert('Add to cart!')
}
