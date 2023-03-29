import { createBottomTabNavigator, useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { Component } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
// import AddPost from "../pages/AddPost";
// import Explore from "../pages/Explore";

//Screens
import CatalogCust from "./CatalogCust";
import OrderCust from "./OrderCust";
import ProfileCust from "./ProfileCust";
import PromotionCust from "./PromotionCust";

//Screen Names
const catalogName = "Catalog"
const orderName = "Order"
const promotionName = "Promotion"
const profileName = "Profile"

const bottomNav = createBottomTabNavigator();
const CustomTabBarButton = ({children, onPress})=>(
    <TouchableOpacity
        onPress={onPress}
        style={{
            top:-30,
            justifyContent:'center',
            alignItems:'center',
            
            // borderColor:'white',
            // borderRadius:35,         
        }}
    >
        <View style={{
            width:80,
            height:80,
            //borderRadius:35,
            backgroundColor:'#900',
             elevation:10,
            // shadowColor:'#black',
            borderRadius:49,
            // borderWidth:7, 
            // borderColor:'white',
        }}>
            {children}
        </View>
    </TouchableOpacity>

);



class Tabs extends Component {

    render() {

        return (
            <bottomNav.Navigator
                initialRouteName={promotionName}
                screenOptions={({ route }) => ({
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
                        return <Ionicons name={iconName} size={30} color={focused?'#DB9B06':'grey'} />
                    },
                    tabBarShowLabel: false,
                    // tabBarActiveTintColor: '#900',
                    // tabBarInactiveTintColor: '#000',
                    tabBarStyle: {
                        backgroundColor: '#fff',
                        height: 70,
                        // position: 'absolute',
                        // bottom: 20,
                        // left: 20,
                        // right: 20,
                        // borderRadius: 15,
                        // ...styles.shadow,
                    },

                })}
            >
                <bottomNav.Screen name={promotionName} component={PromotionCust} options={{ headerShown: false }} />
                <bottomNav.Screen name={catalogName} component={CatalogCust} options={{ headerShown: false }} />
                {/* <bottomNav.Screen name={addPostName} component={AddPost} options={{ 
                    headerShown: false ,
                    tabBarIcon: ({focused}) =>(
                        <Ionicons name={'add'} size={50} color='white' />
                    ),
                    tabBarButton:(props)=>(
                        <CustomTabBarButton{...props}/>
                    )
                }}
                
                 /> */}
                <bottomNav.Screen name={orderName} component={OrderCust} options={{ headerShown: false }} />
                <bottomNav.Screen name={profileName} component={ProfileCust} options={{ headerShown: false }} />
            </bottomNav.Navigator>






        );
    }
}
export default Tabs;

const styles = StyleSheet.create({

    shadow:{
        shadowColor: '#7F5DF0',
        shadowOffset:{
            width:0,
            height:10,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
        elevation:10,

    },
})