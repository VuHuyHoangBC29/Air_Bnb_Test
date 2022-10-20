import { Suspense } from "react";
import logo from "./logo.svg";
import "./App.less";
import Router from "./routes";
import { BrowserRouter } from "react-router-dom";
import { LoadingProvider } from "./context/loading.context";

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<></>}>
        <LoadingProvider>
          <Router />
        </LoadingProvider>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
