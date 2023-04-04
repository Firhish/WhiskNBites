import React, { Component } from 'react';
import { Modal, Text, TouchableHighlight, View, Dimensions } from 'react-native';
const { width } = Dimensions.get('window');

class OptionModal extends Component {
  
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     modalVisible: false,
  //   };
  // }

  // setModalVisible(visible) {
  //   this.setState({ modalVisible: visible });
  // }

  render() {
    return (

      <Modal
        animationType="slide"
        transparent={true}
        visible={this.props.modalVisible}
        onRequestClose={() => {
          window.alert('Modal has been closed.');
        }}>
        <View style={{ marginTop:'55%', backgroundColor: '#fff', padding: 25,margin:'5%',borderRadius:10 }}>
          <Text style={{ marginBottom: 20 }}>Please choose an option:</Text>
          <TouchableHighlight
            underlayColor={'#DB9B06c6'}
            style={{ padding: 10, backgroundColor: '#eee', marginBottom: 10 }}
            onPress={() => {
              // this.setModalVisible(!this.state.modalVisible);
              this.props.toggle()
              this.props.firstOptFunc()
              // console.log('Delete Product')
              // Handle first option
            }}>
            <Text>{this.props.firstOptText}</Text>
          </TouchableHighlight>

          <TouchableHighlight
            underlayColor={'#DB9B06c6'}
            style={{ padding: 10, backgroundColor: '#eee' }}
            onPress={() => {
              // this.setModalVisible(!this.state.modalVisible);
              this.props.toggle()
              this.props.secondOptFunc()
              // console.log('Edit Product')
              // Handle second option
            }}>
            <Text>{this.props.secondOptText}</Text>
          </TouchableHighlight>

          <TouchableHighlight
            underlayColor={'#DB9B06c6'}
            style={{ padding: 10, backgroundColor: '#ccc', marginTop: 10 }}
            onPress={() => {
              // this.setModalVisible(!this.state.modalVisible);
              this.props.toggle()
            }}>
            <Text>Cancel</Text>
          </TouchableHighlight>
        </View>
      </Modal>


    );
  }
}

export default OptionModal;
