import React, { Component } from 'react';

class App extends Component {
  constructor(props){
    super(props);
    this.example = this.example.bind(this); //!!!!!!
    this.state = {
      pValue: "1"
    };
  }

  render() {
    return (
      <div>
        <p onClick={this.example}>{this.state.pValue}</p>
      </div> 
    );
  }

  example(){
    if(this.state.pValue == 1) this.setState({pValue: "0"});
    else if(this.state.pValue == 0) this.setState({pValue: "1"});
  }
}

export default App;
