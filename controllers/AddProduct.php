<?php
include('../src/logic/Database.php');
include('../src/modules/product/object/Product.php');
include('../src/modules/product/object/ProductType.php');
include('../src/modules/product/object/ProductSpecific.php');
include('../src/modules/product/repository/ProductRepository.php');
include('../src/modules/product/service/ProductService.php');
$response = '';
$data = json_decode(file_get_contents('php://input'));
$entityBody = get_object_vars($data);
extract($entityBody);

if ($entityBody['sku'] && $entityBody['name'] && $entityBody['price'] && $entityBody['productType'] && $entityBody['productSpecificValues']) {
    $productService = new ProductService();
    $response = $productService->insertProduct($entityBody['sku'], $entityBody['name'], $entityBody['price'], $entityBody['productSpecificValues'], $entityBody['productType']);
    echo $response;
} else {
    if ($entityBody['sku']) {
        $response = json_encode(array('success' => false, 'message' => 'The sku field is missing...'));
    }

    if ($entityBody['name']) {
        $response = json_encode(array('success' => false, 'message' => 'The name field is missing...'));
    }

    if ($entityBody['price']) {
        $response = json_encode(array('success' => false, 'message' => 'The price field is missing...'));
    }

    if ($entityBody['productSpecificValues']) {
        $response = json_encode(array('success' => false, 'message' => 'The productSpecificValue field is missing...'));
    }

    if ($entityBody['productType']) {
        $response = json_encode(array('success' => false, 'message' => 'The productType field is missing...'));
    }

    echo json_encode($response);
}

?>