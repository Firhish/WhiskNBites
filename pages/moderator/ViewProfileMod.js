import { Component } from "react";
import { SafeAreaView, StyleSheet, Text, View, Image } from "react-native";
import Divider from "../../components/Divider";
import database from '@react-native-firebase/database';
import TransparentHeader from "../../components/TransparentHeader";

class ViewProfileMod extends Component {

    state = {
        coverPic: 'https://firebasestorage.googleapis.com/v0/b/whisk-n-bites-a4339.appspot.com/o/backgroundProfile.png?alt=media&token=37e93e89-8a5e-4472-90df-2731a7dfaf63',
        profilePic: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRT23NlA9taxcUhdcm3JbbPqRoNfn5m9gxVjQ&usqp=CAU',
        username: '',
        email: '',
        phone: '',
    }

    setProfilePic = (profilePic) => {
        this.setState({ profilePic })
    }

    setUsername = (username) => {
        this.setState({ username })
    }

    setEmail = (email) => {
        this.setState({ email })
    }

    setPhone = (phone) => {
        this.setState({ phone })
    }

    setModalVisible = (visible) => {
        this.setState({ modalVisible: visible })
    }

    setConfirmModalVisible = (visible) => {
        this.setState({ confirmModalVisible: visible })
    }



    getData() {

        database()
            .ref('/Users')
            .on('value', (snapshot) => {
                snapshot.forEach((child) => {

                    if (child.val().uid == this.props.route.params.uid) {

                        this.setProfilePic(child.val().dp_url)
                        this.setUsername(child.val().username)
                        this.setEmail(child.val().email)
                        this.setPhone(child.val().phone_no)
                    }
                })
            });
    }

    componentDidMount() {
        this.getData()
    }


    render() {

        return (

            <SafeAreaView style={{ flex: 1 }}>
                <TransparentHeader goBack={this.props.navigation.goBack} />
                <View style={{ flex: 1 }}>
                    <View>
                        <Image source={{ uri: this.state.coverPic }} style={styles.coverPic} />
                        <Image source={{ uri: this.state.profilePic }} style={styles.profilePic} />
                    </View>
                    <View style={styles.credBox}>
                        <Text style={styles.credContent}>Username</Text>
                        <Text style={styles.credContent}>{this.state.username}</Text>
                    </View>
                    <Divider />
                    <View style={styles.credBox}>
                        <Text style={styles.credContent}>Email</Text>
                        <Text style={styles.credContent}>{this.state.email}</Text>
                    </View>
                    <Divider />
                    <View style={styles.credBox}>
                        <Text style={styles.credContent}>Phone</Text>
                        <Text style={styles.credContent}>{this.state.phone}</Text>
                    </View>
                    <Divider />
                </View>
            </SafeAreaView>

        )
    }
}

const styles = StyleSheet.create({

    coverPic: {
        height: 240,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        resizeMode: 'cover',
    },

    profilePic: {
        height: 145,
        width: 145,
        borderRadius: 145 / 2,
        position: 'absolute',
        top: 45,
        left: '32%',
        borderWidth: 6,
        borderColor: 'white',
    },

    credBox: {
        paddingVertical: 20,
        paddingHorizontal: 15,
        flexDirection: "row",
        justifyContent: 'space-between',
    },

    credContent: {
        color: 'black',
        fontSize: 16,
    },

})

export default ViewProfileMod