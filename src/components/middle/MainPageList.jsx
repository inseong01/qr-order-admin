import MainPageOrderTab from './MainPageOrderTab';
import MainPageMenuTab from './MainPageMenuTab';
import MainPageTableTab from './MainPageTableTab';

import { useSelector } from 'react-redux';

export default function MainPageList() {
  // useSelector
  const tab = useSelector((state) => state.tabState.title);

  switch (tab) {
    case 'menu': {
      return <MainPageMenuTab />;
    }
    case 'table': {
      return <MainPageTableTab />;
    }
    case 'order': {
      return <MainPageOrderTab />;
    }
  }
}
