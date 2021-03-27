import { map } from 'lodash';
import React, {useState} from 'react'
import {ListItem, icon, Icon} from 'react-native-elements'
import { StyleSheet, Text, View } from 'react-native'
import Modal from '../../components/Modal'
import ChangeDisplayNameForm from './ChangeDisplayNameForm';

export default function AccountOptions({user, toastRef, setReloadUser}) {
    
    const [showModal, setShowModal] = useState(false)
    const [renderComponent, setRenderComponent] = useState(null)

    const selectedComponent = (key => {
        switch (key) {
            case "displayName":
                setRenderComponent(
                   <ChangeDisplayNameForm
                    displayName={user.displayName}
                    setShowModal={setShowModal}
                    toastRef = {toastRef}
                    setReloadUser = {setReloadUser}
                   />
                )
                break;
            case "email":
                setRenderComponent(
                    <Text>email</Text>
                )
                break;
            case "password":
                setRenderComponent(
                    <Text>password</Text>
                )
                break;
        }
        setShowModal(true);
    })

    const generateOptions = () =>{
        return [
            {
                title: "Cambiar Nombres y Apellidos",
                iconNameLeft:"account-circle",
                iconColorLeft:"#6cbc94",
                iconNameRight:"chevron-right",
                iconColorRight:"#6cbc94",
                onPress: () => selectedComponent("displayName")
            },
            {
                title: "Cambiar Email",
                iconNameLeft:"at",
                iconColorLeft:"#6cbc94",
                iconNameRight:"chevron-right",
                iconColorRight:"#6cbc94",
                onPress: () => selectedComponent("email")
            },
            {
                title: "Cambiar Contraseña",
                iconNameLeft:"lock-reset",
                iconColorLeft:"#6cbc94",
                iconNameRight:"chevron-right",
                iconColorRight:"#6cbc94",
                onPress: () => selectedComponent("password")
            },
    
        ]
    }
    
    const menuOptions = generateOptions();
    return (
        <View>
            {
                map(menuOptions, (menu, index) => (
                    <ListItem
                        key={index}
                        style={styles.menuItem}
                        onPress={menu.onPress}
                    >
                        <Icon
                            type="material-community"
                            name={menu.iconNameLeft}
                            color={menu.iconColorLeft}
                        />
                        <ListItem.Content>
                            <ListItem.Title>{menu.title}</ListItem.Title>
                        </ListItem.Content>
                        <Icon
                            type="material-community"
                            name={menu.iconNameRight}
                            color={menu.iconColorRight}
                        />
                    
                    </ListItem>
                ))
            }
            <Modal
                isVisible={showModal}
                setVisible={setShowModal}
            >
                {
                    renderComponent
                }
            </Modal>
        </View>
    )
}







const styles = StyleSheet.create({

    menuItem:{
        borderBottomWidth: 1,
        borderBottomColor:"#6cbc94"
    }
})
