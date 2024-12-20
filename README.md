# Terms of Service Scanner

An interactive Chrome extension built with **React**, **TypeScript**, and compiled using **Webpack**. It is supported by a **FastAPI** backend and utilizes **Gemini API** for generating responses. The extension simplifies the task of finding and analyzing **Terms of Service (ToS)** or other legal links on websites.  

---

## Features  

1. **Link Scraping**  
   - Automatically scans web pages to detect and list Terms of Service, Privacy Policy, or similar legal links.

2. **URL Input**  
   - Users can manually input a URL to fetch the corresponding legal documents or information.

3. **Data Analysis**  
   - **Gemini API Integration**: Fetches information from the top-level domain directly.  
   - (Upcoming) **Python Selenium Support**: Scrapes detailed legal data if Gemini cannot provide it.  

4. **History Page**  
   - Displays a log of previously searched or scraped links for easy reference.  

5. **Full Interactivity**  
   - User-friendly interface for seamless navigation and interaction.  

6. **MIT License**  
   - Open-source and free for public use and modification.  

---

## Technical Overview  

### Frontend  
- **Framework**: React with TypeScript for type-safe, scalable development.  
- **Build Tools**: Webpack for optimized builds and performance.  
- **Local Storage**: Chrome's local storage API for saving user data (e.g., history).  

### Backend  
- **Framework**: FastAPI for fast, modern, and efficient backend APIs.  
- **Gemini API**: Handles alerts and checks against Terms of Service agreements.  
- **Selenium**: Scrapes additional legal content when necessary.  

### Other Technologies  
- **Chrome Extension**: Fully compatible with the Chrome and other chromium based browsers.  

---

## Getting Started  

### Installation  

1. Clone the repository:  
   ```bash  
   git clone https://github.com/sachinpandit140/toss.git 
   cd toss  
   ```  

2. Install dependencies for the frontend:  
   ```bash  
   npm install  
   ```  

3. Install dependencies for the backend and initialize venv with your API key:  
   ```bash  
   cd backend  
   pip install -r requirements.txt
   python -m venv venv
   /.venv/Scripts/Activate.ps1
   ```
4. Run the backend server on localhost to enable Gemini:
   ```bash
   fastapi dev main.py

5. Build the extension:  
   ```bash  
   cd ..
   npm run build  
   ```  

6. Load the extension into Chrome:  
   - Navigate to `chrome://extensions/`.  
   - Enable **Developer Mode**.  
   - Click **Load Unpacked** and select the `build` folder from the frontend directory.  

---

## Usage  

1. Open the extension from Chrome's toolbar.  
2. Scrape links directly from the current webpage or input a custom URL.  
3. View or analyze data fetched via the Gemini API or Selenium.  
4. Check your **History Page** for previously searched links.  

---

## Contributors  

- [**Sachin Pandit**](https://github.com/sachinpandit140)
- [**Bibhav Adhikari**](https://github.com/bibhav48)

---

## License  

This project is licensed under the [MIT License](LICENSE).  

---  

## Feedback and Contributions  

We welcome your feedback and contributions!  
- Create an issue: [Issues](https://github.com/sachinpandit140/toss/issues)  
- Fork and submit pull requests.  

---

Enjoy using **Terms of Service Finder Extension**!
