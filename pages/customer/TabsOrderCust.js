import { Component } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import OrderCust from './OrderCust';
import { View, Text } from 'react-native';
import ToReceiveOrder from './ToReceiveOrder';
import CompletedOrder from './CompletedOrder';

const Tab = createMaterialTopTabNavigator();

class TabsOrderCust extends Component {

    render() {

        return (
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarLabel: ({ focused, color, size }) => {
                        return <Text style={{ color: focused ? '#DB9B06' : 'grey' }}>{route.name}</Text>
                    },
                    tabBarStyle: {
                        backgroundColor: '#fff',
                    },
                    tabBarIndicatorStyle: {

                        backgroundColor: '#DB9B06',
                    },

                    tabBarPressColor: 'transparent',

                })}
            >
                <Tab.Screen name="To Receive" component={ToReceiveOrder} />
                <Tab.Screen name="Completed" component={CompletedOrder} />
            </Tab.Navigator>
        );
    }
}

export default TabsOrderCust
