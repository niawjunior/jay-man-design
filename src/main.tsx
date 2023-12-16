import React from "react"
import ReactDOM from "react-dom/client"
import TagManager from "react-gtm-module"
import App from "./App.tsx"
import "./index.css"

const tagManagerArgs = {
  gtmId: "GTM-P72XJFM2",
}

TagManager.initialize(tagManagerArgs)

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
