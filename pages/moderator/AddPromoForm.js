import React, { Component } from 'react';
import { View, Text, TextInput, Button, Image, StyleSheet, Pressable } from 'react-native';
import database from '@react-native-firebase/database';
import TransparentHeader from '../../components/TransparentHeader';
import MyDatePicker from '../../components/MyDatePicker';
import DatePicker from 'react-native-date-picker'
import moment from 'moment';

class AddPromoForm extends Component {
  state = {
    promoName: '',
    promoDiscount: '',
    promoValidity: null,
    promoCode: '',
  };

  handlePromoNameChange = promoName => {
    this.setState({ promoName });
  };

  handlePromoDiscountChange = promoDiscount => {
    this.setState({ promoDiscount });
  };

  handlePromoValidityChange = promoValidity => {
    this.setState({ promoValidity });
  };

  handlePromoCodeChange = promoCode => {
    this.setState({ promoCode });
  };

  setDate = (date) => {

    this.setState({ date })

  }

  setOpen = (open) => {

    this.setState({ open })

  }

  pickImage = () => {

    console.log('pick image insya allah jadi')
  };

  getDate = (date) => {
    this.handlePromoValidityChange(date)
  }

  handleSubmit = () => {


    database()
      .ref('/Promotions')
      .push()
      .set({
        name: this.state.promoName,
        discount: this.state.promoDiscount,
        code: this.state.promoCode,
        validity: Date.parse(this.state.promoValidity)
      })
      .then(() => {
        alert('Promotion added successfully')
        this.props.navigation.navigate('TabsMod');
      })


  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <TransparentHeader title="Add New Promotion" goBack={this.props.navigation.goBack} />
        <View style={styles.container}>
          <View style={{ width: '100%', }}>
            <Text style={{ fontSize: 22, marginVertical: 30, }}>Enter promotion information</Text>
            <TextInput
              style={styles.input}
              onChangeText={this.handlePromoNameChange}
              value={this.state.promoName}
              placeholder='Promotion Name'
            />
            <TextInput
              style={styles.input}
              onChangeText={this.handlePromoDiscountChange}
              value={this.state.promoDiscount}
              keyboardType="numeric"
              placeholder='Promotion Discount'
            />
            <TextInput
              style={styles.input}
              onChangeText={this.handlePromoCodeChange}
              value={this.state.promoCode}
              placeholder='Promotion Code'
            />

            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 15 }}>
              <MyDatePicker title={'SET EXPIRY DATE'} func={this.getDate} />
              {this.state.promoValidity ? <Text style={{ marginLeft: 15 }}>{moment(this.state.promoValidity).format('LL')}</Text> : null}


            </View>
          </View>
          <Pressable onPress={(this.state.promoName != '' && this.state.promoDiscount != '' && this.state.promoCode != '' && this.state.promoValidity != null) ? this.handleSubmit : () => { alert('All field must be filled') }}>
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

export default AddPromoForm;
