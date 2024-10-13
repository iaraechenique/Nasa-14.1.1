const inputBuscar = document.getElementById('inputBuscar');
const btnBuscar = document.getElementById('btnBuscar');
const contenedor = document.getElementById('contenedor');

btnBuscar.addEventListener('click', function() {
    const buscar = inputBuscar.value.trim();

    if (buscar === '') {
        alert('Por favor, ingrese su búsqueda'); // Alerta si no se ingresa nada
        return;
    }

    // Limpiar el contenedor antes de hacer una búsqueda
    contenedor.innerHTML = '';

    // URL de búsqueda
    const nasa = `https://images-api.nasa.gov/search?q=${buscar}`;


    // solicitud a la API de la NASA
    fetch(nasa)
        .then(response => response.json())
        .then(data => {
            const items = data.collection.items;

            if (items.length === 0) {
                contenedor.innerHTML = '<p>No se encontraron las imágenes.</p>';
                return;
            }

            // funcion para iterar sobre cada item en el array items
            items.forEach(item => {
                const { title, description, date_created } = item.data[0];
                const img = item.links && item.links.length > 0 ? item.links[0].href : null;

                // boostrap 
                const tarjetaHtml = `
                 <div class="col-md-4 my-3"> 
            <div class="card">
              ${img ? `<img src="${img}" class="card-img-top" alt="${title}">` : ''}
              <div class="card-body">
                <h5 class="card-title">${title}</h5>
                <p class="card-text">${description || 'No hay una descripción disponible'}</p>
                <p class="card-text"><small class="text-muted">Fecha: ${new Date(date_created).toLocaleDateString()}</small></p>
              </div>
            </div>
          </div>
        `;

                // Agregar la tarjeta al contenedor
                contenedor.innerHTML += tarjetaHtml;
            });
        })
        .catch(error => {
            console.error('Error al realizar la solicitud:', error);
            contenedor.innerHTML = '<p>Ocurrió un error al realizar la búsqueda. Intenta nuevamente.</p>';
        });
});
