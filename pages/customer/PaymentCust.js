import { Component } from "react";
import { View, Text, ScrollView, TextInput, StyleSheet, Dimensions, TouchableOpacity, Pressable } from "react-native";
import TransparentHeader from "../../components/TransparentHeader";
import BigYellowButton from "../../components/BigYellowButton";
import PaymentScreen from "../PaymentScreen";

class PaymentCust extends Component {

    pay = () => {

        this.props.navigation.navigate('TabsCust');
        alert('Payment Successful')

    }

    render() {

        return (

            <View style={{ flex: 1 }}>
                <TransparentHeader title='Payment' goBack={this.props.navigation.goBack} />

                <View style={styles.container}>
                    <Text style={styles.text}>Enter Card Details</Text>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <PaymentScreen />
                    </ScrollView>
                    <BigYellowButton clickHandle={() => {

                        this.pay()

                    }} btnText={'Pay'} />
                </View>
            </View>
        )
    }
}

export default PaymentCust

const styles = StyleSheet.create({


    text: {

        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 8,

    },

    container: {

        flex: 1,
        padding: 12

    }
});
