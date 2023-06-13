import { Component } from "react";
import { SafeAreaView, StyleSheet, Text, View, Image } from "react-native";
import TabHeader from "../../components/TabHeader";
import auth from '@react-native-firebase/auth';
import ConfirmModal from '../../components/ConfirmModal';
import Divider from "../../components/Divider";
import OptionModal from '../../components/OptionModal';
import Overlay from '../../components/Overlay';
import database from '@react-native-firebase/database';

class ProfileCust extends Component {

    state = {

        modalVisible: false,
        confirmModalVisible: false,
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

                    if (child.val().uid == auth().currentUser.uid) {

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

    signOut = () => {

        auth()
            .signOut()
            .then(() => {
                this.props.navigation.navigate('Landing')
                console.log('User signed out!')
            });
    }

    render() {

        return (

            <SafeAreaView style={{ flex: 1 }}>

                <TabHeader title='My Profile' icon='menu' iconClickHandle={() => this.setModalVisible(!this.state.modalVisible)} />
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
                <OptionModal
                    modalVisible={this.state.modalVisible}
                    toggle={() => { this.setModalVisible(!this.state.modalVisible) }}
                    firstOptFunc={() => {
                        this.setConfirmModalVisible(!this.state.confirmModalVisible)
                    }}
                    secondOptFunc={() => {
                        this.props.navigation.navigate('EditProfileCust')
                    }}
                    firstOptText='Log Out'
                    secondOptText='Edit Profile'
                />

                <ConfirmModal
                    visible={this.state.confirmModalVisible}
                    warnText={'Are you sure you want to log out?'}
                    onConfirm={() => {
                        this.signOut()
                        this.setConfirmModalVisible(!this.state.confirmModalVisible)
                    }}
                    onCancel={() => this.setConfirmModalVisible(!this.state.confirmModalVisible)}
                />
                <Overlay visible={this.state.modalVisible} />

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

export default ProfileCust