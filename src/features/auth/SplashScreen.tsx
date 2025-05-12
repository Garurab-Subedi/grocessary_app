import React, {FC, useEffect} from 'react';
import {Alert, Image, StyleSheet, Text, View} from 'react-native';
import {Colors} from '@utils/Constants';
import Logo from '@assets/images/logo.jpeg';
import {screenHeight, screenWidth} from '@utils/Scaling';
import {resetAndNavigate} from '@utils/NavigationUtils';
import GeoLocation from '@react-native-community/geolocation';
import {useAuthStore} from '@state/authStore';
import {tokenStorage} from '@state/storage';
import {jwtDecode} from 'jwt-decode';
import {refetchUser, refresh_tokens} from '@service/authService';

GeoLocation.setRNConfiguration({
  skipPermissionRequests: false,
  authorizationLevel: 'always',
  enableBackgroundLocationUpdates: true,
  locationProvider: 'auto',
});

interface DecodedToken {
  exp: number;
}

const SplashScreen: FC = () => {
  const {user, setUser} = useAuthStore();

  const tokenCheck = async () => {
    const accessToken = tokenStorage.getString('accessToken') as string;
    const refreshToken = tokenStorage.getString('refreshToken') as string;

    if (accessToken) {
      const decodedAcessToken = jwtDecode<DecodedToken>(accessToken);
      const decodedRefreshToken = jwtDecode<DecodedToken>(refreshToken);

      const currentTime = Date.now() / 1000;

      if (decodedRefreshToken?.exp < currentTime) {
        resetAndNavigate('CustomerLogin');
        Alert.alert('Session expired, please login again');
        return false;
      }

      if (decodedAcessToken?.exp < currentTime) {
        try {
          refresh_tokens();
          await refetchUser(setUser);
        } catch (error) {
          console.log('Error in tokenCheck', error);
          Alert.alert('Error in tokenCheck', 'Please login again');
          return false;
        }
      }

      if (user?.role === 'Customer') {
        resetAndNavigate('ProductDashboard');
      } else {
        resetAndNavigate('DeliveryDashboard');
      }

      return true;
    }

    resetAndNavigate('CustomerLogin');
    return false;
  };

  useEffect(() => {
    const intialStartUp = async () => {
      try {
        GeoLocation.requestAuthorization();
        tokenCheck();
      } catch (error) {
        Alert.alert(
          'Sorry we need location service to give you better shopping experience',
        );
      }
    };

    const timeoutId = setTimeout(intialStartUp, 1000);
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <View style={styles.container}>
      <Image source={Logo} style={styles.logoImage} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoImage: {
    height: screenHeight * 0.7,
    width: screenWidth * 0.7,
    resizeMode: 'contain',
  },
});
export default SplashScreen;
