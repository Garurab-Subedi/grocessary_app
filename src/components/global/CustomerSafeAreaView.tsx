import { FC, ReactNode } from "react";
import { SafeAreaView, StyleSheet, View, ViewStyle } from "react-native";


interface CustomerSafeAreaViewProps{
    children: ReactNode,
    style?: ViewStyle
}

const CustomerSafeAreaView:FC<CustomerSafeAreaViewProps>= ({children, style}) =>{
    return(
        <SafeAreaView style={[styles.container, style]}>
           <View style={styles.container}>
            <SafeAreaView />
            {children}
        </View>
        </SafeAreaView> 
    )
}

export default CustomerSafeAreaView;

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#fff'
    }
})