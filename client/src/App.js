import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import routes from "./routes"
import './App.css';

function App() {
    const [data, setData] = useState("");

	// Using useEffect for single rendering (example of how to get backend data)
    useEffect(() => {
        fetch('http://localhost:5000/test', {
            method : "GET"
        })
            .then(function (response) {
                return response.json();
            })
            .then(function (bodyText) {
                setData(bodyText.name);
            })
    }, []);

    return (
        <div className="App">
            <p>{data}</p>

            <Router>
                <Routes>
                    {routes.map((route, index) =>
                            <Route key={index}
                                   path={route.path}
                                   element={route.element}
                            />

                    )}
                </Routes>
            </Router>
        </div>
    );
}

export default App;
