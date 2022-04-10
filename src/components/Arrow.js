import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ArrowCircleUpTwoToneIcon from "@mui/icons-material/ArrowCircleUpTwoTone";

export const Container = styled.div`
  overflow-y: scroll;
`;
const ArrowButton = styled.div`
  position: fixed;
  width: 100%;
  left: 50%;
  bottom: 40px;
  ${(props) => (props.visible ? "display: visible" : "display: none")};
  cursor: pointer;
`;

const IconArrow = styled(ArrowCircleUpTwoToneIcon)`
  &.override {
    font-size: 50px;
    color: ${(props) => props.theme.iconColor};
    cursor: pointer;
  }
`;

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

function Arrow() {
  const displayArrow = () => {
    const scrollY = document.documentElement.scrollTop;
    if (scrollY > 500) {
      setShowArrow(true);
    } else if (scrollY <= 500) {
      setShowArrow(false);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", displayArrow);
    return () => window.removeEventListener("scroll", displayArrow);
  }, []);

  const [showArrow, setShowArrow] = useState(false);
  return (
    <Container>
      <ArrowButton visible={showArrow}>
        <IconArrow className="override" onClick={scrollToTop} fontSize="50px" />
      </ArrowButton>
    </Container>
  );
}

export default Arrow;
