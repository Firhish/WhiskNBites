import { Component } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';



class ToReceiveBoxCust extends Component {

    state = {

        prodArr: [],

    }

    setProdArr = (prodArr) => {

        this.setState({ prodArr })

    }

    getData() {

        database()
            .ref('/Products')
            .on('value', (snapshot) => {
                if (snapshot.exists()) {

                    let data = [];
                    snapshot.forEach((child) => {
                        temp = child.val()
                        temp.id = child.key
                        data.push(temp)
                        this.setProdArr(data)
                    })
                }
                else {
                    return null
                }
            });
    }

    componentDidMount() {

        this.getData()

    }

    getName = (item_id) => {

        const { prodArr } = this.state

        for (i = 0; i < prodArr.length; i++) {

            if (item_id == prodArr[i].id) {

                return prodArr[i].product_name

            }

        }

    }



    render() {

        return (

            <View style={styles.mainContainer}>
                <Text style={styles.orderId}>{'Order ID: ' + this.props.orderId}</Text>

                {this.props.cart.map((item, index) => (


                    <View style={styles.itemList} key={index}>
                        <Text>{this.getName(item.item_id)}</Text>
                        <Text>{'x' + item.quantity}</Text>
                    </View>


                ))}

                <View style={styles.bottomPart}>
                    <Text style={styles.totalPrice}>{'RM ' + this.props.totalPayment}</Text>
                    <Pressable onPress={this.props.onPressBtn}>
                        <View style={styles.orderReceivedBtnContainer}><Text style={styles.btnText}>Order Received</Text></View>
                    </Pressable>

                </View>

            </View>

        )

    }

}

export default ToReceiveBoxCust

const styles = StyleSheet.create({

    mainContainer: {

        width: '100%',
        paddingVertical: 12,
        paddingHorizontal: 18,
        backgroundColor: 'white',
        borderRadius: 2,
        marginBottom: 12,

    },

    orderId: {

        fontSize: 16,
        marginBottom: 8,
        fontWeight: 'bold',

    },

    itemList: {

        flexDirection: 'row',
        justifyContent: 'space-between',

    },

    bottomPart: {

        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
        alignItems: 'center',

    },

    totalPrice: {

        fontSize: 18,
        color: '#DB9B06',

    },

    orderReceivedBtnContainer: {

        backgroundColor: '#DB9B06',
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 4,

    },

    btnText: {

        color: 'white',

    }
})