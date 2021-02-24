import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import UserGuest from './UserGuest';
import UserLogged from './UserLogged';

import {firebaseApp} from '../../utils/firebase';
import * as firebase from 'firebase';
import 'firebase/firestore';

export default function Account() {
    const [login, setLogin] = useState(null);

    useEffect(()=>{
        firebase.auth().onAuthStateChanged((user) =>{
            user !== null ? (setLogin(false)) : setLogin(true);
    }, []);
    }, [])

    if(login == null){
        return <Text>Cargando...</Text>
    }

    return login ? <UserLogged/> : <UserGuest/>
}

const styles = StyleSheet.create({})
