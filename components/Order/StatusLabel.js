import { Component } from "react";
import { View, Text, StyleSheet } from 'react-native'

class StatusLabel extends Component {

    getColor(status) {

        if (status == 'PREPARING') {

            return 'red'

        }

        else if (status == 'SHIPPED') {

            return 'blue'

        }

        else if (status == 'COMPLETED') {

            return 'green'

        }
    }

    render() {

        return (

            <View style={[styles.statusLabel, { backgroundColor: this.getColor(this.props.status) }]}>
                <Text style={styles.statusText}>{this.props.status}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({

    statusLabel: {

        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 50,
        alignItems: 'center'

    },

    statusText: {
        color: 'white',
        fontSize: 12
    }
})

export default StatusLabel