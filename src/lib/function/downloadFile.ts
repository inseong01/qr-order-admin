import { TableNum } from '../../types/common';

export default async function downloadFile(url: string, tableNum: TableNum) {
  try {
    // 파일 다운로드
    const response = await fetch(url);
    if (!response.ok) throw new Error('Response was not ok.');
    // blob 객체화
    const blob = await response.blob();
    const urlObj = window.URL.createObjectURL(blob);
    // a 태그 다운로드 과정
    const a = document.createElement('a');
    a.href = urlObj;
    a.download = `table-${tableNum}-QRcode.png`;
    document.body.appendChild(a);
    a.click();
    // URL, a 태그 삭제
    a.remove();
    window.URL.revokeObjectURL(urlObj);
  } catch (err) {
    console.error('DownladFile has error', err);
  }
}
