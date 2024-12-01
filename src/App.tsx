import React, { useState, useEffect } from 'react';
import { Navigation } from './components/Navigation';
import { UrlInput } from './components/UrlInput';
import { Scanner } from './components/Scanner';
import { Page } from './types';
import { findLegalLinks } from './utils/linkScanner';
import './styles/App.css';
import About  from './About';
import  Result  from './Result';
import  History  from './History';


function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [url, setUrl] = useState<string>('');

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
  };

  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url) {
      setCurrentPage('result');
    }
  };

  const handleScanPage = async () => {
    const links = findLegalLinks(document);
    
    if (chrome?.storage?.local) {
      chrome.storage.local.set({ foundLinks: links }, () => {
        if (links.length > 0) {
          setUrl(links[0]);
          setCurrentPage('result');
        } else {
          alert('No privacy or ToS links found on this page.');
        }
      });
    }
  };

  useEffect(() => {
    if (currentPage === 'home') {
      setUrl('');
    }
  }, [currentPage]);

  return (
    <>
      <Navigation
        onHomeClick={() => setCurrentPage('home')}
        onAboutClick={() => setCurrentPage('about')}
        onHistoryClick={() => setCurrentPage('history')}
      />
      
      <main className="main-content">
        {currentPage === 'home' && (
          <>
            <UrlInput
              url={url}
              onUrlChange={handleUrlChange}
              onSubmit={handleUrlSubmit}
            />
            <Scanner onScan={handleScanPage} />
          </>
        )}
        
        {currentPage === 'about' && <About backToHome={() => setCurrentPage('home')} />}
        {currentPage === 'result' && <Result url={url} backToHome={() => setCurrentPage('home')}/>}
        {currentPage === 'history' && <History backToHome={() => setCurrentPage('home')}/>}
      </main>
    </>
  );
}

export default App;