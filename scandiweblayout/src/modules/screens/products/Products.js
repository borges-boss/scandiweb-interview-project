import React, { useEffect, useState } from "react";
import { View, FlatList, Text } from "react-native";
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import Header from "../../components/Header";
import ProductCard from "../../components/ProductCard";
import Stack from '@mui/material/Stack';
import { useNavigate } from "react-router-dom";

function processSpecific(specific) {
    let response = '';
    if (Array.isArray(specific)) {
        specific.forEach((item) => {
            if (item.value !== null && item.value !== undefined)
                response.concat(item.value + '\n');
        })
        console.log(response);
        return response;
    }
    else if (typeof specific === 'object' && specific !== null)
        return specific.value;
    else
        return null;
}

function Products() {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch('./controllers/GetProducts.php', {
            method: "GET",
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json",
            }
        })
            .then((res) => res.json())
            .then(function (json) {
                console.log(json);
                if (Array.isArray(json))
                    setProducts(json);
            })
            .catch((error) => {
                return undefined;
            });
    }, []);


    return (<View>
        <Header
            title={'Product List'}
            action1Id={'add-product-btn'}
            action1Icon={<AddIcon />}
            action1Text={'Add Product'}
            action1={() => {
                navigate("./addproduct");
            }}
            action2Id={'delete-product-btn'}
            action2Icon={<DeleteIcon />}
            action2Text={'Mass Delete'}
            action2={() => { }} />


        <Stack style={{ padding: 8 }} direction="row" spacing={2} useFlexGap flexWrap="wrap">
            {
                Array.isArray(products) && products.length > 0 ?
                    products.map((item) => {
                        return <ProductCard sku={item.sku} title={item.name} price={item.price} specific={processSpecific(item.productSpecific)} />
                    })
                    :
                    <View style={{ alignItems: "center", marginTop: "16%", width: '100%' }}>
                        <Text
                            style={{
                                color: "#3b4a54",
                                fontSize: 16,
                                fontWeight: "500",
                                textAlign: "start",
                            }}
                        >
                            No products available
                        </Text>
                    </View>
            }
        </Stack>
    </View>);
}


export default Products;