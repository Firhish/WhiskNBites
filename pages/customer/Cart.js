import { Component } from "react";
import { Pressable, Text, View, ScrollView } from 'react-native';
import TransparentHeader from "../../components/TransparentHeader";
import ProductBox from "../../components/Catalog/ProductBox";
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import OptionModal from '../../components/OptionModal';
import Overlay from '../../components/Overlay';
import ConfirmModal from '../../components/ConfirmModal';

class Cart extends Component {

    state = {

        cart: [],
        tempCart: [],
        tempCartId: [],
        prodArr: [],
        modalVisible: false,
        confirmModalVisible: false,
        cartBranchId: '',
        userBranchId: '',

    }

    getData = () => {

        database()
            .ref('/Users')
            .on('value', (snapshot) => {

                if (snapshot.exists()) {

                    snapshot.forEach((child) => {

                        let tempCart
                        let tempCartId

                        if (child.val().uid == auth().currentUser.uid) {

                            if (child.val().cart != null) {

                                this.setTempCart(Object.values(child.val().cart))
                                this.setTempCartId(Object.keys(child.val().cart))
                                this.setUserBranchId(child.key)

                                for (i = 0; i < this.state.tempCartId.length; i++) {

                                    tempCart = this.state.tempCart
                                    tempCartId = this.state.tempCartId
                                    tempCart[i].cartBranchId = tempCartId[i]

                                }
                                this.setCart(tempCart)
                            }
                            else {
                                this.setCart([])
                            }

                        }
                    })
                }
                else {
                    this.setCart([])
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

    setCart = (arr) => {
        this.setState({ cart: arr });
    }

    setTempCart = (arr) => {
        this.setState({ tempCart: arr });
    }

    setTempCartId = (arr) => {
        this.setState({ tempCartId: arr });
    }

    setProdArr = (arr) => {
        this.setState({ prodArr: arr });
    }

    setModalVisible = (visible) => {
        this.setState({ modalVisible: visible })
    }

    setConfirmModalVisible = (visible) => {
        this.setState({ confirmModalVisible: visible })
    }

    setCartBranchId = (cartBranchId) => {
        this.setState({ cartBranchId });
    }

    setUserBranchId = (userBranchId) => {
        this.setState({ userBranchId });
    }

    componentDidMount() {
        this.getData()
    }

    getProdData(inp) {

        data = this.state.prodArr
        let temp = {}

        for (i = 0; i < data.length; i++) {

            if (data[i].id == inp) {

                temp.name = data[i].product_name
                temp.price = data[i].product_price
                temp.image = data[i].product_image

            }

        }
        return temp
    }


    deleteItem = (cartBranchId) => {

        database()
            .ref('/Users/' + this.state.userBranchId + '/cart/' + cartBranchId)
            .remove()
            .then(() => {
                alert('Product deleted successfully')
            })

    }


    renderItems = () => {

        const col = []

        this.state.cart.map((product, index) => (

            col.push(
                <Pressable
                    key={index}
                    onPress={() => {
                        this.props.navigation.navigate('CatalogIndCust', { productId: product.item_id })
                    }}
                    onLongPress={() => {

                        this.setModalVisible(!this.state.modalVisible)
                        this.setCartBranchId(product.cartBranchId)

                    }}
                >
                    <ProductBox
                        prodName={this.getProdData(product.item_id).name}
                        prodPrice={this.getProdData(product.item_id).price}
                        prodImage={this.getProdData(product.item_id).image}
                        quantity={product.quantity}
                        cartBranchId={product.cartBranchId}
                    />
                </Pressable>
            )
        ))

        return col

    }

    render() {

        return (

            <View style={{ flex: 1 }}>
                <ScrollView>
                    <TransparentHeader title='Cart' goBack={this.props.navigation.goBack} />
                    {this.state.cart.length != 0 ?
                        this.renderItems() : <Text style={{ textAlign: 'center', marginTop: '70%', fontSize: 16 }}>No item added yet</Text>}
                </ScrollView>
                <OptionModal
                    modalVisible={this.state.modalVisible}
                    toggle={() => { this.setModalVisible(!this.state.modalVisible) }}
                    firstOptFunc={() => {
                        this.setConfirmModalVisible(!this.state.confirmModalVisible)

                    }}
                    secondOptFunc={() => {

                        console.log('edit')

                    }}
                    firstOptText='Delete Product'
                    secondOptText='Edit Product'
                />
                <ConfirmModal
                    visible={this.state.confirmModalVisible}
                    warnText={'Are you sure you want to delete this product?'}
                    onConfirm={() => {
                        this.deleteItem(this.state.cartBranchId)
                        this.setConfirmModalVisible(!this.state.confirmModalVisible)
                    }}
                    onCancel={() => this.setConfirmModalVisible(!this.state.confirmModalVisible)}
                />
                <Overlay visible={this.state.modalVisible} />
            </View>


        )
    }
}

export default Cart