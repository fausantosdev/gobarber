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

import api from '../../services/api'

import {UserContext} from '../../contexts/UserContext'

export default () => {
  const {state: userState, dispatch: userDispatch} = useContext(UserContext)

  const navigation = useNavigation()

  const [emailField, setEmailField] = useState('')
  const [passwordField, setPasswordField] = useState('')

  const handleSignIn = async () => {
    // Yup*
    if (emailField != '' && passwordField != '') {
      let res = await api.signIn(emailField, passwordField)

      if (res.token) {
        //console.warn(res.data.avatar)
        await AsyncStorage.setItem('AppBarberToken', res.token)

        userDispatch({
          // O erro é aqui!?
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
        alert('E-mail e/ou senha errados!')
      }
    } else {
      alert('Preencha os campos corretamente!')
    }
  }

  const handleSignUpScreen = () => {
    navigation.reset({
      routes: [{name: 'SignUp'}],
    })
  }

  return (
    <Container>
      <BarberLogo width="100%" height="160" />
      <InputArea>
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

        <CusconButton onPress={handleSignIn}>
          <CustonButtonText>LOGIN</CustonButtonText>
        </CusconButton>
      </InputArea>

      <SignMessageButton onPress={handleSignUpScreen}>
        <SignMessageButtonText>
          Ainda não possue uma conta?{' '}
        </SignMessageButtonText>
        <SignMessageButtonTextBold>Cadastre-se.</SignMessageButtonTextBold>
      </SignMessageButton>
    </Container>
  )
}
