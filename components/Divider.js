import React, { Component } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

class Divider extends Component{

    render(){

        return(

            <View style={styles.divider}></View>

        )
    }
}

const styles = StyleSheet.create({

    divider:{
        width:'100%',
        borderWidth:0.5,
        borderColor:'grey',
        marginTop:30,
    },
})

export default Divider