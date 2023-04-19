import React from "react";
import { View } from "react-native";
import Header from "../../components/Header";
import { useNavigate } from "react-router-dom";


function AddProducts() {
    const navigate = useNavigate();
    return (<View>
        <Header
            title={'Product Add'}
            action1Id={'save-product-btn'}
            action1Text={'Save'}
            action1={() => { }}
            action2Id={'cancel-btn'}
            action2Text={'Cancel'}
            action2={() => { 
                navigate('/');
            }} />

    </View>);
}


export default AddProducts;