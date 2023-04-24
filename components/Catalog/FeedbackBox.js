import React, { Component } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import Divider from '../Divider';

class FeedbackBox extends Component {

    state = {
        userImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRT23NlA9taxcUhdcm3JbbPqRoNfn5m9gxVjQ&usqp=CAU',
    }

    render() {
        return (
            <View style={styles.mainContainer}>

            <View style={styles.upper}>
                <Image source={{uri:this.state.userImage}} style={styles.userImage}/>
                <Text style={styles.usernameText}>Username</Text>
            </View>
            <View style={styles.lower}>
                <Text style={styles.feedbackText}>This is the comment</Text>

            </View>
            {/* <View style={styles.divider}></View> */}
            <Divider/>
                

            </View>

        );
    }

}

const styles = StyleSheet.create({

    mainContainer: {
        padding: 20,
    },

    upper:{
        flexDirection:'row',
        alignItems:'center'
    },

    userImage:{
        width:45,
        height:45,
        // borderColor:'grey',
        // borderWidth:1,
        
        borderRadius: 100,
        resizeMode: 'cover',
        
    },

    usernameText:{
        marginLeft:10,
        // backgroundColor:'yellow',
        fontSize:18,
        fontWeight:'800',
        letterSpacing:1,

    },

    feedbackText:{
        marginTop:10,
        fontSize:18,
    },

    // divider:{
    //     width:'100%',
    //     borderWidth:0.5,
    //     borderColor:'grey',
    //     marginTop:30,
    // }




})

export default FeedbackBox