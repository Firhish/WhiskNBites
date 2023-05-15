import React, { Component } from 'react';
import { Modal, View, Text, TouchableHighlight,TouchableOpacity, StyleSheet } from 'react-native';

class CounterModal extends Component {

    state = {
        count: 1
    }

    handleMinusPress = () => {
        if(this.state.count==1){
            return null
        }
        else{
            this.setState({ count: this.state.count - 1 });
        }
        
    };

    handleAddPress = () => {
        this.setState({ count: this.state.count + 1 });
    };


    render() {
        const { onConfirm, onCancel, visible } = this.props;
        const { count } = this.state

        return (
            <Modal
                visible={visible}
                transparent={true}
                onRequestClose={() => {
                    this.setState({ visible: false });
                }}>
                <View
                    style={styles.mainContainer}>
                    <View
                        style={styles.modalContainer}>
                        <Text style={styles.title}>
                            Enter item quantity
                        </Text>
                        <View style={styles.counterBox}>
                            <TouchableOpacity onPress={this.handleMinusPress}>
                                <Text style={styles.minus}>-</Text>
                            </TouchableOpacity>
                            <Text style={styles.count}>{count}</Text>
                            <TouchableOpacity onPress={this.handleAddPress}>
                                <Text style={styles.add}>+</Text>
                            </TouchableOpacity>
                        </View>
                        <View
                            style={styles.btnContainer}>
                            <TouchableHighlight
                                underlayColor={'transparent'}
                                onPress={() => {
                                    onCancel();
                                    this.setState({count:1})
                                }}
                                style={styles.cancelBtn}>
                                <Text style={styles.cancelBtnText}>
                                    Cancel
                                </Text>
                            </TouchableHighlight>
                            <TouchableHighlight
                                underlayColor={'transparent'}
                                onPress={() => {
                                    onConfirm(this.state.count);
                                    this.setState({count:1})
                                }}
                                style={styles.confirmBtn}>
                                <Text style={styles.confirmBtnText}>
                                    Confirm
                                </Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                </View>
            </Modal>
        );
    }
}

const styles = StyleSheet.create({

    mainContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
    },

    modalContainer: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
    },

    title: {
        fontWeight: 'bold',
        fontSize: 20
    },

    warnText: {
        marginTop: 10
    },

    btnContainer: {
        flexDirection: 'row',
        marginTop: 20,
    },

    cancelBtn: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        borderWidth: 2,
        borderColor: '#a0a0a0',
        marginRight: 5,
    },

    cancelBtnText: {
        color: '#a0a0a0',
        fontWeight: 'bold'
    },

    confirmBtn: {
        marginLeft: 5,
    },

    confirmBtnText: {
        color: '#fff',
        fontWeight: 'bold',
        backgroundColor: '#DB9B06',
        paddingVertical: 12,
        paddingHorizontal: 22,
        borderColor: '#DB9B06',
        borderRadius: 5
    },

    counterBox:{
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical:15,
    },

    minus:{
        fontSize: 30,
        marginRight: 25,
        fontWeight: '600',
    },

    add:{
        fontSize: 20,
        marginLeft: 25,
        fontWeight: '600',
    },

    count:{
        fontSize: 20,
    },


})

export default CounterModal;
