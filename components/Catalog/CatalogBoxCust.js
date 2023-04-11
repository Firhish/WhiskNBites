import React, { Component } from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const ITEM_SIZE = 160;

class CatalogBoxCust extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Image source={{ uri: this.props.product_image }} style={styles.image} />
        <LinearGradient colors={['rgba(0, 0, 0, 0.8)', 'transparent']} style={styles.gradient}>
        {this.props.product_name!=undefined?
        <Text style={styles.prodName}>{this.props.product_name}</Text>:
        <Text style={styles.prodName}>loading..</Text>
        }
        {this.props.product_price!=null?
        <View style={styles.whitePill}><Text style={styles.whitePillText}>{'RM '+ Number(this.props.product_price).toFixed(2)}</Text></View>:
        <View style={styles.whitePill}><Text style={styles.whitePillText}>loading...</Text></View>
        }
        </LinearGradient>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    height:ITEM_SIZE,
    width:ITEM_SIZE,
    borderRadius:10,
    overflow:'hidden',
    margin:10,

  },
  image: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  gradient: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    padding: 10,
  },
  prodName: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },

  whitePill:{
    position:'absolute',
    bottom:10,
    right:10,
    backgroundColor:'white',
    padding:5,
    borderRadius:20
  },

  whitePillText:{
    color:'black',
    fontSize:12,
    fontWeight:'600'
  }
});

export default CatalogBoxCust;
