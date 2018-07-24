import React, { Component } from 'react'
import scriptLoader from 'react-async-script-loader'

class Editor extends Component {
  

  componentWillReceiveProps ({ isScriptLoaded, isScriptLoadSucceed }) {
    if (isScriptLoaded && !this.props.isScriptLoaded) { // load finished
      if (isScriptLoadSucceed) {
        this.initEditor()
      }
      else this.props.onError()
    }
  }

  componentDidMount () {
    const { isScriptLoaded, isScriptLoadSucceed } = this.props
    if (isScriptLoaded && isScriptLoadSucceed) {
      this.initEditor()
    }
  }

 
}

export default scriptLoader(
  [
    'https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.4/jquery.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/marked/0.3.5/marked.min.js'
  ],
  '/assets/bootstrap-markdown.js'
)(Editor)
