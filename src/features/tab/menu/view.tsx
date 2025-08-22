import { useAtomValue } from 'jotai';
import { AnimatePresence, motion } from 'motion/react';

import LoadingSpinner from '@/features/load/spinner';
import { ListMenu, ListMenuAdd } from '@/components/ui/menu';
import { ExceptionText } from '@/components/ui/exception';
import { windowStateAtom } from '@/store/window-atom';
import { Menu } from '@/lib/supabase/tables/menu';

import { ListUlBox } from '../components/list-box';
import { useMenuTab } from './hooks/use-menu-tab';
import styles from './view.module.css';

export default function MenuTabView() {
  const { menuGroupByCategory, menuCategories, isMenuExist, isLoading } = useMenuTab();
  const { mainSection } = useAtomValue(windowStateAtom);

  if (isLoading) return <LoadingSpinner />;

  return (
    <ListUlBox isDataEmpty={!isMenuExist} sectionWidth={mainSection.width} tab='menu'>
      <AnimatePresence>
        {!isMenuExist ? (
          <ExceptionText text='위젯에서 메뉴 분류를 생성해주세요.' />
        ) : (
          menuCategories.map((category) => (
            <li key={category.id} className={styles.displayRow}>
              {/* 메뉴 카테고리 */}
              <motion.div layout={'position'} className={styles.category}>
                {category.title}
              </motion.div>

              {/* 목록 */}
              <motion.div layout={'position'} className={styles.menuRow}>
                {/* 추가 버튼 */}
                <ListMenuAdd category={category.title} />

                {/* 메뉴 */}
                {menuGroupByCategory[category.title]?.map((m: Menu, idx: number) => (
                  <ListMenu key={idx} {...m} />
                ))}
              </motion.div>
            </li>
          ))
        )}
      </AnimatePresence>
    </ListUlBox>
  );
}
