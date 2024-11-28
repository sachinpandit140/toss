import React from 'react';
import About  from './About';
import  Result  from './Result';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Button from './Components/Button';

function App() {
  return (
    <Router>
      <div className="container">
        <div className="navbar">
          <img src="images/Group 1.png" id="logonav" alt="Toss" />
          <Link to="/about" id="about">About Us</Link>
          <a href="https://buymeacoffee.com/sachinpandit" target="_blank" rel="noopener noreferrer"><Button image="images/Coffee Mug.png" name="coffee" altText="coffee" /></a>
          <Button image="images/Clock Forward.svg" name="history" altText="history" />
        </div>
        <div className="content">
          <div className="url">
            <p id="pmain">Enter Target ToS URL</p>
            <form id="form">
              <input type="text" id="url_box" name="url" placeholder="https://example.com/tos" />
              <Button image="images/Arrow-removebg-preview.png" altText="Submit" name="arrow" />
            </form>
          </div>
          <div className="or">
            <p id="or_p">OR</p> 
          </div>
          <div className="scanp">
            <p>Scan current page</p> 
          </div>
          <div className="scan">
            <Button image="images/Scan.svg" altText="Scan" name="scanbutton" />
          </div>
        </div>

        {/*Routes*/}
        <Routes>
          <Route path="/about" element={<About />} />
          <Route path="result" element={<Result />}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
