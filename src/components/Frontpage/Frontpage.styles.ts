import { styled } from 'styled-components';

import { styleVariables } from '../../../public/styles/utils/styleVariables';
import { mediaQuery } from '../../../public/styles/utils/mediaQuery';

const { colors } = styleVariables;

const FrontpageStyled = styled.div`
  margin: 100px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  ${mediaQuery['mobile']} {
    margin: 50px 20px;
  }

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
