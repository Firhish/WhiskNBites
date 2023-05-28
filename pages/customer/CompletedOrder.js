import { Component } from "react";
import { SafeAreaView, Text } from "react-native";

class CompletedOrder extends Component {

    componentDidMount() {
        console.log('complete focus')
    }

    render() {

        return (

            <SafeAreaView>
                <Text>CompletedOrder</Text>
            </SafeAreaView>
        )
    }
}

export default CompletedOrder