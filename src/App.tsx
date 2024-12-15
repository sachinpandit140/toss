import React, { useState, useEffect } from "react";
import { Navigation } from "./components/Navigation";
import { UrlInput } from "./components/UrlInput";
import { Scanner } from "./components/Scanner";
import { Page } from "./types";
import "./styles/App.css";
import About from "./About";
import Result from "./Result";
import History from "./History";
import ScannedPage from "./LegalLinkSelector";
import { scrapeLegalLinks } from "./utils/linkscraper";
import type { ScrapedLink } from "./types";

function App() {
  const [currentPage, setCurrentPage] = useState<Page>("home");
  const [url, setUrl] = useState<string>("");
  const [urls, setUrls] = useState<ScrapedLink[]>([]);

  useEffect(() => {
    const fetchLinks = async () => {
      const links = await scrapeLegalLinks();
      setUrls(links);
    };
    fetchLinks();
  }, []);

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
  };

  const handleResult = (url: string) => {
    setUrl(url);
    setCurrentPage("result");
  };

  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url) {
      setCurrentPage("result");
    } else {
      alert("Please enter a URL");
    }
  };

  const handleScan = async () => {
    setCurrentPage("select");
  };

  useEffect(() => {
    if (currentPage === "home") {
      setUrl("");
    }
  }, [currentPage]);

  return (
    <>
      <Navigation
        onHomeClick={() => setCurrentPage("home")}
        onAboutClick={() => setCurrentPage("about")}
        onHistoryClick={() => setCurrentPage("history")}
      />

      <main className="main-content">
        {currentPage === "home" && (
          <>
            <UrlInput
              url={url}
              onUrlChange={handleUrlChange}
              onSubmit={handleUrlSubmit}
            />
            <Scanner onScan={handleScan} />
          </>
        )}

        {currentPage === "about" && (
          <About backToHome={() => setCurrentPage("home")} />
        )}
        {currentPage === "result" && (
          <Result url={url} backToHome={() => setCurrentPage("home")} />
        )}
        {currentPage === "history" && (
          <History backToHome={() => setCurrentPage("home")} />
        )}
        {currentPage === "select" && (
          <ScannedPage
            backToHome={() => setCurrentPage("home")}
            links={urls}
            selectedUrl={url}
            handleResult={handleResult}
          />
        )}
      </main>
    </>
  );
}

export default App;
