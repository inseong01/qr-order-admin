import { AnimatePresence, motion } from 'motion/react';

import { ListMenu, ListMenuAdd } from '@/components/ui/menu';
import { Menu } from '@/lib/supabase/tables/menu';

import { listBoxMotion } from './motion/variants';
import { useMenuTab } from './hooks/use-menu-tab';

import styles from './view.module.css';

export default function MenuTabView() {
  const { menuGroupByCategory, menuCategoryKeys } = useMenuTab();

  return (
    <motion.ul className={styles.listBox} variants={listBoxMotion} initial={'notLoad'} animate={'load'}>
      <AnimatePresence>
        {menuCategoryKeys.length === 0 ? (
          <li>메뉴를 생성해주세요</li>
        ) : (
          menuCategoryKeys.map((category, idx) => (
            <li key={idx} className={styles.display}>
              {/* 메뉴 카테고리 */}
              <div className={styles.category}>{category}</div>

              {/* 메뉴 목록 */}
              <div className={styles.menu}>
                {/* 추가 버튼 */}
                <ListMenuAdd category={category} />

                {/* 메뉴 */}
                {menuGroupByCategory[category]?.map((m: Menu) => (
                  <ListMenu key={m.id} {...m} />
                ))}
              </div>
            </li>
          ))
        )}
      </AnimatePresence>
    </motion.ul>
  );
}
