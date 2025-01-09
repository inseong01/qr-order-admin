import WidgetMenuCategory from './WidgetMenuCategory';
// import WidgetTableCategory from './WidgetTableCategory';
// import WidgetOrderCategory from './WidgetOrderCategory';

import { useSelector } from 'react-redux';
import { lazy, Suspense } from 'react';

const LazyWidgetTableCategory = lazy(() => import('./WidgetTableCategory'));
const LazyWidgetOrderCategory = lazy(() => import('./WidgetOrderCategory'));

export default function WidgetFirstOptionCategories() {
  // useSelector
  const tab = useSelector((state) => state.tabState.title);

  switch (tab) {
    case 'menu': {
      return <WidgetMenuCategory />;
    }
    case 'table': {
      return (
        <Suspense>
          <LazyWidgetTableCategory />
        </Suspense>
      );
    }
    case 'order': {
      return (
        <Suspense>
          <LazyWidgetOrderCategory />
        </Suspense>
      );
    }
  }
}
