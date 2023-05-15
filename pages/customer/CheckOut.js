import { Component } from "react";
import { View, Text, ScrollView, TextInput, StyleSheet, Dimensions } from "react-native";
import TransparentHeader from "../../components/TransparentHeader";
import BigYellowButton from "../../components/BigYellowButton";
import ProductBox from "../../components/Catalog/ProductBox";

const { width } = Dimensions.get('window');

class CheckOut extends Component {

    state = {

        billingName: '',
        billingAddress: '',

    };

    setBillingAddress = (billingAddress) => {

        this.setState({ billingAddress })
        console.log(this.state.billingAddress)

    }

    setBillingName = (billingName) => {

        this.setState({ billingName })
        console.log(this.state.billingName)

    }

    render() {

        return (

            <View style={{ flex: 1 }}>
                <TransparentHeader title='Checkout' goBack={this.props.navigation.goBack} />
                <View style={{ flex: 1, padding: 12 }}>
                    <ScrollView>
                        <View style={styles.billingDetailsBox}>

                            <Text style={styles.title}>Billing Details</Text>

                            <TextInput
                                placeholder="Billing Name "
                                value={this.state.billingName}
                                onChangeText={this.setBillingName}
                                style={styles.inputName}
                            />
                            <TextInput
                                placeholder="Billing Address "
                                value={this.state.billingAddress}
                                onChangeText={this.setBillingAddress}
                                style={styles.inputAddress}
                                multiline={true}
                                textAlignVertical="top"
                            />

                        </View>

                        <ProductBox />
                        {/* <ProductBox /> */}
                        <View style={styles.billingDetailsBox}>
                            <Text style={styles.title}>Payment Details</Text>
                            <View style={styles.space}>
                                <Text>Merchandise Subtotal</Text>
                                <Text>RM 18.00</Text>
                            </View>
                            <View style={styles.space}>
                                <Text>Shipping Subtotal</Text>
                                <Text>RM 4.90</Text>
                            </View>
                            <View style={[styles.space,styles.totalPaymentBox]}>
                                <Text style={{fontSize:18, fontWeight:'700', color:'black'}}>Total Payment</Text>
                                <Text style={{fontSize:18, color:'#DB9B06'}}>RM 22.90</Text>
                            </View>
                        </View>

                    </ScrollView>
                    <BigYellowButton clickHandle={() => console.log('place order')} btnText={'Place Order'} />
                </View>
            </View>


        )

    }

}

export default CheckOut

const styles = StyleSheet.create({


    billingDetailsBox:{
        backgroundColor:'white',
        padding:12, 
        borderRadius:3, 
        marginBottom: 12,
    },

    title:{
        fontSize:16, 
        marginBottom:15, 
        fontWeight:'600',
        
    },

    inputName: {
        width: '100%',
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 10,
        borderRadius: 5,
    },
    inputAddress: {
        marginTop: 15,
        width: '100%',
        height: 100,
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 10,
        borderRadius: 5,
        // marginBottom: 20,
    },

    space:{
        flexDirection:'row', 
        justifyContent:'space-between',
        marginBottom:2,
    },

    totalPaymentBox:{
        marginTop:10,
    }

});
