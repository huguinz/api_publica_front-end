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
        const productCard_img = document.createElement("div")
        const info_card = document.createElement("div")

        productCard.classList.add("product-card")
        productCard_img.classList.add("product-card-img")
        info_card.classList.add("info_card")

            
        const img = document.createElement("img")
        img.src = product.image
        img.alt = product.title
        img.width = 100
        productCard_img.appendChild(img)

        const title = document.createElement("h3")
        title.textContent = product.title

        const price = document.createElement("p")
        price.textContent = `R$ ${product.price.toFixed(2)}`

        info_card.appendChild(title)
        info_card.appendChild(price)

        productCard.appendChild(productCard_img)
        productCard.appendChild(info_card)
        
        productCard.addEventListener("click", () => {
            window.location.href = `product.html?id=${product.id}`;
        })
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