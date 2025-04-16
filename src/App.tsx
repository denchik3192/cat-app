import { useEffect, useState } from "react";
import "./App.css";
import AppButton from "./components/AppButton";
import Card from "./components/Card";
import { fetchCatImage } from "./API/getCat";

function App() {
  const [catImage, setCatImage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);
  const [isAutoRefresh, setIsAutoRefresh] = useState(false);

  useEffect(() => {
    let interval: number;

    if (isAutoRefresh) {
      interval = setInterval(() => {
        const fetchAndSetImage = async () => {
          setIsLoading(true);
          try {
            const image = await fetchCatImage();

            setCatImage(image[0].url);
          } catch (error) {
            console.error("Error fetching cat image:", error);
          } finally {
            setIsLoading(false);
          }
        };

        fetchAndSetImage();
      }, 5000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [isAutoRefresh]);

  return (
    <>
      <Card>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "start",
          }}
        >
          <label>
            <input
              type="checkbox"
              name="Enabled"
              checked={isEnabled}
              onChange={() => setIsEnabled(!isEnabled)}
            />
            Enabled
          </label>
          <label>
            <input
              type="checkbox"
              name="auto-refresh"
              checked={isAutoRefresh}
              onChange={() => setIsAutoRefresh(!isAutoRefresh)}
            />
            Auto-refresh every 5 second
          </label>
        </div>

        <AppButton
          setCatImage={setCatImage}
          setIsLoading={setIsLoading}
          isEnabled={isEnabled}
        >
          Get cat
        </AppButton>
        <div
          style={{
            width: "400px",
            height: "400px",
            overflow: "hidden",
          }}
        >
          {isLoading ? (
            <img
              src="/pows.gif"
              alt=""
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          ) : (
            <img
              src={!catImage ? "/pows.gif" : catImage}
              alt="cat-img"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          )}
        </div>
      </Card>
    </>
  );
}

export default App;
