import { useSelector } from 'react-redux';

export default function useOnMouseChangeCursor(stage, id) {
  const konvaEditTableIdArr = useSelector((state) => state.konvaState.target.id);
  const konvaEditType = useSelector((state) => state.konvaState.type);

  const isTransformerAble = id === konvaEditTableIdArr[0] && konvaEditType !== 'delete';

  function onMouseLeaveChangePointer() {
    stage.current.container().style.cursor = 'default';
  }

  function onMouseEnterChangePointer({ requestList }) {
    return () => {
      if (isTransformerAble) {
        stage.current.container().style.cursor = 'move';
        return;
      }

      if (konvaEditType === '' && requestList.isFetched) {
        stage.current.container().style.cursor = 'pointer';
        return;
      } else if (konvaEditType === 'delete' || konvaEditType === 'update') {
        stage.current.container().style.cursor = 'pointer';
        return;
      }
    };
  }

  return { onMouseLeaveChangePointer, onMouseEnterChangePointer };
}
