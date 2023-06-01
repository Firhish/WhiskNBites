import { Component } from "react";
import { View, Text, ScrollView, TextInput, StyleSheet, Dimensions } from "react-native";
import TransparentHeader from "../../components/TransparentHeader";
import BigYellowButton from "../../components/BigYellowButton";
import ProductBox from "../../components/Catalog/ProductBox";
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

const { width } = Dimensions.get('window');

class CheckOut extends Component {

    state = {

        billingName: '',
        billingAddress: '',
        recepientPhone: '',
        productArr: [],
        cartArr: [],
        testTemp: [],
        merchandiseSubtotal: 0,
        shippingSubtotal: 4.82,
        totalPayment: 0,
        userBranchId: ''

    };

    setUserBranchId = (userBranchId) => [

        this.setState({ userBranchId })

    ]


    setBillingAddress = (billingAddress) => {

        this.setState({ billingAddress })

    }

    setBillingName = (billingName) => {

        this.setState({ billingName })

    }

    setRecipientPhone = (recepientPhone) => {

        this.setState({ recepientPhone })

    }

    setCartArr = (cartArr) => {

        this.setState({ cartArr })

    }

    setProductArr = (productArr) => {

        this.setState({ productArr })

    }

    setMerchandiseSubtotal = (merchandiseSubtotal) => {

        this.setState({ merchandiseSubtotal })

    }

    setShippingSubtotal = (shippingSubtotal) => {

        this.setState({ shippingSubtotal })

    }

    setTotalPayment = (totalPayment) => {

        this.setState({ totalPayment })

    }

    getData = () => {

        database()
            .ref('/Products')
            .once('value', (snapshot) => {
                if (snapshot.exists()) {

                    let data = [];
                    snapshot.forEach((child) => {
                        temp = child.val()
                        temp.id = child.key
                        data.push(temp)
                        this.setProductArr(data)
                    })

                }
                else {
                    return null
                }
            }).then(() => {

                database()
                    .ref('/Users')
                    .once('value', (snapshot) => {

                        if (snapshot.exists()) {

                            snapshot.forEach((child) => {

                                if (child.val().uid == auth().currentUser.uid) {

                                    this.setUserBranchId(child.key)

                                    if (child.val().cart != null) {

                                        this.setCartArr(Object.values(child.val().cart))

                                    }
                                }
                            })

                        }
                    }).then(() => {

                        this.getMerchandiseSubtotal()
                        this.getTotalPayment()

                    })



            });


    }

    getProductData = (itemId) => {


        const { productArr, cart } = this.state
        let newData = {}

        for (i = 0; i < productArr.length; i++) {

            if (productArr[i].id == itemId) {

                newData.product_name = productArr[i].product_name
                newData.product_image = productArr[i].product_image
                newData.product_price = productArr[i].product_price

            }


        }

        return newData
    }

    componentDidMount() {
        this.getData()
    }

    getMerchandiseSubtotal = () => {


        const { cartArr, productArr } = this.state
        let sum = 0

        for (i = 0; i < productArr.length; i++) {

            for (j = 0; j < cartArr.length; j++) {

                if (productArr[i].id == cartArr[j].item_id) {

                    sum = sum + parseFloat(productArr[i].product_price) * parseFloat(cartArr[j].quantity)

                }
            }
        }

        this.setMerchandiseSubtotal(sum)

    }

    getTotalPayment = () => {

        let sum = 0

        const { merchandiseSubtotal, shippingSubtotal } = this.state

        sum = parseFloat(merchandiseSubtotal) + parseFloat(shippingSubtotal)

        this.setTotalPayment(sum)



    }

    placeOrder = () => {


        database()
            .ref('/Orders/')
            .push({

                uid: auth().currentUser.uid,
                cart: this.state.cartArr,
                billingName: this.state.billingName,
                billingAddress: this.state.billingAddress,
                recepientPhone: this.state.recepientPhone,
                merchandiseSubtotal: this.state.merchandiseSubtotal,
                shippingSubtotal: this.state.shippingSubtotal,
                totalPayment: this.state.totalPayment,
                timestamp: Date.now(),

            })
            .then(async () => {

                database()
                    .ref('/Users/' + this.state.userBranchId + '/cart')
                    .remove()
                    .then(() => {
                        this.props.navigation.navigate('TabsCust');
                        alert('Your order has been placed')
                    })


            });


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
                                placeholder="Recepient Phone Number"
                                value={this.state.recepientPhone}
                                onChangeText={this.setRecipientPhone}
                                style={[styles.inputName, { marginTop: 15 }]}
                                keyboardType="numeric"
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


                        {this.state.cartArr.map((product, index) => (

                            <ProductBox
                                key={index}
                                prodName={this.getProductData(product.item_id).product_name}
                                prodPrice={this.getProductData(product.item_id).product_price}
                                prodImage={this.getProductData(product.item_id).product_image}
                                quantity={product.quantity}

                            />


                        ))}
                        {/* <ProductBox /> */}
                        <View style={styles.billingDetailsBox}>
                            <Text style={styles.title}>Payment Details</Text>
                            <View style={styles.space}>
                                <Text>Merchandise Subtotal</Text>
                                <Text>{'RM ' + Number(this.state.merchandiseSubtotal).toFixed(2)}</Text>
                            </View>
                            <View style={styles.space}>
                                <Text>Shipping Subtotal</Text>
                                <Text>{'RM ' + Number(this.state.shippingSubtotal).toFixed(2)}</Text>
                            </View>
                            <View style={[styles.space, styles.totalPaymentBox]}>
                                <Text style={{ fontSize: 18, fontWeight: '700', color: 'black' }}>Total Payment</Text>
                                <Text style={{ fontSize: 18, color: '#DB9B06' }}>{'RM ' + Number(this.state.totalPayment).toFixed(2)}</Text>
                            </View>
                        </View>

                    </ScrollView>
                    <BigYellowButton clickHandle={() => {

                        this.state.billingName && this.state.billingAddress && this.state.recepientPhone ?
                            this.placeOrder() : alert('All field must be filled')

                    }} btnText={'Place Order'} />
                </View>
            </View>


        )

    }

}

export default CheckOut

const styles = StyleSheet.create({


    billingDetailsBox: {
        backgroundColor: 'white',
        padding: 12,
        borderRadius: 3,
        marginBottom: 12,
    },

    title: {
        fontSize: 16,
        marginBottom: 15,
        fontWeight: '600',

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
    },

    space: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 2,
    },

    totalPaymentBox: {
        marginTop: 10,
    }

});
