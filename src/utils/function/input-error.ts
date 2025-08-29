import { ZodIssue } from 'zod';

export function mapZodFieldErrors<T>(issues: ZodIssue[]) {
  const issueObj = new Map<keyof T, string>();

  issues.forEach((i) => {
    const field = i.path[0].toString() as keyof T;
    const message = i.message.toString();
    issueObj.set(field, message);
  });

  return issueObj;
}

export function clearZodErrorForField<K extends string>(formMap: Map<K, string>, field: K) {
  const prevMap = new Map(formMap);
  prevMap.delete(field);
  return prevMap;
}
