import { Component } from "react";
import { Image, ImageBackground, Pressable, StyleSheet, Text, View } from "react-native";


class Landing extends Component {

    render() {

        return (
            <View style={styles.container}>
                <ImageBackground source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/whisk-n-bites-a4339.appspot.com/o/landingBackground.png?alt=media&token=07f62c41-0ff8-40a5-8223-8b988fcf31e5' }} style={styles.bgImage} resizeMode='cover'>
                    <View style={styles.overlay}>
                        <Image source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/whisk-n-bites-a4339.appspot.com/o/wnbLogo.png?alt=media&token=266f5dcb-ddd3-453f-8674-5783e6a40539' }} style={styles.image} />
                        <View style={styles.signInAndUpContainer}>
                            <Pressable onPress={() => {
                                this.props.navigation.navigate('SignUp');
                            }}><Text style={styles.signUp}>SIGN UP</Text></Pressable>
                            <Pressable onPress={() => {
                                this.props.navigation.navigate('SignIn');
                            }}>
                                <View style={{ flexDirection: "row" }}>
                                    <Text style={{ fontWeight: '600' }}>Already have an account?</Text>
                                    <Text style={{ fontWeight: '800' }}> Sign In</Text>
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

