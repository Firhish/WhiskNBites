import { Component } from 'react';
import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import database from '@react-native-firebase/database';
import Divider from '../Divider';
import StatusLabel from './StatusLabel';

class PendingBoxMod extends Component {

    state = {

        prodArr: [],
        userArr: [],
        profilePic: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRT23NlA9taxcUhdcm3JbbPqRoNfn5m9gxVjQ&usqp=CAU',

    }

    setProdArr = (prodArr) => {

        this.setState({ prodArr })

    }

    setUserArr = (userArr) => {

        this.setState({ userArr })

    }

    getData() {

        database()
            .ref('/Users')
            .on('value', (snapshot) => {

                if (snapshot.exists()) {

                    let data = [];
                    snapshot.forEach((child) => {
                        temp = child.val()
                        temp.id = child.key
                        data.push(temp)
                        this.setUserArr(data)

                    })

                }

            });

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

    getProductData = (item_id) => {

        const { prodArr } = this.state

        for (i = 0; i < prodArr.length; i++) {

            if (item_id == prodArr[i].id) {

                return prodArr[i].product_name

            }

        }

    }

    getProfileData = (uid) => {

        let data = {}

        const { userArr } = this.state

        for (i = 0; i < userArr.length; i++) {

            if (uid == userArr[i].uid) {

                data.username = userArr[i].username
                data.profilePic = userArr[i].dp_url

            }

        }

        return data

    }

    render() {

        return (

            <View style={styles.mainContainer}>

                <View style={styles.profileCredBox}>
                    <Image style={styles.profilePic} source={this.getProfileData(this.props.uid).profilePic ? { uri: this.getProfileData(this.props.uid).profilePic } : { uri: this.state.profilePic }} />
                    <Text style={styles.username}>{this.getProfileData(this.props.uid).username}</Text>
                </View>

                <Text style={styles.orderId}>{'Order ID: ' + this.props.orderId}</Text>

                {this.props.cart.map((item, index) => (


                    <View style={styles.itemList} key={index}>
                        <Text>{this.getProductData(item.item_id)}</Text>
                        <Text>{'x' + item.quantity}</Text>
                    </View>


                ))}

                <View style={styles.bottomPart}>
                    <View></View>
                    <Text style={styles.totalPrice}>{'RM ' + this.props.totalPayment}</Text>

                </View>
                <Divider />

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 12, alignItems: 'center' }}>
                    <StatusLabel status={this.props.status} />
                    <Pressable onPress={this.props.onPressBtn}>
                        <View style={styles.orderReceivedBtnContainer}><Text style={styles.btnText}>Order Shipped</Text></View>
                    </Pressable>
                </View>


            </View>

        )

    }

}

export default PendingBoxMod

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
        marginBottom: 12,

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
        textAlign: 'center',
        fontSize: 14,

    },

    profileCredBox: {

        flexDirection: 'row',
        marginBottom: 20,
        alignItems: 'center'

    },



    profilePic: {

        backgroundColor: 'grey',
        width: 35,
        height: 35,
        borderRadius: 35 / 2,
        marginRight: 16,

    },

    username: {

        fontSize: 16,
        fontWeight: 'bold',

    }
})