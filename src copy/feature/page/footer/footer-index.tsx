import { ReactNode, useEffect, useState } from 'react';
import { motion } from 'motion/react';

import { useBoundStore } from '../../../lib/store/use-bound-store';

import { TabCategoryList } from '../../../types/common';

import { useQueryAllOrderList, useQueryRequestList, useQueryTabMenu } from '../../../hook/use-query/query';

import UnderLine from '../../../components/styles/under-line/line-index';

import styles from './footer-index.module.css';

export default function Footer() {
  const data = useQueryTabMenu();

  return (
    <footer className={styles.footer}>
      {data?.map((tab) => {
        return <TabMenu key={tab.id} tab={tab} />;
      })}
    </footer>
  );
}

function TabMenu({ tab }: { tab: TabCategoryList }) {
  const [isUnreadAlert, setUndreadAlert] = useState(false);
  const request = useQueryRequestList();
  const isAlertMoreThanFour = request.data ? request.data.filter((list) => !list.isRead).slice(4).length > 0 : false;

  // 수신 요청 알림 여부
  useEffect(() => {
    if (!request.data) return;
    if (request.isFetching) return;
    if (tab.title !== '좌석') return;

    // 읽지 않은 알림 있는지
    const isUndreadAlertList = request.data ? request.data.some((list) => !list.isRead) : false;
    setUndreadAlert(isUndreadAlertList);
  }, [request.data, request.isFetching, tab]);

  const [isUnDoneList, setUndDoneList] = useState(false);
  const allOrder = useQueryAllOrderList();

  // 수신 주문 알림 여부
  useEffect(() => {
    if (!allOrder.data) return;
    if (tab.title !== '주문') return;

    // 완료 되지 않은 주문 여부
    const isUnDoneOrderList = allOrder.data ? allOrder.data.some((list) => !list.isDone) : false;
    setUndDoneList(isUnDoneOrderList);
  }, [allOrder.data, tab]);

  return (
    <TabMenuBoxComponent tab={tab}>
      <motion.div className={styles.title} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        {tab.title}

        {/* 좌석 알림 */}
        {isUnreadAlert && (
          <div className={`${styles.alertStatus} ${isAlertMoreThanFour ? styles.moreAlert : ''}`}></div>
        )}

        {/* 주문 알림 */}
        {isUnDoneList && <div className={styles.alertStatus}></div>}
      </motion.div>
    </TabMenuBoxComponent>
  );
}

function TabMenuBoxComponent({ children, tab }: { children: ReactNode; tab: TabCategoryList }) {
  const currentTabId = useBoundStore((state) => state.tab.id);
  const isModalOpen = useBoundStore((state) => state.modal.isOpen);
  const isTableEditAble = useBoundStore((state) => state.konva.isAble);
  const submitIsError = useBoundStore((state) => state.submit.isError);
  const changeTabState = useBoundStore((state) => state.changeTabState);
  const resetCategoryState = useBoundStore((state) => state.resetCategoryState);
  const resetItemState = useBoundStore((state) => state.resetItemState);
  const resetSubmitState = useBoundStore((state) => state.resetSubmitState);
  const resetWidgetState = useBoundStore((state) => state.resetWidgetState);

  function onClickChangeTab({ id }: TabCategoryList) {
    return () => {
      if (isModalOpen) return;
      if (currentTabId === id) return;
      if (isTableEditAble) {
        // 수정 중 tab 이동 임시 제한
        alert('위젯을 닫고 클릭해주세요');
        return;
      }

      changeTabState({ tabId: id });
      resetCategoryState();
      resetItemState();
      resetWidgetState();

      if (submitIsError) return; // 탭 변경마다 제출 상태 초기화, 에러 상황 예외

      resetSubmitState();
    };
  }

  return (
    <div
      className={`${styles.listBox} ${currentTabId === tab.id ? styles.clicked : ''}`}
      onClick={onClickChangeTab(tab)}
    >
      {children}

      {/* 밑줄 */}
      <UnderLine tab={tab} selectedId={currentTabId} position={'top'} />
    </div>
  );
}
