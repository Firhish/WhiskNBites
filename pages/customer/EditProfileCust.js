import React, { Component } from 'react';
import { View, Text, TextInput, Button, Image, StyleSheet, Pressable } from 'react-native';
import database from '@react-native-firebase/database';
import TransparentHeader from '../../components/TransparentHeader';
import auth from '@react-native-firebase/auth';

class EditProfileCust extends Component {

    state = {
        username: '',
        phone: '',
        profilePic: null,
        userBranchId: '',
    };

    setProfilePic = (profilePic) => {
        this.setState({ profilePic })
    }

    setUsername = (username) => {
        this.setState({ username })
    }

    setPhone = (phone) => {
        this.setState({ phone })
    }

    setUserBranchId = (userBranchId) => {
        this.setState({ userBranchId })
    }

    getData = () => {

        database()
            .ref('/Users')
            .on('value', (snapshot) => {
                snapshot.forEach((child) => {

                    if (child.val().uid == auth().currentUser.uid) {

                        this.setProfilePic(child.val().dp_url)
                        this.setUsername(child.val().username)
                        this.setPhone(child.val().phone_no)
                        this.setUserBranchId(child.key)
                    }
                })
            });
    }

    componentDidMount() {
        this.getData()
    }

    pickImage = () => {

        console.log('pick image insya allah jadi')
    };

    handleSubmit = () => {

        database()
            .ref('/Users/' + this.state.userBranchId)
            .update({
                username: this.state.username,
                phone_no: this.state.phone,
            })
            .then(() => {
                this.props.navigation.navigate('TabsCust');
                alert('Profile updated successfully')
            });
    };

    render() {
        return (
            <View style={{ flex: 1 }}>
                <TransparentHeader title="Edit Profile" goBack={this.props.navigation.goBack} />
                <View style={styles.container}>
                    <View style={{ width: '100%', }}>
                        <Text style={{ fontSize: 22, marginVertical: 30, }}>Enter personal information</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={this.setUsername}
                            value={this.state.username}
                            placeholder='Username'
                        />
                        <TextInput
                            style={styles.input}
                            onChangeText={this.setPhone}
                            value={this.state.phone}
                            keyboardType="numeric"
                            placeholder='Phone Number'
                        />
                        {this.state.productImage && (
                            <Image style={styles.image} source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/whisk-n-bites-a4339.appspot.com/o/almondLondon.jpg?alt=media&token=4d342545-4f84-435b-91b3-461ce530b15f' }} />
                        )}
                        <Pressable onPress={() => this.handleProductImageChange('https://firebasestorage.googleapis.com/v0/b/whisk-n-bites-a4339.appspot.com/o/almondLondon.jpg?alt=media&token=4d342545-4f84-435b-91b3-461ce530b15f')}>
                            <Text style={styles.chooseImgBtn}>Choose Image</Text>
                        </Pressable>
                    </View>
                    <Pressable onPress={(this.state.productName != '' && this.state.productPrice != '' && this.state.productDescription != '') ? this.handleSubmit : () => { alert('All field must be filled') }}>
                        <Text style={styles.submitBtn}>Save</Text>
                    </Pressable>
                </View>
            </View>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        padding: 20,
    },
    label: {
        fontSize: 14,
        marginBottom: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 8,
        marginVertical: 10,
        width: '100%',
        borderRadius: 5,
    },
    image: {
        width: 120,
        height: 120,
        marginTop: 20,
        marginBottom: 20,
        borderRadius: 5,
    },
    chooseImgBtn: {

        paddingVertical: 5,
        width: '40%',
        textAlign: 'center',
        backgroundColor: '#707070',
        color: 'white',
        marginTop: 10,
        borderRadius: 8,

    },

    submitBtn: {

        textAlign: 'center',
        paddingVertical: 15,
        fontSize: 18,
        fontWeight: 'bold',
        backgroundColor: '#DB9B06',
        color: 'white',

    }

});

export default EditProfileCust;
