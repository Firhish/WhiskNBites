import React, { Component } from 'react';
import { View, StyleSheet, Dimensions, ScrollView, SafeAreaView, Pressable, Text } from 'react-native';
import TabHeader from '../../components/TabHeader';
import database from '@react-native-firebase/database';
import PromotionBoxMod from '../../components/Promotion/PromotionBoxMod';
import auth from '@react-native-firebase/auth';
import PromotionBoxCust from '../../components/Promotion/PromotionBoxCust';



class PromotionCust extends Component {


  state = {

    promoArr: [],
    currUser: {}

  }

  setPromoArr = (promoArr) => {

    this.setState({ promoArr })

  }

  setCurrUser = (currUser) => {

    this.setState({ currUser })

  }

  getData = () => {

    let temp
    let data = []

    database()
      .ref('/Users')
      .on('value', (snapshot) => {

        if (snapshot.exists()) {

          snapshot.forEach((child) => {

            if (child.val().uid == auth().currentUser.uid) {

              this.setCurrUser(child.val())

            }
          })
        }
        else {

        }

        // console.log(this.state.currUser)

      });

    database()
      .ref('/Promotions')
      .on('value', (snapshot) => {
        if (snapshot.exists()) {

          snapshot.forEach((child) => {

            temp = child.val()
            temp.id = child.key
            data.push(temp)

          })



        }
        else {
          return null
        }

        this.setPromoArr(data)
        console.log(this.state.promoArr.length)

      });

  }



  componentDidMount() {
    this.getData()
  }


  render() {
    return (


      <View style={{ flex: 1, }}>

        <TabHeader title='Promotion' icon='add' iconClickHandle={() => { }} />
        <View>
          <Text style={styles.welcomeText}>{'Welcome ' + this.state.currUser.username}</Text>
          <Text style={styles.dealText}>Deals for you</Text>
          <ScrollView horizontal={true} style={{ paddingLeft: 18 }} showsHorizontalScrollIndicator={false}>

            {this.state.promoArr.map((promo, index) => (

              <PromotionBoxCust
                key={index}
                discount={promo.discount}
                name={promo.name}
                validity={promo.validity}
              />




            )).reverse()}




          </ScrollView>


        </View>

      </View>

    )

  }
}

export default PromotionCust;

const styles = StyleSheet.create({

  welcomeText: {

    fontSize: 24,
    margin: 12,
    color: '#DB9B06',

  },

  dealText: {

    fontSize: 20,
    margin: 12,
    fontWeight: 'bold',

  },

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
