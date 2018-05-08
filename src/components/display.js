import styled, { keyframes } from 'styled-components'
import { lighten, shade } from 'polished'

export const DisplayBox = styled.div`
  width: 200px;
  height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: ${props => lighten(0.5, props.theme.main)};
  border-radius: 1.5em 0;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.1);
  padding: 1em 4em;
  animation: ${props => props.finished ? `${pulse} .5s ease-in-out` : undefined };
`

export const Number = styled.h2`
  font-size: 6em;
  line-height: 1.2;
  color: ${props => shade(0.5, props.theme.main)};
  margin-bottom: -.2em;
`

export const Text = styled.p`
  font-size: 2em;
  color: ${props => shade(0.5, props.theme.main)};
`

const pulse = keyframes`
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(1.3);
  }

  100% {
    transform: scale(1);
  }
`
