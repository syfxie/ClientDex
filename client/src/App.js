import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from './components/Navbar';
import Mic from './components/Mic';
import './App.css';
import Home from "./pages/Home";
import AddContact from "./pages/AddContact";

function App() {
    const [data, setData] = useState("");

    // Using useEffect for single rendering (example of how to get backend data)
    // useEffect(() => {
    //     fetch('/test', {
    //         method : "GET"
    //     })
    //         .then(function (response) {
    //             return response.json();
    //         })
    //         .then(function (bodyText) {
    //             setData(bodyText.name);
    //         })
    // }, []);

    return (
        <div className="App">
            {/* <p>{data}</p> */}
            <div className="App">
                <Navbar />
                    <Routes>
                        <Route path="/" element={<Home/>}/>
                        <Route path="add-contact" element={<AddContact />} />
                    </Routes>
                <Mic></Mic>
            </div>
        </div>
    );
}

export default App;
