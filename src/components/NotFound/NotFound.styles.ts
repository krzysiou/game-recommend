import { styled } from 'styled-components';

import { styleVariables } from '../../../public/styles/utils/styleVariables';

const { colors, mediaBreakpoint, paddings } = styleVariables;

const NotFoundStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${paddings.mobile};

  .hero {
    font-size: 48px;
    line-height: 32px;
    font-weight: 900;
    margin-bottom: 20px;
    max-width: ${mediaBreakpoint};
  }

  .description {
    text-align: center;
    font-size: 32px;
    line-height: 32px;
    font-weight: 200;
    max-width: ${mediaBreakpoint};

    > span {
      font-weight: 600;
      color: ${colors.action};
    }
  }

  .link {
    margin: 10px 0;
    font-size: 24px;
    font-weight: 600;
    color: ${colors.action};
    border-bottom: 2px solid ${colors.light};
    text-decoration: none;

    &:hover {
      border-bottom: 2px solid ${colors.action};
    }
  }
`;

export { NotFoundStyled };
