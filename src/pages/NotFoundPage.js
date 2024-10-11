import React from "react";
import styled from "styled-components";

const NotFoundContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
  text-align: center;
`;

const NotFoundText = styled.h1`
  font-size: 2rem;
  color: #333;
`;

function NotFoundPage() {
  return (
    <NotFoundContainer>
      <NotFoundText>404 - Page Not Found</NotFoundText>
    </NotFoundContainer>
  );
}

export default NotFoundPage;
