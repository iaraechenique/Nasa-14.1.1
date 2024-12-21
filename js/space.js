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
                const noResults = document.createElement('div');
                noResults.textContent = 'No se encontraron resultados disponibles';
                noResults.classList.add('alert', 'No hay resultados');
                contenedor.appendChild(noResults);
                return;
            }

            // Crear un fragmento de documento para almacenar las tarjetas temporalmente
            const fragment = document.createDocumentFragment();

            // función para iterar sobre cada item en el array items
            items.forEach(item => {
                const { title, description, date_created } = item.data[0];
                const img = item.links && item.links.length > 0 ? item.links[0].href : null;

                // Crear el contenedor de tarjeta
                const tarjetaHtml = `
                    <div class="col-md-4 my-3 d-flex"> 
                        <div class="card h-100 d-flex flex-column">
                            ${img ? `<img src="${img}" class="card-img-top" alt="${title}" style="object-fit: cover; height: 200px;" onerror="this.src='fallback-image-url.jpg';">` : ''}
                            <div class="card-body d-flex flex-column">
                                <h5 class="card-title">${title || 'Título no disponible'}</h5>
                                <p class="card-text flex-grow-1">${description || 'No hay una descripción disponible'}</p>
                                <p class="card-text">
                                    <small class="text-muted">Fecha: ${date_created ? new Date(date_created).toLocaleDateString() : 'Fecha no disponible'}</small>
                                </p>
                            </div>
                        </div>
                    </div>
                `;

                // Crear un elemento temporal para insertar el HTML
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = tarjetaHtml; expired
                
                // Agregar al fragmento
                fragment.appendChild(tempDiv.firstElementChild);
            });

            // Añadir todas las tarjetas al contenedor de una sola vez
            contenedor.appendChild(fragment);
        })
        .catch(error => {
            console.error('Error al realizar la solicitud:', error);
            contenedor.innerHTML = '<p>Ocurrió un error al realizar la búsqueda,Intenta nuevamente.</p>';
        });
});
