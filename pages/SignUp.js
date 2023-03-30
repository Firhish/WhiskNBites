import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import auth from '@react-native-firebase/auth';
const { Component } = require("react");

class SignUp extends Component {

    state = {

        emailVal: '',
        pwdVal: '',
        isFocusedEmail: false,
        isFocusedPwd: false,

    }

    onClickHandle = () => {

        auth()
            .createUserWithEmailAndPassword(this.state.emailVal, this.state.pwdVal)
            .then(() => {
                console.log('User account created & signed in!');
                this.props.navigation.navigate('TabsCust');
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

    setEmail = (text) => {

        this.setState({ emailVal: text });
    }

    setPwd = (text) => {

        this.setState({ pwdVal: text });
    }

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
                        placeholder='email'
                        value={this.state.emailVal}
                        onChangeText={text => (this.setEmail(text))}
                        onBlur={this.handleBlurEmail}
                        onFocus={this.handleFocusEmail}
                    />
                    <TextInput
                        style={[styles.textInp, this.state.isFocusedPwd ? styles.textInpFocus : styles.textInpBlur]}
                        placeholder='password'
                        value={this.state.pwdVal}
                        onChangeText={text => (this.setPwd(text))}
                        onBlur={this.handleBlurPwd}
                        onFocus={this.handleFocusPwd}
                        secureTextEntry={true}
                    />
                </View>
                <Pressable onPress={(this.state.emailVal != "" && this.state.pwdVal != "") ? this.onClickHandle : () => { alert('All field must be filled') }}><View style={styles.signUpBtn}><Text style={styles.signUpBtnText}>SIGN UP</Text></View></Pressable>
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