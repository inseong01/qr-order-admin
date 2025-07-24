import { AnimatePresence, motion } from 'motion/react';

import { ListMenu, ListMenuAdd } from '@/components/ui/menu';
import { Menu } from '@/lib/supabase/tables/menu';

import { listBoxMotion } from './motion/variants';
import { useMenuTab } from './hooks/use-menu-tab';

import styles from './view.module.css';

export default function MenuTabView() {
  const { menuGroupByCategory, menuCategories, isMenuExist } = useMenuTab();

  return (
    <motion.ul className={styles.listBox} variants={listBoxMotion} initial={'notLoad'} animate={'load'}>
      <AnimatePresence>
        {!isMenuExist ? (
          <li>메뉴를 생성해주세요</li>
        ) : (
          menuCategories?.map((category, idx) => (
            <li key={idx} className={styles.displayRow}>
              {/* 메뉴 카테고리 */}
              <motion.div layout={'position'} className={styles.category}>
                {category.title}
              </motion.div>

              {/* 메뉴 목록 */}
              <motion.div layout className={styles.menuRow}>
                {/* 추가 버튼 */}
                <ListMenuAdd category={category.title} />

                {/* 메뉴 */}
                {menuGroupByCategory[category.title]?.map((m: Menu) => (
                  <ListMenu key={m.id} {...m} />
                ))}
              </motion.div>
            </li>
          ))
        )}
      </AnimatePresence>
    </motion.ul>
  );
}
