import {StyleSheet, Text, View} from 'react-native';
import React, {FC} from 'react';

const Header: FC<{showNotice: () => void}> = ({showNotice}) => {
  return (
    <View>
      <Text>Header</Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  Text: {
    color: '#fff',
  },
  Text2: {
    color: '#fff',
    width: '90%',
    textAlign: 'center',
  },
});
