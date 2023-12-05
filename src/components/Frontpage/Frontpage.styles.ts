import { styled } from 'styled-components';

import { styleVariables } from '../../../public/styles/utils/styleVariables';

const { colors } = styleVariables;

const FrontpageStyled = styled.div`
  margin: 100px 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  .hero {
    font-size: 48px;
    margin-bottom: 40px;
  }

  .links {
    a {
      margin: 15px;
    }

    a:hover {
      color: ${colors.action};
    }
  }
`;

export { FrontpageStyled };
