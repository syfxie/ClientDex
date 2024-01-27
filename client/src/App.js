import { Route, Routes } from 'react-router-dom';
import './App.css';
import React, { useState, useEffect } from "react";
import Home from './pages/Home';
import AddContact from './pages/AddContact';
import Navbar from './components/Navbar';
import Mic from './components/Mic';

function App() {
	const [data, setdata] = useState("");

	// Using useEffect for single rendering (example of how to get backend data)
	// useEffect(() => {
  //   fetch('http://localhost:5000/test', {
  //     method : "GET"
  //   })
  //   .then(function (response) {
  //     return response.json();
  // })
  //   .then(function (bodyText) {
  //       setdata(bodyText.name);
  //   })
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
