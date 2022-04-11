import "./App.css";
import React, { useState } from "react";
import Header from "./components/Header";
import Grid from "./components/Grid";
import NavBar from "./components/NavBar";
import Arrow from "./components/Arrow";
import { ThemeProvider } from "styled-components";
import { main } from "./Theme";
import NewRow from "./components/NewRow";

function App() {
  const [fileData, setFileData] = useState();
  const [fileName, setFileName] = useState();
  const inputs = [1, 2, 3, 4, 5, 6, 7];
  return (
    <ThemeProvider theme={main}>
      <NewRow inputs={inputs} />)
      <div className="App">
        <NavBar />
        <Header setFileData={setFileData} setFileName={setFileName}></Header>
        {fileData && <Grid fileData={fileData} headerData={fileData[0]} fileName={fileName} />}
        <Arrow></Arrow>
      </div>
    </ThemeProvider>
  );
}

export default App;
