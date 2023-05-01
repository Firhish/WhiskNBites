import React, { Component } from 'react';
import { View, StyleSheet, Dimensions, ScrollView, SafeAreaView, Text, Pressable } from 'react-native';
import CatalogBoxCust from '../../components/Catalog/CatalogBoxCust';
import TabHeader from '../../components/TabHeader';
import database from '@react-native-firebase/database';

const { width } = Dimensions.get('window');

const ITEM_SIZE = 160;
const ITEM_MARGIN = 10;

class CatalogCust extends Component {


  state = {
    items: [],
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

  addToCart = () => {
    this.props.navigation.navigate('Cart')
  }

  componentDidMount() {
    this.getData()
  }


  renderItem = ({ id, product_name, product_price, product_image }) => (
    <Pressable key={id} onPress={() => { this.props.navigation.navigate('CatalogIndCust', { productId: id }) }}>
      <CatalogBoxCust key={id} product_name={product_name} product_price={product_price} product_image={product_image} />
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

      <SafeAreaView>

        <TabHeader title='Catalog' icon='cart' iconClickHandle={this.addToCart} />

        <ScrollView>

          {this.state.items.length != 0 ?
            <View style={styles.container}>{this.renderItems()}</View> :
            <Text style={{ textAlign: 'center', marginTop: '70%', fontSize: 16 }} >Aw, snap! No cookies here</Text>
          }

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
