<?php
include('../src/logic/Database.php');
include('../src/modules/product/object/Product.php');
include('../src/modules/product/object/ProductType.php');
include('../src/modules/product/object/ProductSpecific.php');
include('../src/modules/product/repository/ProductRepository.php');
include('../src/modules/product/service/ProductService.php');


if (!empty($_POST['items'])) {
    $productService = new ProductService();

    $parts = explode('#', $_POST['items']);

    for ($i = 0; $i < count($parts); $i++) {
        $productService->deleteProductById($parts[$i]);
    }

    echo json_encode(array('success' => true, 'message' => 'Products have been deleted successfully!'));
} else
    echo json_encode(array('success' => false, 'message' => 'One or more fields are missing...'));
?>