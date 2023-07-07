import React, { Component } from 'react';
import { View, Text, TextInput, Button, Image, StyleSheet, Pressable } from 'react-native';
import database from '@react-native-firebase/database';
import TransparentHeader from '../../components/TransparentHeader';

class EditProductForm extends Component {

    state = {
        productName: '',
        productPrice: '',
        productImage: null,
        productDescription: '',
    };

    handleProductNameChange = productName => {
        this.setState({ productName });
    };

    handleProductPriceChange = productPrice => {
        this.setState({ productPrice });
    };

    handleProductImageChange = productImage => {
        this.setState({ productImage });
    };

    handleProductDescriptionChange = productDescription => {
        this.setState({ productDescription });
    };

    getData = () => {

        database()
            .ref('/Products/' + this.props.route.params.productId)
            .on('value', (snapshot) => {
                if (snapshot.exists()) {
                    this.handleProductNameChange(snapshot.val().product_name)
                    this.handleProductPriceChange(snapshot.val().product_price)
                    this.handleProductDescriptionChange(snapshot.val().product_description)
                    this.handleProductImageChange(snapshot.val().product_image)
                }
                else {
                    return null
                }

            });

    }

    componentDidMount() {

        this.getData()
        console.log(this.state.productName)

    }

    pickImage = () => {

        console.log('pick image insya allah jadi')
    };

    handleSubmit = () => {

        database()
            .ref('/Products/' + this.props.route.params.productId)
            .update({
                product_name: this.state.productName,
                product_price: this.state.productPrice,
                // product_image: 'https://firebasestorage.googleapis.com/v0/b/whisk-n-bites-a4339.appspot.com/o/almondLondon.jpg?alt=media&token=4d342545-4f84-435b-91b3-461ce530b15f',
                product_description: this.state.productDescription,
            })
            .then(() => {

                this.props.navigation.navigate('TabsMod');
                alert('Product updated successfully')
            });
    };

    render() {
        return (
            <View style={{ flex: 1 }}>
                <TransparentHeader title="Edit Product" goBack={this.props.navigation.goBack} />
                <View style={styles.container}>
                    <View style={{ width: '100%', }}>
                        <Text style={{ fontSize: 22, marginVertical: 30, }}>Enter product information</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={this.handleProductNameChange}
                            value={this.state.productName}
                            placeholder='Product Name'
                        />
                        <TextInput
                            style={styles.input}
                            onChangeText={this.handleProductPriceChange}
                            value={this.state.productPrice}
                            keyboardType="numeric"
                            placeholder='Product Price'
                        />
                        <TextInput
                            style={styles.input}
                            onChangeText={this.handleProductDescriptionChange}
                            value={this.state.productDescription}
                            placeholder='Product Description'
                            multiline={true}
                        />
                        {this.state.productImage && (
                            <Image style={styles.image} source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/whisk-n-bites-a4339.appspot.com/o/almondLondon.jpg?alt=media&token=4d342545-4f84-435b-91b3-461ce530b15f' }} />
                        )}
                        <Pressable onPress={() => this.handleProductImageChange('https://firebasestorage.googleapis.com/v0/b/whisk-n-bites-a4339.appspot.com/o/almondLondon.jpg?alt=media&token=4d342545-4f84-435b-91b3-461ce530b15f')}>
                            <Text style={styles.chooseImgBtn}>Choose Image</Text>
                        </Pressable>
                    </View>
                    <Pressable onPress={(this.state.productName != '' && this.state.productPrice != '' && this.state.productDescription != '') ? this.handleSubmit : () => { alert('All field must be filled') }}>
                        <Text style={styles.submitBtn}>Save</Text>
                    </Pressable>
                </View>
            </View>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        padding: 20,
    },
    label: {
        fontSize: 14,
        marginBottom: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 8,
        marginVertical: 10,
        width: '100%',
        borderRadius: 5,
    },
    image: {
        width: 120,
        height: 120,
        marginTop: 20,
        marginBottom: 20,
        borderRadius: 5,
    },
    chooseImgBtn: {

        paddingVertical: 5,
        width: '40%',
        textAlign: 'center',
        backgroundColor: '#707070',
        color: 'white',
        marginTop: 10,
        borderRadius: 8,

    },

    submitBtn: {

        textAlign: 'center',
        paddingVertical: 15,
        fontSize: 18,
        fontWeight: 'bold',
        backgroundColor: '#DB9B06',
        color: 'white',

    }

});

export default EditProductForm;
