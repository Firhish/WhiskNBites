import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import auth from '@react-native-firebase/auth';
import { Component } from 'react';

class ForgotPwd extends Component {

    state = {
        emailVal: '',
        isFocusedEmail: false,
    }

    onClickHandle = () => {

        auth()
            .sendPasswordResetEmail(this.state.emailVal)
            .then(() => {
                console.log('email sent')
                this.props.navigation.navigate('SignIn')
            })
            .catch(error => {
                console.error(error);
            });

    }

    handleFocusEmail = () => this.setState({ isFocusedEmail: true })

    handleBlurEmail = () => this.setState({ isFocusedEmail: false })

    setEmail = (text) => {
        this.setState({ emailVal: text });
    }

    render() {
        return (
            
            <View style={styles.mainContainer}>
                <View>
                    <Text style={styles.header}>Forgot Password?</Text>
                    <Text style={styles.greetings} >It's okay don't panic</Text>
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
                </View>

                <View>
                    <Pressable onPress={(this.state.emailVal != "") ? this.onClickHandle : () => { alert('All field must be filled') }}><View style={styles.sendEmailBtn}><Text style={styles.sendEmailBtnText}>SEND VIA EMAIL</Text></View></Pressable>
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
        fontSize: 50,
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

    sendEmailBtn: {
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

    sendEmailBtnText: {
        color: 'white',
        textAlign: 'center',
        fontWeight: '700',
        letterSpacing: 2,
        fontSize: 12
    },

})
export default ForgotPwd;