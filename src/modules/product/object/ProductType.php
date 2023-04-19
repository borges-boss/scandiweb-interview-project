<?php

class ProductType
{
    private $id;
    private $productTypeName;

    public function __construct($id, $productTypeName)
    {
        $this->id = $id;
        $this->productTypeName = $productTypeName;
    }


    public function getId()
    {
        return $this->id;
    }

    public function getProductTypeName()
    {
        return $this->productTypeName;
    }

}

?>