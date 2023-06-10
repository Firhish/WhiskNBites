import React, { Component } from 'react';
import { Modal, View, Text, TouchableHighlight, StyleSheet, TextInput } from 'react-native';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

class VoucherModal extends Component {

  state = {

    promoCode: '',
    promotionArr: [],

  }

  setPromoCode = (promoCode) => {

    this.setState({ promoCode })

  }

  setPromotionArr = (promotionArr) => {

    this.setState({ promotionArr })

  }

  getData = () => {

    database()
      .ref('/Promotions')
      .once('value', (snapshot) => {
        if (snapshot.exists()) {

          let data = [];
          snapshot.forEach((child) => {
            temp = child.val()
            temp.id = child.key
            data.push(temp)
            this.setPromotionArr(data)
          })
        }
        else {
          return null
        }
      })

  }

  componentDidMount() {
    this.getData()
  }

  render() {
    const { onConfirm, onCancel, visible } = this.props;

    return (
      <Modal
        visible={visible}
        transparent={true}
        onRequestClose={() => {
          this.setState({ visible: false });
        }}>
        <View
          style={styles.mainContainer}>
          <View
            style={styles.modalContainer}>
            {/* <Text style={styles.title}>
              Confirm Action
            </Text> */}
            <Text style={styles.warnText}>
              {/* {this.props.warnText} */}
              Enter promo code
            </Text>
            <TextInput
              placeholder="Promo code "
              value={this.state.promoCode}
              onChangeText={this.setPromoCode}
              style={styles.inputName}
            />
            <View
              style={styles.btnContainer}>
              <TouchableHighlight
                underlayColor={'transparent'}
                onPress={() => {
                  onCancel();
                }}
                style={styles.cancelBtn}>
                <Text style={styles.cancelBtnText}>
                  Cancel
                </Text>
              </TouchableHighlight>
              <TouchableHighlight
                underlayColor={'transparent'}
                onPress={() => {
                  onConfirm(this.state.promoCode);
                }}
                style={styles.confirmBtn}>
                <Text style={styles.confirmBtnText}>
                  Submit
                </Text>
              </TouchableHighlight>
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({

  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },

  modalContainer: {
    backgroundColor: '#fff',
    paddingVertical: 20,
    paddingHorizontal: 30,
    borderRadius: 10,
    alignItems: 'center',
  },

  title: {
    fontWeight: 'bold',
    fontSize: 20
  },

  warnText: {
    fontSize: 18,
  },

  btnContainer: {
    flexDirection: 'row',
    marginTop: 30,
  },

  cancelBtn: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#a0a0a0',
    marginRight: 5,
  },

  cancelBtnText: {
    color: '#a0a0a0',
    fontWeight: 'bold'
  },

  confirmBtn: {
    marginLeft: 5,
  },

  confirmBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    backgroundColor: '#DB9B06',
    paddingVertical: 12,
    paddingHorizontal: 22,
    borderColor: '#DB9B06',
    borderRadius: 5
  },

  inputName: {
    marginTop: 15,
    width: 180,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
  },


})

export default VoucherModal;
