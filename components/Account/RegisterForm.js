
import React, {useState} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button, Input, Icon } from 'react-native-elements'
import { size } from 'lodash';
import { useNavigation} from '@react-navigation/native'

import { validateEmail } from '../../utils/helpers';
import {registerUser, closeSesion} from '../../utils/actions'
import Loading from '../Loading';

export default function RegisterForm() {
    const [showPassword, setShowPassword]= useState(false);
    const [formData, setFormData]= useState(defaultFormValue());
    const[errorEmail, setErrorEmail]=useState("")
    const[errorPassword, setErrorPassword]=useState("")
    const[errorConfirm, setErrorConfirm]=useState("")
    const [loading, setLoading] = useState(false)
    const navigation = useNavigation()

    const onChange = (e, type) => {
        setFormData({...formData, [type]: e.nativeEvent.text})    
    }
    const doRegisterUser =  async() => {
        if(!validateData()){
            return;
        }

        setLoading(true)
        const result = await registerUser(formData.email, formData.password)
        setLoading(false)
        if(!result.statusResponse){
            setErrorEmail(result.error);
            return;
        }
        navigation.navigate("accounts");
    }
    const validateData =() => {
        setErrorConfirm("");
        setErrorEmail("");
        setErrorPassword("");
        let isValid = true;

        if(!validateEmail(formData.email)){
            setErrorEmail("Debes de ingresar un email valido.")
            isValid=false;

        }
        if(size(formData.password)<6){
            setErrorConfirm("Debes de ingresar una contraseña de al menos seis")
            isValid=false;
        }
        if(size(formData.confirm)<6){
            setErrorPassword("Debes de ingresar una confirmacion de contraseña de al menos seis")
            
            isValid=false;
        }

        if(formData.password !== formData.confirm){
            setErrorPassword("La contraseña y la confirmacion no son iguales")
            setErrorConfirm("La contraseña y la confirmacion no son iguales")
        }
        return isValid
    }

    return (
        <View style={styles.form}>
            <Input
                containerStyle={styles.input}
                placeholder="Ingresa tu email..."
                onChange={(e) => onChange(e,"email")}
                keyboardType="email-address"
                errorMessage={errorEmail}
                defaultValue={formData.email}
            />
            <Input
                containerStyle={styles.input}
                placeholder="Ingresa tu contraseña..."
                password={true}
                secureTextEntry={!showPassword}
                onChange={(e) => onChange(e,"password")}
                rightIcon={
                    <Icon
                        type="material-community"
                        name={showPassword ? "eye-off-outline":"eye-outline"}
                        iconStyle={styles.icon}
                        onPress={()=>setShowPassword(!showPassword)}
                    />
                }
                errorMessage={errorPassword}
                defaultValue={formData.password}
            />
            <Input
                containerStyle={styles.input}
                placeholder="Confirma tu contraseña..."
                password={true}
                secureTextEntry={!showPassword}
                onChange={(e) => onChange(e,"confirm")}
                rightIcon={
                    <Icon
                        type="material-community"
                        name={showPassword ? "eye-off-outline":"eye-outline"}
                        iconStyle={styles.icon}
                        onPress={()=>setShowPassword(!showPassword)}
                    />
                }
                errorMessage={errorConfirm}
                defaultValue={formData.confirm}
            />
            <Button
                title="Registrar"
                containerStyle={styles.btnContainer}
                buttonStyle={styles.btn}
                onPress={() => doRegisterUser()}
            />
            <Loading
                isVisible={loading}
                text="Creando Cuenta..."
            />
        </View>
    )
}

const defaultFormValue = () => {
    return {email : "", passwor: "",  confirm: ""}
}

const styles = StyleSheet.create({

form:{
    marginTop:30
},
input:{
    width:"100%"
},
btnContainer:{
    marginTop:20,
    width:"95%",
    alignSelf:"center"
},
btn :{
    backgroundColor: "#6cbc94"
},
icon: {
    color: "#c1c1c1"
}
})
