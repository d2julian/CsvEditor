import React, { useState, useEffect, useCallback } from "react";
import ToolBar from "./ToolBar";
import styled from "styled-components";
import CircularProgress from "@mui/material/CircularProgress";
import GridRow from "./GridRow";
import useScroll from "../hooks/useScroll";
import { usePapaParse } from "react-papaparse";
import NewRow from "./NewRow";
import { mobile } from "../responsive";

const Container = styled.div``;

const Wrapper = styled.div`
  margin: 10px;
  display: grid;
  grid-template-columns: ${(props) => `repeat(${props.totalRows}, minmax(30px, auto))`};
  grid-auto-rows: 50px;
  justify-content: center;
  ${mobile({ gridTemplateColumns: "auto" })}
`;

const Header = styled.div`
  width: 100%;
  height: 100%;
  font-weight: 300;
  display: contents;
  font-size: 14px;
`;
const HeaderItem = styled.div`
  background-color: #17650e;
  color: white;
  overflow: hidden;
  width: 100%;
  height: 100%;
  border-right: 0.5px solid black;
`;

const HeaderText = styled.p`
  text-align: center;
`;
const Circular = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;
const Title = styled.div`
  font-size: 30px;
  font-weight: 600;
  text-align: center;
`;
function Grid({ fileData, headerData, fileName }) {
  const cloneArray = useCallback((items) => items.map((item) => (Array.isArray(item) ? cloneArray(item) : item)), []);
  const [fetchedRows, setFetchedRows] = useState(50);
  const [arrayCloned, setArrayCloned] = useState([]);
  const [arraySliced, setArraySliced] = useState([]);
  const [showNewRow, setShowNewRow] = useState(false);
  const { jsonToCSV } = usePapaParse();
  const arrayHelper = cloneArray(arrayCloned);
  const fetchMore = () => {
    if (fetchedRows >= arrayCloned.length) {
      setIsFetching(false);
      return;
    }
    setTimeout(() => {
      setFetchedRows((oldValue) => oldValue + 50);
      setIsFetching(false);
    }, 1000);
  };
  const [isFetching, setIsFetching] = useScroll(fetchMore);

  useEffect(() => {
    setArrayCloned(cloneArray(fileData));
  }, [fileData, cloneArray]);
  useEffect(() => {
    setArraySliced(arrayCloned.slice(1, fetchedRows));
  }, [arrayCloned, fetchedRows]);

  const updateArray = (x, y, value) => {
    arrayHelper[x][y] = value;
    setArrayCloned(arrayHelper);
  };
  const downloadFile = () => {
    const csvExport = cloneArray(arrayCloned);
    let csv = jsonToCSV(csvExport, { delimiter: ";" });
    const element = document.createElement("a");
    const file = new Blob([csv], {
      type: "text/csv",
    });
    element.href = URL.createObjectURL(file);
    element.download = fileName;
    document.body.appendChild(element);
    element.click();
  };
  const addNewRow = (row) => {
    arrayHelper.push(row);
    setArrayCloned(arrayHelper);
    setShowNewRow(false);
  };
  return (
    <Container>
      <ToolBar download={downloadFile} setShowNewRow={setShowNewRow} />
      {showNewRow && <NewRow setShowNewRow={setShowNewRow} inputs={headerData} addNewRow={addNewRow} />}
      <Title>{fileName}</Title>
      <Wrapper totalRows={headerData.length}>
        <Header>
          {headerData &&
            headerData.map((value, idx) => (
              <HeaderItem key={idx}>
                <HeaderText key={idx}>{value}</HeaderText>
              </HeaderItem>
            ))}
        </Header>
        {arraySliced &&
          arraySliced.map((row, idxx) =>
            row.map((value, idxy) => <GridRow key={idxy} x={idxx + 1} y={idxy} value={value} updateArray={updateArray} />)
          )}
      </Wrapper>
      {isFetching && (
        <Circular>
          <CircularProgress />
        </Circular>
      )}
    </Container>
  );
}

export default Grid;
