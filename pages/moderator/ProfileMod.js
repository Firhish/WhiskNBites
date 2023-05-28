import { Component } from "react";
import { SafeAreaView, StyleSheet, Text, View, Image, ScrollView, Pressable } from "react-native";
import TabHeader from "../../components/TabHeader";
import auth from '@react-native-firebase/auth';
import ConfirmModal from '../../components/ConfirmModal';
import database from '@react-native-firebase/database';
import UsersBoxMod from "../../components/Profile/UsersBoxMod";
import moment from "moment/moment";

class ProfileMod extends Component {

    state = {
        confirmModalVisible: false,
        usersArr: [],
    }

    setConfirmModalVisible = (visible) => {
        this.setState({ confirmModalVisible: visible })
    }

    setUsersArr = (usersArr) => {
        this.setState({ usersArr })
    }

    componentDidMount() {
        this.getData()
    }

    getData = () => {

        database()
            .ref('/Users')
            .on('value', (snapshot) => {
                this.setUsersArr(Object.values(snapshot.val()))
            });


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
                <TabHeader title='Profile' icon='log-out-outline' iconClickHandle={() => { this.setConfirmModalVisible(!this.state.confirmModalVisible) }} />
                <View style={{ flex: 1, padding: 20 }}>
                    <ScrollView>
                        {this.state.usersArr.map((user, index) => (

                            <Pressable key={index} onPress={() => this.props.navigation.navigate('ViewProfileMod', { uid: user.uid })}>

                                <UsersBoxMod username={user.username} profilePic={user.dp_url} timestamp={moment(user.timestamp).fromNow()} />


                            </Pressable>




                        ))}

                    </ScrollView>

                </View>

                <ConfirmModal
                    visible={this.state.confirmModalVisible}
                    warnText={'Are you sure you want to log out?'}
                    onConfirm={() => {
                        this.signOut()
                        this.setConfirmModalVisible(!this.state.confirmModalVisible)
                    }}
                    onCancel={() => this.setConfirmModalVisible(!this.state.confirmModalVisible)}
                />
            </SafeAreaView>
        )
    }
}

export default ProfileMod