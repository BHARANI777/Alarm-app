import React, { Component } from 'react';
import {   Alert } from 'react-native';
import CircleButton from ' react-native-circle-button'
import { connect } from 'react-redux';
import { addAlarm } from '../actions/alarm';
import DateTimePicker from 'react-native-modal-datetime-picker';
//import ReactNativeAN from 'react-native-alarm-notification';
class TimePicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDateTimePickerVisible: false,
    };
  }

  makeid = () => {
    var length = 5;
    var result = '';
    var characters = '0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };

  showDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: true });
  };

  hideDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: false });
  };

  handleDatePicked = datetime => {
    var currentTime = Date.now();
    if (datetime.getTime() < currentTime) {
      Alert.alert('please choose future time');
      this.hideDateTimePicker();

      return;
    }
   // const fireDate = ReactNativeAN.parseDate(datetime);
   // console.log('A date has been picked: ', fireDate);

    const alarmNotifData = {
      id: this.makeid(),
      title: 'Alarm Ringing', 
      message: 'My Notification Message', 
      channel: 'alarm-channel', 
      ticker: 'My Notification Ticker',
      auto_cancel: true, 
      vibrate: true,
      vibration: 100, 
      small_icon: 'ic_launcher', 
      large_icon: 'ic_launcher',
      play_sound: true,
      sound_name: null, 
      color: 'red',
      schedule_once: true, 
      tag: 'some_tag',
      fire_date: Date.now(), 

      data: { value: datetime },
    };

    this.props.add(alarmNotifData);
    //ReactNativeAN.scheduleAlarm(alarmNotifData);
    this.hideDateTimePicker();
  };

  render() {
    return (
      <>
        <CircleButton title="+ Add Alarm" onPress={this.showDateTimePicker} />
        <DateTimePicker
          mode="datetime"
          isVisible={this.state.isDateTimePickerVisible}
          onConfirm={this.handleDatePicked}
          onCancel={this.hideDateTimePicker}
        />
      </>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    add: alarmNotifObj => {
      dispatch(addAlarm(alarmNotifObj));
    },
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(TimePicker);
