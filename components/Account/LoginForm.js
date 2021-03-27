import React, {useState}from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button, Input, Icon } from 'react-native-elements'
import Loading from '../Loading';
import { useNavigation} from '@react-navigation/native'

import { validateEmail } from '../../utils/helpers';
import { loginWithEmailAndPassword } from '../../utils/actions';
import { isEmpty } from 'lodash';

export default function LoginForm() {
    const [showPassword, setShowPassword]= useState(false);
    const [formData, setFormData]= useState(defaultFormValue());
    const[errorEmail, setErrorEmail]=useState("")
    const[errorPassword, setErrorPassword]=useState("")
    const [loading, setLoading] = useState(false)

    const navigation = useNavigation()

    const onChange = (e, type) => {
        setFormData({...formData, [type]: e.nativeEvent.text})    
    }

    const doLogin = async ()=>{
        if(!validateData()){
            return;
        }

        setLoading(true)
        const result = await  loginWithEmailAndPassword(formData.email, formData.password)
        setLoading(false)
        if(!result.statusResponse){
            setErrorEmail(result.error);
            setErrorPassword(result.error);
            return;
        }
        navigation.navigate("accounts");
    }
    
    const validateData =() => {
        setErrorEmail("");
        setErrorPassword("");
        let isValid = true;

        if(!validateEmail(formData.email)){
            setErrorEmail("Debes de ingresar un email valido.")
            isValid=false;
        }

        if(isEmpty(formData.password)){
            setErrorPassword("Debes de ingresar tu contraseña.")
            isValid=false;
        }
        return isValid
    }


    return (
        <View style={styles.container}>
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
            <Button
                title="Iniciar Sesion"
                containerStyle={styles.btnContainer}
                buttonStyle={styles.btn}
                onPress={() => doLogin()}
            />
            <Loading
                isVisible={loading}
                text="Iniciando Sesion..."
            />
        </View>
    )
}

const defaultFormValue = () => {
    return {email : "", passwor: "",}
}

const styles = StyleSheet.create({

    container:{
        flex:1,
        alignContent:"center",
        justifyContent:"center",
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
