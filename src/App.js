import React, { Component } from 'react'
import { injectGlobal, ThemeProvider } from 'styled-components'

import { AppContainer, Title, Description } from './components/basic'

import Display from './Display'

injectGlobal`
  * {
    margin: 0;
    padding: 0;
  }

  html {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
  }

  *, *:before, *:after {
    box-sizing: inherit;
  }

  body {
    font: normal normal 16px/1.5 'Open Sans', sans-serif;
    background: #eee;
  }

  h1, h2, h3 {
    font-family: 'Passion One', cursive;
  }
`

class App extends Component {
  constructor (props) {
    super()

    this.state = {
      counter: 0,
      numbers: ['zero', 'um', 'dois', 'três', 'quatro', 'cinco', 'seis', 'sete', 'oito', 'nove', 'dez'],
      theme: {
        main: this.randomColor()
      }
    }
  }

  randomColor () {
    return `#${ Math.random().toString(16).substr(-6) }`
  }

  componentDidMount () {
    let synth

    if ('speechSynthesis' in window) {
      synth = new SpeechSynthesisUtterance()
      synth.voice = speechSynthesis.getVoices().filter((voice) => voice.name === 'Google português do Brasil')[0]
      synth.volume = 1
      synth.rate = 1.2
      synth.lang = 'pt-BR'
    }

    document.addEventListener('keydown', (event) => {
      if (event.keyCode === 32) {
        if (!speechSynthesis.speaking) {
          let newColor = this.randomColor()

          this.setState({ theme: { ...this.state.theme, main: newColor } })

          if (this.state.counter < 10) {
            this.setState((prevState) => ({ counter: prevState.counter + 1 }))
            synth.text = this.state.numbers[this.state.counter]
            speechSynthesis.speak(synth)
          } else {
            this.setState((prevState) => ({ counter: prevState.counter - 10 }))
          }
        }
      }
    })
  }

  render() {
    return (
      <ThemeProvider theme={ this.state.theme }>
        <AppContainer>
          <Title>Vamos contar até 10?</Title>
          <Description>Pressione a barra de espaço para contar</Description>
          <Display counter={ this.state.counter } text={ this.state.numbers[this.state.counter] } finished={ this.state.counter === 10 } />
        </AppContainer>
      </ThemeProvider>
    )
  }
}

export default App
