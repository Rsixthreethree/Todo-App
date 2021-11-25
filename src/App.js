import React from "react";
import "./App.css";
import Todolist from "./components/todolist";

function App() {
  return (
    <div className="App">
       <div className="mainHeading">
    <br/>
    <br/>
    <br/>

        <h1 className="glow" >Whoops, it's ToDo App </h1>
      </div>
      <div className="subHeading">
        <br />
        {/* <h2   className="glow">Whoops, it's Saturday  </h2> */}
      </div>
      <Todolist />
    </div>
  );
}

export default App;
