import React from "react";
import AddBoxRoundedIcon from "@mui/icons-material/AddBoxRounded";
import DownloadIcon from "@mui/icons-material/Download";
import styled from "styled-components";
import Tooltip from "@mui/material/Tooltip";

const Container = styled.div`
  display: flex;
  padding-top: 20px;
  justify-content: center;
`;

const IconAdd = styled(AddBoxRoundedIcon)`
  &.override {
    font-size: 40px;
    color: ${(props) => props.theme.iconColor};
    cursor: pointer;
  }
`;
const IconDowload = styled(DownloadIcon)`
  &.override {
    font-size: 40px;
    color: ${(props) => props.theme.iconColor};
    cursor: pointer;
  }
`;

function ToolBar({ download, setShowNewRow }) {
  const downloadClickHandler = () => {
    download();
  };
  const addNewRowClickHandler = () => {
    setShowNewRow(true);
  };
  return (
    <Container>
      <Tooltip title="Add New Row">
        <IconAdd className="override" onClick={addNewRowClickHandler} />
      </Tooltip>
      <Tooltip title="Download File">
        <IconDowload className="override" onClick={downloadClickHandler} />
      </Tooltip>
    </Container>
  );
}

export default ToolBar;
