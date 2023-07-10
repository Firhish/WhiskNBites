import { Component } from "react";
import { View, Text, ScrollView, TextInput, StyleSheet, Dimensions, TouchableOpacity, Pressable } from "react-native";
import TransparentHeader from "../../components/TransparentHeader";
import BigYellowButton from "../../components/BigYellowButton";
import ProductBox from "../../components/Catalog/ProductBox";
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import Ionicons from 'react-native-vector-icons/Ionicons';
import VoucherModal from "../../components/Promotion/VoucherModal";

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
        shippingSubtotal: 0,
        totalPayment: 0,
        userBranchId: '',
        selectedOption: null,
        discount: 0,
        promotionArr: [],
        voucherModalVisible: false,

    };

    setUserBranchId = (userBranchId) => [

        this.setState({ userBranchId })

    ]

    setVoucherModalVisible = (voucherModalVisible) => {

        this.setState({ voucherModalVisible })

    }

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

    setPromotionArr = (promotionArr) => {

        this.setState({ promotionArr })

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

    setSelectedOption = (selectedOption) => {
        this.setState({ selectedOption });
    };

    setDiscount = (discount) => {
        this.setState({ discount })
    };

    validatePhone = () => {
        const { recepientPhone } = this.state;
        const phoneRegex = /^\d{10}$|^\d{11}$|^\+[1-9]\d{10}$/;
        if (!phoneRegex.test(recepientPhone)) {
            alert('Please enter a valid phone number.');
        } else {
            console.log('masuk boss')
            this.placeOrder()
        }
    };

    getData = () => {


        database()
            .ref('/Promotions')
            .once('value', (snapshot) => {
                if (snapshot.exists()) {

                    let data = [];
                    snapshot.forEach((child) => {
                        temp = child.val()
                        temp.id = child.key
                        data.push(temp)
                        this.setPromotionArr(data)
                    })

                }
                else {
                    return null
                }
            })



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

    getDiscount = () => {

        const { merchandiseSubtotal, discount, promotionArr } = this.state
        let sum = 0
        sum = discount * merchandiseSubtotal
        return sum

    }



    getTotalPayment = () => {

        let sum = 0
        const { merchandiseSubtotal, shippingSubtotal } = this.state
        sum = (parseFloat(merchandiseSubtotal) - this.getDiscount()) + parseFloat(shippingSubtotal)
        return sum

    }

    getCodeResult = (code) => {

        const { promotionArr } = this.state
        let isInvalidCode = true

        for (i = 0; i < promotionArr.length; i++) {

            if (promotionArr[i].code == code) {

                this.setDiscount(promotionArr[i].discount)
                isInvalidCode = false

            }
        }

        if (isInvalidCode) {

            alert('Please enter valid promo code')

        }
        else {

            alert('Voucher applied successfully')

        }




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
                discountAmount: this.getDiscount().toFixed(2),
                totalPayment: this.getTotalPayment(),
                timestamp: Date.now(),
                status: 'PREPARING',
                discount: this.state.discount,

            })
            .then(async () => {

                database()
                    .ref('/Users/' + this.state.userBranchId + '/cart')
                    .remove()
                    .then(() => {
                        this.props.navigation.navigate('PaymentCust');

                    })
            });

    }

    render() {

        return (

            <View style={{ flex: 1 }}>
                <TransparentHeader title='Checkout' goBack={this.props.navigation.goBack} />
                <View style={{ flex: 1, padding: 12 }}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View style={styles.billingDetailsBox}>

                            <Text style={styles.title}>Postage Details</Text>

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
                                style={[styles.inputAddress, { marginBottom: 12 }]}
                                multiline={true}
                                textAlignVertical="top"
                            />

                            <Text style={{ fontSize: 15, marginBottom: 12 }}>Select region: </Text>



                            <View style={styles.container}>
                                <TouchableOpacity
                                    style={[styles.optionButton, this.state.selectedOption === 'option1' && styles.selectedOption]}
                                    onPress={() => {

                                        this.setSelectedOption('option1')
                                        this.setShippingSubtotal(5)

                                    }}
                                >
                                    <Text style={[styles.optionText, this.state.selectedOption === 'option1' && styles.selectedOptionText]}>Peninsular Malaysia</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[styles.optionButton, this.state.selectedOption === 'option2' && styles.selectedOption]}
                                    onPress={() => {

                                        this.setSelectedOption('option2')
                                        this.setShippingSubtotal(12)

                                    }}
                                >
                                    <Text style={[styles.optionText, this.state.selectedOption === 'option2' && styles.selectedOptionText]}>Sabah & Sarawak</Text>
                                </TouchableOpacity>
                            </View>

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
                        <View style={styles.billingDetailsBox}>
                            <Text style={styles.title}>Payment Details</Text>
                            <View style={styles.space}>
                                <Text>Merchandise Subtotal</Text>
                                <Text>{'RM ' + Number(this.state.merchandiseSubtotal).toFixed(2)}</Text>
                            </View>
                            <View style={styles.space}>
                                <Text>{'Discount (' + (this.state.discount * 100) + '%)'}</Text>
                                <Text>{'-- RM ' + Number(this.getDiscount()).toFixed(2)}</Text>
                            </View>
                            <View style={styles.space}>
                                <Text>Shipping Subtotal</Text>
                                <Text>{'RM ' + Number(this.state.shippingSubtotal).toFixed(2)}</Text>
                            </View>

                            <Pressable onPress={() => { this.setVoucherModalVisible(!this.state.voucherModalVisible) }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 8 }}>
                                    <Ionicons name={'receipt-outline'} size={22} color={'#DB9B06'} />
                                    <Text style={{ fontSize: 16, fontWeight: '700', color: '#DB9B06', marginLeft: 8 }}>Apply a voucher</Text>
                                </View>
                            </Pressable>
                            <View style={[styles.space, styles.totalPaymentBox]}>
                                <Text style={{ fontSize: 18, fontWeight: '700', color: 'black' }}>Total Payment</Text>
                                <Text style={{ fontSize: 18, color: '#DB9B06' }}>{'RM ' + Number(this.getTotalPayment()).toFixed(2)}</Text>
                            </View>
                        </View>
                    </ScrollView>
                    <BigYellowButton clickHandle={() => {
                        if (this.state.billingName && this.state.billingAddress && this.state.recepientPhone && this.state.selectedOption) {
                            this.validatePhone()
                        }
                        else {
                            alert('All field must be filled')
                        }
                    }

                    } btnText={'Place Order'} />

                </View>
                <VoucherModal
                    visible={this.state.voucherModalVisible}
                    onConfirm={(code) => {
                        this.getCodeResult(code)
                        this.setVoucherModalVisible(!this.state.voucherModalVisible)
                    }}
                    onCancel={() => this.setVoucherModalVisible(!this.state.voucherModalVisible)}
                />
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
    },

    container: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    optionButton: {
        width: '48%',
        height: 40,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'grey',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
    },
    selectedOption: {
        borderColor: '#DB9B06',
        borderWidth: 2,
    },
    optionText: {
        fontSize: 15,

    },
    selectedOptionText: {
        fontSize: 15,
        color: '#DB9B06',
        fontWeight: '600',
    }

});
