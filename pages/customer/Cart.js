import { Component } from "react";
import { Pressable, Text, View, ScrollView } from 'react-native';
import TransparentHeader from "../../components/TransparentHeader";
import ProductBox from "../../components/Catalog/ProductBox";
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import OptionModal from '../../components/OptionModal';
import Overlay from '../../components/Overlay';
import ConfirmModal from '../../components/ConfirmModal';
import CounterModal from "../../components/Catalog/CounterModal";
import BigYellowButton from "../../components/BigYellowButton";

class Cart extends Component {

    state = {

        cart: [],
        tempCart: [],
        tempCartId: [],
        prodArr: [],
        modalVisible: false,
        confirmModalVisible: false,
        counterModalVisible: false,
        cartBranchId: '',
        userBranchId: '',
        quantity:''

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
    
    setQuantity = (quantity) => {
        this.setState({ quantity });
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

    setCounterModalVisible = (visible) => {
        this.setState({ counterModalVisible: visible })
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

    updateQty = (inp) => {

        database()
            .ref('/Users/' + this.state.userBranchId + '/cart/' + this.state.cartBranchId)
            .update({ quantity:inp })
            .then(() => {
                alert('Quantity updated successfully')
            })
        
            this.setCounterModalVisible(!this.state.counterModalVisible)

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

            <View style={{ flex: 1, }}>
                <TransparentHeader title='Cart' goBack={this.props.navigation.goBack} />
                <View style={{ flex: 1, padding:12 }}>
                    <ScrollView>
                        {this.state.cart.length != 0 ?
                            this.renderItems() : <Text style={{ textAlign: 'center', marginTop: '70%', fontSize: 16 }}>No item added yet</Text>}
                    </ScrollView>
                    <BigYellowButton clickHandle={()=>console.log('Proceed to checkout')} btnText={'Proceed To Checkout'} />
                </View>
                
                <OptionModal
                    modalVisible={this.state.modalVisible}
                    toggle={() => { this.setModalVisible(!this.state.modalVisible) }}
                    firstOptFunc={() => {
                        this.setConfirmModalVisible(!this.state.confirmModalVisible)

                    }}
                    secondOptFunc={() => {

                        this.setCounterModalVisible(!this.state.counterModalVisible)

                    }}
                    firstOptText='Delete Product'
                    secondOptText='Edit Quantity'
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

                <CounterModal
                    visible={this.state.counterModalVisible}
                    warnText={'Enter item quantity'}
                    onConfirm={this.updateQty}
                    onCancel={() => {
                        console.log('x jadi edit')
                        this.setCounterModalVisible(!this.state.counterModalVisible)
                    }}
                />
                <Overlay visible={this.state.modalVisible} />
            </View>


        )
    }
}

export default Cart