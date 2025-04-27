import React from 'react';
import ChatContainer from './components/ChatContainer';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>GenAI Chat App</h1>
      </header>
      <main>
        <ChatContainer />
      </main>
    </div>
  );
}

export default App;