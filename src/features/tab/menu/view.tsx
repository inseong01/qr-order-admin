import { useAtomValue } from 'jotai';
import { AnimatePresence, motion } from 'motion/react';

import ErrorComponent from '@/features/page/error';
import LoadingSpinner from '@/features/load/spinner';
import { ListMenu, ListMenuAdd } from '@/components/ui/menu';
import { ExceptionText } from '@/components/ui/exception';
import { windowStateAtom } from '@/store/window-atom';
import { Menu } from '@/lib/supabase/tables/menu';

import styles from './view.module.css';
import { useMenuTab } from './hooks/use-menu-tab';
import { DataComponentProps, DataWrapperProps } from './types';
import { ListUlBox } from '../components/list-box';

export default function MenuTabView() {
  const { menuGroupByCategory, menuCategories, isExist, isLoading, isError } = useMenuTab();
  const { mainSection } = useAtomValue(windowStateAtom);

  if (isLoading) return <LoadingSpinner />;

  return (
    <ListUlBox isDataEmpty={isExist === false} sectionWidth={mainSection.width} tab='menu'>
      <AnimatePresence>
        <DataWrapper data={{ menuGroupByCategory, menuCategories, isExist }} error={isError} />
      </AnimatePresence>
    </ListUlBox>
  );
}

function DataWrapper({ data, error }: DataWrapperProps) {
  if (error) {
    return <ErrorComponent />;
  }

  if (data.isExist === false) {
    return <ExceptionText text='위젯에서 메뉴 분류를 생성해주세요.' />;
  }

  return <DataComponent data={data} />;
}

function DataComponent({ data }: DataComponentProps) {
  const { menuCategories, menuGroupByCategory } = data;

  return (
    <>
      {menuCategories.map((category) => (
        <li key={category.id} className={styles.displayRow}>
          {/* 메뉴 카테고리 */}
          <motion.div layout={'position'} className={styles.category}>
            {category.title}
          </motion.div>

          {/* 목록 */}
          <motion.div layout={'position'} className={styles.menuRow}>
            {/* 추가 버튼 */}
            <ListMenuAdd category={category} />

            {/* 메뉴 */}
            {menuGroupByCategory[category.title]?.map((m: Menu, idx: number) => (
              <ListMenu key={idx} {...m} />
            ))}
          </motion.div>
        </li>
      ))}
    </>
  );
}
