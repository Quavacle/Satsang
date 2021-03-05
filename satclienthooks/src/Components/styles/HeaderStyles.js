import styled from 'styled-components';

const HeaderStyles = styled.h1`
  color: ${(props) => props.theme.primary};
  text-shadow: 1px 0 0 ${(props) => props.theme.tertiary},
    -1px 0 0 ${(props) => props.theme.tertiary},
    0 1px 0 ${(props) => props.theme.tertiary},
    0 -1px 0 ${(props) => props.theme.tertiary},
    1px 1px ${(props) => props.theme.tertiary},
    -1px -1px 0 ${(props) => props.theme.tertiary},
    1px -1px 0 ${(props) => props.theme.tertiary},
    -1px 1px 0 ${(props) => props.theme.tertiary};
`;

export default HeaderStyles;
