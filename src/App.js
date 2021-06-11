import React, { useEffect, useRef, useState } from "react";
import Loader from "react-loader-spinner";
const App = () => {
  const [uuid, setUUID] = useState();
  const [loading, setLoading] = useState(false);
  const inputRef = useRef();
  const sendReq = (e) => {
    e.preventDefault();
    console.log(inputRef.current.value);
    setLoading(true);
    fetch(
      `https://fierce-ravine-75966.herokuapp.com/q?url=${inputRef.current.value}`,
      {
        mode: "no-cors", // 'cors' by default
      }
    )
      .then((res) => res.json())
      .then((result) => setUUID(result.UUID));
  };

  const reset = () => {
    setUUID(undefined);
  };

  useEffect(() => {
    if (uuid !== undefined) {
      setLoading(false);
    }
  }, [uuid]);

  return (
    <div className="App">
      <header>
        PDF<span>Y</span>
      </header>
      <main>
        {loading ? (
          <Loader type="Grid" color="#00BFFF" height={100} width={100} />
        ) : uuid ? (
          <div className="downloadScreen">
            <a
              onClick={() => {
                document.querySelector("a").style.pointerEvents = "none";
              }}
              href={`https://fierce-ravine-75966.herokuapp.com/download/${uuid}`}
              download
              disabled
            >
              Download !
            </a>
            <button onClick={reset}>Download another file</button>
          </div>
        ) : (
          <form className="mainForm" onSubmit={sendReq}>
            <input
              ref={inputRef}
              className="main-input"
              type="url"
              pattern="https?://.*"
              placeholder="Enter a valid url..."
            />
            <span className="main-span">
              Please use http/https protocol with the link{" "}
            </span>
            <button type="submit">Convert!!</button>
          </form>
        )}
      </main>
      <footer>
        Made with ❤️️ by <a href="https://instagram.com/_tsensei_">tsensei</a>
      </footer>
    </div>
  );
};

export default App;
