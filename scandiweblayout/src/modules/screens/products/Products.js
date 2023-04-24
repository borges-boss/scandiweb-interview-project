import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import Header from "../../components/Header";
import ProductCard from "../../components/ProductCard";
import Stack from '@mui/material/Stack';
import { useNavigate } from "react-router-dom";

function processSpecific(specific) {
    let responseArr = [];

    if (Array.isArray(specific)) {
        specific.forEach((item) => {
            if (item.value !== null && item.value !== undefined)
            responseArr.push(<p>{item.value}</p>);
        });

        return responseArr;
    }
    else if (typeof specific === 'object' && specific !== null)
        return specific.value;
    else
        return null;
}


function processDeletionList(deletionList) {
    let response = '';
    if (Array.isArray(deletionList)) {
        deletionList.forEach((value) => {
            response = response + value + '#';
        });
    }

    response = response.substring(0, response.length - 1);
    return response;
}

function Products() {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [deletionList, setDeletionList] = useState({ array: [] });
    const [isDisable, setIsDisabled] = useState(true);

    const addProductToDeletionList = (productId) => {
        let isItOnTheList = deletionList.array.filter((value) => {
            return value == productId;
        }).length > 0;

        if (isItOnTheList === false) {
            deletionList.array.push(productId);
            setDeletionList(deletionList);
        }
        else {
            deletionList.array = Array.from(deletionList.array.filter((value) => {
                return value !== productId;
            }));

            setDeletionList(deletionList);
        }

        setIsDisabled(deletionList.array.length === 0);

        return deletionList;
    };

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
                navigate("./add-product");
            }}
            action2Id={'delete-product-btn'}
            action2Icon={<DeleteIcon />}
            action2Text={'Mass Delete'}
            disabled2={deletionList.array.length == 0}
            action2={() => {
                if (deletionList.array.length > 0) {
                    fetch('./controllers/DeleteProduct.php', {
                        method: "POST",
                        headers: {
                            "Access-Control-Allow-Origin": "*",
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ items: processDeletionList(deletionList.array) })
                    })
                        .then((res) => res.json())
                        .then(function (json) {
                            console.log(json);
                            if (json.success == true) {
                                window.location.reload();
                            }
                        })
                        .catch((error) => {
                            return undefined;
                        });
                }
            }} />


        <Stack style={{ padding: 8 }} direction="row" spacing={2} useFlexGap flexWrap="wrap">
            {
                Array.isArray(products) && products.length > 0 ?
                    products.map((item) => {
                        return <ProductCard callback={addProductToDeletionList} productId={item.productId} sku={'#' + item.sku} title={item.name} price={'$ '+item.price} specific={processSpecific(item.productSpecific)} />
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