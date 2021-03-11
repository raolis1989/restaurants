import React from 'react'
import { ScrollView, StyleSheet, Text, View, Image } from 'react-native'
import { Divider } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'

export default function Login() {
    return (
        <ScrollView>
            <Image
             source={require("../../assets/logo.png")}
             resizeMode="contain"
             style={styles.image}
            />
            <View style={styles.container}>
                <Text>Login</Text>
                <CreateAccount/>
            </View>
            <Divider style={styles.divider}/>
        </ScrollView>
    )
}
function CreateAccount(props){
    const navigation = useNavigation()
    return (
        <Text 
            style={styles.register}
            onPress={() =>navigation.navigate("register")}
        >
            No tienes cuenta?{" "} 
            <Text style={styles.linkRegister}>
                 Registrate
            </Text>
        </Text>
    )
}

const styles = StyleSheet.create({
    image:{
        height:150,
        width:"100%",
        marginBottom:20
    },
    container: {
        marginHorizontal:40
    },
    divider:{
        backgroundColor: "#d8b45c",
        margin: 40
    },
    register:{
        marginTop:15,
        marginHorizontal:10,
        alignSelf:"center"
    },
    linkRegister:{
        color:"#6cbc94",
        fontWeight:"bold"
    }

    

})
