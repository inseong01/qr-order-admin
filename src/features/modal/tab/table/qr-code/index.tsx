import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import QRcode from 'qrcode';

import styles from './index.module.css';
import { downloadFile } from './util/download-file';

export default function QRPreviewBox({ tableNumber }: { tableNumber?: number }) {
  const [url, getURL] = useState('');

  const qrcodeRef = useRef<HTMLImageElement>(null);

  /* QR코드 사진 생성 */
  useEffect(() => {
    if (!qrcodeRef.current) return;

    const ref = qrcodeRef.current;
    QRcode.toDataURL(`${import.meta.env.VITE_CLIENT_URL}/table/${tableNumber}`)
      .then((url: string) => {
        ref.src = url;
        getURL(url);
      })
      .catch((err: string) => console.error(err));
  }, [qrcodeRef]);

  /* QR코드 다운로드 */
  function onClickDownloadQRcode() {
    if (!url) return;
    if (!tableNumber) {
      alert('테이블 정보를 불러오지 못했습니다.');
      return;
    }
    downloadFile(url, tableNumber);
  }

  return (
    <motion.div
      key={'QRPreviewBox'}
      className={styles.qrcodeBox}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* QR 코드 사진 */}
      <div className={styles.imgBox} onClick={onClickDownloadQRcode}>
        <img ref={qrcodeRef} alt='테이블 QR 코드' />
      </div>

      {/* 설명 */}
      <div className={styles.subscript}>클릭하면 다운로드 됩니다.</div>
    </motion.div>
  );
}
