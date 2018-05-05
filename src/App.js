import React, { Component } from 'react'
import { ThemeProvider } from 'styled-components'

import { AppContainer, Title, Description } from './components/basic'

import Display from './Display'

import './App.css'

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
      synth.pitch = 1.1
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
          <Display counter={ this.state.counter } text={ this.state.numbers[this.state.counter] } />
        </AppContainer>
      </ThemeProvider>
    )
  }
}

export default App
