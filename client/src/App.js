import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
	const [data, setdata] = useState("");

	// Using useEffect for single rendering (example of how to get backend data)
	useEffect(() => {
    fetch('http://localhost:5000/test', {
      method : "GET"
    })
    .then(function (response) {
      return response.json();
  })
    .then(function (bodyText) {
        setdata(bodyText.name);
    })
	}, []);

	return (
		<div className="App">
      <h1>React and flask</h1>
      <p>{data}</p>

		</div>
	);
}

export default App;
