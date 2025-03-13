'use strict'

async function fetchProducts() {
    try {
        const response = await fetch("https://fakestoreapi.com/products")
        const products = await response.json()

        displayProducts(products)
    } catch (error) {
        console.error("Erro ao buscar produtos:", error)
    }
}

function displayProducts(products) {
    const container = document.getElementById("products-container")
    container.innerHTML = "" 

    products.forEach(product => {
        const productCard = document.createElement("div")
        productCard.innerHTML = `
            <h3>${product.title}</h3>
            <img src="${product.image}" alt="${product.title}" width="100">
            <p>R$ ${product.price.toFixed(2)}</p>
            <a href="product.html?id=${product.id}">Ver detalhes</a>
        `
        container.appendChild(productCard)
    })
}

function filterProducts() {
    const searchTerm = document.getElementById("input_products").value.toLowerCase()
    
    fetch("https://fakestoreapi.com/products")
        .then(response => response.json())
        .then(products => {
            const filteredProducts = products.filter(product => 
                product.title.toLowerCase().includes(searchTerm)
            )
            displayProducts(filteredProducts)
        })
        .catch(error => console.error("Erro ao buscar produtos:", error))
}

document.getElementById("input_products").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        filterProducts()
    }
})

fetchProducts()