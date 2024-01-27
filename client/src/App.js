import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import routes from "./routes"
import Navbar from './components/Navbar';
import Mic from './components/Mic';
import './App.css';

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
                <Router>
                    <Routes>
                        {routes.map((aRoute, aIndex) =>
                            <Route key={aIndex}
                                   path={aRoute.path}
                                   element={aRoute.element}
                            />
                        )}
                    </Routes>
                </Router>
                <Mic></Mic>
            </div>
        </div>
    );
}

export default App;
