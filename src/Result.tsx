import React from "react";
import { LoadingSpinner } from "./components/LoadingSpinner";

type Props = {
  url?: string;
  backToHome: () => void;
};

const Result = ({ url, backToHome }: Props) => {
  const [summary, setSummary] = React.useState<string[]>([]);
  const [alerts, setAlerts] = React.useState<string[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true); // Use useState for loading

  React.useEffect(() => {
    const fetchData = async () => {
      if (!url) return;

      setLoading(true); // Set loading to true when URL changes

      try {
        const tld = new URL(url).hostname;

        const response = await fetch(`/api/scan?query=${tld}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          setSummary(data.summary || []);
          setAlerts(data.alerts || []);
        } else {
          console.error("Failed to fetch data:", response.statusText);
        }
      } catch (error) {
        console.error("Error while fetching data:", error);
      } finally {
        setTimeout(() => setLoading(false), 500);
      }
    };

    fetchData();
  }, [url]);

  if (loading) {
    return (
      <div className="loading-container">
        <LoadingSpinner size="lg" variant="primary" />
      </div>
    );
  }

  return (
    <div className="result-container">
      <h3>Scan Results</h3>
      <p>Summary</p>
      <div className="summary-container">
        <ul>
          {summary.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
      <p>Alerts</p>
      <div className="alert-container">
        <ul>
          {alerts.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
      <button onClick={backToHome}>Back to Home</button>
    </div>
  );
};

export default Result;
