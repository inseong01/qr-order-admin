import WidgetMenuCategory from './WidgetMenuCategory';
import WidgetTableCategory from './WidgetTableCategory';
import WidgetOrderCategory from './WidgetOrderCategory';

import { useSelector } from 'react-redux';

export default function WidgetFirstOptionCategories({ isClickEditor }) {
  // useSelector
  const tab = useSelector((state) => state.tabState.title);

  switch (tab) {
    case 'menu': {
      return <WidgetMenuCategory isClickEditor={isClickEditor} />;
    }
    case 'table': {
      return <WidgetTableCategory isClickEditor={isClickEditor} />;
    }
    case 'order': {
      return <WidgetOrderCategory isClickEditor={isClickEditor} />;
    }
  }
}
