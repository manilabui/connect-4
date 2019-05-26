import React, { Component } from 'react';
import Board from './components/Board';

class App extends Component {
  render() {
    return (
      <div className='tc'>
        <header className='center f1 fw2 mv4'>Connect 4</header>
        <Board />
      </div>
    );
  }
}

export default App;