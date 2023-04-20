<?php
include('../src/logic/Database.php');
include('../src/modules/product/object/Product.php');
include('../src/modules/product/object/ProductType.php');
include('../src/modules/product/object/ProductSpecific.php');
include('../src/modules/product/repository/ProductRepository.php');
include('../src/modules/product/service/ProductService.php');

$productService = new ProductService();
$response = $productService->fetchProductsBySku($_GET['sku']);
echo $response;
?>