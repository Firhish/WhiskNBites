import moment from "moment";
import { Component } from "react";
import { View, Text, StyleSheet } from 'react-native';

class PromotionBoxCust extends Component {

  render() {

    return (

      <View>
        <View style={[styles.promotionBox]}>
          <Text style={styles.promoImageText}>{(this.props.discount * 100) + '% off'}</Text>
        </View>
        <Text style={styles.promoName}>{this.props.name}</Text>
        <Text style={styles.promoValidity}>{'Valid until ' + moment(this.props.validity).format('LL')}</Text>
      </View>

    )

  }
}

export default PromotionBoxCust

const styles = StyleSheet.create({

  promoImageText: {

    fontSize: 18,

  },

  promoName: {

    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 8,

  },

  promoValidity: {

    marginTop: 4,


  },

  promotionBox: {

    width: 300,
    height: 200,
    borderRadius: 8,
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightgrey',

  }

});