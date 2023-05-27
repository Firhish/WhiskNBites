import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Component } from "react";
import { Text } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';

//Screens
import CatalogMod from "./CatalogMod";
import OrderMod from "./OrderMod";
import ProfileMod from "./ProfileMod";
import PromotionMod from "./PromotionMod";

//Screen Names
const catalogName = "Catalog"
const orderName = "Order"
const promotionName = "Promotion"
const profileName = "Profile"

const bottomNav = createBottomTabNavigator();

class TabsMod extends Component {

    render() {

        return (
            <bottomNav.Navigator
                initialRouteName={promotionName}
                screenOptions={({ route }) => ({
                    unmountOnBlur: true,
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;
                        let rn = route.name;
                        if (rn === promotionName) {
                            iconName = focused ? 'pricetags' : 'pricetags-outline';
                        } else if (rn === catalogName) {
                            iconName = focused ? 'cart' : 'cart-outline';
                        } else if (rn === orderName) {
                            iconName = focused ? 'file-tray-full' : 'file-tray-full-outline';
                        } else if (rn === profileName) {
                            iconName = focused ? 'person-circle' : 'person-circle-outline';
                        }
                        return <Ionicons name={iconName} size={30} color={focused ? '#DB9B06' : 'grey'} />
                    },
                    tabBarShowLabel: true,
                    tabBarLabel: ({ focused, color, size }) => {
                        return <Text style={{ color: focused ? '#DB9B06' : 'grey', fontSize: 12 }}>{route.name}</Text>
                    },
                    tabBarStyle: {
                        backgroundColor: '#fff',
                        height: 70,
                        paddingBottom: 10,
                    },

                })}
            >
                <bottomNav.Screen name={promotionName} component={PromotionMod} options={{ headerShown: false }} />
                <bottomNav.Screen name={catalogName} component={CatalogMod} options={{ headerShown: false }} />
                <bottomNav.Screen name={orderName} component={OrderMod} options={{ headerShown: false }} />
                <bottomNav.Screen name={profileName} component={ProfileMod} options={{ headerShown: false }} />
            </bottomNav.Navigator>
        );
    }
}
export default TabsMod;
