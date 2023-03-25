import { Component } from "react";
import { SafeAreaView, Text, Pressable } from "react-native";


class Landing extends Component {

    render() {

        return (
            <SafeAreaView>
                <Pressable onPress={()=>this.props.navigation.navigate('SignIn')}><Text>Landing</Text></Pressable>
                
            </SafeAreaView>
        )
    }
}

export default Landing

