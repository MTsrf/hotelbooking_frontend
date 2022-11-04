import styled from "styled-components";


const Input = styled.input`
   padding: 10px; 
   height:50px;
   color: ${props => props.inputColor || "black"};
   background: #e8eaf6;
   border: ${props => props.border || '1px solid #6778d6'};
   border-radius: 3px;
   `;

const Select = styled.select`
   height: 45px;
   width:100%;
   background: #e8eaf6;
   color: gray;
   padding-left: 5px;
   font-size: 14px;
   border: ${props => props.border || '1px solid #6778d6'};
   margin-left: 10px;
 
   option {
     color: black;
     background: white;
     display: flex;
     white-space: pre;
     min-height: 45px;
     padding: 10px 2px 1px;
   }
 `;

 const Button = styled.button`
  cursor: pointer;
  font-size: 16px;
  border-radius: 3px;
  color: white;
  background-color: #3f51b5;
  padding: 15px 0;
  width:100%;
  border:2px solid #3f51b5;
  transition: 0.5s all ease-out;

  &:hover {
    background-color: #5c6bc0;
    color: white;
  }
`;

const Text = styled.p`
  font-family: 'Raleway', sans-serif;
  font-size: 10px;
  margin-left:220px;
  color: ${props => props.color || '#4d4d4d'}
`;


export { Input , Select ,Button, Text  }