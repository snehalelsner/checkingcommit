import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const App = () => {
  const [Visible, setVisible] = useState(false);
  const [data, setData] = useState('');
  const [selectedvalue, setSelectedValue] = useState(['Select...']);

  const DropDown = () => {
    setVisible(!Visible);
    setSelectedValue(['Please Select...']);
  };

  useEffect(() => {
    getData();
    console.log('this is data state in console', data);
  }, []);

  const getData = () => {
    fetch(
      'https://servicetechopportunity-89904-ruby.b89904.dev.eastus.az.svc.builder.cafe/api/data_index',
    )
      .then(Response => Response.json())
      .then(response => {
        console.log('this is response in console', response);
        setData(response);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const SelectedData = (item, index) => {
    const myvalue = [item];
    setSelectedValue(myvalue);
    setVisible(false);
    console.log('selected item in console', selectedvalue);
  };

  const renderItem = ({item, index}) => {
    if (Visible) {
      return (
        <TouchableOpacity
          onPress={() => SelectedData(item.heading, index)}
          style={[
            {
              justifyContent: 'center',
              alignSelf: 'center',
              marginTop: 5,
              borderRadius: 10,
              backgroundColor: 'blue',
              // borderWidth: 2,
              height: (Dimensions.get('window').height * 1) / 17,
              width: (Dimensions.get('window').width * 1) / 1.3,
              paddingLeft: 20,
            },
            {
              borderColor: selectedvalue.includes(item)
                ? 'red'
                : 'black',
            },
          ]}>
          <Text
            style={{
              fontSize: 18,
              alignSelf: 'flex-start',
              color: 'white',
            }}>
            {item.heading}
          </Text>
        </TouchableOpacity>
      );
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <Text
        style={{
          marginTop: 30,
          alignSelf: 'center',
          left: 0,
          fontSize: 30,
          color: 'black',
        }}>
        DropDown
      </Text>
      <TouchableOpacity style={{justifyContent: 'center'}} onPress={DropDown}>
        <Text
          style={{
            fontSize: 20,
            color: 'black',
            marginTop: 40,
            alignSelf: 'center',
            textAlignVertical: 'center',
            borderRadius: 10,
            paddingLeft: 20,
            height: (Dimensions.get('window').height * 1) / 17,
            width: (Dimensions.get('window').width * 1) / 1.3,
            borderColor: 'black',
            borderWidth: 0.8,
          }}>
          {selectedvalue}
        </Text>
      </TouchableOpacity>
      <FlatList data={data} renderItem={renderItem}></FlatList>
    </View>
  );
};

export default App;
