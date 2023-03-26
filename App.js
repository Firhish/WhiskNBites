import { Component } from "react";
import { NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import database from '@react-native-firebase/database';
import { firebase } from '@react-native-firebase/database';
import { SafeAreaView, Text, View } from "react-native";
import Landing from "./pages/Landing";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import TabsCust from "./pages/customer/TabsCust";
import ForgotPwd from "./pages/ForgotPwd";

const Stack = createNativeStackNavigator();

class App extends Component {

  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
        <Stack.Screen name='Landing' component={Landing} options={{headerShown:false}}/>
        <Stack.Screen name='SignIn' component={SignIn} options={{headerShown:false}}/>
        <Stack.Screen name='ForgotPwd' component={ForgotPwd} options={{headerShown:false}}/>
        <Stack.Screen name='SignUp' component={SignUp} options={{headerShown:false}}/>
        <Stack.Screen name='TabsCust' component={TabsCust} options={{headerShown:false}}/>
        </Stack.Navigator>

      </NavigationContainer>
    )
  }
}

export default App;