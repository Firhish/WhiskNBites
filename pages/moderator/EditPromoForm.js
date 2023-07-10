import React, { Component } from 'react';
import { View, Text, TextInput, Button, Image, StyleSheet, Pressable } from 'react-native';
import database from '@react-native-firebase/database';
import TransparentHeader from '../../components/TransparentHeader';
import MyDatePicker from '../../components/MyDatePicker';
import moment from 'moment';

class EditPromoForm extends Component {

    state = {
        promoName: '',
        promoDiscount: '',
        promoValidity: null,
        promoCode: ''
    };

    handlePromoNameChange = promoName => {
        this.setState({ promoName });
    };

    handlePromoDiscountChange = promoDiscount => {

        if (promoDiscount >= 1) {
            alert('Promotion discount must be less than 1');
            return;
        }

        this.setState({ promoDiscount });

    };

    handlePromoValidityChange = promoValidity => {
        this.setState({ promoValidity });
    };

    handlePromoCodeChange = promoCode => {
        this.setState({ promoCode });
    };

    validatePromoDiscount = () => {
        const { promoDiscount } = this.state;

        if (promoDiscount == 0) {
            alert('Promotion discount cannot be equal or less than 0');
        } else {
            this.handleSubmit()
        }
    };

    getData = () => {

        database()
            .ref('/Promotions/' + this.props.route.params.promoId)
            .on('value', (snapshot) => {
                if (snapshot.exists()) {
                    this.handlePromoNameChange(snapshot.val().name)
                    this.handlePromoDiscountChange(snapshot.val().discount)
                    this.handlePromoCodeChange(snapshot.val().code)
                    this.handlePromoValidityChange(snapshot.val().validity)
                }
                else {
                    return null
                }

            });

    }

    componentDidMount() {

        this.getData()

    }

    pickImage = () => {

        console.log('pick image insya allah jadi')
    };

    getDate = (date) => {

        this.handlePromoValidityChange(date)

    }

    handleSubmit = () => {

        database()
            .ref('/Promotions/' + this.props.route.params.promoId)
            .update({
                name: this.state.promoName,
                discount: Number(this.state.promoDiscount).toFixed(2),
                code: (this.state.promoCode).toUpperCase(),
                validity: Date.parse(this.state.promoValidity)

            })
            .then(() => {

                this.props.navigation.navigate('TabsMod');
                alert('Promotion updated successfully')
            });

    };

    render() {
        return (
            <View style={{ flex: 1 }}>
                <TransparentHeader title="Edit Product" goBack={this.props.navigation.goBack} />
                <View style={styles.container}>
                    <View style={{ width: '100%', }}>
                        <Text style={{ fontSize: 22, marginVertical: 30, }}>Enter product information</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={this.handlePromoNameChange}
                            value={this.state.promoName}
                            placeholder='Promotion Name'
                        />
                        <TextInput
                            style={styles.input}
                            onChangeText={this.handlePromoDiscountChange}
                            value={this.state.promoDiscount}
                            keyboardType="numeric"
                            placeholder='Promotion Discount (e.g enter 0.2 for 20% discount)'
                        />
                        <TextInput
                            style={styles.input}
                            onChangeText={this.handlePromoCodeChange}
                            value={this.state.promoCode}
                            placeholder='Promotion Code'
                            maxLength={6}
                        />

                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 15 }}>
                            <MyDatePicker title={'SET EXPIRY DATE'} func={this.getDate} />
                            {this.state.promoValidity ? <Text style={{ marginLeft: 15 }}>{moment(this.state.promoValidity).format('LL')}</Text> : null}


                        </View>

                    </View>
                    <Pressable onPress={

                        () => {

                            if (this.state.promoName != '' && this.state.promoDiscount != '' && this.state.promoCode != '' && this.state.promoValidity != null) {


                                this.validatePromoDiscount()

                            }
                            else {

                                alert('All field must be filled')

                            }
                        }
                    }>
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

export default EditPromoForm;
