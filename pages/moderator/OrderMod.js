import { Component } from "react";
import { SafeAreaView, Text, View } from "react-native";
import TabHeader from "../../components/TabHeader";
// import TabsOrderCust from "./TabsOrderCust";
import TabsOrderMod from "./TabsOrderMod";

class OrderMod extends Component {

    render() {

        return (

            <>
                <TabHeader title='Order' iconClickHandle={()=>{}} />
                <TabsOrderMod />
            </>

        )
    }
}

export default OrderMod