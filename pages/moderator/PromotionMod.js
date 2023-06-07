import React, { Component } from 'react';
import { View, StyleSheet, Dimensions, ScrollView, SafeAreaView, Pressable, Text } from 'react-native';
import TabHeader from '../../components/TabHeader';
import database from '@react-native-firebase/database';
import PromotionBoxMod from '../../components/Promotion/PromotionBoxMod';
import OptionModal from '../../components/OptionModal';
import Overlay from '../../components/Overlay';
import ConfirmModal from '../../components/ConfirmModal';

const { width } = Dimensions.get('window');


class PromotionMod extends Component {

  state = {
    promoArr: [],
    modalVisible: false,
    confirmModalVisible: false,
    promoId: '',
  }

  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible })
  }

  setConfirmModalVisible = (visible) => {
    this.setState({ confirmModalVisible: visible })
  }

  setPromoId = (promoId) => {
    this.setState({ promoId })
  }

  setPromoArr = (promoArr) => {
    this.setState({ promoArr })
  }

  getData = () => {

    database()
      .ref('/Promotions')
      .on('value', (snapshot) => {
        if (snapshot.exists()) {

          let data = [];
          snapshot.forEach((child) => {
            temp = child.val()
            temp.id = child.key
            data.push(temp)
            this.setPromoArr(data)
          })
        }
        else {
          this.setPromoArr([])
        }
      });

  }



  componentDidMount() {
    this.getData()
  }

  delPromo = (id) => {

    database()
      .ref('/Promotions/' + id)
      .remove()
      .then(() => {
        alert('Promotion deleted successfully')
      })


  }

  editPromo = (id) => {
    this.props.navigation.navigate('EditPromoForm', { promoId: id })
  }

  addPromo = () => {
    this.props.navigation.navigate('AddPromoForm')
  }


  render() {
    return (
      <View style={{ flex: 1, }}>

        <TabHeader title='Promotion' icon='add' iconClickHandle={this.addPromo} />
        <View>
          {this.state.promoArr.length != 0 ?

            <ScrollView style={{ padding: 12 }}>
              <Text style={styles.dealText}>Active Promotions</Text>
              <View style={{ alignItems: 'center' }}>

                {this.state.promoArr.map((promo, index) => (

                  <Pressable
                    key={index}
                    onLongPress={() => {
                      this.setModalVisible(!this.state.modalVisible)
                      this.setPromoId(promo.id)
                    }}
                  >
                    <PromotionBoxMod
                      discount={promo.discount}
                      name={promo.name}
                      code={promo.code}
                      validity={promo.validity}
                    />
                  </Pressable>

                )).reverse()}
              </View>
            </ScrollView> : <Text style={{ textAlign: 'center', marginTop: '70%', fontSize: 16 }}>No active promotion at the moment</Text>

          }

        </View>

        <OptionModal
          modalVisible={this.state.modalVisible}
          toggle={() => { this.setModalVisible(!this.state.modalVisible) }}
          firstOptFunc={() => {
            this.setConfirmModalVisible(!this.state.confirmModalVisible)
          }}
          secondOptFunc={() => {
            this.editPromo(this.state.promoId)
          }}
          firstOptText='Delete Promotion'
          secondOptText='Edit Promotion'
        />
        <ConfirmModal
          visible={this.state.confirmModalVisible}
          warnText={'Are you sure you want to delete this promotion?'}
          onConfirm={() => {
            this.delPromo(this.state.promoId)
            this.setConfirmModalVisible(!this.state.confirmModalVisible)
          }}
          onCancel={() => this.setConfirmModalVisible(!this.state.confirmModalVisible)}
        />

        <Overlay visible={this.state.modalVisible} />

      </View>

    )

  }
}

export default PromotionMod;

const styles = StyleSheet.create({

  welcomeText: {
    fontSize: 24,
    margin: 12,
    color: '#DB9B06',
  },

  dealText: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 25,
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
