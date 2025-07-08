import { TableNum } from '../../types/common';

/**
 * 주어진 URL에서 파일을 비동기적으로 다운로드하고,
 * 지정된 테이블 번호를 사용하여 파일 이름을 지정합니다.
 *
 * @param {string} url - 다운로드할 파일의 URL.
 * @param {TableNum} tableNum - 파일 이름에 포함될 테이블 번호.
 * @returns {Promise<void>} 파일 다운로드가 성공적으로 시작되면 resolve되는 Promise.
 *                          오류 발생 시 콘솔에 에러를 출력합니다.
 */
export default async function downloadFile(url: string, tableNum: TableNum): Promise<void> {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`File download failed: ${response.statusText}`);
    }

    const blob = await response.blob();
    const urlObj = window.URL.createObjectURL(blob);

    // 다운로드를 트리거하기 위해 임시 <a> 태그를 생성합니다.
    const a = document.createElement('a');
    a.href = urlObj;
    a.download = `table-${tableNum}-QRcode.png`;
    a.style.display = 'none';
    document.body.appendChild(a);

    a.click(); // 클릭 이벤트를 발생시켜 다운로드를 시작합니다.

    document.body.removeChild(a);
    window.URL.revokeObjectURL(urlObj);
  } catch (err) {
    console.error('DownloadFile has an error:', err);
  }
}
