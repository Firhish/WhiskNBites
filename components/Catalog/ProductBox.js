import { Component } from "react";
import { StyleSheet, Text, View, Image } from 'react-native';

class ProductBox extends Component {

    state = {

        prodImage: 'https://firebasestorage.googleapis.com/v0/b/whisk-n-bites-a4339.appspot.com/o/placehoderImage.png?alt=media&token=d9450216-c3da-47a4-88e2-f3fdf7a5037d',

    }

    render() {

        return (

            <View>
                <View style={styles.mainContainer}>
                    <Image style={styles.image} source={this.props.prodImage ? { uri: this.props.prodImage } : { uri: this.state.prodImage }} />
                    <View style={styles.descContainer}>
                        <Text style={styles.productName}>{this.props.prodName ? this.props.prodName : 'This item currently unavailable'}</Text>
                        <Text style={styles.productPrice}>{'RM ' + Number(this.props.prodPrice).toFixed(2)}</Text>
                        <Text style={styles.productQuantity}>{this.props.quantity ? ('x' + this.props.quantity) : ('')}</Text>
                    </View>
                </View>
            </View>

        )
    }
}

const styles = StyleSheet.create({

    mainContainer: {

        padding: 15,
        backgroundColor: 'white',
        flexDirection: 'row',
        marginBottom: 12,
        borderRadius: 5,



    },

    image: {

        height: 80,
        width: 80,
        borderRadius: 10,

    },

    descContainer: {

        marginLeft: 30,

    },

    productName: {

        fontSize: 16,
        color: '#DB9B06',

    },

    productPrice: {

        fontWeight: 'bold',
        fontSize: 18,
        color: 'black',

    },

    productQuantity: {

        fontSize: 14,
        marginTop: 8,

    }

})

export default ProductBox