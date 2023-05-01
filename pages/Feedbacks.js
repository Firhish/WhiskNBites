import React, { Component } from 'react';
import { Text, View } from 'react-native';
import TransparentHeader from '../components/TransparentHeader';
import FeedbackBox from '../components/Catalog/FeedbackBox';
import database from '@react-native-firebase/database';

class Feedbacks extends Component {


    state = {
        feedbacks: [],
    }

    getData = () => {

        database()
            .ref('/Products/' + this.props.route.params.productId + '/product_feedbacks')
            .on('value', (snapshot) => {
                let data = [];
                snapshot.forEach((child) => {
                    temp = child.val()
                    temp.id = child.key
                    data.push(temp)
                    this.setFeedbacks(data)
                    console.log(this.state.feedbacks)
                })

            });

    }

    setFeedbacks = (arr) => {
        this.setState({ feedbacks: arr });
    }

    componentDidMount() {
        this.getData()
    }

    render() {

        return (
            <View>

                <TransparentHeader title='Feedbacks' goBack={this.props.navigation.goBack} />

                {this.state.feedbacks != 0 ?
                    this.state.feedbacks.map((feedback, index) => (
                        <FeedbackBox key={index} comment={feedback.comment} user_id={feedback.user_id} />
                    )) : <Text style={{ textAlign: 'center', marginTop: '70%', fontSize: 16 }}>No feedback yet</Text>}

            </View>
        )
    }
}

export default Feedbacks