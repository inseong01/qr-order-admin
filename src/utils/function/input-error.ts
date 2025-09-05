import { ZodIssue } from 'zod';

/**
 * Zod 검증 결과에서 각 필드별 오류 메시지를 Map 형태로 변환합니다.
 *
 * @template 폼 데이터 타입
 * @param issues Zod 검증에서 반환된 오류 배열
 * @returns 필드명을 키로, 오류 메시지를 값으로 갖는 Map
 */
export function mapZodFieldErrors<T>(issues: ZodIssue[]) {
  const issueObj = new Map<keyof T, string>();

  issues.forEach((i) => {
    const field = i.path[0].toString() as keyof T;
    const message = i.message.toString();
    issueObj.set(field, message);
  });

  return issueObj;
}

/**
 * 특정 필드의 Zod 오류 메시지를 제거한 새로운 Map을 반환합니다.
 *
 * @template 필드명 타입 (문자열)
 * @param formMap 기존 필드 오류 Map
 * @param field 제거할 필드명
 * @returns 지정 필드의 오류가 제거된 새로운 Map
 */
export function clearZodErrorForField<K extends string>(formMap: Map<K, string>, field: K) {
  const prevMap = new Map(formMap);
  prevMap.delete(field);
  return prevMap;
}
