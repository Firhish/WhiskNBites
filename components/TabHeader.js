import React, { Component } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

class TabHeader extends Component {
  render() {
    const { title, icon } = this.props;
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        <Pressable onPress={this.props.iconClickHandle} style={styles.icon}>{icon && <Ionicons name={icon} size={28} color="white"  />}</Pressable>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 50,
    backgroundColor: '#DB9B06',
    alignItems: 'center',
    flexDirection: 'row',
  },
  title: {
    flex: 1,
    textAlign: 'center',
    color:'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  icon: {
    position:'absolute',
    right: 10
    
  },
});

export default TabHeader;