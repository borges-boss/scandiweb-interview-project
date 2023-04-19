<?php
class Product
{

    private $productId;
    private $sku;
    private $name;
    private $price;
    private $productSpecific;
    private $productType;


    public function __construct($productId, $sku, $name, $price, $productSpecific, $productType)
    {
        $this->productId = $productId;
        $this->sku = $sku;
        $this->name = $name;
        $this->price = $price;
        $this->productSpecific = $productSpecific;
        $this->productType = $productType;

    }

    public function getSku()
    {
        return $this->sku;
    }

    public function setSku($sku)
    {
        $this->sku = $sku;
    }

    public function getName()
    {
        return $this->name;
    }

    public function setName($name)
    {
        $this->name = $name;
    }

    public function getPrice()
    {
        return $this->price;
    }

    public function setPrice($price)
    {
        $this->price = $price;
    }

    public function getproductSpecific()
    {
        return $this->productSpecific;
    }

    public function setProductSpecific($productSpecific)
    {
        $this->productSpecific = $productSpecific;
    }

    public function getProductType()
    {
        return $this->productType;
    }

    public function setProductType($productType)
    {
        $this->productType = $productType;
    }
}

?>