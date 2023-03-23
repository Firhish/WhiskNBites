import { Component } from "react";
import database from '@react-native-firebase/database';
import { firebase } from '@react-native-firebase/database';
import { SafeAreaView, Text, View } from "react-native";

class App extends Component {

  state = {
    testMsg: 'dummy'
  }

  getData = () => {
    
    
    database()
    .ref('/test')
    .on('value', snapshot => {
      
      this.setTestMsg(snapshot.val())
    });

    
  }

  setTestMsg = (msg: any) => {
    this.setState({ testMsg: msg })
  }

  componentDidMount(): void {
    this.getData()
  }

  render() {
    return (
      <SafeAreaView>
        <View>
          <Text>{this.state.testMsg}</Text>
        </View>
      </SafeAreaView>
    )
  }
}

export default App