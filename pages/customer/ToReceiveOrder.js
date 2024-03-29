import { Component } from "react";
import { Pressable, SafeAreaView, ScrollView, Text } from "react-native";
import ToReceiveBoxCust from "../../components/Order/ToReceiveBoxCust";
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

class ToReceiveOrder extends Component {

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

    viewOrderDetail = (orderId) => {

        this.props.navigation.navigate('ViewOrderDetailCust', { orderId: orderId })

    }

    moveToArchive = (orderId) => {

        let deleted

        console.log('Move to archive: ' + orderId)

        database()
            .ref('/Orders/' + orderId)
            .once('value', (snapshot) => {
                if (snapshot.exists()) {

                    deleted = snapshot.val()
                    deleted.status = 'COMPLETED'

                }

            }).then(() => {

                database()
                    .ref('/Archived_Orders/' + orderId)
                    .update(deleted)
                    .then(async () => {

                        database()
                            .ref('/Orders/' + orderId)
                            .remove()
                            .then(() => {
                                alert('Order received successfully')
                            })

                    })


            });



    }

    render() {

        return (

            <SafeAreaView style={{ flex: 1, padding: 12 }}>
                <ScrollView>
                    {this.state.orderArr.length != 0 ? this.state.orderArr.map((order, index) => (

                        <Pressable key={index} onPress={() => this.viewOrderDetail(order.orderId)}>
                            <ToReceiveBoxCust
                                orderId={order.orderId}
                                totalPayment={order.totalPayment}
                                cart={order.cart}
                                status={order.status}
                                onPressBtn={() => this.moveToArchive(order.orderId)}
                            />
                        </Pressable>



                    )).reverse() : <Text style={{ textAlign: 'center', marginTop: '70%', fontSize: 16 }}>No order placed yet</Text>}
                </ScrollView>



            </SafeAreaView>
        )
    }
}

export default ToReceiveOrder