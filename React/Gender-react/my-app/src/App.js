import logo from './logo.svg';
import './App.css';
import Gender from './main/gender';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <main className='App-name'>
        <Gender />
      </main>
    </div>
  );
}

export default App;
