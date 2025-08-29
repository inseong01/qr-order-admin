import { EditMode } from '../../../store/table-edit-state';

export function setEditDescription(editMode: EditMode, isSelected: boolean) {
  switch (editMode) {
    case 'create': {
      return '배경 내에서 좌석을 배치할 수 있습니다.';
    }
    case 'update': {
      return isSelected ? '배경 내에서 좌석을 수정할 수 있습니다.' : '수정할 좌석을 선택해주세요.';
    }
    case 'delete': {
      return '삭제할 좌석을 선택해주세요.';
    }
  }
}
