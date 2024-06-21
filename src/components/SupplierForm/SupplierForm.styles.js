import styled from "styled-components";

export const Background = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

export const FormContainer = styled.div`
  background-color: #ffffff;
  padding: 20px;
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  width: 90%;
  max-width: 400px;
  text-align: center;

  h1 {
    margin-bottom: 20px;
    color: #333;
  }

  @media (min-width: 768px) {
    padding: 40px;
    max-width: 600px;
  }

  @media (min-width: 1024px) {
    padding: 60px;
    max-width: 800px;
  }
`;

export const InputGroup = styled.div`
  margin-bottom: 15px;
  text-align: left;

  label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
    color: #333;
  }

  input {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-sizing: border-box;

    @media (min-width: 1024px) {
      padding: 15px;
    }
  }

  @media (min-width: 768px) {
    margin-bottom: 20px;
  }
`;

export const Button = styled.button`
  width: 100%;
  padding: 12px;
  background-color: #5151e5;
  color: #ffffff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #3a3abf;
  }

  @media (min-width: 768px) {
    padding: 15px;
    font-size: 18px;
  }

  @media (min-width: 1024px) {
    padding: 18px;
    font-size: 20px;
  }
`;

export const ErrorMessage = styled.span`
  color: red;
  margin-top: 10px;
`;
