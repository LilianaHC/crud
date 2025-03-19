<?php
require("conexion.php");
$con = conectar();

if (isset($_POST['numeroProducto']) && !empty($_POST['numeroProducto'])) {
    $noProducto = mysqli_real_escape_string($con, $_POST['numeroProducto']);

    // Validar que $noProducto es un número
    if (is_numeric($noProducto)) {
        $sql = "DELETE FROM producto WHERE numeroProducto = $noProducto";
        if (mysqli_query($con, $sql)) {
            echo '<script language="javascript">window.location.href="index.php";</script>';
        } else {
            echo "Error: " . $sql . "<br>" . mysqli_error($con);
        }
    } else {
        echo "Error: número de producto inválido.";
    }
} else {
    echo "Error: número de producto no especificado.";
}

mysqli_close($con);
?>
