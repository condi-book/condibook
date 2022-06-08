import React from "react";
import styled from "styled-components";

// 타입스크립트를 사용하기 때문에 onClick 이벤트를 props로 받아준다.
interface ArrowProps {
  onClick?: () => void;
}

// type ArrowProps = {
//   onClick?: () => void;
// };

const Arrow = ({ onClick }: ArrowProps) => {
  return (
    <Div className="next-arrow" onClick={onClick}>
      누르면 넘어감
    </Div>
  );
};

const Div = styled.div`
  .next-arrow {
    right: -25px;
    font-size: 20px;
    line-height: 0;
    position: absolute;
    top: 50%;
    display: block;
    width: 20px;
    height: 20px;
    padding: 0;
    transform: translate(0, -50%);
    cursor: pointer;
    color: transparent;
    border: none;
    outline: none;
    background: transparent;
    transition: 200ms ease-in-out;

    &:before {
      line-height: 1;
      opacity: 0.75;
      -webkit-font-smoothing: antialiased;
    }
  }
`;

export default Arrow;
