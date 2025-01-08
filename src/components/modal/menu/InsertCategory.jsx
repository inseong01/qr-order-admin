import styles from '@/style/modal/menu/InsertCategory.module.css';
import { useSelector } from 'react-redux';

function CategoryInfo({ type, onChangeInputValue }) {
  const selectedList = useSelector((state) => state.itemState.list);
  switch (type) {
    case 'insert': {
      return (
        <li className={styles.info}>
          <input
            required
            type="text"
            className={styles.input}
            name="title"
            onChange={onChangeInputValue}
            placeholder={'분류명을 입력해주세요'}
          />
        </li>
      );
    }
    case 'update': {
      return selectedList.map((list, idx) => {
        return (
          <li key={idx} className={styles.info}>
            <div className={styles.subtitle} title={list.title}>
              {list.title}
            </div>
            <input
              required
              type="text"
              className={styles.input}
              name="title"
              onChange={onChangeInputValue}
              placeholder={'분류명을 입력해주세요'}
              data-id={list.id}
            />
          </li>
        );
      });
    }
  }
}

export default function InsertCategory({ type, onSubmitData, onChangeInputValue }) {
  return (
    <form className={`${styles.submitForm} ${styles.category}`} onSubmit={onSubmitData}>
      <div className={`${styles.sortModal}`}>
        <div className={styles.title}>분류명</div>
        <ul className={styles.submitInfo}>
          <CategoryInfo type={type} onChangeInputValue={onChangeInputValue} />
        </ul>

        <div className={styles.submitBtn}>
          <input
            type="submit"
            className={styles.btn}
            value={type === 'insert' ? '추가하기' : '수정하기'}
            name={'insert'}
          />
        </div>
      </div>
    </form>
  );
}
