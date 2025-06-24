import { useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';

import { useBoundStore } from '../../../lib/store/use-bound-store';
import { OptionNumList } from '../../../lib/store/slices/widget-slice';
import { TableDataArr } from '../../../lib/supabase/function/fetch-table';
import { FetchMethod } from '../../../lib/store/slices/fetch-slice';

import styles from './categories-index.module.css';

import { categories } from '../motion/variants';

import WidgetFirstCategory from './first/first-index';
import WidgetSecondCategory from './second/second-index';

export default function WidgetCategoryPortal() {
  const isWidgetOpen = useBoundStore((state) => state.widget.isOpen);
  const editTableType = useBoundStore((state) => state.konva.type);
  const editTableisEditing = useBoundStore((state) => state.konva.isEditing);
  const setWidgetEditState = useBoundStore((state) => state.setWidgetEditState);

  // 좌석 편집 시 저장 이미지로 전환
  useEffect(() => {
    if (!editTableType) return;
    if (editTableisEditing) {
      setWidgetEditState(true);
    } else {
      setWidgetEditState(false);
    }
  }, [editTableType, editTableisEditing]);

  // 탭 별 메뉴 항목 컴포넌트 하나로 병합
  return <AnimatePresence>{isWidgetOpen && <WidgetCategories />}</AnimatePresence>;
}

function WidgetCategories() {
  const isSubmit = useBoundStore((state) => state.submit.isSubmit);
  const submitError = useBoundStore((state) => state.submit.isError);
  const isModalOpen = useBoundStore((state) => state.modal.isOpen);
  const editTableType = useBoundStore((state) => state.konva.type);
  const editTableisEditing = useBoundStore((state) => state.konva.isEditing);
  const resetItemState = useBoundStore((state) => state.resetItemState);
  const resetKonvaState = useBoundStore((state) => state.resetKonvaState);
  const setWidgetEditState = useBoundStore((state) => state.setWidgetEditState);
  const setWidgetOptionListState = useBoundStore((state) => state.setWidgetOptionListState);
  const fetchTableListData = useBoundStore((state) => state.fetchTableListData);

  function onClickEditor(optNum: OptionNumList, dataArr?: TableDataArr<FetchMethod>) {
    return () => {
      if (isModalOpen || submitError) return;
      if (editTableisEditing) {
        if (isSubmit) return;
        // 좌석 수정 중 다른 옵션 실행(선택) 방지
        if (optNum !== 1) {
          alert('수정 중에 다른 옵션을 실행할 수 없습니다');
          return;
        }
        const data = dataArr as TableDataArr<FetchMethod>;
        // 편집 저장, db 전송
        fetchTableListData({ method: editTableType, dataArr: data });
        resetItemState();
        resetKonvaState();
        setWidgetEditState(false);
        return;
      }
      // 위젯 옵션 여닫기
      setWidgetOptionListState({ optNum });
    };
  }

  return (
    <motion.ul
      key={'categories'}
      className={styles.categories}
      variants={categories}
      initial={'notClicked'}
      animate={'clicked'}
      exit={'notClicked'}
    >
      {/* 첫번째 카테고리 */}
      <WidgetFirstCategory onClickEditor={onClickEditor} />

      {/* 두번째 카테고리 */}
      <WidgetSecondCategory onClickEditor={onClickEditor} />
    </motion.ul>
  );
}
