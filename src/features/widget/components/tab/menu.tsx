import { useSetAtom } from 'jotai';

import LIGHT_ADD_LIST_ICON from '@/assets/icon/light-add-list.svg';
import LIGHT_DELETE_ICON from '@/assets/icon/light-delete.svg';
import LIGHT_EDIT_ICON from '@/assets/icon/light-edit.svg';

import { setWidgetAtomState } from '../../store/atom';
import { DetectAnimation, ListBox } from '../motion';
import styles from './tab.module.css';

/**
 * 메뉴 탭 위젯
 */
export function MenuWidget() {
  const setWidgetState = useSetAtom(setWidgetAtomState);

  function createMenuCategory() {
    setWidgetState({ option: 'create-menu-category' });
  }

  function updateMenuCategory() {
    setWidgetState({ option: 'update-menu-category' });
  }

  function deleteMenuCategory() {
    setWidgetState({ option: 'delete-menu-category' });
  }

  return (
    <DetectAnimation>
      <ListBox key='menuWidget1' onClick={createMenuCategory} isRow={false} isAnimate={true}>
        <div className={styles.iconBox}>
          <img src={LIGHT_ADD_LIST_ICON} alt='icon' />
        </div>

        <span>분류 추가</span>
      </ListBox>

      <ListBox key='menuWidget2' onClick={updateMenuCategory} isRow={false} isAnimate={true}>
        <div className={styles.iconBox}>
          <img src={LIGHT_EDIT_ICON} alt='icon' />
        </div>

        <span>분류 수정</span>
      </ListBox>

      <ListBox key='menuWidget3' onClick={deleteMenuCategory} isRow={false} isAnimate={true}>
        <div className={styles.iconBox}>
          <img src={LIGHT_DELETE_ICON} alt='icon' />
        </div>

        <span>분류 삭제</span>
      </ListBox>
    </DetectAnimation>
  );
}
