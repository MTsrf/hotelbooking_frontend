import { style } from '@mui/system';
import styled from 'styled-components';


const Input = styled.input`
   padding: 10px; 
   height:45px;
   color: ${props => props.inputColor || "black"};
   background: #e8eaf6;
   border: #6778d6;
   border-radius: 3px;
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

const Btn = styled.button`
&:hover{
  background-color:#e4e6eb;
}
 
 `
export { Input, Button,Btn }