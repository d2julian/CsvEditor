import React, { useRef, useReducer } from "react";
import styled from "styled-components";

const Container = styled.div`
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  overflow: scroll;
`;

const Content = styled.div`
  background-color: #fefefe;
  margin: 2% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 60%;
  display: flex;
  flex-direction: column;
`;

const Label = styled.span`
  font-size: 15px;
`;
const Input = styled.input`
  flex: 1;
  display: block;
  margin-bottom: 10px;
  margin-right: 8px;
  padding: 2px;
  margin-top: 5px;
  width: 100%;
  height: 30px;
`;
const Title = styled.h1`
  font-weight: 600;
`;

const Button = styled.button`
  margin: 15px;
  width: 100px;
  height: 45px;
  background-color: ${(props) => props.theme.iconColor};
  color: white;
  border: 1px solid black;
  cursor: pointer;
  &:hover {
    background-color: ${(props) => props.theme.hoverColor};
  }
`;

const Form = styled.form``;

const Top = styled.div``;
const Middle = styled.div``;
const Bottom = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

function NewRow({ setShowNewRow, inputs, addNewRow }) {
  const modalRef = useRef();
  const containerClickHandler = (e) => {
    if (modalRef.current === e.target) {
      setShowNewRow(false);
    }
  };

  const cancelButtonHandler = () => {
    setShowNewRow(false);
  };

  const initialState = inputs.map((h, index) => {
    return "";
  });

  const newRowReducer = (state, action) => {
    state[action.index] = action.value;
    return state;
  };

  const [newRow, dispatch] = useReducer(newRowReducer, initialState);

  const handleNewRowValues = (e) => {
    dispatch({ index: e.target.name, value: e.target.value });
  };

  const addNewRowHandler = () => {
    addNewRow(newRow);
  };
  return (
    <Container onClick={containerClickHandler} ref={modalRef}>
      <Content>
        <Top>
          <Title>Fill the data</Title>
        </Top>
        <Form onSubmit={addNewRowHandler}>
          {inputs.map((i, idx) => {
            return (
              <Middle>
                <Label>{i} :</Label>
                <Input key={i} name={idx} type="text" onChange={handleNewRowValues} />
              </Middle>
            );
          })}
          <Bottom>
            <Button type="submit">Add</Button>
            <Button onClick={cancelButtonHandler}>Cancel</Button>
          </Bottom>
        </Form>
      </Content>
    </Container>
  );
}

export default NewRow;
