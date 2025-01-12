import WidgetMenuCategory from './WidgetMenuCategory';
import { useBoundStore } from '../../../lib/store/useBoundStore';

import { lazy, Suspense } from 'react';

const LazyWidgetTableCategory = lazy(() => import('./WidgetTableCategory'));
const LazyWidgetOrderCategory = lazy(() => import('./WidgetOrderCategory'));

export default function WidgetFirstOptionCategories() {
  const tab = useBoundStore((state) => state.tab.title);

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
