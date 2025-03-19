<?php
 require("conexion.php");
 $con = conectar();
    $query = "SELECT * from producto";
    $result = mysqli_query($con, $query);
    
    if(!$result){
        die('La consulta fallo'.mysqli_error($con));
    }
    $json = array();
    while($row = mysqli_fetch_array($result)){
        $json [] = array(
            'numeroProducto' => $row['numeroProducto'],
            'nombreProducto' => $row['nombreProducto'],
            'precioProducto' => $row['precioProducto'],
            'unidadesProducto' => $row['unidadesProducto'],
            'descripcionProducto' => $row['descripcionProducto']
        );
    }

    $jsonstring = json_encode($json);
    echo $jsonstring;
?>