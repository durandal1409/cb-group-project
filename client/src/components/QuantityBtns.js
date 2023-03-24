import styled from "styled-components";

const QuantityBtns = ({
        handleMinusClick, 
        handleInputChange, 
        handlePlusClick, 
        itemQuantity,
        disabled
      }) => {

   
    
    return (
        <Wrapper>
            <ButtonDiv>
                <Button disabled={disabled} onClick={handleMinusClick}>-</Button>
                <Number disabled={disabled} type="number" value={itemQuantity} onChange={handleInputChange} />
                <Button disabled={disabled} onClick={handlePlusClick}>+</Button>
            </ButtonDiv>
        </Wrapper>
    )
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  align-items: center;
  height: 5vh;
  width: 27vh;
  border-radius: 15px;
  background-color: var(--color-background);
  box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,
    rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
    rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
`;
const Number = styled.input`
  /* display: flex;
  align-items: center; */
  font-size: 20px;
  border-left: 2px solid #f5f5f5;
  border-right: 2px solid #f5f5f5;
  border-color: grey;
  padding: 0px 8px;
  width: 12vh;
  text-align: center;
`;
const ButtonDiv = styled.div`
  display: flex;
  align-content: center;
  min-height: 10px;
  gap: 5px;
  justify-content: center;
  background-color: var(--color-background);
`;
const Button = styled.button`
  width: 100%;
  text-align: center;
  font-size: 30px;
  font-weight: bold;
  border-style: none;
  background-color: transparent;
  padding: 0px 15px;
  :hover {
    background-color: #bfbfbf;
    border-radius: 15px;
  }
`;


export default QuantityBtns;