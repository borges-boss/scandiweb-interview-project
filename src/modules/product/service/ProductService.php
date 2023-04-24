<?php
class ProductService
{

    private $productRepository;


    public function __construct()
    {
        $this->productRepository = new ProductRepository();
    }

    public function deleteProductById($productId)
    {
        try {
            if ($productId != null) {
                $this->productRepository->deleteProductById($productId);
                return true;
            } else
                return false;
        } catch (Exception $ex) {
            return false;
        }
    }


    public function insertProduct($sku, $name, $price, $productSpecificValue, $productType)
    {
        try {
            $response = null;

            if ($sku != null && $name !== null && $price != null && $productSpecificValue != null && $productType != null) {
                $productId = $this->productRepository->insertProduct($sku, $name, $price, $productType);

                if ($productId != null) {
                    $parts = explode('#', $productSpecificValue);

                    for ($i = 0; $i < count($parts); $i++) {
                        $wasProductSpecificIserted = $this->productRepository->insertProductSpecific($productId, $parts[$i]);
                        if ($wasProductSpecificIserted == false)
                            return json_encode(array('success' => false, 'message' => 'One or more product specifics could not be registred'));
                    }

                    $response = json_encode(array('success' => true, 'message' => 'Product was registred successfully!'));
                } else
                    $response = json_encode(array('success' => false, 'message' => 'Product could not be registred'));

            } else {
                if($sku == null) {
                    $response = json_encode(array('success' => false, 'message' => 'The sku field is missing...'));
                }

                if($name == null) {
                    $response = json_encode(array('success' => false, 'message' => 'The name field is missing...'));
                }

                if($price == null) {
                    $response = json_encode(array('success' => false, 'message' => 'The price field is missing...'));
                }

                if($productSpecificValue == null) {
                    $response = json_encode(array('success' => false, 'message' => 'The productSpecificValue field is missing...'));
                }

                if($productType == null) {
                    $response = json_encode(array('success' => false, 'message' => 'The productType field is missing...'));
                }
            }


            return $response;
        } catch (Exception $ex) {
            return json_encode(array('success' => false, 'message' => $ex->getMessage()));
        }
    }



    public function fetchProducts()
    {
        try {
            return json_encode($this->productRepository->fetchProducts());
        } catch (Exception $ex) {
            return json_encode(array());
        }
    }


    public function fetchProductTypes()
    {
        try {
            return json_encode($this->productRepository->fetchProductTypes());
        } catch (Exception $ex) {
            return json_encode(array());
        }
    }


    public function fetchProductsBySku($sku)
    {
        try {
            return json_encode($this->productRepository->fetchProductsBySku($sku));
        } catch (Exception $ex) {
            return json_encode(array());
        }
    }


}

?>