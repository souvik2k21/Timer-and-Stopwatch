import React from "react";
import "./styles.css";
import Timer from "./Timer";
import Stopwatch from "./Stopwatch";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  return (
    <div className="container">
      <h1 className="mt-5 mb-3 text-center">Timer and Stopwatch</h1>
      <p className="mt-5 mb-3 text-center">Made with ❤️ by SVK</p>
      <div className="row">
        <div className="col-md-6">
          <Timer />
        </div>
        <div className="col-md-6">
          <Stopwatch />
        </div>
        <footer className="footer text-center">
          <p>&copy; 2023 Souvik Karmakar. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default App;
