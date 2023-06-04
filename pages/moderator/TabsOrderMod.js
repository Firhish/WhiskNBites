import { Component } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { View, Text } from 'react-native';
import PendingOrder from './PendingOrder';
import CompletedOrderMod from './CompletedOrderMod';
import AnalyticOrder from './AnalyticOrder';

const Tab = createMaterialTopTabNavigator();

class TabsOrderMod extends Component {

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
                <Tab.Screen name="Pending" component={PendingOrder} />
                <Tab.Screen name="Completed" component={CompletedOrderMod} />
                <Tab.Screen name="Analytic" component={AnalyticOrder} />
            </Tab.Navigator>
        );
    }
}

export default TabsOrderMod
