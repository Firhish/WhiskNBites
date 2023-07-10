import moment from "moment";
import { Component } from "react";
import { View, Text, StyleSheet, Dimensions } from 'react-native';



class PromotionBoxMod extends Component {

  render() {

    return (

      <View style={[styles.promotionBox]}>
        <Text style={styles.promoImageText}>{(this.props.discount * 100) + '%'}</Text>
        <View>
          <Text style={styles.promoName}>{this.props.name}</Text>
          {Date.now() < this.props.validity ?

            <Text style={styles.promoValidity}>{'Valid until ' + moment(this.props.validity).format('LL')}</Text> :
            <Text style={[styles.promoValidity, { color: 'red' }]}>{'EXPIRED'}</Text>
          }

        </View>
        <Text style={styles.promoCode}>{this.props.code}</Text>

      </View>

    )

  }
}

export default PromotionBoxMod

const styles = StyleSheet.create({

  promoImageText: {
    fontSize: 24,
    marginRight: 12,
    backgroundColor: '#DB9B06',
    padding: 6,
    width: 60,
    height: 60,
    textAlign: 'center',
    textAlignVertical: 'center',
    borderRadius: 60 / 2,
    color: 'white'
  },

  promoName: {
    fontSize: 16,
    fontWeight: 'bold',
  },

  promoValidity: {
    marginTop: 4,
  },

  promoCode: {
    color: '#606060',
    position: 'absolute',
    right: 12,
    fontSize: 18,
    fontWeight: '700',
  },

  promotionBox: {
    width: 380,
    height: 80,
    borderRadius: 8,
    alignItems: 'center',
    backgroundColor: 'white',
    marginBottom: 12,
    flexDirection: 'row',
    paddingHorizontal: 12,
    paddingVertical: 8,
  },

});