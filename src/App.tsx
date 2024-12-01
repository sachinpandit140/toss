import React, { useState, useEffect } from 'react';
import About from './About';
import Result from './Result'; 
import Button from './Components/Button';
import History from './History';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<'home' | 'about' | 'result' | 'history'>('home');
  const [url, setUrl] = useState<string>('');

  interface StorageResult {
    foundLinks?: string[]; 
  }


  // Functions to simulate navigation
  const handleGoToAbout = () => setCurrentPage('about');
  const handleGoToHistory = () => setCurrentPage('result');
  const handleGoBackHome = () => setCurrentPage('home');
  const handleGoToResult = () => setCurrentPage('result');

  const handleArrowPress = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setCurrentPage('result');
  }

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
  };

  const handleScanPage = () => {
    chrome.storage.local.get('foundLinks', (result: StorageResult) => {
      if (result.foundLinks && result.foundLinks.length > 0) {
        setUrl(result.foundLinks[0]);
        setCurrentPage('result');
      } else {
        alert('No privacy or ToS links found on this page.');
      }
    });
  };
  

  useEffect(() => {
    if (currentPage === 'home') {
      setUrl(''); 
    }
  }, [currentPage]); 

  return (
    <div className="homepage">
      <div className="container">
        <div className="navbar">
          <Button image="images/Group 1.png" name="logonav" onClick={handleGoBackHome} altText="Toss" />
          
          {/* Simulating navigation using buttons */}
          <button onClick={handleGoToAbout} id="about">About Us</button>
          <a href="https://buymeacoffee.com/sachinpandit" target="_blank" rel="noopener noreferrer">
            <Button image="images/Coffee Mug.png" name="coffee" altText="coffee" />
          </a>
          <Button image="images/Clock Forward.svg" name="history" altText="history" onClick={handleGoToHistory} />

        </div>

        <div className="content">
          {currentPage === 'home' && (
            <div>
              <div className="url">
                <p id="pmain">Enter Target ToS URL</p>
                <form id="form">
                  <input type="text" id="url_box" name="url" placeholder="https://example.com/tos" value={url} onChange={handleUrlChange} />
                  <Button image="images/Arrow-removebg-preview.png" altText="Submit" name="arrow" onClick={handleArrowPress} />
                </form>
              </div>
              <div className="or">
                <p id="or_p">OR</p>
              </div>
              <div className="scanp">
                <p>Scan current page</p>
              </div>
              <div className="scan">
                <Button image="images/Scan.svg" altText="Scan" name="scanbutton" onClick={handleScanPage} />
              </div>
            </div>
          )}

          {currentPage === 'about' && <About backToHome={handleGoBackHome} />}
          {currentPage === 'result' && <Result url={url} backToHome={handleGoBackHome} />}
          {currentPage === 'history' && <History backToHome={handleGoBackHome} />}
        </div>
      </div>
    </div>
  );
};

export default App;
