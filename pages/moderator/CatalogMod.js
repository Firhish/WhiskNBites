import React, { Component } from 'react';
import { View, StyleSheet, Dimensions, ScrollView, SafeAreaView, Pressable, Text } from 'react-native';
import CatalogBoxCust from '../../components/Catalog/CatalogBoxCust';
import TabHeader from '../../components/TabHeader';
import database from '@react-native-firebase/database';
import CatalogBoxMod from '../../components/Catalog/CatalogBoxMod';
import OptionModal from '../../components/OptionModal';
import Overlay from '../../components/Overlay';
import ConfirmModal from '../../components/ConfirmModal';

const { width } = Dimensions.get('window');

//define size for each block
const ITEM_SIZE = 160;
const ITEM_MARGIN = 10;

class CatalogMod extends Component {


  state = {
    items: [],
    modalVisible: false,
    confirmModalVisible: false,
    itemsId:''
  }

  getData = () => {

    database()
      .ref('/Products')
      .on('value', (snapshot) => {
        let data = [];
        snapshot.forEach((child) => {
          temp = child.val()
          temp.id = child.key
          data.push(temp)
          this.setItems(data)
          console.log(data)
        })

      });


  }

  setItems = (arr) => {
    this.setState({ items: arr });
  }

  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible })
  }

  setConfirmModalVisible = (visible) => {
    this.setState({ confirmModalVisible: visible })
  }

  setItemsId = (id) => {
    this.setState({ itemsId:id })
  }

  addItems = () => {
    this.props.navigation.navigate('AddProductForm')
  }

  delItems = (id) => {
    
    database()
      .ref('/Products/'+id)
      .remove()
      .then(()=>{
        console.log('Product '+id+' deleted')
        alert('Product deleted successfully')
      })

  }

  componentDidMount() {
    this.getData()
  }


  renderItem = ({id, product_name, product_price, product_image }) => (
    <Pressable key={id} onLongPress={()=> {
      this.setModalVisible(!this.state.modalVisible)
      this.setItemsId(id)
      // console.log(this.state.itemsId+' hehe')
    }}>
      <CatalogBoxMod key={id} product_name={product_name} product_price={product_price} product_image={product_image} />
    </Pressable>
    
  );

  renderItems = () => {
    const itemsPerRow = Math.floor(width / (ITEM_SIZE + ITEM_MARGIN * 2));
    const rows = [];

    for (let i = 0; i < this.state.items.length; i += itemsPerRow) {
      rows.push(
        <View key={i} style={styles.container}>
          {this.state.items.slice(i, i + itemsPerRow).map(this.renderItem)}
        </View>
      );
    }

    return rows;
  };

  render() {
    return (


      <View style={{ flex: 1, }}>

        <OptionModal
          modalVisible={this.state.modalVisible}
          toggle={() => { this.setModalVisible(!this.state.modalVisible) }} 
          firstOptFunc = {()=>{
            // this.delItems(this.state.itemsId)
            this.setConfirmModalVisible(!this.state.confirmModalVisible)
            }}
          secondOptFunc = {()=>console.log('edit baru mat')}
          firstOptText = 'Delete Product'
          secondOptText = 'Edit Product'
          />
          <ConfirmModal
            visible={this.state.confirmModalVisible}
            warnText={'Are you sure you want to delete this product?'}
            onConfirm = {()=>{
              this.delItems(this.state.itemsId)
              this.setConfirmModalVisible(!this.state.confirmModalVisible)
              }}
            onCancel= {()=>this.setConfirmModalVisible(!this.state.confirmModalVisible)}
          />
        <TabHeader title='Catalog' icon='add' iconClickHandle={this.addItems} />
        <ScrollView>
          {this.state.items.length != 0 ?
            <View style={styles.container}>{this.renderItems()}</View> :
            <Text style={{textAlign:'center', marginTop:'70%', fontSize:16}} >Aw, snap! No cookies here</Text>
          }
          {/* <Text>The catalog is empty</Text> */}
        </ScrollView>
        <Overlay visible={this.state.modalVisible} />
      </View>

    )

  }
}

export default CatalogMod;

const styles = StyleSheet.create({
  container: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center'
  },
});
