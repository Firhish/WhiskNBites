import { Component } from "react";
import {Text, View} from 'react-native';
import TransparentHeader from "../../components/TransparentHeader";
import ProductBox from "../../components/Catalog/ProductBox";
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

class Cart extends Component{

    state={

        cart : [],
        
    }

    getData = () => {

        database()
            .ref('/Users')
            .on('value', (snapshot) => {

                let data = [];
                snapshot.forEach((child) => {
                    if(child.val().uid==auth().currentUser.uid){

                        this.setCart(child.val().cart)
                    }   
                })
            });
    }

    setCart = (arr) => {
        this.setState({ cart: arr });
    }

    componentDidMount() {
        this.getData()
    }

    render(){

        return(

            <View>
                <TransparentHeader title='Cart' goBack={this.props.navigation.goBack} />
                {this.state.cart!= 0 ?
                    this.state.cart.map((product, index) => (
                        <ProductBox key={index} item_id={product.item_id} quantity={product.quantity}/>
                    )) : <Text style={{textAlign:'center',marginTop:'70%', fontSize:16}}>No item added yet</Text>}
            </View>  
            
        )
    }
}

export default Cart