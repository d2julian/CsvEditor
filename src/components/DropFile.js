import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import styled from "styled-components";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { usePapaParse } from "react-papaparse";

const Container = styled.div``;

const Drop = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  width: 100%;
  height: 100%;
`;

const Text = styled.div`
  width: 60%;
`;

const Icon = styled(UploadFileIcon)`
  &.override {
    font-size: 150px;
    color: ${(props) => props.theme.iconColor};
  }
`;
const ErrorMessage = styled.div`
  color: red;
  font-size: 14px;
  font-weight: bold;
  text-align: center;
`;
function DropFile({ setFileData, setFileName }) {
  const [errorFile, setErrorFile] = useState();
  const { readString } = usePapaParse();
  const onDrop = (file) => {
    setErrorFile("");
    const reader = new FileReader();
    reader.onabort = () => setErrorFile("file reading was aborted");
    reader.onerror = () => setErrorFile("file reading has failed");
    reader.onload = function () {
      const contentFile = reader.result;
      readString(contentFile, {
        worker: true,
        delimiter: ";",
        complete: (results) => {
          setFileName(file[0].path);
          setFileData(results.data);
        },
      });
    };
    if (file[0].type === "text/csv") {
      reader.readAsText(file[0]);
    } else {
      setErrorFile("Only Csv files are supported");
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <Container>
      <Drop {...getRootProps()} accept=".csv">
        <Icon className="override" />
        <input {...getInputProps()} />
        {isDragActive ? <Text>Drop the files here ...</Text> : <Text>Drop your csv file here or click to select files</Text>}
      </Drop>
      {errorFile && <ErrorMessage>{errorFile}</ErrorMessage>}
    </Container>
  );
}

export default DropFile;
