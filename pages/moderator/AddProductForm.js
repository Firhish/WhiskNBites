import React, { Component } from 'react';
import { View, Text, TextInput, Button, Image, StyleSheet } from 'react-native';
import database from '@react-native-firebase/database';
// import '@react-native-firebase/storage';
// import ImagePicker from 'react-native-image-picker';


const uploadImage = async (imageUri) => {
  const response = await fetch(imageUri);
  const blob = await response.blob();
  const ref = firebase.storage().ref().child(`images/${new Date().getTime()}`);
  await ref.put(blob);
  return ref.getDownloadURL();
};

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

  pickImage = () => {
    // ImagePicker.launchImageLibrary({}, (response) => {
    //   if (!response.didCancel && !response.error) {
    //     setImageUri(response.uri);
    //     uploadImage(response.uri)
    //       .then((url) => console.log('Image uploaded successfully:', url))
    //       .catch((error) => console.error('Error uploading image:', error));
    //   }
    // });
    console.log('pick image insya allah jadi')
  };

  handleSubmit = () => {
    // const { productName, productPrice, productImage } = this.state;
    // Do something with the form data

    database()
      .ref('/Products')
      .push()
      .set({
        product_name: this.state.productName,
        product_price: this.state.productPrice,
        product_image: 'https://firebasestorage.googleapis.com/v0/b/whisk-n-bites-a4339.appspot.com/o/almondLondon.jpg?alt=media&token=4d342545-4f84-435b-91b3-461ce530b15f',
      })
      .then(()=>{
        alert('Product added successfully')
        this.props.navigation.navigate('TabsMod');
        

    })
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>Enter product information</Text>
        {/* <Text style={styles.label}>Product Name:</Text> */}
        <TextInput
          style={styles.input}
          onChangeText={this.handleProductNameChange}
          value={this.state.productName}
          placeholder='Product Name'
        />

        {/* <Text style={styles.label}>Product Price:</Text> */}
        <TextInput
          style={styles.input}
          onChangeText={this.handleProductPriceChange}
          value={this.state.productPrice}
          keyboardType="numeric"
          placeholder='Product Price'
        />

        <Text style={styles.label}>Product Image:</Text>
        {this.state.productImage && (
          <Image style={styles.image} source={{ uri: this.state.productImage.uri }} />
        )}
        <Button
          title="Choose Image"
          onPress={
            this.pickImage
          }
        />

        <Button title="Submit" onPress={this.handleSubmit} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    margin: 10,
    width: '80%',
    borderRadius: 5,
  },
  image: {
    width: 200,
    height: 200,
    marginVertical: 10,
    borderRadius: 5,
  },
});

export default AddProductForm;
