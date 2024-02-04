import styled from "styled-components";
import { Modal } from "antd";

type ReservationProps = {
  pickup: boolean;
};

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 28px;
  background: black;

  height: 100%;
  align-items: center;
  justify-content: space-evenly;
  button {
    cursor: pointer;
  }
`;

export const InputWrapper = styled.div`
  input {
    width: 50%;
    background: white;
    color: black;
    border: none;
    padding: 12px;
  }
  display: flex;
  flex-direction: column;
  align-items: left;
  position: relative;
  width: 100%;
  background: #f34242;
  padding: 20px 12px 12px;
  margin-bottom: auto;
`;

export const List = styled.ul`
  list-style: none;
  text-decoration: none;
  color: black;
  background-color: white;
  width: 48.8%;
  position: absolute;
  top: 83%;
  border: 1px solid black;
  margin: 0;
  padding: 0;
  li {
    cursor: pointer;
    padding: 12px 8px;
    &:hover {
      background-color: #d5d3d3;
    }
  }
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, minmax(0, 1fr));
  width: 100%;
`;

export const DayTile = styled.div`
  height: auto;
  padding: 10px 5px;
  background-color: white;
  color: black;
  border: 1px solid black;
  min-height: 180px;
`;

export const ReservationBox = styled.div<ReservationProps>`
  display: flex;
  flex-direction: column;
  gap: 12px;
  border-radius: 20px;
  padding: 8px;
  cursor: pointer;
  box-shadow: 2px 2px 8px black;
  margin-top: 15px;
  background-color: ${(props) =>
    props.pickup ? "rgba(95, 217, 58, 0.8)" : "rgba(255, 0, 0, .8)"};
`;

export const Calendar = styled.div`
  display: flex;
  width: 100%;
  @media (max-width: 650px) {
    flex-direction: column;
  }
`;

export const ModalComponent = styled(Modal).attrs((props) => ({
  className: props.className,
}))`
  & .ant-modal-content {
    border-radius: 20px;
    padding: 0px;
  }
  & .ant-modal-body {
    padding: 64px 40px;
    display: flex;
    flex-direction: column;
    align-items: baseline;
    gap: 12px;
    span {
      font-weight: 700;
    }
  }

`;
