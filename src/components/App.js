import React from "react";
import "./App.css";
import ValidationForm from "./ValidationForm";

function App() {
  return (
    <div className="container">
      <h1>Enter Your Dish</h1>
      <section className="formContainer">
        <ValidationForm />
      </section>
    </div>
  );
}

export default App;
