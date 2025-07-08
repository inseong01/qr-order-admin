import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import QRcode from 'qrcode';

import { TableNum } from '../../../../types/common';

import downloadFile from '../function/download-file';

import styles from './qr-preview-box.module.css';

export default function QRPreviewBox({ tableNum }: { tableNum: TableNum }) {
  const [url, getURL] = useState('');

  const qrcodeRef = useRef<HTMLImageElement>(null);

  // QR코드 사진 생성
  useEffect(() => {
    if (!qrcodeRef.current) return;

    const ref = qrcodeRef.current;
    // 링크 진입 시 쿠키 전달하여 해당 tableNum이 아닌 주소로 주소변경 접근 제한
    QRcode.toDataURL(`https://qr-order-client.vercel.app/table/${tableNum}`)
      .then((url: string) => {
        ref.src = url;
        getURL(url);
      })
      .catch((err: string) => console.error(err));
  }, [qrcodeRef]);

  function onClickDownloadQRcode() {
    if (!url) return;
    downloadFile(url, tableNum);
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
