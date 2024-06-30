const tablaProductos = document.getElementById('tablaProductos');
const formularioNuevoProducto = document.getElementById('formularioNuevoProducto');
const productoTitulo = document.getElementById('productoTitulo');
const productoPrecioPeso = document.getElementById('productoPrecioPeso');
const productoPrecioDolar = document.getElementById('productoPrecioDolar');
const productoFecha = document.getElementById('productoFecha');

function obtenerProductos() {
    fetch(`https://api.yumserver.com/16470/products`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            MostrarProductos(data);
        })
        .catch(error => console.error('Error:', error));
}

if (window.location.pathname.endsWith('index.html')) {
    obtenerProductos();
}

document.getElementById('btnGuardarProducto').addEventListener('click', function() {
    let producto = {
        titulo: document.getElementById('productoTitulo').value,
        precioPeso: document.getElementById('productoPrecioPeso').value,
        precioDolar: document.getElementById('productoPrecioDolar').value,
        fecha: document.getElementById('productoFecha').value,
    };
    
    
    fetch(`https://api.yumserver.com/16470/products`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(producto)
    })
    .then(response => response.text())
    .then(function(texto) {
        if (texto.trim() === "OK") {
            alert('Se creó el producto con éxito.');
            window.location.href = 'index.html'; 
        } else {
            alert(texto);
        }
    })
    .catch(error => console.error('Error:', error));
});


function eliminarProducto(id) {
    const confirmacion = confirm('¿Estás seguro que quieres eliminar este producto?');
    if (!confirmacion) return;

    fetch(`https://api.yumserver.com/16470/products`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ idcod: id })
    })
        .then(response => response.text())
        .then(data => {
            if (data === 'OK') {
                alert('Eliminado');
                obtenerProductos();
            } else {
                alert(`Error: ${data}`);
            }
        })
        .catch(error => console.error('Error:', error));
}

function MostrarProductos(productos) {
    const tbody = tablaProductos.querySelector('tbody');
    tbody.innerHTML = '';
    productos.forEach(producto => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${producto.idcod}</td>
            <td>${producto.titulo}</td>
            <td>${producto.precioPeso}</td>
            <td>${producto.precioDolar}</td>
            <td>${producto.fecha}</td>
            
                <button onclick="editarProducto('${producto.idcod}')">Editar</button>
                <span class="button-spacing"></span>
                <button onclick="eliminarProducto('${producto.idcod}')">Eliminar</button>
            
        `;
        tbody.appendChild(row);
    });
}


function editarProducto(id) {
    window.open(`modificar.html?id=${id}`,'_blank');
   
}











