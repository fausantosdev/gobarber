import AsyncStorage from '@react-native-async-storage/async-storage'
import {add} from 'react-native-reanimated'

const BASE_URL = ''

export default {
  checkToken: async token => {
    const result = await fetch(`${BASE_URL}/auth/refresh`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({token}),
    })

    const json = await result.json()

    return json
  },

  signIn: async (email, password) => {
    try {
      const result = await fetch(`${BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({email, password}),
      })

      const json = await result.json()

      return json
    } catch (error) {
      return error
    }
  },

  signUp: async (name, email, password) => {
    const result = await fetch(`${BASE_URL}/user`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({name, email, password}),
    })

    const json = await result.json()

    return json
  },

  logout: async () => {
    const token = await AsyncStorage.getItem('AppBarberToken')

    const result = await fetch(`${BASE_URL}/auth/logout`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({token}),
    })

    const json = await result.json()

    return json
  },

  getBarbers: async (lat = null, lng = null, address = null) => {
    const token = await AsyncStorage.getItem('AppBarberToken')
    const result = await fetch(
      `${BASE_URL}/barbers?token=${token}&lat=${lat}&lng=${lng}&address=${address}`,
    )

    const json = await result.json()

    return json
  },

  getBarber: async id => {
    const token = await AsyncStorage.getItem('AppBarberToken')
    const result = await fetch(`${BASE_URL}/barber/${id}?token=${token}`)

    const json = await result.json()

    return json
  },

  setFavorite: async id => {
    const token = await AsyncStorage.getItem('AppBarberToken')

    const result = await fetch(`${BASE_URL}/user/favorite`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({token, barber: id}),
    })

    const json = await result.json()

    return json
  },

  setAppointment: async (
    userId,
    service,
    selectedYear,
    selectedMonth,
    selectedDay,
    selectedHour
  ) => {
    const token = await AsyncStorage.getItem('AppBarberToken')

    const result = await fetch(`${BASE_URL}/user/appointment`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token,
        id: userId,
        service,
        year: selectedYear,
        month: selectedMonth,
        day: selectedDay,
        hour: selectedHour
      }),
    })

    const json = await result.json()

    return json
  }
}
