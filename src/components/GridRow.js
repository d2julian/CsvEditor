import React, { useState, useEffect } from "react";
import styled from "styled-components";
const Content = styled.input`
  width: 100%;
  height: 100%;
  font-size: 14px;
  overflow: hidden;
  border: 1px solid black;
  text-align: center;
  border-left: none;
  border-right: none;
  font-family: inherit;
  background-color: ${(props) => props.inputColor || "white"};
  &:hover {
    background-color: lightgray;
    cursor: pointer;
  }
  &:focus-visible {
    outline: none;
    background-color: lightgray;
  }
`;
function GridRow({ value, x, y, updateArray }) {
  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const [inputValue, setInputValue] = useState(value);
  const onChangeHandler = (e) => {
    setInputValue(e.target.value);
    updateArray(x, y, e.target.value);
  };
  return <Content type="text" value={inputValue} onChange={onChangeHandler} />;
}

export default GridRow;
