import React, {useState, useContext} from 'react'
import {useNavigation} from '@react-navigation/native'
import {
  Container,
  InputArea,
  CusconButton,
  CustonButtonText,
  SignMessageButton,
  SignMessageButtonText,
  SignMessageButtonTextBold,
} from './styles'
import AsyncStorage from '@react-native-async-storage/async-storage'

import SignInput from '../../components/SignInput'

import BarberLogo from '../../assets/images/svg/barber.svg'
import EmailIcon from '../../assets/images/svg/email.svg'
import LockIcon from '../../assets/images/svg/lock.svg'
import PersonIcon from '../../assets/images/svg/person.svg'

import api from '../../services/api'

import {UserContext} from '../../contexts/UserContext'

export default () => {
  const {dispatch: userDispatch} = useContext(UserContext)

  const navigation = useNavigation()

  const [nameField, setNameField] = useState('')
  const [emailField, setEmailField] = useState('')
  const [passwordField, setPasswordField] = useState('')

  const handleSignUp = async () => {
    // Use Yup
    if (nameField != '' && emailField != '' && passwordField != '') {
      let res = await api.signUp(nameField, emailField, passwordField)

      if (res.token) {
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
        alert('Error: ' + res.error)
      }
    } else {
      alert('Preencha os campos corretamente!')
    }
  }

  const handleSignInScreen = () => {
    navigation.reset({
      routes: [{name: 'SignIn'}],
    })
  }

  return (
    <Container>
      <BarberLogo width="100%" height="160" />
      <InputArea>
        <SignInput
          IconSvg={PersonIcon}
          placeholder="Digite seu nome"
          value={nameField}
          onChangeText={text => setNameField(text)}
        />
        <SignInput
          IconSvg={EmailIcon}
          placeholder="Digite seu e-mail"
          value={emailField}
          onChangeText={text => setEmailField(text)}
        />
        <SignInput
          IconSvg={LockIcon}
          placeholder="Digite sua senha"
          value={passwordField}
          onChangeText={text => setPasswordField(text)}
          password={true}
        />

        <CusconButton onPress={handleSignUp}>
          <CustonButtonText>Cadastrar</CustonButtonText>
        </CusconButton>
      </InputArea>

      <SignMessageButton onPress={handleSignInScreen}>
        <SignMessageButtonText>Já possue uma conta? </SignMessageButtonText>
        <SignMessageButtonTextBold>Faça login.</SignMessageButtonTextBold>
      </SignMessageButton>
    </Container>
  )
}
