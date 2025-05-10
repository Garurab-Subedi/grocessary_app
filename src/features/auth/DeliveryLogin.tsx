import {Alert, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {FC, useState} from 'react';
import {deliveryLogin} from '@service/authService';
import {screenHeight} from '@utils/Scaling';
import CustomerSafeAreaView from '@components/global/CustomerSafeAreaView';
import LottieView from 'lottie-react-native';
import CustomText from '@components/ui/CustomText';
import {Fonts} from '@utils/Constants';
import Icon from 'react-native-vector-icons/Ionicons';
import {resetAndNavigate} from '@utils/NavigationUtils';
import CustomerInput from '@components/ui/CustomerInput';
import {RFValue} from 'react-native-responsive-fontsize';
import CustomButton from '@components/ui/CustomButton';
// import {RFValue} from 'react-native-responsive-fontsize';

const DeliveryLogin: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      // Call your login function here
      await deliveryLogin(email, password);
      resetAndNavigate('DeliveryDashboard');
      console.log('Login successful');
    } catch (error) {
      Alert.alert('Login error:');
    } finally {
      setLoading(false);
    }
  };

  return (
    <CustomerSafeAreaView>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag">
        <View style={styles.container}>
          <View style={styles.lottieContainer}>
            {/* Replace with your Lottie animation */}
            <LottieView
              source={require('@assets/animations/delivery_man.json')}
              autoPlay
              loop
              style={styles.lottie}
              hardwareAccelerationAndroid
            />
          </View>
          <CustomText variant="h3" fontFamily={Fonts.Bold} style={styles.text}>
            Delivery Partner Portal
          </CustomText>
          <CustomText
            variant="h6"
            fontFamily={Fonts.SemiBold}
            style={styles.text}>
            Faster than Flash⚡️
          </CustomText>

          <CustomerInput
            onChangeText={setEmail}
            value={email}
            left={
              <Icon
                name="mail"
                color="#F8890E"
                style={{marginLeft: 10}}
                size={RFValue(18)}
              />
            }
            placeholder="Email"
            inputMode="email"
            right={false}
          />

          <CustomerInput
            onChangeText={setPassword}
            value={password}
            left={
              <Icon
                name="key-sharp"
                color="#F8890E"
                style={{marginLeft: 10}}
                size={RFValue(18)}
              />
            }
            placeholder="Enter Password"
            secureTextEntry
            onClear={() => setPassword('')}
            inputMode="text"
            right={false}
          />

          <CustomButton
            disabled={email.length === 0 || password.length === 0}
            onPress={handleLogin}
            loading={loading}
            title="Login"
          />
        </View>
      </ScrollView>
    </CustomerSafeAreaView>
  );
};

export default DeliveryLogin;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lottie: {
    width: '100%',
    height: '100%',
  },
  lottieContainer: {
    width: '100%',
    height: screenHeight * 0.12,
  },
  text: {
    opacity: 0.8,
    marginBottom: 25,
    marginTop: 2,
  },
});
