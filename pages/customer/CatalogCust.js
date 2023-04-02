import React, { Component } from 'react';
import { View, StyleSheet, Dimensions, ScrollView, SafeAreaView } from 'react-native';
import CatalogBoxCust from '../../components/Catalog/CatalogBoxCust';
import TabHeader from '../../components/TabHeader';
import database from '@react-native-firebase/database';

const { width } = Dimensions.get('window');


//product data from firebase
// const items = [
//   { id: 1, product_name:'Almond London', product_price: 5, product_image:''}
//   // { id: 2, product_name: 'Suji', product_price: 6 },
//   // { id: 3, product_name:'Tart Nenas', product_price: 5},
//   // { id: 4, color: 'purple' },
//   // { id: 5, color: 'orange' },
//   // { id: 6, color: 'pink' },
//   // { id: 7, color: 'brown' },
//   // { id: 8, color: 'black' },
//   // { id: 9, color: 'yellow' },
// ];

//define size for each block
const ITEM_SIZE = 160;
const ITEM_MARGIN = 10;

class CatalogCust extends Component {


  state = {
    items:[ { id: 1, product_name:'Dummy', product_price: 5, product_image:'https://firebasestorage.googleapis.com/v0/b/whisk-n-bites-a4339.appspot.com/o/almondLondon.jpg?alt=media&token=dab20c87-17b0-4a6f-afe6-7049528402d7'}],
  }
  
  getData=()=>{

    database()
      .ref('/Products')
      .on('value', (snapshot) => {
        let data = [];
        snapshot.forEach((child) => {
          data.push(child.val());
          this.setItems(data);
          console.log(data)
        })

      });


  }

  setItems = (arr) => {
    this.setState({ items: arr });
  }

  // componentDidMount(){
  //   this.getData()
  // }

  
  renderItem = ({ id, product_name, product_price, product_image }) => (
    // <View key={id} style={[styles.item, { backgroundColor: color }]} />
    <CatalogBoxCust  key={id} product_name={product_name} product_price={product_price} product_image={product_image}/>
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

      <SafeAreaView>

        <TabHeader title='Catalog' icon='cart' />

        <ScrollView>
          {/* {((this.state.items)!==undefined)?<View style={styles.container}>{this.renderItems()}</View>:<View></View>} */}
          <View style={styles.container}>{this.renderItems()}</View>
          
        </ScrollView>

      </SafeAreaView>

    )

  }
}

export default CatalogCust;

const styles = StyleSheet.create({
  container: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center'
  },
});
