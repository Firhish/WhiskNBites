import React, { useState, Component } from 'react'
import { Button, Pressable, StyleSheet, View, Text, } from 'react-native'
import DatePicker from 'react-native-date-picker'
import moment from 'moment'

class MyDatePicker extends Component {

  state = {

    date: new Date(),
    open: false,

  }

  setDate = (date) => {

    this.setState({ date })

  }

  setOpen = (open) => {

    this.setState({ open })

  }



  render() {

    const { open, date } = this.state

    return (

      <>
        <View style={{ height: 15 }}></View>
        <Pressable onPress={() => this.setOpen(true)}>
          <Text style={styles.btn}>{this.props.title}</Text>
        </Pressable>

        <DatePicker
          modal
          open={open}
          date={date}
          onConfirm={(date) => {
            this.setOpen(false)
            this.setDate(date)
            this.props.func(date)
          }}
          onCancel={() => {
            this.setOpen(false)
          }}
        />
      </>


    )

  }
}

const styles = StyleSheet.create({


  btn: {

    backgroundColor: '#DB9B06',
    color: 'white',
    paddingHorizontal: 12,
    paddingVertical: 5,

  }
})

export default MyDatePicker