import React, { Component } from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';

class ConfirmModal extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       visible: false,
//     };
//   }

  render() {
    // const { visible } = this.state;
    const { onConfirm, onCancel, visible } = this.props;

    return (
      <Modal
        visible={visible}
        transparent={true}
        onRequestClose={() => {
          this.setState({ visible: false });
        }}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
          }}>
          <View
            style={{
              backgroundColor: '#fff',
              padding: 20,
              borderRadius: 10,
              alignItems: 'center',
            }}>
            <Text style={{ fontWeight: 'bold', fontSize: 20 }}>
              Confirm Action
            </Text>
            <Text style={{ marginTop: 10 }}>
              {/* Are you sure you want to perform this action? */}
              {this.props.warnText}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 20,
                // justifyContent: 'space-around',
                // width: '100%',
              }}>
              <TouchableOpacity
                onPress={() => {
                //   this.setState({ visible: false });
                  onCancel();
                }}
                style={{
                  backgroundColor: '#c1c1c1',
                  paddingVertical: 10,
                  paddingHorizontal: 20,
                  borderRadius: 5,
                  marginRight:5,
                }}>
                <Text style={{ color: '#fff', fontWeight: 'bold' }}>
                  Cancel
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                //   this.setState({ visible: false });
                  onConfirm();
                }}
                style={{
                  backgroundColor: '#DB9B06c6',
                  paddingVertical: 10,
                  paddingHorizontal: 20,
                  borderRadius: 5,
                  marginLeft:5,
                }}>
                <Text style={{ color: '#fff', fontWeight: 'bold' }}>
                  Confirm
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}

export default ConfirmModal;
