import React, { Component } from 'react';
import { Modal, View, Text, TouchableHighlight, StyleSheet } from 'react-native';

class ConfirmModal extends Component {

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
            <Text style={styles.title}>
              Confirm Action
            </Text>
            <Text style={styles.warnText}>
              {this.props.warnText}
            </Text>
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
                  onConfirm();
                }}
                style={styles.confirmBtn}>
                <Text style={styles.confirmBtnText}>
                  Confirm
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

  mainContainer:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },

  modalContainer:{
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },

  title:{ 
    fontWeight: 'bold', 
    fontSize: 20 
  },

  warnText:{
    marginTop: 30, 
    fontSize:16,
  },

  btnContainer:{
    flexDirection: 'row',
    marginTop: 30,
  },

  cancelBtn:{
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    borderWidth:2,
    borderColor:'#a0a0a0',
    marginRight:5,
  },

  cancelBtnText:{ 
    color: '#a0a0a0', 
    fontWeight: 'bold' 
  },

  confirmBtn:{
    marginLeft:5,          
  },

  confirmBtnText:{
    color: '#fff', 
    fontWeight: 'bold', 
    backgroundColor: '#DB9B06', 
    paddingVertical: 12,
    paddingHorizontal: 22,
    borderColor: '#DB9B06', 
    borderRadius: 5
  },


})

export default ConfirmModal;
