import { Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import Mic from './components/Mic';
import './App.css';
import Home from "./pages/Home";
import AddContact from "./pages/AddContact";
import EditContact from './pages/EditContact';
import Landing from './pages/Landing';

function App() {
    return (
        <div className="App">
            <div className="App">
                <Navbar />
                    <Routes>
                        <Route path="/home" element={<Home/>}/>
                        <Route path="add-contact" element={<AddContact />} />
                        <Route path="/home/edit-contact" element={<EditContact/>} />
                        <Route path="/" element={<Landing />} />
                    </Routes>
            </div>
        </div>
    );
}

export default App;
