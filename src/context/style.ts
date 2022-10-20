import styled from "styled-components";

interface Props {
  viewHeight: string;
}

export const WrapperSpin = styled.div`
  width: 100%;
  height: ${(props: Props) => props.viewHeight};
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  z-index: 1;
  background-color: #ffffffcc;
`;
