const button = ({selector}) => prejss`
  button {
    color: ${props => props.disabled ? 'grey' : 'red'};
    width: 200px;
    height: 70px;
    &:hover {
      text-decoration: underline;
    }
  }
`