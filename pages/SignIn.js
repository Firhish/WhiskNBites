import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import auth from '@react-native-firebase/auth';
import { Component } from 'react';

class SignIn extends Component {

    state = {
        emailVal: '',
        pwdVal: '',
        isFocusedEmail: false,
        isFocusedPwd: false,
    }

    onClickHandle = () => {

        auth()
            .signInWithEmailAndPassword(this.state.emailVal, this.state.pwdVal)
            .then(() => {

                if(auth().currentUser.uid=="79u2YqJWtaZ4ZfjP8GuBVLK7QP52"){
                    console.log("Moderator signed in!")
                    this.props.navigation.navigate('TabsMod');
                }
                else{
                    console.log('User signed in!');
                    this.props.navigation.navigate('TabsCust');
                }
                
            })
            .catch(error => {
                if (error.code === 'auth/wrong-password') {
                    console.log('Wrong password');
                    alert('Wrong password');
                }
                if (error.code === 'auth/user-not-found') {
                    console.log('User not found');
                    alert('Email not registered')
                }
                if (error.code === 'auth/invalid-email') {
                    console.log('Invalid email');
                    alert('Invalid email address');
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
                    <Text style={styles.header}>Sign In</Text>
                    <Text style={styles.greetings} >Hi there! It's nice to have you back</Text>
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

                        style={[styles.textInp, this.state.isFocusedPwd ? styles.textInpFocus : styles.textInpBlur]}
                        placeholder='Password'
                        value={this.state.pwdVal}
                        onChangeText={text => (this.setPwd(text))}
                        onBlur={this.handleBlurPwd}
                        onFocus={this.handleFocusPwd}
                        secureTextEntry={true}
                    />
                </View>

                <View>
                <Pressable onPress={(this.state.emailVal != "" && this.state.pwdVal != "") ? this.onClickHandle : () => { alert('All field must be filled') }}><View style={styles.signInBtn}><Text style={styles.signInBtnText}>SIGN IN</Text></View></Pressable>
                    <Pressable onPress={() => { this.props.navigation.navigate('ForgotPwd') }}><Text style={styles.forgotPwdText}>Forgot your password?<Text style={styles.reset}> Reset here</Text></Text></Pressable>
                </View>

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

    signInBtn: {
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

    signInBtnText: {
        color: 'white',
        textAlign: 'center',
        fontWeight: '700',
        letterSpacing: 2,
        fontSize: 18
    },

    forgotPwdText: {
        textAlign: 'center',
        fontWeight: '600'
    },

    reset: {
        fontWeight: '800'

    },


})
export default SignIn;