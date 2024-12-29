import { useState } from "react";
import reactLogo from "./assets/react.svg";
import { invoke } from "@tauri-apps/api/core";
import { WebviewWindow } from '@tauri-apps/api/webviewWindow';
import "./App.css";

function App() {
  const [greetMsg, setGreetMsg] = useState("");
  const [url, setUrl] = useState("");

  async function greet() {
    const name = url.replace(/.*\/\//,"").split("/")[0]?.replaceAll(".","_").replaceAll("-","_");
    const options = {
			url: url,
			proxyUrl: '',
			title: name,
			width: 960
		};
    console.log('url', url)
    const webview = new WebviewWindow(`${name}-webview`, options);
    webview.once('tauri://created', function (d) {
      console.log('WebviewWindow://created')
      console.log(options)
    });
    webview.once('tauri://error', function (e) {
      console.log('WebviewWindow://error')
      console.log(e)
    });
  }

  return (
    <main className="container">
      <h1>Welcome to Tauri + React</h1>

      <div className="row">
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo vite" alt="Vite logo" />
        </a>
        <a href="https://tauri.app" target="_blank">
          <img src="/tauri.svg" className="logo tauri" alt="Tauri logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <p>Click on the Tauri, Vite, and React logos to learn more.</p>

      <form
        className="row"
        onSubmit={(e) => {
          e.preventDefault();
          greet();
        }}
      >
        <input
          id="greet-input"
          onChange={(e) => setUrl(e.currentTarget.value)}
          placeholder="Enter a name..."
        />
        <button type="submit">Greet</button>
      </form>
      <p>{greetMsg}</p>
    </main>
  );
}

export default App;
