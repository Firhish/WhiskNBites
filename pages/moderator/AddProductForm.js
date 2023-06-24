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
        product_image: 'data:image/png;base64,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',
        product_description: this.state.productDescription,
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
            <TextInput
              style={styles.input}
              onChangeText={this.handleProductDescriptionChange}
              value={this.state.productDescription}
              placeholder='Product Description'
            />
          {this.state.productImage && (
              <Image style={styles.image} source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/whisk-n-bites-a4339.appspot.com/o/almondLondon.jpg?alt=media&token=4d342545-4f84-435b-91b3-461ce530b15f' }} />
            )}
            <Pressable onPress={()=>this.handleProductImageChange('https://firebasestorage.googleapis.com/v0/b/whisk-n-bites-a4339.appspot.com/o/almondLondon.jpg?alt=media&token=4d342545-4f84-435b-91b3-461ce530b15f')}>
              <Text style={styles.chooseImgBtn}>Choose Image</Text>
            </Pressable>
          </View>
          <Pressable onPress={(this.state.productName!='' && this.state.productPrice!='' && this.state.productDescription!='')?this.handleSubmit:() => { alert('All field must be filled')}}>
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
    marginVertical:10,
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
