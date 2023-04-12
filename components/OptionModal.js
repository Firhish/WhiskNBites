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
          <Text style={styles.title}>Please choose an option</Text>
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
    padding: 25, 
    margin: '5%', 
    borderRadius: 10, 
  },

  title:{ 
    marginBottom: 20, 
    textAlign:'center',
    fontWeight: 'bold',
    fontSize: 18, 
  },

  firstBtn:{ 
    textAlign:'center',
    marginBottom: 10, 
    // padding: 10, 
    // backgroundColor: 'yellow',
     
  },

  firstBtnText:{
    textAlign:'center',
    borderRadius:10, 
    // borderWidth:2,
    paddingVertical:10,
    backgroundColor:'#DB9B06',
    color:'white',
    fontSize:16,
  },

  secondBtn:{ 
    // padding: 10, 
    // backgroundColor: 'yellow',
    marginBottom: 20, 
    
  },

  secondBtnText:{
    width:'100%',
    textAlign:'center',
    borderRadius:10, 
    // borderWidth:2,
    paddingVertical:10,
    backgroundColor:'#DB9B06',
    color:'white',
    fontSize:16,
  },


  cancelBtn:{ 
    // padding: 10, 
    // textAlign:'center',
    // backgroundColor: 'yellow',
  },

  cancelBtnText:{
    // width:'100%',
    // textAlign:'center',
    borderRadius:10, 
    borderWidth:2,
    borderColor: '#a0a0a0',
    paddingVertical:10,
    // backgroundColor:'#a0a0a0',
    color:'#a0a0a0',
    fontSize:16,
    textAlign:'center',
    fontWeight:'bold',
  },












})

export default OptionModal;
