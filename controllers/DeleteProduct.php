<?php
include('../src/logic/Database.php');
include('../src/modules/product/object/Product.php');
include('../src/modules/product/object/ProductType.php');
include('../src/modules/product/object/ProductSpecific.php');
include('../src/modules/product/repository/ProductRepository.php');
include('../src/modules/product/service/ProductService.php');
$data = json_decode(file_get_contents('php://input'));
$entityBody = get_object_vars($data);
extract($entityBody);

if ($entityBody['items']) {
    $productService = new ProductService();

    $parts = explode('#', $entityBody['items']);

    for ($i = 0; $i < count($parts); $i++) {
        $productService->deleteProductById($parts[$i]);
    }

    echo json_encode(array('success' => true, 'message' => 'Products have been deleted successfully!'));
} else
    echo json_encode(array('success' => false, 'message' => 'One or more fields are missing...'));
?>