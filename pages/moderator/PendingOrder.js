import { Component } from "react";
import { Text, View, Pressable, SafeAreaView, ScrollView } from "react-native";
import database from '@react-native-firebase/database';
import PendingBoxMod from "../../components/Order/PendingBoxMod";

class PendingOrder extends Component {
    state = {

        orderArr: [],

    }

    setOrderArr = (orderArr) => {

        this.setState({ orderArr })

    }

    getData() {

        database()
            .ref('/Orders')
            .on('value', (snapshot) => {
                if (snapshot.exists()) {

                    let data = [];
                    snapshot.forEach((child) => {

                        temp = child.val()
                        temp.orderId = child.key
                        data.push(temp)

                    })

                    this.setOrderArr(data)
                }

                else {
                    this.setOrderArr([])
                }
            });

    }

    componentDidMount() {
        this.getData()
    }

    viewOrderDetail = (orderId) => {

        this.props.navigation.navigate('ViewOrderDetailCust', { orderId: orderId })

    }

    shipped = (orderId) => {

        database()
            .ref('/Orders/' + orderId)
            .update({
                status: 'SHIPPED'
            })
            .then(() => {
                alert('Order status updated successfully')
            });

    }

    render() {

        return (

            <SafeAreaView style={{ flex: 1, padding: 12 }}>
                <ScrollView>
                    {this.state.orderArr.length != 0 ? this.state.orderArr.map((order, index) => (

                        <Pressable key={index} onPress={() => this.viewOrderDetail(order.orderId)}>
                            <PendingBoxMod
                                orderId={order.orderId}
                                totalPayment={order.totalPayment}
                                cart={order.cart}
                                status={order.status}
                                onPressBtn={() => order.status == 'SHIPPED' ? null : this.shipped(order.orderId)}
                                uid={order.uid}
                            />
                        </Pressable>
                    )).reverse() : <Text style={{ textAlign: 'center', marginTop: '70%', fontSize: 16 }}>No order placed yet</Text>}
                </ScrollView>



            </SafeAreaView>
        )
    }
}

export default PendingOrder