import React, { Component } from 'react';
import {Text, View} from 'react-native';
import TransparentHeader from '../components/TransparentHeader';
import FeedbackBox from '../components/Catalog/FeedbackBox';

class Feedbacks extends Component{

    render(){

        return(
            // <Text>{this.props.route.params.productId}</Text>
            <View>
                <TransparentHeader title='Feedbacks'/>
                <FeedbackBox/>
                {/* <FeedbackBox/>
                <FeedbackBox/> */}
            </View>
        )
    }
}

export default Feedbacks