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
      numbers: [
        'zero',
        'one',
        'two',
        'three',
        'four',
        'five',
        'six',
        'seven',
        'eight',
        'nine',
        'ten'
      ],
      finished: undefined,
      theme: {
        main: this.randomColor()
      }
    }
  }

  randomColor () {
    return `#${Math.random()
      .toString(16)
      .substr(-6)}`
  }

  componentDidMount () {
    let synth

    if ('speechSynthesis' in window) {
      synth = new SpeechSynthesisUtterance()
      // synth.voice = speechSynthesis
      //   .getVoices()
      //   .filter(voice => voice.name === 'Google português do Brasil')[0]
      synth.volume = 1
      synth.rate = 1
      synth.lang = 'en'
    }

    document.addEventListener('keydown', event => {
      if (event.keyCode === 32) {
        if (!speechSynthesis.speaking) {
          let newColor = this.randomColor()

          this.setState({ theme: { ...this.state.theme, main: newColor } })

          if (this.state.counter < 10) {
            this.setState(prevState => ({ counter: prevState.counter + 1 }))

            synth.text = this.state.numbers[this.state.counter]
            speechSynthesis.speak(synth)

            if (this.state.counter === 10) {
              this.setState({ finished: true })
            } else {
              this.setState({ finished: false })
            }
          } else {
            this.setState(prevState => ({ counter: prevState.counter - 10 }))
          }
        }
      }
    })
  }

  render () {
    return (
      <ThemeProvider theme={this.state.theme}>
        <AppContainer finished={this.state.finished}>
          <Title>Let's count to 10?</Title>
          <Description>Press the space bar to play</Description>
          <Display
            counter={this.state.counter}
            text={this.state.numbers[this.state.counter]}
            finished={this.state.finished}
          />
        </AppContainer>
      </ThemeProvider>
    )
  }
}

export default App
