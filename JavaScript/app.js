 $(document).ready(function() {
    console.log('jQuery está funcionando');
    obtenerProductos();

    $('#insertForm').submit(function(e) {
        e.preventDefault(); // Evitar que el formulario se envíe de forma predeterminada

        const formData = {
            numeroProducto: $('#recipient-numeroProducto').val(),
            nombreProducto: $('#recipient-nombreProducto').val(),
            precioProducto: $('#recipient-precioProducto').val(),
            unidadesProducto: $('#recipient-unidadesProducto').val(),
            descripcionProducto: $('#recipient-descripcionProducto').val()
        };

        $.ajax({
            type: 'POST',
            url: 'insertProducts.php', // URL del script PHP que procesará los datos
            data: formData,
            dataType: 'json', // Esperar una respuesta JSON del servidor
            success: function(response) {
                if (response.status === 'success') {
                    obtenerProductos(); // Actualizar la lista de productos
                    $('#insertForm').trigger('reset'); // Resetear el formulario
                    $('#InsertProducto').modal('hide'); // Ocultar el modal
                } else {
                    console.error('Error:', response.message);
                }
            },
            error: function(xhr, status, error) {
                console.error('Error al enviar datos:', xhr.responseText); // Mostrar la respuesta del servidor en caso de error
            }
        });
    });
});

function obtenerProductos() {
    $.ajax({
        url: 'listar.php',
        type: 'GET',
        success: function(response){
            let listProducts = JSON.parse(response);
            let template = '';
            listProducts.forEach(listProduct => {
                template += `
                    <tr numeroProducto="${listProduct.numeroProducto}">
                        <td>${listProduct.numeroProducto}</td>
                        <td>${listProduct.nombreProducto}</td>
                        <td>${listProduct.precioProducto}</td>
                        <td>${listProduct.unidadesProducto}</td>
                        <td>${listProduct.descripcionProducto}</td>
                        <td><i class="bi bi-pencil-square edit-btn" data-bs-toggle="modal" data-bs-target="#updateProducto" data-bs-whatever="@mdo"></i></td>
                        <td><i class="bi bi-trash delete-btn" data-bs-toggle="modal" data-bs-target="#deleteProducto" data-bs-whatever="@mdo"></i></td>
                    </tr>
                `;
            });
            $('#tablaProductos').html(template);
        }
    })
}

// Manejo del evento de actualización
$(document).ready(function() {
    console.log('jQuery está funcionando');
    $('#tablaProductos').on('click', '.edit-btn', function() {
        let row = $(this).closest('tr');
        let numeroProducto = row.find('td:eq(0)').text();
        let nombreProducto = row.find('td:eq(1)').text();
        let precioProducto = row.find('td:eq(2)').text();
        let unidadesProducto = row.find('td:eq(3)').text();
        let descripcionProducto = row.find('td:eq(4)').text();

        let form = `
            <form id="updateForm">
                <div class="mb-3">
                    <label for="update-numeroProducto" class="col-form-label">ID Producto:</label>
                    <input type="text" class="form-control" id="update-numeroProducto" name="numeroProducto" value="${numeroProducto}" readonly>
                </div>
                <div class="mb-3">
                    <label for="update-nombreProducto" class="col-form-label">Nombre Producto:</label>
                    <input type="text" class="form-control" id="update-nombreProducto" name="nombreProducto" value="${nombreProducto}">
                </div>
                <div class="mb-3">
                    <label for="update-precioProducto" class="col-form-label">Precio Producto:</label>
                    <input type="text" class="form-control" id="update-precioProducto" name="precioProducto" value="${precioProducto}">
                </div>
                <div class="mb-3">
                    <label for="update-unidadesProducto" class="col-form-label">Unidades Producto:</label>
                    <input type="text" class="form-control" id="update-unidadesProducto" name="unidadesProducto" value="${unidadesProducto}">
                </div>
                <div class="mb-3">
                    <label for="update-descripcionProducto" class="col-form-label">Descripción Producto:</label>
                    <input type="text" class="form-control" id="update-descripcionProducto" name="descripcionProducto" value="${descripcionProducto}">
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                    <button type="submit" class="btn btn-primary">Actualizar</button>
                </div>
            </form>
        `;

        $('#updateProducto .modal-body').html(form);
        $('#updateProducto').modal('show');

        $('#updateForm').submit(function(e) {
            e.preventDefault();
            let updateData = {
                numeroProducto: $('#update-numeroProducto').val(),
                nombreProducto: $('#update-nombreProducto').val(),
                precioProducto: $('#update-precioProducto').val(),
                unidadesProducto: $('#update-unidadesProducto').val(),
                descripcionProducto: $('#update-descripcionProducto').val()
            };

            $.ajax({
                type: 'POST',
                url: 'updateProducts.php',
                data: updateData,
                success: function(response) {
                    obtenerProductos();
                    $('#updateProducto').modal('hide');
                },
                error: function(xhr, status, error) {
                    console.error('Error al actualizar datos:', error);
                }
            });
        });
    });
});

// Manejo del evento de eliminación
$(document).on('click', '.delete-btn', function() {
    let element = $(this)[0].parentElement.parentElement;
    let id = $(element).attr('numeroProducto');
    if (confirm('¿Estás seguro de que deseas eliminar este producto?')) {
        $.ajax({
            type: 'POST',
            url: 'deleteProducts.php',
            data: { numeroProducto: id },
            success: function(response) {
                obtenerProductos();
            },
            error: function(xhr, status, error) {
                console.error('Error al eliminar datos:', error);
            }
        });
    }
});
