export default function ErrorPage({ compName }) {
  switch (compName) {
    case 'MenuList':
    case 'MainPageTableTab':
    case 'MainPageOrderTab': {
      return <h1>Error</h1>;
    }
    default: {
      return <h1>Hi</h1>;
    }
  }
}
