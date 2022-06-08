import React from "react";
import styled from "styled-components";

// 타입스크립트를 사용하기 때문에 onClick 이벤트를 props로 받아준다.
interface ArrowProps {
  onClick?: () => void;
}

export const NextArrow = ({ onClick }: ArrowProps) => {
  const blank: string = "0 50px 0 0";
  return (
    <Span blank={blank} className="pe-7s-right-arrow" onClick={onClick}></Span>
  );
};

export const PrevArrow = ({ onClick }: ArrowProps) => {
  const blank: string = "0 0 0 50px";
  return (
    <Span blank={blank} className="pe-7s-left-arrow" onClick={onClick}></Span>
  );
};

const Span = styled.span<{ blank: string }>`
  cursor: pointer;
  font-size: 50px;
  padding: ${(props) => props.blank};
`;
