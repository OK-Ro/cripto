import React from "react";
import styled from "styled-components";

const Change = styled.span`
  color: ${(props) => (props.value >= 0 ? "#27ae60" : "#e74c3c")};
`;

const PercentageChange = ({ value, children }) => {
  return <Change value={value}>{children}</Change>;
};

export default PercentageChange;
