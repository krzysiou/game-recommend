import { styled } from 'styled-components';

import { styleVariables } from '../../../../public/styles/utils/styleVariables';

const { colors } = styleVariables;

const GameStyled = styled.div`
  padding: 10px;
  border: 3px solid ${colors.action};
  border-radius: 10px;
  margin: 20px;
  width: 300px;

  p {
    margin: 5px;
  }
  .scores {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }

  .score-button {
    width: 20px;
    margin: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 5px 20px;
    background-color: ${colors.action};
    border: none;
    border-radius: 20px;
    color: #000000;

    &:hover {
      background-color: ${colors.accentDark};
      color: ${colors.light};
    }
  }

  form {
    width: 93%;
  }

  .input-frame {
    width: 100%;
  }

  .submit-button {
    margin: 5px 0;
    width: 150px;
    margin-bottom: 15px;
  }

  .comments-header {
    margin: 15px 0;
  }

  .comment {
    background-color: #d4d4d4;
    border-radius: 5px;
    width: 300px;
    padding: 5px 0;
    margin: 5px 0;
  }
`;

export { GameStyled };
