import React, {useState, useEffect} from 'react'

import {
  Container,
  Scroller,
  FakeSwiper,
  PageBody,
  UserInfoArea,
  SwipeDot,
  SwipeDotActive,
  SwipeItem,
  SwipeImage,
  UserAvatar,
  UserInfo,
  UserInfoName,
  UserInfoFavButtom,
  BackButton,
  LoadingIcon,
  ServiceArea,
  ServicesTitle,
  ServiceItem,
  ServiceInfo,
  ServiceName,
  ServicePrice,
  ServiceChooseButton,
  ServiceChooseBtnText,

  TestimonialArea,
  TestimonialItem,
  TestimonialInfo,
  TestimonialName,
  TestimonialBody

} from './styles'
import {useNavigation, useRoute} from '@react-navigation/native'
import Swiper from 'react-native-swiper'

import Starts from '../../components/Stars'
import BarberModal from '../../components/BarberModal'

import api from '../../services/api'

import FavoriteIcon from '../../assets/images/svg/favorite.svg'
import FavoriteFullIcon from '../../assets/images/svg/favorite_full.svg'
import BackIcon from '../../assets/images/svg/back.svg'
import NavPrevIcon from '../../assets/images/svg/nav_prev.svg'
import NavNextIcon from '../../assets/images/svg/nav_next.svg'

export default () => {
  const navigation = useNavigation()
  const route = useRoute()

  const [userInfo, setUserInfo] = useState({
    id: route.params.id,
    name: route.params.name,
    avatar: route.params.avatar,
    stars: route.params.stars,
  })
  const [loading, setLoading] = useState(false)
  const [favorited, setFavorited] = useState(false)
  const [selectedService, setSelectedService] = useState(null)
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    const getBarberInfo = async () => {
      setLoading(true)

      let result = await api.getBarber(userInfo.id)

      //console.log(result.data.available)

      if (result.error === '') {
        setUserInfo(result.data)
        setFavorited(result.data.favorited)
      } else {
        alert('Error: ' + result.error)
      }

      setLoading(false)
    }

    getBarberInfo()
  }, [])

  const handleBackButton = () => {
    navigation.goBack()
  }

  const handleFavorite = () => {
    setFavorited(!favorited)
    api.setFavorite(userInfo.id)
  }

  const handleServiceChoose = (key) => {
    setSelectedService(key)
    setShowModal(true)
  }

  return (
    <Container>
      <Scroller>
        {userInfo.photos && userInfo.photos.length > 0 ? (
          <Swiper
            style={{height: 240}}
            dot={<SwipeDot />}
            activeDot={<SwipeDotActive />}
            paginationStyle={{top: 15, right: 15, bottom: null, left: null}}
            loop={true}
            autoplay>
            {userInfo.photos.map((item, key) => (
              <SwipeItem key={key}>
                <SwipeImage source={{uri: item.url}} resizeMode="cover" />
              </SwipeItem>
            ))}
          </Swiper>
        ) : (
          <FakeSwiper />
        )}

        <PageBody>
          <UserInfoArea>
            <UserAvatar source={{uri: userInfo.avatar}} />
            <UserInfo>
              <UserInfoName>{userInfo.name}</UserInfoName>
              <Starts stars={userInfo.stars} showNumber={true} />
            </UserInfo>
            <UserInfoFavButtom onPress={handleFavorite}>
              {favorited ? (
                <FavoriteFullIcon width={26} height={26} fill="#ff0000" />
              ) : (
                <FavoriteIcon width={26} height={26} fill="#ff0000" />
              )}
            </UserInfoFavButtom>
          </UserInfoArea>
          {loading && <LoadingIcon size="large" color="#000000" />}
          {userInfo.services && (
            <ServiceArea>
              <ServicesTitle>Serviços</ServicesTitle>
              {userInfo.services.map((item, key) => (
                <ServiceItem key={key}>
                  <ServiceInfo>
                    <ServiceName>{item.name}</ServiceName>
                    <ServicePrice>R$ {item.price.toFixed(2)}</ServicePrice>
                  </ServiceInfo>
                  <ServiceChooseButton onPress={() => handleServiceChoose(key)}>
                    <ServiceChooseBtnText>Agendar</ServiceChooseBtnText>
                  </ServiceChooseButton>
                </ServiceItem>
              ))}
            </ServiceArea>
          )}
          {userInfo.testimonials && userInfo.testimonials.length > 0 && (
              <TestimonialArea>
                <Swiper
                  style={{ height: 110 }}
                  showsPagination={false}
                  showsButtons={true}
                  prevButton={<NavPrevIcon width="35" height="35" fill="#000000" />}
                  nextButton={<NavNextIcon width="35" height="35" fill="#000000" />}>
                    {userInfo.testimonials.map((item, key) => (
                      <TestimonialItem key={key}>
                        <TestimonialInfo>
                          <TestimonialName>{item.name}</TestimonialName>
                          <Starts stars={item.rate} showNumber={false}/>
                        </TestimonialInfo>
                        <TestimonialBody>{item.body}</TestimonialBody>
                      </TestimonialItem>
                    ))}
                </Swiper>
              </TestimonialArea>
          )}
        </PageBody>
      </Scroller>
      <BackButton onPress={handleBackButton}>
        <BackIcon width={44} height={44} fill="#ffffff" />
      </BackButton>

      <BarberModal 
        show={showModal}
        setShow={setShowModal}
        user={userInfo}
        service={selectedService}/>
    </Container>
  )
}
