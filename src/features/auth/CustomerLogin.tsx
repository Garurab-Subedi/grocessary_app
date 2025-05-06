import CustomerSafeAreaView from '@components/global/CustomerSafeAreaView'
import ProductSlider from '@components/login/ProductSlider'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'


function CustomerLogin() {
  return (
   <GestureHandlerRootView style={styles.container}>
           <View style={styles.container}>
            <CustomerSafeAreaView>
                <ProductSlider />
            </CustomerSafeAreaView>
           </View>
       </GestureHandlerRootView>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})


export default CustomerLogin

