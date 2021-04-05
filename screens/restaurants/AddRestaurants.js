import React, {useRef, useState} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import AddRestaurantForm from '../../components/restaurants/AddRestaurantForm'
import Toast from 'react-native-easy-toast'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Loading from '../../components/Loading'

export default function AddRestaurants({navigation}) {
    const toastRef = useRef();
    const [loading, setLoading]=useState(false);
    return (
        <View>
            <AddRestaurantForm 
                toastRef={toastRef} 
                setLoading={setLoading}
                navigation= {navigation}/>
            <Loading isVisible={loading} text="Creando Restaurant..."/>
            <Toast ref={toastRef} position="center" opacity={0.9}/>
        </View>
    )
}

const styles = StyleSheet.create({})
