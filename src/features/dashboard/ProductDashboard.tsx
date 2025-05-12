import {
  Platform,
  StyleSheet,
  Animated as RNAnimated,
  Text,
  View,
  SafeAreaView,
  Touchable,
  TouchableOpacity,
  Animated,
} from 'react-native';
import React, {useEffect, useRef} from 'react';
import {NoticeHeight, screenHeight} from '@utils/Scaling';
import {
  CollapsibleContainer,
  CollapsibleScrollView,
  CollapsibleHeaderText,
  CollapsibleHeaderContainer,
  withCollapsibleContext,
  useCollapsibleContext,
} from '@r0b0t3d/react-native-collapsible';
import Geolocation from '@react-native-community/geolocation';
import {useAuthStore} from '@state/authStore';
import {reverseGeocode} from '@service/mapService';
import NoticeAnimation from './NoticeAnimation';
import Visual from './Visual';
import Icon from 'react-native-vector-icons/Ionicons';
import {AnimatedView} from 'react-native-reanimated/lib/typescript/component/View';
import {useAnimatedStyle, withTiming} from 'react-native-reanimated';
import {RFValue} from 'react-native-responsive-fontsize';
import CustomText from '@components/ui/CustomText';
import {Fonts} from '@utils/Constants';
import AnimatedHeader from './AnimatedHeader';

const NOTICE_HEIGHT = -(NoticeHeight + 12);

const ProductDashboard = () => {
  const {user, setUser} = useAuthStore();
  const noticePosition = useRef(new RNAnimated.Value(NOTICE_HEIGHT)).current;

  const {scrollY, expand} = useCollapsibleContext();
  const previousScroll = useRef<number>(0);

  const backToTopStyle = useAnimatedStyle(() => {
    const isScrollingUp =
      scrollY.value < previousScroll.current && scrollY.value > 180;
    const opacity = withTiming(isScrollingUp ? 1 : 0, {duration: 300});
    const translateY = withTiming(isScrollingUp ? 0 : 10, {duration: 300});

    previousScroll.current = scrollY.value;

    return {
      opacity,
      transform: [{translateY}],
    };
  });

  const slideUp = () => {
    RNAnimated.timing(noticePosition, {
      toValue: NOTICE_HEIGHT,
      duration: 1200,
      useNativeDriver: false,
    }).start();
  };

  const slideDown = () => {
    RNAnimated.timing(noticePosition, {
      toValue: 0,
      duration: 1200,
      useNativeDriver: false,
    }).start();
  };

  useEffect(() => {
    const updateUser = () => {
      Geolocation.getCurrentPosition(
        postion => {
          const {latitude, longitude} = postion.coords;
          reverseGeocode(latitude, longitude, setUser);
        },
        err => console.log(err),
        {
          enableHighAccuracy: false,
          timeout: 15000,
        },
      );
    };
    // slideDown();
    // slideUp();
    updateUser();
  }, []);

  return (
    <NoticeAnimation noticePosition={noticePosition}>
      <>
        <Visual />
        <SafeAreaView />

        <Animated.View style={[styles.backToTopButton, backToTopStyle]}>
          <TouchableOpacity
            onPress={() => {
              scrollY.value = originalXMLHttpRequest;
              expand();
            }}
            style={{flexDirection: 'row', alignItems: 'center', gap: 6}}>
            <Icon
              name="arrow-up-circle-outline"
              color="white"
              size={RFValue(12)}
            />
            <CustomText
              variant="h9"
              style={{color: 'white'}}
              fontFamily={Fonts.SemiBold}>
              Back to top
            </CustomText>
          </TouchableOpacity>
        </Animated.View>

        <CollapsibleContainer style={styles.panelContainer}>
          <CollapsibleHeaderContainer containerStyle={styles.transparent}>
            <AnimatedHeader />
          </CollapsibleHeaderContainer>
        </CollapsibleContainer>
      </>
    </NoticeAnimation>
  );
};

export default withCollapsibleContext(ProductDashboard);

const styles = StyleSheet.create({
  panelContainer: {
    flex: 1,
  },
  transparent: {
    backgroundColor: 'transparent',
  },
  backToTopButton: {
    position: 'absolute',
    alignSelf: 'center',
    top: Platform.OS === 'ios' ? screenHeight * 0.18 : 100,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'black',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    zIndex: 999,
  },
});
