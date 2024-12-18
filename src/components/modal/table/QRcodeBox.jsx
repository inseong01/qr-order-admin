import styles from '@/style/modal/table/QRcodeBox.module.css';
import downloadFile from '../../../lib/function/downloadFile';

import { motion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import QRcode from 'qrcode';

export default function QRcodeBox({ tableNum }) {
  // useState
  const [url, getURL] = useState('');
  // useRef
  const qrcodeRef = useRef(null);

  // QR코드 사진 생성
  useEffect(() => {
    if (!qrcodeRef.current) return;
    QRcode.toDataURL('www.naver.com')
      .then((url) => {
        qrcodeRef.current.src = url;
        getURL(url);
      })
      .catch((err) => console.error(err));
  }, [qrcodeRef]);

  function onClickDownloadQRcode() {
    if (!url) return;
    downloadFile(url, tableNum);
  }

  return (
    <motion.div
      key={'QRcodeBox'}
      className={styles.qrcodeBox}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className={styles.imgBox} onClick={onClickDownloadQRcode}>
        <img ref={qrcodeRef} alt="테이블 QR 코드" />
      </div>
      <div className={styles.subscript}>클릭하면 다운로드 됩니다.</div>
    </motion.div>
  );
}
