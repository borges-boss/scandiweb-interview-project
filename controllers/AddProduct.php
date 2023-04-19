<?php
include('../src/logic/Database.php');
include('../src/modules/product/object/Product.php');
include('../src/modules/product/object/ProductType.php');
include('../src/modules/product/object/ProductSpecific.php');
include('../src/modules/product/repository/ProductRepository.php');
include('../src/modules/product/service/ProductService.php');


if (!empty($_POST['sku']) && !empty($_POST['name']) && !empty($_POST['price']) && !empty($_POST['productType']) && !empty($_POST['productSpecific'])) {
    $productService = new ProductService();
    $response = $productService->insertProduct($_POST['sku'], $_POST['name'], $_POST['price'], $_POST['productSpecific'], $_POST['productType']);
    echo $response;
} else
    echo json_encode(array('success' => false, 'message' => 'One or more fields are missing...'));

?>