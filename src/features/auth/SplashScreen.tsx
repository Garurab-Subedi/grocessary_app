import React, { FC, useEffect } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { Colors } from '@utils/Constants'
import Logo from '@assets/images/logo.jpeg'
import { screenHeight, screenWidth } from '@utils/Scaling'
import { navigate } from '@utils/NavigationUtils'


const SplashScreen:FC = () => {

    useEffect(() => {

        const navigateUser=async() =>{
            try {
                navigate("CustomerLogin")
            } catch (error) {
                
            }
        }


        const timeoutId = setTimeout(navigateUser, 1000)
        return () => clearTimeout(timeoutId)
    }, [])

  return (
    <View style={styles.container}>
        <Image source={Logo} style={styles.logoImage} />
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:Colors.primary,
        flex: 1,
        justifyContent:'center',
        alignItems:'center'
    },
    logoImage:{
        height: screenHeight * 0.7,
        width: screenWidth * 0.7,
        resizeMode: 'contain'
    }
})
export default SplashScreen