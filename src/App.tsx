import { useEffect, useState } from "react";
import s from "./App.module.scss";
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
        <div className={s.headerBlock}>
          <label>
            <input
              type="checkbox"
              name="Enabled"
              checked={isEnabled}
              onChange={() => setIsEnabled(!isEnabled)}
            />
            Enabled
          </label>
          <label style={{ display: "inline-block", marginTop: "20px" }}>
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
            <img className={s.image} src="/pows.gif" alt="" />
          ) : (
            <img
              className={s.image}
              src={!catImage ? "/pows.gif" : catImage}
              alt="cat-img"
            />
          )}
        </div>
      </Card>
    </>
  );
}

export default App;
