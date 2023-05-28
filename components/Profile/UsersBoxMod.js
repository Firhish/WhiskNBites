import { Component } from "react";
import { Image, StyleSheet, Text, View } from "react-native";


class UsersBoxMod extends Component {

    state = {
        profilePic: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRT23NlA9taxcUhdcm3JbbPqRoNfn5m9gxVjQ&usqp=CAU',
    }

    render() {
        return (
            <View style={styles.mainContainer}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    {this.props.profilePic ? <Image source={{ uri: this.props.profilePic }} style={styles.profilePic} /> : <Image source={{ uri: this.state.profilePic }} style={styles.profilePic} />}

                    <Text style={styles.username}>{this.props.username}</Text>
                </View>

                <Text>{'Joined ' + this.props.timestamp}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({

    mainContainer: {
        paddingVertical: 14,
        paddingHorizontal: 16,
        backgroundColor: 'white',
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 16,
    },

    profilePic: {
        height: 45,
        width: 45,
        borderRadius: 45 / 2,
        marginRight: 15,
    },

    username: {
        color: '#303030',
        fontWeight: '600',
        fontSize: 16,
    }


})

export default UsersBoxMod