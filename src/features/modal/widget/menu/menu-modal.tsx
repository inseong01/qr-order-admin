import AddCategoryForm from './add-category-form';
import EditCategoryForm from './edit-category-form';

export type MenuModalMode = 'add' | 'edit' | null;

interface MenuModalRouterProps {
  mode: MenuModalMode;
  onClose: () => void;
}

/**
 * 전달된 모드에 따라 적절한 카테고리 폼을 렌더링합니다.
 * @param {MenuModalMode} mode - 현재 모드 ('add', 'edit', 또는 null).
 * @param {() => void} onClose - 모달을 닫는 함수.
 */
export default function MenuModalRouter({ mode, onClose }: MenuModalRouterProps) {
  if (!mode) {
    return null;
  }

  return (
    <div className='modal-backdrop' onClick={onClose}>
      <div className='modal-content' onClick={(e) => e.stopPropagation()}>
        <button className='close-button' onClick={onClose}>
          X
        </button>
        {mode === 'add' && <AddCategoryForm />}
        {mode === 'edit' && <EditCategoryForm />}
      </div>
    </div>
  );
}

/* 위젯 연동 */
