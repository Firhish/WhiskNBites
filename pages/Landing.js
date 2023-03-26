import { Component } from "react";
import { Image, ImageBackground, Pressable, StyleSheet, Text, View } from "react-native";


class Landing extends Component {

    render() {

        return (
            <View style={styles.container}>
                <ImageBackground source={require('../assets/landingBackground.png')} style={styles.bgImage} resizeMode='cover'>
                    <View style={styles.overlay}>
                        <Image source={require('../assets/wnbLogo.png')} style={styles.image} />
                        <View style={styles.signInAndUpContainer}>
                            <Pressable onPress={() => {
                                this.props.navigation.navigate('SignUp');
                            }}><Text style={styles.signUp}>SIGN UP</Text></Pressable>
                            <Pressable onPress={() => {
                                this.props.navigation.navigate('SignIn');}}>
                                <View style={{flexDirection:"row"}}>
                                <Text style={{fontWeight:'600'}}>Already have an account?</Text>
                                <Text style={{fontWeight:'800'}}> Sign In</Text>
                                </View>  
                            </Pressable>
                        </View>
                    </View>
                </ImageBackground>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#DB9B06',
    },

    // signUp: {
    //     fontWeight: '700',
    //     color: 'white',
    //     fontSize: 18,
    //     paddingTop: 15,
    //     paddingBottom: 15,
    //     paddingLeft: 95,
    //     paddingRight: 95,
    //     borderWidth: 3,
    //     borderRadius: 50,
    //     borderColor: 'white',
    //     marginBottom: 30,
    //     letterSpacing: 2,
    // },

    signInAndUpContainer: {
        alignItems: 'center'
    },

    signUp: {
        fontWeight: '700',
        color: 'white',
        fontSize: 18,
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

    image: {
        height: 300,
        width: 350,
        marginBottom: 50,
    },

    bgImage: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 600,
        height: 900,
    },

    overlay: {
        backgroundColor: '#DB9B06c0',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        width: 600,
        height: 900,
    }
})

export default Landing

