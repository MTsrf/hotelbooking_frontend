import styled from 'styled-components'

const Input = styled.input`
  font-size: ${ props => props.fontSize || '18px'};
  padding: ${ props => props.padding || '10px'};
  margin: ${ props => props.margin || '10px'};
  border: ${ props => props.border || 'none'};
  width: ${ props => props.width};
  border-radius: ${ props => props.borderRadius || '3px'};
`;

const Button = styled.button`
  background-color: ${props => props.backgroundColor || '#063970'};
  color:${ props => props.clr || 'white'};
  font-size: 20px;
  padding: ${props => props.padding ||'14px 60px'};
  border-radius: 2px;
  margin: ${props => props.margin||'10px 0px'};
  cursor: pointer;
  border:none;
`;
const Btn = styled.button`
  cursor: pointer;
  border:none;
`;


const RadioButton = styled.input `
  curson:pointer;
  width: 25px;
  height: 25px;
  margin: ${props => props.margin || '10px'};
`;

const Select = styled.select`
   height: ${props =>props.height || '38px'};
   width: ${props => props.width || '200px'};
   background: ${props => props.backgroundColor || 'white'};
   color: gray;
   padding-left: 5px;
   font-size: 18px;
   margin:${ props => props.margin || '10px 0px'};
   border-radius:${props => props.borderRadius || '20px'};
   border:${props => props.border || '1px solid #000'};
   option {
     color: black;
     background: white;
     display: flex;
     white-space: pre;
     min-height: 45px;
     padding: 100px ;
   }
 `;

 const Inp = styled.input`
  font-size: 18px;
  padding: 10px;
  border: ${props=>props.border || '1px solid black'};
  border-radius: 3px;
`;

export { Input,Button,Btn,Select,Inp,RadioButton }