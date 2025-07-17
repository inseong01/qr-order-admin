import { z } from 'zod';

function createCategoryValue(value: string) {
  const categorySchema = z
    .string()
    .nonempty({ message: '카테고리를 작성해주세요.' })
    .regex(/^[가-힣&]+$/, {
      message: '한글, &만 입력 가능합니다.',
    });

  return categorySchema.safeParseAsync(value);
}

type Data = { id: string; title: string };
function updateCategoryValue(data: Data[]) {
  console.log('data: ', data);
  const categorySchema = z.array(
    z.object({
      id: z.string().nonempty({ message: '카테고리가 선택되지 않았습니다.' }),
      title: z
        .string()
        .nonempty({ message: '카테고리를 작성해주세요.' })
        .regex(/^[가-힣&]+$/, {
          message: '한글, &만 입력 가능합니다.',
        }),
    })
  );

  return categorySchema.safeParseAsync(data);
}

function deleteCategoryValue(id: string[]) {
  const categorySchema = z.array(z.string()).nonempty({ message: '카테고리 아이디를 선택해주세요.' });

  return categorySchema.safeParseAsync(id);
}

export default {
  createCategoryValue,
  updateCategoryValue,
  deleteCategoryValue,
} as const;
