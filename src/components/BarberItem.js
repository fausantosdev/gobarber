import React from 'react'
import styled from 'styled-components/native'
import {useNavigation} from '@react-navigation/native'

import Stars from './Stars'

export default ({data}) => {
  const navigarion = useNavigation()

  const handleClick = () => {
    navigarion.navigate('Barber', {
      id: data.id,
      avatar: data.avatar,
      name: data.name,
      stars: data.stars,
    })
  }

  return (
    <Area onPress={handleClick}>
      <Avatar source={{uri: data.avatar}} />
      <InfoArea>
        <TxtUsername>{data.name}</TxtUsername>

        <Stars stars={data.stars} showNumber={true} />

        <BtnShowProfile>
          <TxtShowProfile>Ver Perfil</TxtShowProfile>
        </BtnShowProfile>
      </InfoArea>
    </Area>
  )
}

const Area = styled.TouchableOpacity`
  background-color: #ffffff;
  margin-bottom: 20px;
  border-radius: 20px;
  padding: 15px;
  flex-direction: row;
`

const Avatar = styled.Image`
  width: 88px;
  height: 88px;
  border-radius: 20px;
`

const InfoArea = styled.View`
  margin-left: 20px;
  justify-content: space-between;
`

const TxtUsername = styled.Text`
  font-size: 17px;
  font-weight: bold;
`

const BtnShowProfile = styled.View`
  width: 85px;
  height: 26px;
  border: 1px solid #4eadbe;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
`

const TxtShowProfile = styled.Text`
  font-size: 13px;
  color: #268596;
`
