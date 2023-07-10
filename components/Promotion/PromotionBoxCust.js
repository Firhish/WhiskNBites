import moment from "moment";
import { Component } from "react";
import { View, Text, StyleSheet, Image } from 'react-native';

class PromotionBoxCust extends Component {

  render() {

    return (

      <View>
        <View style={[styles.promotionBox]}>
          <Image source={{ uri: this.props.image }} style={styles.image} />
          <View style={styles.promoCodeDiscountBox}>
            <View style={styles.promoCodeBox}>
              <Text style={styles.promoCode}>{this.props.code}</Text>
            </View>
            <View style={styles.promoDiscountBox}>
              <Text style={styles.promoDiscount}>{(this.props.discount * 100) + '% OFF'}</Text>
            </View>
          </View>
        </View>
        <Text style={styles.promoName}>{this.props.name}</Text>
        <Text style={styles.promoValidity}>{'Valid until ' + moment(this.props.validity).format('LL')}</Text>
      </View>

    )

  }
}

export default PromotionBoxCust

const styles = StyleSheet.create({

  promoDiscount: {

    fontSize: 16,
    fontWeight: '700',
    color: '#303030',

  },

  promoCode: {

    fontSize: 16,
    fontWeight: '700',
    color: 'white',


  },

  promoCodeDiscountBox: {

    flexDirection: 'row',
    position: 'absolute',
    bottom: 15,
    right: 15,
  },

  promoCodeBox: {

    backgroundColor: '#DB9B06',
    paddingVertical: 3,
    paddingLeft: 9,
    paddingRight: 5,
    borderBottomLeftRadius: 30,
    borderTopLeftRadius: 30,

  },

  promoDiscountBox: {

    backgroundColor: 'white',
    paddingVertical: 3,
    paddingLeft: 5,
    paddingRight: 9,
    borderBottomRightRadius: 30,
    borderTopRightRadius: 30,

  },

  promoName: {

    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 8,
    color: '#303030',

  },

  promoValidity: {

    marginTop: 4,

  },

  promotionBox: {

    width: 300,
    height: 200,
    borderRadius: 8,
    marginRight: 12,
    backgroundColor: 'white',
    overflow: 'hidden',

  },

  image: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },

});