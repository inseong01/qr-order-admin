
import { AnimatePresence, motion } from 'motion/react';

import { ListMenu, ListMenuAdd } from '@/components/ui/menu';
import { Menu } from '@/lib/supabase/function/menu';
import { listBoxMotion } from './motion/variants';
import { useMenuTab } from './hooks/use-menu-tab';

import styles from './view.module.css';

export default function MenuTabView() {
  const { menuCategories, menuCategoryKeys } = useMenuTab();

  return (
    <motion.ul className={styles.listBox} variants={listBoxMotion} initial={'notLoad'} animate={'load'}>
      <AnimatePresence>
        {menuCategoryKeys.length === 0 ? (
          <li>메뉴를 생성해주세요</li>
        ) : (
          menuCategoryKeys.map((category, idx) => (
            <li key={idx} className={styles.display}>
              <div className={styles.category}>{category}</div>
              <div className={styles.menu}>
                <ListMenuAdd />
                {menuCategories[category]?.map((m: Menu) => (
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
