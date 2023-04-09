import React, { Component } from 'react';
import { View, Text, TextInput, Button, Image, StyleSheet, Pressable } from 'react-native';
import database from '@react-native-firebase/database';
import TransparentHeader from '../../components/TransparentHeader';
// import '@react-native-firebase/storage';
// import ImagePicker from 'react-native-image-picker';

class AddProductForm extends Component {
  state = {
    productName: '',
    productPrice: '',
    productImage: null,
  };

  handleProductNameChange = productName => {
    this.setState({ productName });
  };

  handleProductPriceChange = productPrice => {
    this.setState({ productPrice });
  };

  handleProductImage = productImage => {
    this.setState({ productImage });
  };

  pickImage = () => {

    console.log('pick image insya allah jadi')
  };

  handleSubmit = () => {

    database()
      .ref('/Products')
      .push()
      .set({
        product_name: this.state.productName,
        product_price: this.state.productPrice,
        product_image: 'https://firebasestorage.googleapis.com/v0/b/whisk-n-bites-a4339.appspot.com/o/almondLondon.jpg?alt=media&token=4d342545-4f84-435b-91b3-461ce530b15f',
      })
      .then(() => {
        alert('Product added successfully')
        this.props.navigation.navigate('TabsMod');
      })
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <TransparentHeader title="Add New Product" goBack={this.props.navigation.goBack} />
        <View style={styles.container}>
          <View style={{ width: '100%', }}>
          <Text style={{ fontSize: 22,marginVertical:30, }}>Enter product information</Text>
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
          {this.state.productImage && (
              <Image style={styles.image} source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/whisk-n-bites-a4339.appspot.com/o/almondLondon.jpg?alt=media&token=4d342545-4f84-435b-91b3-461ce530b15f' }} />
            )}
            <Pressable onPress={()=>this.handleProductImage('https://firebasestorage.googleapis.com/v0/b/whisk-n-bites-a4339.appspot.com/o/almondLondon.jpg?alt=media&token=4d342545-4f84-435b-91b3-461ce530b15f')}>
              <Text style={styles.chooseImgBtn}>Choose Image</Text>
            </Pressable>
          </View>
          <Pressable onPress={this.handleSubmit}>
            <Text style={styles.submitBtn}>SUBMIT</Text>
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
    marginVertical:10,
    width: '90%',
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
    backgroundColor: '#c1c1c1',
    color: 'white',
    marginTop:10,
    borderRadius:8,

  },

  submitBtn: {

    textAlign: 'center',
    paddingVertical: 15,
    fontSize: 18,
    fontWeight:'bold',
    backgroundColor: '#DB9B06',
    color: 'white',

  }

});

export default AddProductForm;