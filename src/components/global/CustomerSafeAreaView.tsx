import { FC, ReactNode } from "react";
import { SafeAreaView, StyleSheet, View, ViewStyle } from "react-native";


interface CustomerSafeAreaViewProps{
    children: ReactNode,
    style?: ViewStyle
}

const CustomerSafeAreaView:FC<CustomerSafeAreaViewProps>= ({children, style}) =>{
    return(
        <View style={styles.container}>
            <SafeAreaView />
            {children}
        </View>
    )
}

export default CustomerSafeAreaView;

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#fff'
    }
})