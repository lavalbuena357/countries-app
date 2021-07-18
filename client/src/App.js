import './App.css';
import Social from './components/Social/Social';
import Header from './components/Header/Header';
import Filters from './components/Filters/Filters';
import Main from './components/Main/Main';
function App() {
  return (
    <div className="App">
      <div className='left_container'>
        <Social />
        <Header />
      </div>
      <div className='right_container'>
        <Filters />
        <Main />
      </div>
    </div>
  );
}

export default App;
