import styled from 'styled-components'
import { darken, lighten, radialGradient, shade } from 'polished'

export const AppContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  ${props => radialGradient({
    colorStops: [`${lighten(0.2, props.theme.main)} 0%`, `${props.theme.main} 100%`]
  })};
`

export const Title = styled.h1`
  font-size: 2.6em;
  color: ${props => darken(0.5, props.theme.main)};
  text-shadow: 2px 2px 0 rgba(255, 255, 255, .2);

  @media (min-width: 600px) {
    font-size: 4em;
  }
`

export const Description = styled.p`
  font-size: 1.05em;
  font-weight: 300;
  color: ${props => shade(0.5, props.theme.main)};
  margin-bottom: 3em;

  @media (min-width: 600px) {
    font-size: 1.6em;
  }
`
