import { styled } from 'styled-components';

const Button = styled.button`
  display: inline-block;
  background-color: ${(props) => props.backcolor || '#FFFFFF'};
  padding: 8px 10.4px;
  border: 2px solid #b6a280;
  border-radius: 10px;
  font-size: ${(props) => props.fontsize || '14px'};
  font-weight: ${(props) => props.weight || 'normal'};
  color: ${(props) => props.color || '#b6a280'};
  opacity: ${(props) => (props.disabled ? '0.5' : '1')};
  cursor: pointer;
  &:hover {
    background-color: ${(props) => props.hovercolor || '#b6a280'};
    color: ${(props) => props.color || '#FFFFFF'};
  }
`;

export default Button;
