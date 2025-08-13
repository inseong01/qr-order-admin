import { ReactNode } from 'react';
import { createStore, Provider } from 'jotai';
import { useHydrateAtoms } from 'jotai/utils';

/**
 * Jotai 상태를 초기화하는 헬퍼 컴포넌트
 * @param {any} initialValues - 초기화할 atom과 값의 Map
 * @param {ReactNode} children - 렌더링할 자식 컴포넌트
 */
type HydrateAtomsProps = {
  initialValues?: Map<any, any>;
  children: ReactNode;
  store?: ReturnType<typeof createStore>;
};

function HydrateAtoms({ initialValues = new Map([]), children }: HydrateAtomsProps) {
  useHydrateAtoms(initialValues);
  return children;
}

/**
 * 테스트 환경에서 Jotai Provider와 상태 초기화를 함께 제공하는 래퍼 컴포넌트
 * @param {any} initialValues - 초기화할 atom과 값의 Map
 * @param {ReactNode} children - 렌더링할 자원 컴포넌트
 */
function TestProvider({ initialValues, children, store }: HydrateAtomsProps) {
  return (
    <Provider store={store}>
      <HydrateAtoms initialValues={initialValues}>{children}</HydrateAtoms>
    </Provider>
  );
}

export default TestProvider;
