// src/pages/ContactPage.js
import React from "react";
import styled from "styled-components";

const ContactContainer = styled.div`
  padding: 16px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const ContactTitle = styled.h2`
  margin: 0 0 16px;
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
`;

const ContactText = styled.p`
  font-size: 1rem;
  color: #555;
`;

function ContactPage() {
  return (
    <ContactContainer>
      <ContactTitle>Contact Us</ContactTitle>
      <ContactText>Reach out to us for any inquiries or support.</ContactText>
    </ContactContainer>
  );
}

export default ContactPage;
