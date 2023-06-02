import { Component } from "react";
import { Pressable, SafeAreaView, ScrollView, Text } from "react-native";
import ToReceiveBoxCust from "../../components/Order/ToReceiveBoxCust";
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import CompletedOrderBoxCust from "../../components/Order/CompletedOrderBoxCust";

class CompletedOrder extends Component {

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

                        if (child.val().uid == auth().currentUser.uid) {
                            temp = child.val()
                            temp.orderId = child.key
                            data.push(temp)
                        }

                        else {
                            return null
                        }

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

    viewOrderDetail = (orderId, status) => {

        this.props.navigation.navigate('ViewOrderDetailCust', { orderId: orderId, status: status })

    }


    render() {

        return (

            <SafeAreaView style={{ flex: 1, padding: 12 }}>
                <ScrollView>
                    {this.state.orderArr.length != 0 ? this.state.orderArr.map((order, index) => (

                        <Pressable key={index} onPress={() => this.viewOrderDetail(order.orderId, order.status)}>
                            <CompletedOrderBoxCust
                                orderId={order.orderId}
                                totalPayment={order.totalPayment}
                                cart={order.cart}
                                status={order.status}
                            />
                        </Pressable>



                    )) : <Text style={{ textAlign: 'center', marginTop: '70%', fontSize: 16 }}>No order placed yet</Text>}
                </ScrollView>



            </SafeAreaView>
        )
    }
}

export default CompletedOrder