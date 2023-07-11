import { Component } from "react";
import { Pressable, Text, View, ScrollView, StyleSheet } from 'react-native';
import TransparentHeader from "../../components/TransparentHeader";
import ProductBox from "../../components/Catalog/ProductBox";
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import OptionModal from '../../components/OptionModal';
import Overlay from '../../components/Overlay';
import ConfirmModal from '../../components/ConfirmModal';
import CounterModal from "../../components/Catalog/CounterModal";
import BigYellowButton from "../../components/BigYellowButton";

class RateProductCust extends Component {

    state = {

        prodArr: [],

    }

    getData = () => {

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

    renderItems = () => {

        const cart = this.props.route.params.cart

        const col = []

        cart.map((product, index) => (

            col.push(
                <Pressable
                    key={index}
                    onPress={() => {
                        this.props.navigation.navigate('AddFeedbackForm', { productId: product.item_id })
                    }}
                    onLongPress={() => {}}
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

    setProdArr = (arr) => {
        this.setState({ prodArr: arr });
    }


    componentDidMount = () => {

        this.getData()
    }



    render() {

        return (

            <View style={{ flex: 1, }}>
                <TransparentHeader title='Rate Order' goBack={this.props.navigation.goBack} />
                <View style={{ flex: 1, padding: 12 }}>
                    <ScrollView>
                        <Text style={styles.titleText}>Choose a product to rate</Text>
                        {this.props.route.params.cart != 0 ?
                            this.renderItems() : <Text style={{ textAlign: 'center', marginTop: '70%', fontSize: 16 }}>No item added yet</Text>}
                    </ScrollView>
                </View>
            </View>


        )
    }
}

const styles = StyleSheet.create({


    titleText: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 25,
        
    },

})

export default RateProductCust