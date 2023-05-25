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
        productArr: [],
        cartArr: [],
        testTemp: [],
        merchandiseSubtotal: 0,
        shippingSubtotal: 4.82,
        totalPayment: 0,

    };


    setBillingAddress = (billingAddress) => {

        this.setState({ billingAddress })

    }

    setBillingName = (billingName) => {

        this.setState({ billingName })

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

                                    if (child.val().cart != null) {

                                        this.setCartArr(Object.values(child.val().cart))

                                    }
                                }
                            })

                        }
                    }).then(() => {

                        const { productArr, cartArr } = this.state

                        let tempProductArr = productArr

                        for (i = 0; i < tempProductArr.length; i++) {

                            for (j = 0; j < cartArr.length; j++) {


                                if (tempProductArr[i].id == cartArr[j].item_id) {


                                    tempProductArr[i].quantity = cartArr[j].quantity
                                    // console.log(tempProductArr)
                                }

                                else {

                                    // console.log('tak sama')

                                }

                            }


                        }

                        for (i = 0; i < tempProductArr.length; i++) {

                            if (tempProductArr[i].quantity == null) {

                                tempProductArr.splice(i, 1)

                                // console.log(tempProductArr[i].product_name)

                            }

                        }

                        if (cartArr.length == 0) {

                            tempProductArr = []
                            console.log('MASUKKKK')
                        }

                        this.setProductArr(tempProductArr)



                        this.getMerchandiseSubtotal()
                        this.getTotalPayment()
                        // console.log(cartArr)
                        // console.log(productArr)

                    });

            });

    }

    componentDidMount() {
        this.getData()
    }

    getMerchandiseSubtotal = () => {

        const { productArr } = this.state
        let sum = 0

        for (i = 0; i < productArr.length; i++) {

            sum = sum + (productArr[i].product_price * productArr[i].quantity)

        }

        this.setMerchandiseSubtotal(sum)

    }

    getTotalPayment = () => {

        const { merchandiseSubtotal, shippingSubtotal } = this.state

        sum = merchandiseSubtotal + shippingSubtotal

        this.setTotalPayment(sum)
        // console.log('total payment: '+ sum)


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


                        {this.state.productArr.map((product, index) => (

                            <ProductBox
                                key={index}
                                prodName={product.product_name}
                                prodPrice={product.product_price}
                                prodImage={product.product_image}
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
                    <BigYellowButton clickHandle={() => console.log('place order')} btnText={'Place Order'} />
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
