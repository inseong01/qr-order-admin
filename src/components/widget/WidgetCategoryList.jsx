import WidgetMenuCategory from './WidgetMenuCategory';
import WidgetTableCategory from './WidgetTableCategory';
import WidgetOrderCategory from './WidgetOrderCategory';

import { useSelector } from 'react-redux';

export default function WidgetCategoryList({ isClickEditor }) {
  // useSelector
  const tab = useSelector((state) => state.tabState.state);

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
