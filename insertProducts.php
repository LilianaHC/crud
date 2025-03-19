<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require("conexion.php");
$con = conectar();

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $noProducto = mysqli_real_escape_string($con, $_POST['numeroProducto']);
    $nombreProducto = mysqli_real_escape_string($con, $_POST['nombreProducto']);
    $precioProducto = mysqli_real_escape_string($con, $_POST['precioProducto']);
    $unidadesProducto = mysqli_real_escape_string($con, $_POST['unidadesProducto']);
    $descripcionPro = mysqli_real_escape_string($con, $_POST['descripcionProducto']);

    if (!empty($noProducto) && !empty($nombreProducto) && is_numeric($precioProducto) && is_numeric($unidadesProducto) && !empty($descripcionPro)) {
        $sql = "INSERT INTO producto (numeroProducto, nombreProducto, precioProducto, unidadesProducto, descripcionProducto)
                VALUES ('$noProducto', '$nombreProducto', '$precioProducto', '$unidadesProducto', '$descripcionPro')";

        if (mysqli_query($con, $sql)) {
            $response = [
                'status' => 'success',
                'message' => 'Producto insertado exitosamente',
                'producto' => [
                    'numeroProducto' => $noProducto,
                    'nombreProducto' => $nombreProducto,
                    'precioProducto' => $precioProducto,
                    'unidadesProducto' => $unidadesProducto,
                    'descripcionProducto' => $descripcionPro
                ]
            ];
        } else {
            $response = [
                'status' => 'error',
                'message' => 'Error al insertar el producto: ' . mysqli_error($con)
            ];
        }
        echo json_encode($response);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Por favor completa todos los campos y asegúrate de que precio y unidades sean números.']);
    }
}
mysqli_close($con);
?>
