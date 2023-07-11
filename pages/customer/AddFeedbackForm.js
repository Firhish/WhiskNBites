import React, { Component } from 'react';
import { View, Text, TextInput, Button, Image, StyleSheet, Pressable } from 'react-native';
import database from '@react-native-firebase/database';
import TransparentHeader from '../../components/TransparentHeader';
import auth from '@react-native-firebase/auth';

class AddFeedbackForm extends Component {
  state = {
    productComment: ''
  };

  handleProductCommentChange = productComment=> {
    this.setState({ productComment });
  };

  handleSubmit = () => {

    database()
      .ref('/Products/'+this.props.route.params.productId+'/product_feedbacks')
      .push()
      .set({
        comment: this.state.productComment,
        user_id: auth().currentUser.uid,
        timestamp: Date.now(),
      })
      .then(() => {
        alert('Feedback added successfully')
        this.props.navigation.navigate('TabsCust');
      })
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <TransparentHeader title="Add New Feedback" goBack={this.props.navigation.goBack} />
        <View style={styles.container}>
          <View style={{ width: '100%', }}>
          <Text style={styles.titleText}>Give us your feedback</Text>
            <TextInput
              style={styles.input}
              onChangeText={this.handleProductCommentChange}
              value={this.state.productComment}
              placeholder={'Enter your comment here'}
              multiline={true}
            />
          </View>
          <Pressable onPress={(this.state.productName!='')?this.handleSubmit:() => { alert('All field must be filled')}}>
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

  },

  titleText: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 25,
    
},

});

export default AddFeedbackForm;
