import React from 'react'
import { StyleSheet, Text, View, ScrollView, Image } from 'react-native'
import {Button} from 'react-native-elements';


export default function UserGuest() {
    return (
        <ScrollView
            centerContent
            style={styles.viewBody}
        >
            <Image
                source={require("../../assets/logo.png")}
                resizeMode="contain"
                style={styles.image}
            />
            <Text style={styles.title}>Consulta tu perfil en Restaurants</Text>
            <Text style={styles.description}>Busca y visualiza los mejores restaurantes de una forma 
                sencilla, vota cual te ha gustado mas y comenta como ha sido tu experiencia.</Text>
            <Button
            buttonStyle={styles.button}
            title="Ver tu perfil"
            onPress={()=> console.log("Click!!")}/>
        </ScrollView>
    )
}

const styles = StyleSheet.create({

    viewBody: {
        marginHorizontal:50
    },
    image:{
        height:300,
        width:"100%",
        marginBottom: 10,
        textAlign:"center"
    },
    title:{
        fontWeight:"bold",
        fontSize: 19,
        marginBottom: 10,
        textAlign:"center"
    },
    description:{
        textAlign:"justify",
        marginBottom:20,
        color:"#ffb41c"
    }, 
    button:{
        backgroundColor: "#6cbc94"
    }
})
