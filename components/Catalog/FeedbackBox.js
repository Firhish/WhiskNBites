import React, { Component } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import Divider from '../Divider';
import database from '@react-native-firebase/database';
import moment from "moment/moment";

class FeedbackBox extends Component {

    state = {
        userImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRT23NlA9taxcUhdcm3JbbPqRoNfn5m9gxVjQ&usqp=CAU',
        username: 'loading...',
        users: [],
    }


    getData = () => {

        database()
            .ref('/Users')
            .on('value', (snapshot) => {
                snapshot.forEach((child) => {

                    if (child.val().uid == this.props.user_id) {

                        this.setUserImage(child.val().dp_url)
                        this.setUsername(child.val().username)

                    }
                })
            });

    }

    setUsers = (arr) => {
        this.setState({ users: arr });
    }
    setUserImage = (url) => {
        this.setState({ userImage: url });
    }
    setUsername = (name) => {
        this.setState({ username: name });
    }

    componentDidMount() {
        this.getData()
    }

    render() {
        return (
            <View>
                <View style={styles.mainContainer}>

                    <View style={styles.spaceBetween}>
                        <View style={styles.upper}>
                            <Image source={{ uri: this.state.userImage }} style={styles.userImage} />
                            <Text style={styles.usernameText}>{this.state.username}</Text>
                        </View>
                        <Text>{moment(this.props.timestamp).fromNow()}</Text></View>

                    <View style={styles.lower}>
                        <Text style={styles.feedbackText}>{this.props.comment ? this.props.comment : 'loading...'}</Text>

                    </View>

                </View>
                <Divider />
            </View>


        );
    }

}

const styles = StyleSheet.create({

    mainContainer: {
        paddingVertical: 20,
        paddingHorizontal: 25,
    },

    upper: {
        flexDirection: 'row',
        alignItems: 'center'
    },

    spaceBetween: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',

    },

    userImage: {
        width: 45,
        height: 45,
        borderRadius: 100,
        resizeMode: 'cover',

    },

    usernameText: {
        marginLeft: 10,
        fontSize: 18,
        fontWeight: '800',
        letterSpacing: 1,

    },

    feedbackText: {
        marginTop: 20,
        fontSize: 18,
        color: 'black'
    },

})

export default FeedbackBox