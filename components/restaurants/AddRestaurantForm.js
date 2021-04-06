import React, {useState, useEffect } from 'react'
import { StyleSheet, Text, View, ScrollView, Alert, Dimensions } from 'react-native'
import {  Avatar, Button, Icon, Input, Image  } from 'react-native-elements'
import CountryPicker from 'react-native-country-picker-modal'
import {map, size, filter} from 'lodash'
import { getCurrentLocation, loadImageFromGallery } from '../../utils/helpers'
import Modal from '../../components/Modal'
import MapView from 'react-native-maps'


const widthScreen = Dimensions.get("window").width
const width = Dimensions.get('window').width
const height= Dimensions.get('window').height

export default function AddRestaurantForm({toastRef, setLoading, navigation}) {
    const [formData, setFormData] = useState(defaultFormValues())
    const [errorName, setErrorName] = useState(null)
    const [errorDescription, setErrorDescription] = useState(null)
    const [errorEmail, setErrorEmail] = useState(null)
    const [errorAddress, setErrorAddress] = useState(null)
    const [errorPhone, setErrorPhone] = useState(null)
    const [imagesSelected, setImagesSelected] = useState([])
    const [isVisibleMap, setIsVisibleMap]= useState(false)
    const [locationRestaurant, setLocationRestaurant]= useState(null)
    const addRestaurant = () => {
        console.log(formData);
        console.log("Hola restaurant");
    }
    
    return (
        <ScrollView  style= {styles.viewContainer}>
            <ImageRestaurant
                imageRestaurant={imagesSelected[0]}
            />
            <FormAdd
                formData={formData}
                setFormData={setFormData}
                errorName={errorName}
                errorDescription={errorDescription}
                errorEmail= {errorEmail}
                errorAddress={errorAddress}
                errorPhone={errorPhone}
                setIsVisibleMap={setIsVisibleMap}

            />
            <UploadImage
                toastRef={toastRef}
                imagesSelected= {imagesSelected}
                setImagesSelected={setImagesSelected}
            />
            <Button
                title="Crear Restaurant"
                onPress={addRestaurant}
                buttonStyle={styles.btnAddRestaurant}
            />
            <MapRestaurant
                isVisibleMap={isVisibleMap}
                setIsVisibleMap={setIsVisibleMap}
                locationRestaurant={locationRestaurant}
                setLocationRestaurant={setLocationRestaurant}
                toastRef={toastRef}
            />
        </ScrollView>
    )
}

function MapRestaurant({isVisibleMap, setIsVisibleMap, locationRestaurant, setLocationRestaurant, toastRef}){

    useEffect(() => {
        (async() => {
            const response = await getCurrentLocation()
            if (response.status) {
                console.log(response.location);
                setLocationRestaurant(response.location)
            }
        })()
    }, [])


    
    return(
        <Modal
            isVisible={isVisibleMap}
            setVisible={setIsVisibleMap}
            >
                <View>
                    {
                        locationRestaurant && (
                            <MapView
                                style={styles.mapStyle}
                                region={locationRestaurant}
                                showsUserLocation
                            >
                                 <MapView.Marker
                                    coordinate={{
                                        latitude: locationRestaurant.latitude,
                                        longitude: locationRestaurant.longitude
                                    }}
                                    draggable
                                     />
   
                            </MapView>
                        )
                    }
                    <View style={styles.viewMapBtn}>
                        <Button
                            title="Guardar"
                            containerStyle={styles.viewMapBtnContainerSave}
                            buttonStyle={styles.viewMapBtnSave}
                        />
                        <Button
                            title="Cancelar"
                            containerStyle={styles.viewMapBtnContainerCancel}
                            buttonStyle={styles.viewMapBtnCancel}
                        />
                    </View>
                </View>
        </Modal>
    )
}

function ImageRestaurant({ imageRestaurant }) {
    return (
        <View style={styles.viewPhoto}>
            <Image
                style={{ width: widthScreen, height: 200}}
                source={
                    imageRestaurant
                        ? { uri: imageRestaurant}
                        : require("../../assets/no-image.png")
                }
            />
        </View>
    )
}

function UploadImage({toastRef, imagesSelected, setImagesSelected}) {
    const imageSelect = async() => {
        const response = await  loadImageFromGallery([4,3])
        if(!response.status){
            toastRef.current.show("Error al grabar el restaurante, por favor intenta más tarde.", 3000)
            return
        }
        setImagesSelected([...imagesSelected, response.image]);
    }
    const removeImage =(image) => {
        Alert.alert(
            "Eliminar Imagen",
            "estas seguro que quieres eliminar la imagen",
            [
                {
                    text:"No",
                    style:"cancel"
                },
                {
                    text:"Si",
                    onPress:() => {
                        setImagesSelected(
                            filter(imagesSelected, (imageUrl) => imageUrl !== image)
                        )
                    }
                }
            ],
            {
                cancelable: true
            }
        )
    }


    return (
        <ScrollView
            horizontal
            style={styles.viewImages}
        >
            {
                size(imagesSelected)<10 &&(
                    <Icon
                        type="material-community"
                        name="camera"
                        color="#7a7a7a"
                        containerStyle={styles.containerIcon}
                        onPress={imageSelect}
                    />
                )
            }
            {
            map(imagesSelected, (imageRestaurant, index) =>(
                <Avatar
                    key={index}
                    style={styles.miniatureStyle}
                    source={{uri: imageRestaurant}}
                    onPress={() => removeImage(imageRestaurant)}
                />
            ))
            }                
        </ScrollView>
    )
}

function FormAdd({formData, setFormData, errorName, errorDescription, errorEmail, errorAddress, errorPhone, setIsVisibleMap}){
    const [country, setCountry]= useState("CO")
    const [callingCode, setCallingCode] = useState("+56")
    const [phone, setPhone] = useState("")

    const onChange =(e, type)=> {
        setFormData({...formData, [type]: e.nativeEvent.text})
    }
    return (
        <View style={styles.viewForm}>
            <Input
                placeholder="Nombre del restaurant"
                defaultValue={formData.name}
                onChange={(e) => onChange(e,"name")}
                errorMessage={errorName}
            />
            <Input
                placeholder="Direccion del restaurant"
                defaultValue={formData.address}
                onChange={(e) => onChange(e,"address")}
                errorMessage={errorAddress}
                rightIcon={{
                    type:"material-community",
                    name:"google-maps",
                    color:"#c2c2c2",
                    onPress:() => setIsVisibleMap(true)
                }}

            />
            <Input
                keyboardType="email-address"
                placeholder="Email del restaurant"
                defaultValue={formData.email}
                onChange={(e) => onChange(e,"email")}
                errorMessage={errorEmail}
            />
            <View style={styles.phoneView}>
                <CountryPicker
                    withFlag
                    withCallingCode
                    withFilter
                    withCallingCodeButton
                    containerButtonStyle={styles.countryPicker}
                    countryCode={country}
                    onSelect={(country) => { 
                        setFormData({...formData, "country":country.cca2, "callingCode": country.callingCode[0]})
                        setCountry(country.cca2)
                        setCallingCode(country.callingCode[0])
                    }}
                />
                <Input
                    placeholder="WhatsApp del restaurant..."
                    keyboardType="phone-pad"
                    containerStyle={styles.inputPhone}
                    defaultValue={formData.phone}
                    onChange={(e) => onChange(e,"phone")}
                    errorMessage={errorPhone}
                />
            </View>
            <Input
                    placeholder="Descripcion del restaurant..."
                    multiline
                    containerStyle={styles.textArea}
                    defaultValue={formData.description}
                    onChange={(e) => onChange(e,"description")}
                    errorMessage={errorDescription}
                />
        </View>
    )
}

const defaultFormValues = () => {
    return {
        name:"",
        description:"",
        phone:"",
        country:"CO",
        callingCode:"56"
    }
}


const styles = StyleSheet.create({
    viewContainer:{
        height:"100%"
    },
    viewForm:{
        marginHorizontal:10,
    },
    textArea:{
        height:100,
        width:"100%"
    },
    phoneView:{
        width: "80%",
        flexDirection: "row"
    },
    inputPhone:{
        width: "80%",
    },
    btnAddRestaurant:{
        margin:20,
        backgroundColor:"#6cbc94"
    },
    viewImages:{
        flexDirection:"row",
        marginHorizontal:20,
        marginTop: 30
    },
    containerIcon:{
        alignItems: "center",
        justifyContent:"center",
        marginRight:10,
        height:70,
        width:70,
        backgroundColor:"#e3e3e3"
    },
    miniatureStyle :{
        width:70,
        height:70,
        marginRight:10
    },
    viewPhoto:{
        alignItems:"center",
        height:200,
        marginBottom:20
    },
    containerMap:{
        flex:1
    },
    mapStyle:{
        width:"100%",
        height:550
    },
    viewMapBtn:{
        flexDirection:"row",
        justifyContent:"center",
        marginTop: 10
    },
    viewMapBtnContainerCancel: {
        paddingLeft:5
    },
    viewMapBtnContainerSave:{
        paddingRight:5
    },
    viewMapBtnCancel:{
        backgroundColor:"#FF583B"
    },
    viewMapBtnSave:{
        backgroundColor:"#6cbc94"
    }

})
