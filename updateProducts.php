<?php
 require("conexion.php");
 $con = conectar();

$noProducto = $_POST['numeroProducto'];
$nombreProducto = $_POST['nombreProducto'];
$precioProducto = $_POST['precioProducto'];
$unidadesProducto = $_POST['unidadesProducto'];
$descripcionPro = $_POST['descripcionProducto'];

$sql = "UPDATE producto SET nombreProducto = '$nombreProducto', precioProducto = $precioProducto,
        unidadesProducto = $unidadesProducto, descripcionProducto = '$descripcionPro' WHERE numeroProducto = $noProducto";

if (mysqli_query($con, $sql)) {
    echo '<script language="javascript">window.location.href="index.php";</script>';
} else {
    echo "Error: " . $sql . "<br>" . mysqli_error($con);
}

mysqli_close($con);

?>