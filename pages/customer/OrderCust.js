import { Component } from "react";
import { SafeAreaView, Text, View } from "react-native";
import TabHeader from "../../components/TabHeader";
import TabsOrderCust from "./TabsOrderCust";

class OrderCust extends Component {

    render() {

        return (

            <>
                <TabHeader title='Order' iconClickHandle={()=>{}} />
                <TabsOrderCust />
            </>

        )
    }
}

export default OrderCust