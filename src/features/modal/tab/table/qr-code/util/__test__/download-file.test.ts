/**
 * @file downloadFile 유틸리티 함수의 단위 테스트입니다.
 * @description 주어진 URL로부터 파일을 비동기적으로 다운로드하는 기능이
 *              성공 및 실패 시나리오에 따라 올바르게 동작하는지 검증합니다.
 */
import { afterEach, beforeAll, describe, expect, it, vi } from 'vitest';
import { downloadFile } from '../download-file';

const mockCreateObjectURL = vi.fn(() => 'blob:mock-url');
const mockRevokeObjectURL = vi.fn();
const mockAppendChild = vi.fn();
const mockRemoveChild = vi.fn();
const mockClick = vi.fn();

describe('downloadFile 유틸', () => {
  beforeAll(() => {
    // URL 메서드 모킹
    window.URL.createObjectURL = mockCreateObjectURL;
    window.URL.revokeObjectURL = mockRevokeObjectURL;

    // document.body.appendChild / removeChild 모킹
    Object.defineProperty(document, 'body', {
      value: {
        appendChild: mockAppendChild,
        removeChild: mockRemoveChild,
      },
    });

    // console.error 모킹
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it('fetch 성공 시 다운로드 정상 수행', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      status: 200,
      blob: () => Promise.resolve(new Blob(['mock blob'], { type: 'text/plain' })),
    } as Response);

    const url = 'https://example.com/file.png';
    const tableNumber = 1;

    // <a> 태그 생성 후 click 모킹
    vi.spyOn(document, 'createElement').mockImplementation(
      () =>
        ({
          href: '',
          download: '',
          style: {},
          click: mockClick,
        }) as unknown as HTMLAnchorElement
    );

    await downloadFile(url, tableNumber);

    expect(global.fetch).toHaveBeenCalledWith(url);
    expect(mockCreateObjectURL).toHaveBeenCalled();
    expect(mockClick).toHaveBeenCalled();
    expect(mockAppendChild).toHaveBeenCalled();
    expect(mockRemoveChild).toHaveBeenCalled();
    expect(mockRevokeObjectURL).toHaveBeenCalled();
    expect(console.error).not.toHaveBeenCalled();
  });

  it('fetch 성공하나 response.ok가 false일 때', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValue({
      ok: false,
      status: 403,
      blob: () => Promise.resolve(new Blob([''], { type: 'text/plain' })),
    } as Response);

    const url = 'https://example.com/file.png';
    const tableNumber = 2;

    await downloadFile(url, tableNumber);

    expect(mockCreateObjectURL).not.toHaveBeenCalled();
    expect(mockClick).not.toHaveBeenCalled();
    expect(mockAppendChild).not.toHaveBeenCalled();
    expect(mockRemoveChild).not.toHaveBeenCalled();
    expect(mockRevokeObjectURL).not.toHaveBeenCalled();
    expect(console.error).toHaveBeenCalledWith('Unexpected error: File download denied.');
  });

  it('fetch 자체 실패 시', async () => {
    vi.spyOn(global, 'fetch').mockRejectedValue(new Error('network error'));

    const url = 'https://example.com/file.png';
    const tableNumber = 3;

    await downloadFile(url, tableNumber);

    expect(mockCreateObjectURL).not.toHaveBeenCalled();
    expect(mockClick).not.toHaveBeenCalled();
    expect(mockAppendChild).not.toHaveBeenCalled();
    expect(mockRemoveChild).not.toHaveBeenCalled();
    expect(mockRevokeObjectURL).not.toHaveBeenCalled();
    expect(console.error).toHaveBeenCalledWith('Unexpected error: network error');
  });
});
