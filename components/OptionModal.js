import React, { Component } from 'react';
import { Modal, Text, TouchableHighlight, View, Dimensions, StyleSheet } from 'react-native';
const { width } = Dimensions.get('window');

class OptionModal extends Component {
  
  render() {
    return (

      <Modal
        animationType="slide"
        transparent={true}
        visible={this.props.modalVisible}
        onRequestClose={() => {
          window.alert('Modal has been closed.');
        }}>
        <View style={styles.mainContainer}>
          <Text style={styles.title}>Select Action</Text>
          <TouchableHighlight
            underlayColor={'transparent'}
            style={styles.firstBtn}
            onPress={() => {
              this.props.toggle()
              this.props.firstOptFunc()
            }}>
            <Text style={styles.firstBtnText}>{this.props.firstOptText}</Text>
          </TouchableHighlight>

          <TouchableHighlight
            underlayColor={'transparent'}
            style={styles.secondBtn}
            onPress={() => {
              this.props.toggle()
              this.props.secondOptFunc()
            }}>
            <Text style={styles.secondBtnText}>{this.props.secondOptText}</Text>
          </TouchableHighlight>

          <TouchableHighlight
            underlayColor={'transparent'}
            style={styles.cancelBtn}
            onPress={() => {
              this.props.toggle()
            }}>
            <Text style={styles.cancelBtnText}>Cancel</Text>
          </TouchableHighlight>
        </View>
      </Modal>


    );
  }
}

const styles = StyleSheet.create({

  mainContainer: { 
    marginTop: '55%', 
    backgroundColor: '#fff', 
    paddingVertical: 25, 
    margin: '5%', 
    borderRadius: 10, 
    paddingHorizontal: 25, 
  },

  title:{ 
    marginBottom: 25, 
    textAlign:'center',
    fontWeight: 'bold',
    fontSize: 20, 
  },

  firstBtn:{ 
    textAlign:'center',
    marginBottom: 10,   
  },

  firstBtnText:{
    textAlign:'center',
    borderRadius:10, 
    paddingVertical:10,
    backgroundColor:'#DB9B06',
    color:'white',
  },

  secondBtn:{ 
    marginBottom: 20, 
  },

  secondBtnText:{
    width:'100%',
    textAlign:'center',
    borderRadius:10, 
    paddingVertical:10,
    backgroundColor:'#DB9B06',
    color:'white',
  },

  cancelBtn:{},

  cancelBtnText:{
    borderRadius:10, 
    borderWidth:2,
    borderColor: '#a0a0a0',
    paddingVertical:10,
    color:'#a0a0a0',
    textAlign:'center',
    fontWeight:'bold',
  },












})

export default OptionModal;
