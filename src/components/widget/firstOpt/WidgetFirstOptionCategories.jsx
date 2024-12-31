import WidgetMenuCategory from './WidgetMenuCategory';
import WidgetTableCategory from './WidgetTableCategory';
import WidgetOrderCategory from './WidgetOrderCategory';

import { useSelector } from 'react-redux';

export default function WidgetFirstOptionCategories() {
  // useSelector
  const tab = useSelector((state) => state.tabState.title);

  switch (tab) {
    case 'menu': {
      return <WidgetMenuCategory />;
    }
    case 'table': {
      return <WidgetTableCategory />;
    }
    case 'order': {
      return <WidgetOrderCategory />;
    }
  }
}
