import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import AddContact from './pages/AddContact';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="add-contact" element={<AddContact />} />
      </Routes>
    </div>
  );
}

export default App;
