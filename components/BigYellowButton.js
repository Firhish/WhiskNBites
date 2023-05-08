import { Component } from "react";
import { StyleSheet, TouchableHighlight, Text } from "react-native";

class BigYellowButton extends Component{

    render(){

        return(

            <TouchableHighlight underlayColor={'transparent'} onPress={this.props.clickHandle}>
                <Text style={styles.btnContainer}>{this.props.btnText}</Text>
            </TouchableHighlight>


        )
    }
}

export default BigYellowButton

const styles = StyleSheet.create({

    btnContainer: {
        textAlign: 'center',
        paddingVertical: 15,
        fontSize: 18,
        fontWeight: 'bold',
        backgroundColor: '#DB9B06',
        color: 'white',
    }

})