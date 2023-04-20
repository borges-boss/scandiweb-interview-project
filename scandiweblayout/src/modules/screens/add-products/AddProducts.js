import React, { useState, useEffect } from "react";
import { View, TextInput, Text, useWindowDimensions, Picker } from "react-native";
import Header from "../../components/Header";
import { useNavigate } from "react-router-dom";
import Stack from '@mui/material/Stack';

function insertNewProduct(sku, name, price, productSpecificValues, productType) {
    return fetch('./controllers/AddProduct.php', {
        method: "POST",
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ sku: sku, name: name, price: price, productSpecificValues: productSpecificValues, productType: productType })
    })
        .then((res) => res.json())
        .then(function (json) {
            console.log(json);
        })
        .catch((error) => {
            return undefined;
        });
}


function processProductTypes(productTypes) {
    let response = [];
    if (Array.isArray(productTypes)) {
        productTypes.forEach((item) => {
            if (item.productTypeName && item.productTypeId) {
                response.push(<Picker.Item label={item.productTypeName} value={item.productTypeId} />);
            }
        })
    }

    return response;
}

async function validateFields(sku, name, price, productSpecificValues, productType, productTypesArray) {

    if (!sku) {
        return { success: false, message: 'Please provide the sku...' };
    }


    let response = await fetch('./controllers/GetProductsBySku.php', {
        method: "GET",
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ sku: sku })
    })
        .then((res) => res.json())
        .then(function (json) {
            return json;
        })
        .catch((error) => {
            return undefined;
        });

    if (Array.isArray(response) && response.length > 0) {
        return { success: false, message: 'This product sku is already in use...' };
    }

    if (!name) {
        return { success: false, message: 'Please provide the product name...' };
    }

    if (!price) {
        return { success: false, message: 'Please provide the product price...' };
    }


    if (!productSpecificValues) {
        return { success: false, message: 'Please provide the product specifics...' };
    }

    if (!productType) {
        return { success: false, message: 'Please select a product type...' };
    }


    let productTypeLabel = productTypesArray.filter((value) => { //e.g: Book
        return value.productTypeId == productType;
    }).productTypeName;

    if (productTypeLabel == 'Book') {
        if (!productSpecificValues.weight) {
            return { success: false, message: 'Please provide the weight' };
        }
    }
    else if (productTypeLabel == 'DVD') {
        if (!productSpecificValues.size) {
            return { success: false, message: 'Please provide the size' };
        }
    }
    else if (productTypeLabel == 'Furniture') {
        if (!productSpecificValues.height || !productSpecificValues.width || !productSpecificValues.length) {
            return { success: false, message: 'Please provide the required data...' };
        }
    }

    return { success: true };

}


function AddProducts() {
    const navigate = useNavigate();
    const { height, width } = useWindowDimensions();
    const [productType, setProductType] = useState('');
    const [productTypes, setProductTypes] = useState([]);
    const [sku, setSku] = useState([]);
    const [name, setName] = useState([]);
    const [price, setPrice] = useState([]);
    const [productSpecificValues, setProductSpecific] = useState({});

    React.useEffect(() => {
        fetch('./controllers/GetProductTypes.php', {
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
                    setProductTypes(json);
            })
            .catch((error) => {
                return undefined;
            });
    }, []);

    return (<View style={{ backgroundColor: 'white', height: height }}>
        <Header
            title={'Product Add'}
            action1Id={'save-product-btn'}
            action1Text={'Save'}
            action1={async () => {
                let response = await validateFields(sku, name, price, productSpecificValues, productType, productTypes);

                if (response.success === true) {
                    let insertResponse = await insertNewProduct(sku, name, price, productSpecificValues, productType);
                    if (insertResponse && insertResponse.success == true) {
                        navigate('/');
                    }
                    else if (insertResponse && insertResponse.success == false) {
                        alert(insertResponse.message);
                    }
                    else {
                        alert('Sorry, your product couldn\'t be registered');
                    }
                }
            }}
            action2Id={'cancel-btn'}
            action2Text={'Cancel'}
            action2={() => {
                navigate('/');
            }} />

        <View style={{
            padding: 16
        }}>
            <View style={{ height: 1, marginTop: 4, backgroundColor: 'gray', width: '100%' }} />
            <form style={{ marginTop: 16 }} id={'product_form'}>
                <Stack style={{ marginTop: 16 }}>
                    <Text style={{ fontWeight: '600' }}>SKU</Text>
                    <TextInput onChangeText={(text) => {
                        setSku(text);
                    }} id="sku" style={{
                        marginTop: 16,
                        maxWidth: '40%',
                        padding: 6,
                        backgroundColor: "whitesmoke",
                        borderRadius: 6,
                        borderColor: "green",
                        width: "100%",
                        borderColor: "#efeded",
                        borderWidth: 1
                    }} />
                </Stack>


                <Stack style={{ marginTop: 16 }}>
                    <Text style={{ fontWeight: '600' }}>Name</Text>
                    <TextInput onChangeText={(text) => {
                        setName(text);
                    }} id="name" style={{
                        marginTop: 16,
                        maxWidth: '40%',
                        padding: 6,
                        backgroundColor: "whitesmoke",
                        borderRadius: 6,
                        borderColor: "green",
                        width: "100%",
                        borderColor: "#efeded",
                        borderWidth: 1
                    }} />
                </Stack>


                <Stack style={{ marginTop: 16 }}>
                    <Text style={{ fontWeight: '600' }}>Price</Text>
                    <TextInput onChangeText={(text) => {
                        setPrice(text);
                    }} id="price" style={{
                        marginTop: 16,
                        maxWidth: '40%',
                        padding: 6,
                        backgroundColor: "whitesmoke",
                        borderRadius: 6,
                        borderColor: "green",
                        width: "100%",
                        borderColor: "#efeded",
                        borderWidth: 1
                    }} />
                </Stack>


                <Stack style={{ marginTop: 16 }}>
                    <Text style={{ fontWeight: '600' }}>Type Switcher</Text>
                    <Picker
                        id={'productType'}
                        style={{
                            marginTop: 16,
                            width: "100%",
                            backgroundColor: "#efeded",
                            maxWidth: '40%',
                            padding: 6,
                            backgroundColor: "whitesmoke",
                            borderRadius: 6,
                            borderColor: "green",
                            width: "100%",
                            borderColor: "#efeded",
                            borderWidth: 1
                        }}
                        onValueChange={(value, index) => {
                            setProductType(value);
                        }}
                    >
                        {processProductTypes(productTypes)}
                    </Picker>
                </Stack>


                <View>
                    {
                        productType == 'Book' ?
                            <Stack id={'Book'} style={{ marginTop: 16 }}>
                                <Text style={{ fontWeight: '600' }}>Weight</Text>
                                <TextInput onChangeText={(text) => {
                                    productSpecificValues.weight = text;
                                    setProductSpecific(productSpecificValues);
                                }} placeholder="Please provide the weight..." id="weight" style={{
                                    marginTop: 16,
                                    maxWidth: '40%',
                                    padding: 6,
                                    backgroundColor: "whitesmoke",
                                    borderRadius: 6,
                                    borderColor: "green",
                                    width: "100%",
                                    borderColor: "#efeded",
                                    borderWidth: 1
                                }} />
                            </Stack>
                            :
                            null
                    }


                    {
                        productType == 'Furniture' ?
                            <Stack id={'Furniture'} style={{ marginTop: 16 }}>
                                <Text style={{ fontWeight: '600' }}>Height</Text>
                                <TextInput onChangeText={(text) => {
                                    productSpecificValues.height = text;
                                    setProductSpecific(productSpecificValues);
                                }}
                                    placeholder="Please provide the height..."
                                    id="height" style={{
                                        marginTop: 16,
                                        maxWidth: '40%',
                                        padding: 6,
                                        backgroundColor: "whitesmoke",
                                        borderRadius: 6,
                                        borderColor: "green",
                                        width: "100%",
                                        borderColor: "#efeded",
                                        borderWidth: 1
                                    }} />

                                <Text style={{ fontWeight: '600', marginTop: 16 }}>Width</Text>
                                <TextInput onChangeText={(text) => {
                                    productSpecificValues.width = text;
                                    setProductSpecific(productSpecificValues);
                                }} placeholder="Please provide the width..." id="width" style={{
                                    marginTop: 16,
                                    maxWidth: '40%',
                                    padding: 6,
                                    backgroundColor: "whitesmoke",
                                    borderRadius: 6,
                                    borderColor: "green",
                                    width: "100%",
                                    borderColor: "#efeded",
                                    borderWidth: 1
                                }} />

                                <Text style={{ fontWeight: '600', marginTop: 16 }}>Length</Text>
                                <TextInput onChangeText={(text) => {
                                    productSpecificValues.length = text;
                                    setProductSpecific(productSpecificValues);
                                }} placeholder="Please provide the length..." id="length" style={{
                                    marginTop: 16,
                                    maxWidth: '40%',
                                    padding: 6,
                                    backgroundColor: "whitesmoke",
                                    borderRadius: 6,
                                    borderColor: "green",
                                    width: "100%",
                                    borderColor: "#efeded",
                                    borderWidth: 1
                                }} />
                            </Stack>
                            :
                            null
                    }


                    {
                        productType == 'DVD' ?
                            <Stack id={'DVD'} style={{ marginTop: 16 }}>
                                <Text style={{ fontWeight: '600', marginTop: 16 }}>Size(MB)</Text>
                                <TextInput onChangeText={(text) => {
                                    productSpecificValues.size = text;
                                    setProductSpecific(productSpecificValues);
                                }} placeholder="Please provide the size in MB..." id="size" style={{
                                    marginTop: 16,
                                    maxWidth: '40%',
                                    padding: 6,
                                    backgroundColor: "whitesmoke",
                                    borderRadius: 6,
                                    borderColor: "green",
                                    width: "100%",
                                    borderColor: "#efeded",
                                    borderWidth: 1
                                }} />
                            </Stack>
                            :
                            null
                    }
                </View>
            </form>
        </View>

    </View>);
}


export default AddProducts;