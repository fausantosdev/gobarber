import React from 'react'
import {Text, Button} from 'react-native'
import {Container} from './styles'
import {useNavigation} from '@react-navigation/native'

import api from '../../services/api'

export default () => {
  const navigation = useNavigation()

  const handleLogout = async () => {
    await api.logout()
    navigation.reset({
      routes: [{name: 'SignIn'}],
    })
  }

  return (
    <Container>
      <Text>Barber</Text>
      <Button title="Sair" onPress={handleLogout} />
    </Container>
  )
}
