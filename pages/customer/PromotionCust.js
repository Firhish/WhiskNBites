import React, { Component } from 'react';
import { View, StyleSheet, Dimensions, ScrollView, SafeAreaView, Pressable, Text } from 'react-native';
import TabHeader from '../../components/TabHeader';
import database from '@react-native-firebase/database';
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
      });

    database()
      .ref('/Promotions')
      .on('value', (snapshot) => {
        if (snapshot.exists()) {

          snapshot.forEach((child) => {

            if (Date.now() < child.val().validity) {

              temp = child.val()
              temp.id = child.key
              data.push(temp)

            }
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
        <TabHeader title='Promotion' iconClickHandle={() => { }} />
        <View>
          <Text style={styles.welcomeText}>{'Welcome ' + this.state.currUser.username}</Text>
          {this.state.promoArr.length != 0 ?
            <View>
              <Text style={styles.dealText}>Deals for you</Text>
              <ScrollView horizontal={true} style={{ paddingLeft: 18 }} showsHorizontalScrollIndicator={false}>
                {this.state.promoArr.map((promo, index) => (

                  <PromotionBoxCust
                    key={index}
                    discount={promo.discount}
                    name={promo.name}
                    validity={promo.validity}
                    code={promo.code}
                    image={promo.image}
                  />
                )).reverse()}
              </ScrollView>
            </View>
            : <Text style={{ marginTop: '65%', textAlign: 'center', fontSize: 16 }}>No active promotion at the moment</Text>}

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
