const contenedorCarrito = document.getElementById('carrito-contenedor')
const botonVaciar = document.getElementById('vaciar-carrito')
const contadorCarrito = document.getElementById('contadorCarrito')

let carrito = []

botonVaciar.addEventListener('click', () => {
    carrito.length = 0
    actualizarCarrito()
})

const agregarAlCarrito = async (prodId) => {

    const existe = carrito.some (prod => prod._id === prodId) 
    if (existe){
        const prod = carrito.map (prod => {
            if (prod._id === prodId){
                prod.cantidad++
            }
        })
    } else {
        var item;
        await fetch('/api/book/buscar/'+prodId).then(response => response.json()).then(data => {
            data[0].cantidad = 1;
            item = data[0]
        })
        carrito.push(item)
    }
    actualizarCarrito()
}

const eliminarDelCarrito = (prodId) => {
    const item = carrito.find((prod) => prod._id === prodId)

    if(item.cantidad > 1){
        item.cantidad--
    }else{
        const indice = carrito.indexOf(item)

        carrito.splice(indice, 1)
    }

    actualizarCarrito()
}

const actualizarCarrito = () => {
    contenedorCarrito.innerHTML = "" 

    carrito.forEach((prod) => {
        const div = document.createElement('div')
        div.className = ('productoEnCarrito')
        div.innerHTML = `
        <p>${prod.title}</p>
        <p>Precio:$${prod.price}</p>
        <p>Cantidad: <span id="cantidad">${prod.cantidad}</span></p>
        <button onclick="eliminarDelCarrito('${prod._id}')" class="boton-eliminar"><i class="fas fa-trash-alt"></i></button>
        `

        contenedorCarrito.appendChild(div)
        
        localStorage.setItem('carrito', JSON.stringify(carrito))

    })
    contadorCarrito.innerText = carrito.length
    
    precioTotal.innerText = carrito.reduce((acc, prod) => acc + prod.cantidad * prod.price, 0)

}