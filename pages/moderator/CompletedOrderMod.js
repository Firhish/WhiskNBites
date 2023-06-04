import { Component } from "react";
import { Text, View, Pressable, SafeAreaView, ScrollView } from "react-native";
import database from '@react-native-firebase/database';
import PendingBoxMod from "../../components/Order/PendingBoxMod";

class CompletedOrderMod extends Component {
    state = {

        orderArr: [],

    }

    setOrderArr = (orderArr) => {

        this.setState({ orderArr })

    }

    getData() {

        database()
            .ref('/Archived_Orders')
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

    viewOrderDetail = (orderId,status) => {

        this.props.navigation.navigate('ViewOrderDetailMod', { orderId: orderId, status: status })

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

                        <Pressable key={index} onPress={() => this.viewOrderDetail(order.orderId,order.status)}>
                            <PendingBoxMod
                                orderId={order.orderId}
                                totalPayment={order.totalPayment}
                                cart={order.cart}
                                status={order.status}
                                onPressBtn={() => this.shipped(order.orderId)}
                                uid={order.uid}
                            />
                        </Pressable>
                    )).reverse() : <Text style={{ textAlign: 'center', marginTop: '70%', fontSize: 16 }}>No order placed yet</Text>}
                </ScrollView>



            </SafeAreaView>
        )
    }
}

export default CompletedOrderMod