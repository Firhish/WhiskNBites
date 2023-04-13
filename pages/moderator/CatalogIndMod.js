import { Component } from "react";
import { SafeAreaView, Text } from "react-native";

class CatalogIndMod extends Component{

    render(){

        return(

            <SafeAreaView>
                <Text>{this.props.route.params.productId}</Text>
            </SafeAreaView>
        )
    }
}

export default CatalogIndMod