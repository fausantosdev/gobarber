import React, {useState, useEffect} from 'react'
import {Platform, RefreshControl} from 'react-native'
import {useNavigation} from '@react-navigation/native'
import {
  Container,
  Scroller,
  HeaderArea,
  HeaderTitle,
  SearchButton,
  LocationArea,
  LocationFinder,
  LocationInput,
  LoadingIcon,
  ListArea,
} from './styles'

import {request, PERMISSIONS} from 'react-native-permissions'
import Geolocation from '@react-native-community/geolocation'

import SearchIcon from '../../assets/images/svg/search.svg'
import MyLocationIcon from '../../assets/images/svg/my_location.svg'

import BarberItem from '../../components/BarberItem'

import api from '../../services/api'

export default () => {
  const [locationText, setLocationText] = useState('')
  const [loading, setLoading] = useState(false)
  const [list, setList] = useState([])
  const [refreshing, setRefreshing] = useState(false)
  const [coords, setCoords] = useState(null)

  const navigation = useNavigation()

  const handleLocationFinder = async () => {
    setCoords(null)

    let result = await request(
      Platform.OS === 'ios'
        ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
        : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
    )

    if (result === 'granted') {
      setLoading(true)
      setLocationText('')
      setList([])

      Geolocation.getCurrentPosition(info => {
        setCoords(info.coords)

        getBarbers()
      })
    }
  }

  const getBarbers = async () => {
    setLoading(true)
    setList([])

    let lat = null
    let lng = null

    if (coords) {
      lat = coords.latitude
      lng = coords.longitude
    }

    let result = await api.getBarbers(lat, lng, locationText)

    if (result.error === '') {
      if (result.loc) {
        setLocationText(result.loc)
      }
      setList(result.data)
    } else {
      alert(`Ops: ${result.error}`)
    }
    setLoading(false)
  }

  useEffect(() => {
    getBarbers()
  }, [])

  const onRefresh = () => {
    setRefreshing(false)
    getBarbers()
  }

  const handleLocationSearch = () => {
    setCoords({})
    getBarbers()
  }

  return (
    <Container>
      <Scroller
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <HeaderArea>
          <HeaderTitle numberOfLines={2}>
            Encontre o seu barbeiro favorito
          </HeaderTitle>

          <SearchButton onPress={() => navigation.navigate('Search')}>
            <SearchIcon width={26} height={26} fill="#ffffff" />
          </SearchButton>
        </HeaderArea>

        <LocationArea>
          <LocationInput
            placeholder="Onde você está?"
            placeholderTextColor="#ffffff"
            value={locationText}
            onChangeText={text => setLocationText(text)}
            onEndEditing={handleLocationSearch}
          />
          <LocationFinder onPress={handleLocationFinder}>
            <MyLocationIcon width={24} height={24} fill="#ffffff" />
          </LocationFinder>
        </LocationArea>

        {loading && <LoadingIcon size="large" color="#ffffff" />}

        <ListArea>
          {list.map((item, key) => (
            <BarberItem key={key} data={item} />
          ))}
        </ListArea>
      </Scroller>
    </Container>
  )
}
