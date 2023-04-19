<?php

class ProductSpecific
{
    private $id;
    private $productId;
    private $value;

    public function __construct($id, $productId, $value)
    {
        $this->id = $id;
        $this->productId = $productId;
        $this->value = $value;
    }


    public function getId()
    {
        return $this->id;
    }

    public function getProductId()
    {
        return $this->productId;
    }

    public function getValue()
    {
        return $this->value;
    }

    public function setValue($value)
    {
        $this->value = $value;
    }

}

?>