import { Component } from "react";
import { SafeAreaView, Text, View, Dimensions, StyleSheet, Image, TouchableHighlight, ScrollView } from "react-native";
import TransparentHeader from "../../components/TransparentHeader";
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';

const { width } = Dimensions.get('window');

class CatalogIndCust extends Component {

    state = {

        itemIdArr: [],
        usersBranchId: '',
        cartBranchId:'',
        quantity:'',
        prodName: 'Dummy Name',
        prodPrice: '0',
        prodDesc: 'Dummy Desc',
        prodImage: 'data:image/png;base64,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',
    
    }

    setProdName = prodName => {
        this.setState({ prodName })
    }

    setProdPrice = prodPrice => {
        this.setState({ prodPrice })
    }

    setProdDesc = prodDesc => {
        this.setState({ prodDesc })
    }

    setProdImage = prodImage => {
        this.setState({ prodImage })
    }

    setUsersBranchId = usersBranchId => {
        this.setState({ usersBranchId })
    }

    setCartBranchId = cartBranchId => {
        this.setState({ cartBranchId })
    }

    setItemIdArr = itemIdArr => {
        this.setState({ itemIdArr })
    }

    setQuantity = quantity => {
        this.setState({ quantity })
    }

    getData = () => {

        database()
            .ref('/Products/' + this.props.route.params.productId)
            .on('value', (snapshot) => {
                if (snapshot.exists()) {
                    this.setProdName(snapshot.val().product_name)
                    this.setProdPrice(snapshot.val().product_price)
                    this.setProdDesc(snapshot.val().product_description)
                    this.setProdImage(snapshot.val().product_image)
                }
                else {
                    return null
                }

            });

    }

    componentDidMount() {

        this.getData()

    }

    addToCart = () => {

        database()
            .ref('/Users')
            .once('value', (snapshot) => {

                snapshot.forEach((child) => {
                    if (child.val().uid == auth().currentUser.uid) {

                        this.setUsersBranchId(child.key)

                        database()
                            .ref('/Users/' + this.state.usersBranchId + '/cart')
                            .once('value', (snapshot) => {

                                let data = []
                                snapshot.forEach((child) => {

                                    if(child.val().item_id==this.props.route.params.productId){

                                        this.setCartBranchId(child.key)
                                        this.setQuantity(child.val().quantity)

                                    }
                                    temp = child.val().item_id
                                    data.push(temp)
                                    this.setItemIdArr(data)

                                })
                          

                            }).then(() => {

                                if (this.state.itemIdArr.includes(this.props.route.params.productId)) {

                                    database()
                                        .ref('/Users/' + this.state.usersBranchId + '/cart/'+this.state.cartBranchId)
                                        .update({
                                            quantity: this.state.quantity + 1
                                        })
                                        .then(() => {
                                            alert('Product added to cart successfully')
                                            console.log('Item quantity updated')
                                        });
                                }
                                else {

                                    database()
                                        .ref('/Users/' + this.state.usersBranchId + '/cart')
                                        .push()
                                        .set({
                                            item_id: this.props.route.params.productId,
                                            quantity: 1,
                                        })
                                        .then(() => {
                                            alert('Product added to cart successfully')
                                            console.log('New item added')
                                        })
                                }
                            });
                    }
                    else {
                        return null
                    }
                })
            });
    }

    render() {

        return (

            <View style={styles.mainContainer}>
                <TransparentHeader goBack={this.props.navigation.goBack} />
                <Image source={{ uri: this.state.prodImage }} style={styles.image} />
                <View style={styles.spaceContainer}>
                    <View style={styles.textContainer}>
                        <Text style={styles.prodNameText}>{this.state.prodName}</Text>
                        <Text style={styles.prodPriceText}>{'RM ' + Number(this.state.prodPrice).toFixed(2)}</Text>
                        <ScrollView><Text style={styles.prodDescText}>{this.state.prodDesc}</Text></ScrollView>
                        
                    </View>
                    <View style={styles.btnContainer}>
                        <TouchableHighlight underlayColor={'transparent'} onPress={this.addToCart}>
                            <Text style={styles.addToCartBtn}>Add To Cart</Text>
                        </TouchableHighlight>
                        <TouchableHighlight underlayColor={'transparent'} onPress={() => { this.props.navigation.navigate('Feedbacks', { productId: this.props.route.params.productId }) }}>
                            <Text style={styles.custFeedbackBtn}>Customer Feedbacks</Text>
                        </TouchableHighlight>
                    </View>

                </View>


            </View>
        )
    }
}

const styles = StyleSheet.create({

    mainContainer: {
        flex: 1,
    },

    image: {
        width: width,
        height: (2 / 3) * width,
    },

    spaceContainer: {

        flex: 1,
        display: 'flex',
        justifyContent: 'space-between',

    },

    textContainer: {
        paddingTop: 30,
        paddingHorizontal: 20,
    },

    prodNameText: {
        fontSize: 28,
        color: '#DB9B06',
    },

    prodPriceText: {
        fontSize: 22,
        fontWeight: 'bold',
        color: 'black',
    },

    prodDescText: {
        marginTop: 20,
        fontSize: 16,
    },

    btnContainer: {
        padding: 20,
    },

    addToCartBtn: {
        textAlign: 'center',
        paddingVertical: 15,
        fontSize: 18,
        fontWeight: 'bold',
        backgroundColor: '#DB9B06',
        color: 'white',
    },

    custFeedbackBtn: {
        textAlign: 'center',
        marginTop: 10,
        marginBottom: 10,
        fontSize:16,
        color: '#DB9B06',
    }

})

export default CatalogIndCust