import React, {useContext} from 'react'
import styled from 'styled-components/native'

import HomeIcon from '../assets/images/svg/home.svg'
import SearchIcon from '../assets/images/svg/search.svg'
import TodayIcon from '../assets/images/svg/today.svg'
import FavoriteIcon from '../assets/images/svg/favorite.svg'
import AccountIcon from '../assets/images/svg/account.svg'

import {UserContext} from '../contexts/UserContext'

export default ({state, navigation}) => {
  const {state: userState} = useContext(UserContext)

  const goTo = screenName => {
    navigation.navigate(screenName)
  }

  return (
    <TabArea>
      <TabItem onPress={() => goTo('Home')}>
        <HomeIcon
          style={{opacity: state.index === 0 ? 1 : 0.5}}
          width={24}
          height={24}
          fill="#ffffff"
        />
      </TabItem>
      <TabItem onPress={() => goTo('Search')}>
        <SearchIcon
          style={{opacity: state.index === 1 ? 1 : 0.5}}
          width={24}
          height={24}
          fill="#ffffff"
        />
      </TabItem>
      <TabItemCenter onPress={() => goTo('Appointments')}>
        <TodayIcon width={32} height={32} fill="#4eadbe" />
      </TabItemCenter>
      <TabItem onPress={() => goTo('Favorites')}>
        <FavoriteIcon
          style={{opacity: state.index === 3 ? 1 : 0.5}}
          width={24}
          height={24}
          fill="#ffffff"
        />
      </TabItem>
      <TabItem onPress={() => goTo('Profile')}>
        {userState.avatar != '' ? (
          <AccountIcon source={{uri: userState.avatar}} />
        ) : (
          <AccountIcon
            style={{opacity: state.index === 4 ? 1 : 0.5}}
            width={24}
            height={24}
            fill="#ffffff"
          />
        )}
      </TabItem>
    </TabArea>
  )
}

const TabArea = styled.View`
  height: 60px;
  background-color: #4eadbe;
  flex-direction: row;
`

const TabItem = styled.TouchableOpacity`
  flex: 1;
  justify-content: center;
  align-items: center;
`

const TabItemCenter = styled.TouchableOpacity`
  width: 70px;
  height: 70px;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
  border-radius: 35px;
  border: 3px solid #4eadbe;
  margin-top: -20px;
`

const AvatarIcon = styled.Image`
  width: 24px;
  height: 24px;
  border-radius: 12px;
`
