import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
const { Component } = require("react");

class SignUp extends Component {

    state = {

        emailVal: '',
        pwdVal: '',
        phoneVal: '',
        usernameVal: '',
        isFocusedEmail: false,
        isFocusedPwd: false,
        isFocusedPhone: false,
        isFocusedUsername: false,


    }

    onClickHandle = () => {

        auth()
            .createUserWithEmailAndPassword(this.state.emailVal, this.state.pwdVal)
            .then(() => {
                console.log('User account created & signed in!');
                database()
                    .ref('/Users')
                    .push()
                    .set({
                        email: this.state.emailVal,
                        phone_no: this.state.phoneVal,
                        username: this.state.usernameVal,
                        uid: auth().currentUser.uid,
                        user_type: 'customer',
                        timestamp: Date.now(),
                        dp_url: 'https://firebasestorage.googleapis.com/v0/b/whisk-n-bites-a4339.appspot.com/o/profilePlaceholderImage.png?alt=media&token=d157ec4f-f17e-40d4-9781-0316e7f7e2a9'
                    })
                    .then(() => {
                        alert('Signup successfully')
                        this.props.navigation.navigate('TabsCust');
                    })
            })
            .catch(error => {
                if (error.code === 'auth/email-already-in-use') {
                    console.log('Email already in use');
                    alert('Email is already registered');
                }

                if (error.code === 'auth/invalid-email') {
                    console.log('Invalid email');
                    alert('Invalid email address');
                }

                if (error.code === 'auth/weak-password') {
                    console.log('Weak password');
                    alert('Password must be at least 6 letters');
                }
                console.error(error);
            });

    }

    handleFocusEmail = () => this.setState({ isFocusedEmail: true })
    handleBlurEmail = () => this.setState({ isFocusedEmail: false })
    handleFocusPwd = () => this.setState({ isFocusedPwd: true })
    handleBlurPwd = () => this.setState({ isFocusedPwd: false })
    handleFocusPhone = () => this.setState({ isFocusedPhone: true })
    handleBlurPhone = () => this.setState({ isFocusedPhone: false })
    handleFocusUsername = () => this.setState({ isFocusedUsername: true })
    handleBlurUsername = () => this.setState({ isFocusedUsername: false })

    setEmail = (text) => {
        this.setState({ emailVal: text });
    }

    setPwd = (text) => {
        this.setState({ pwdVal: text });
    }

    setPhone = (text) => {
        this.setState({ phoneVal: text });
    }

    setUsername = (text) => {
        this.setState({ usernameVal: text });
    }

    validateEmailPhone = () => {
        const { emailVal } = this.state;
        const { phoneVal } = this.state;
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const phoneRegex = /^\d{10}$|^\d{11}$|^\+[1-9]\d{10}$/;
        if (!emailRegex.test(emailVal)) {
            alert('Please enter a valid email address.');
        } else {
            if (!phoneRegex.test(phoneVal)) {
                alert('Please enter a valid phone number.');
            } else {
                this.onClickHandle()
            }
        }


    };

    render() {
        return (

            <View style={styles.mainContainer}>
                <View>
                    <Text style={styles.header}>Sign Up</Text>
                    <Text style={styles.greetings}>Welcome! Got a cookie craving? </Text>
                </View>
                <View>
                    <TextInput
                        style={[styles.textInp, this.state.isFocusedEmail ? styles.textInpFocus : styles.textInpBlur]}
                        placeholder='Email Address'
                        value={this.state.emailVal}
                        onChangeText={text => (this.setEmail(text))}
                        onBlur={this.handleBlurEmail}
                        onFocus={this.handleFocusEmail}
                    />
                    <TextInput
                        style={[styles.textInp, this.state.isFocusedPhone ? styles.textInpFocus : styles.textInpBlur]}
                        placeholder='Phone Number'
                        value={this.state.phoneVal}
                        onChangeText={text => (this.setPhone(text))}
                        onBlur={this.handleBlurPhone}
                        onFocus={this.handleFocusPhone}
                    />
                    <TextInput
                        style={[styles.textInp, this.state.isFocusedUsername ? styles.textInpFocus : styles.textInpBlur]}
                        placeholder='Username'
                        value={this.state.usernameVal}
                        onChangeText={text => (this.setUsername(text))}
                        onBlur={this.handleBlurUsername}
                        onFocus={this.handleFocusUsername}
                    />
                    <TextInput
                        style={[styles.textInp, this.state.isFocusedPwd ? styles.textInpFocus : styles.textInpBlur]}
                        placeholder='Password'
                        value={this.state.pwdVal}
                        onChangeText={text => (this.setPwd(text))}
                        onBlur={this.handleBlurPwd}
                        onFocus={this.handleFocusPwd}
                        secureTextEntry={true}
                    />

                </View>
                <Pressable onPress={

                    () => {

                        if (this.state.emailVal != "" && this.state.pwdVal != "" && this.state.phoneVal != "" && this.state.usernameVal != "") {

                            this.validateEmailPhone()

                        }
                        else {

                            alert('All field must be filled')

                        }
                    }
                }
                >
                    <View style={styles.signUpBtn}><Text style={styles.signUpBtnText}>SIGN UP</Text></View></Pressable>
            </View>

        )
    }

}

const styles = StyleSheet.create({

    mainContainer: {
        backgroundColor: '#DB9B06',
        flex: 1,
        justifyContent: 'space-evenly',
        paddingHorizontal: 35,
    },

    header: {

        fontSize: 70,
        color: '#1f1f1e',
        fontWeight: '800',
        letterSpacing: 2,
        marginBottom: 15,

    },

    greetings: {
        color: '#1f1f1e',
        fontSize: 20,
        fontWeight: '800'
    },

    textInp: {
        marginBottom: 10,
        paddingLeft: 12,
    },

    textInpBlur: {
        borderBottomWidth: 1,
        borderBottomColor: '#1f1f1e',
    },
    textInpFocus: {
        borderColor: '#1f1f1e',
        borderRadius: 10,
        borderWidth: 1,
    },

    signUpBtn: {
        fontSize: 18,
        fontWeight: '700',
        paddingTop: 15,
        paddingBottom: 15,
        paddingLeft: 95,
        paddingRight: 95,
        borderWidth: 3,
        borderRadius: 30,
        borderColor: 'white',
        marginBottom: 20,
        letterSpacing: 2,
    },

    signUpBtnText: {
        color: 'white',
        textAlign: 'center',
        fontWeight: '700',
        letterSpacing: 2,
        fontSize: 18
    }

})
export default SignUp;