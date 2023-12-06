import { styled } from 'styled-components';

import { styleVariables } from '../../../public/styles/utils/styleVariables';

const { colors } = styleVariables;

const PanelStyled = styled.div`
  margin: 20px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  .logout-button {
    width: 100px;
    margin: 30px 0 20px;
    padding: 10px 20px;
    margin-bottom: 25px;
    background-color: ${colors.action};
    border: none;
    border-radius: 20px;
    color: #000000;
    cursor: pointer;

    &:hover {
      background-color: ${colors.accentDark};
      color: ${colors.light};
    }
  }

  form {
    width: 175px;
  }

  .input-frame {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: calc(100% - 20px);
    border: none;
    margin: 5px 0 5px;
    padding: 5px 10px;
    background-color: ${colors.accentLighter};
    border-radius: 5px;

    .form-input {
      width: calc(100% - 20px);
      border: none;
      background-color: transparent;
      color: ${colors.accentDark};

      &:focus {
        outline-width: 0;
      }
    }
  }

  .submit-button {
    width: 100px;
    margin: 30px 0 20px;
    margin-bottom: 30px;
    padding: 10px 20px;
    background-color: ${colors.action};
    border: none;
    border-radius: 20px;
    color: #000000;

    &:hover {
      background-color: ${colors.accentDark};
      color: ${colors.light};
    }
  }
`;

export { PanelStyled };
