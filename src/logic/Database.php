<?php

class Database
{

    private $servername = "localhost:3306";
    private $username = "id20618568_scandiweb_admin";
    private $password = "veryStrongPassword123@";
    private $database = 'id20618568_scandiweb_products';

    public function getConnection()
    {
        $conn = mysqli_connect(
            $this->servername,
            $this->username, $this->password,
            $this->database
        );

        if (!$conn) {
            die("Connection failed: "
                . mysqli_connect_error());
        }

        return $conn;
    }

}

?>