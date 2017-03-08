import preJSS from '../src/index';

it('plain CSS parsed to object', () => {
  const colors = {
    main: 'red',
  }

  const style = ({ main }) => preJSS`
    button {
      width: ${nike => '100px'};
      height: 100px;
      background: ${main}
      &:hover {
        color: black;
      }
    }
  `
  expect(style(colors)).toEqual({
    button: {
      width: function (nike) {
        return '100px'
      },
      height: '100px',
      background: 'red',
    }
  })
})
