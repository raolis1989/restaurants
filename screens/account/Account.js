import React, {useState, useEffect} from 'react'
import { StyleSheet} from 'react-native'

import UserGuest from './UserGuest';
import UserLogged from './UserLogged';
import Loading from '../../components/Loading';
import { isUserLogged } from '../../utils/actions';


export default function Account(){
    const [login, setLogin] = useState(null)

    useEffect(() => {
        setLogin(isUserLogged())
    }, [])

    if(login == null){
        return <Loading isVisible={true} text="Cargando..." />
    }

    return login ? <UserLogged/>:<UserGuest/>
}

const styles = StyleSheet.create({})


