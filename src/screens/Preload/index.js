import React, {useEffect, useContext} from 'react'
import {Text} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {useNavigation} from '@react-navigation/native'

import {Container, LoadingIcon} from './styles'

import BarberLogo from '../../assets/images/svg/barber.svg'

import api from '../../services/api'

import {UserContext} from '../../contexts/UserContext'

export default () => {
  const {dispatch: userDispatch} = useContext(UserContext)

  const navigation = useNavigation()

  useEffect(() => {
    const checktoken = async () => {
      const token = await AsyncStorage.getItem('AppBarberToken')

      if (token) {
        let res = await api.checkToken(token)

        if (res.token) {
          //navigation.navigate('SignIn')
          await AsyncStorage.setItem('AppBarberToken', res.token)

          userDispatch({
            type: 'setAvatar',
            payload: {
              avatar: res.data.avatar,
            },
          })

          navigation.reset({
            routes: [
              {
                name: 'MainTab',
              },
            ],
          })
        } else {
          navigation.navigate('SignIn')
        }
      } else {
        navigation.navigate('SignIn')
      }
    }

    checktoken()
  }, [])

  return (
    <Container>
      <BarberLogo width="100%" height="160" />
      <LoadingIcon size="large" color="#ffffff" />
    </Container>
  )
}
