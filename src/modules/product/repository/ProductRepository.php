<?php
class ProductRepository
{

    private $database;

    public function __construct()
    {
        $this->database = new Database();
    }

    public function deleteProductById($productId)
    {
        $conn = $this->database->getConnection();
        try {
            $stmt = $conn->prepare("DELETE products WHERE product_id = ? ");
            $stmt->bind_param("i", $productId);
            $stmt->execute();
            $stmt->close();
        } catch (Exception $ex) {
            echo $ex->getMessage();
        } finally {
            $conn->close();
        }
    }

    public function insertProduct($sku, $name, $price, $productType)
    {
        $conn = $this->database->getConnection();
        try {
            $stmt = $conn->prepare("INSERT INTO products (sku,name,price,product_type_id) values (?,?,?,?)");
            $stmt->bind_param("ssdi", $sku, $name, $price, $productType);
            $stmt->execute();
            $stmt->close();
            return $conn->insert_id;

        } catch (Exception $ex) {
            return 0;
        } finally {
            $conn->close();
        }
    }

    private function insertProductSpecific($productId, $value)
    {
        $conn = $this->database->getConnection();
        try {
            $stmt = $conn->prepare("INSERT INTO product_specific (product_id,value) values (?,?)");
            $stmt->bind_param("is", $productId, $value);
            $stmt->execute();
            $stmt->close();
            return true;
        } catch (Exception $ex) {
            return false;
        } finally {
            $conn->close();
        }
    }

    public function fetchProducts()
    {
        $conn = $this->database->getConnection();

        try {
            $sql = "SELECT * FROM `products` INNER JOIN product_type on (products.product_type_id = product_type.product_type_id)";
            $result = $conn->query($sql);
            $response = array();

            if ($result != false && $result->num_rows > 0) {
                while ($row = $result->fetch_assoc()) {
                    $stmt = $conn->prepare("SELECT * FROM `product_specific` WHERE product_id = ?");
                    $stmt->bind_param("i", $row["product_id"]);
                    $stmt->execute();
                    $productSpecifics = $stmt->get_result();
                    $data = $productSpecifics->fetch_assoc();
                    array_push($response, array('productId' => $row["product_id"], 'sku' => $row["sku"], 'name' => $row["name"], 'price' => $row["price"], 'productSpecific' => $data, 'productTypeId' => $row["product_type_id"], 'productTypeName' => $row["product_type_name"]));
                    $stmt->close();
                }
            }

            return $response;
        } catch (Exception $ex) {
            return array();
        } finally {
            $conn->close();
        }
    }


    public function fetchProductTypes()
    {
        $conn = $this->database->getConnection();

        try {
            $sql = "SELECT * FROM `product_type`";
            $result = $conn->query($sql);
            $response = array();

            if ($result != false && $result->num_rows > 0) {
                while ($row = $result->fetch_assoc()) {
                    array_push($response, array('productTypeId' => $row["product_type_id"],'productTypeName' => $row["product_type_name"]));
                }
            }

            return $response;
        } catch (Exception $ex) {
            return array();
        } finally {
            $conn->close();
        }
    }


    public function fetchProductsBySku($sku)
    {
        $conn = $this->database->getConnection();

        try {
            $sql = "SELECT * FROM `products` INNER JOIN product_type on (products.product_type_id = product_type.product_type_id) where sku = ?";
            $resultStmt = $conn->prepare($sql);
            $resultStmt->bind_param("s", $sku);
            $resultStmt->execute();
            $result =  $resultStmt->get_result();
            $response = array();

            if ($result != false && $result->num_rows > 0) {
                while ($row = $result->fetch_assoc()) {
                    $stmt = $conn->prepare("SELECT * FROM `product_specific` WHERE product_id = ?");
                    $stmt->bind_param("i", $row["product_id"]);
                    $stmt->execute();
                    $productSpecifics = $stmt->get_result();
                    $data = $productSpecifics->fetch_assoc();
                    array_push($response, array('productId' => $row["product_id"], 'sku' => $row["sku"], 'name' => $row["name"], 'price' => $row["price"], 'productSpecific' => $data, 'productTypeId' => $row["product_type_id"], 'productTypeName' => $row["product_type_name"]));
                    $stmt->close();
                }
            }
            
            $resultStmt->close();
            return $response;
        } catch (Exception $ex) {
            echo $ex->getMessage();
            return array();
        } finally {
            $conn->close();
        }
    }
}


?>