import React from 'react'
import styled from 'styled-components/native'

import StarFull from '../assets/images/svg/star.svg'
import StarHalf from '../assets/images/svg/star_half.svg'
import StarEmpty from '../assets/images/svg/star_empty.svg'

export default ({stars, showNumber}) => {
  let s = [0, 0, 0, 0, 0]

  let floor = Math.floor(stars) // Pega a parte inteira.
  let left = stars - floor

  for (var i = 0; i < floor; i++) {
    s[i] = 2
  }
  if (left > 0) {
    s[i] = 1
  }

  return (
    <StarArea>
      {s.map((item, key) => (
        <StarView key={key}>
          {item === 0 && <StarEmpty width="18" height="18" fill="#ff9200" />}
          {item === 1 && <StarHalf width="18" height="18" fill="#ff9200" />}
          {item === 2 && <StarFull width="18" height="18" fill="#ff9200" />}
        </StarView>
      ))}
      {showNumber && <StarText>{stars}</StarText>}
    </StarArea>
  )
}

const StarArea = styled.View`
  flex-direction: row;
`

const StarView = styled.View``

const StarText = styled.Text`
  font-size: 12px;
  font-weight: bold;
  margin-left: 5px;
  color: #737373;
`
