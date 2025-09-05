import { Table } from '@/lib/supabase/tables/table';
import { Rect } from 'konva/lib/shapes/Rect';
import { Text } from 'konva/lib/shapes/Text';

export type DataWrapperProps = {
  data: DataComponentProps['data'];
  error: boolean;
};

export type DataComponentProps = {
  data: {
    tables: KonvaSectionProps['tables'];
    isEmpty: boolean;
  };
};

export type KonvaSectionProps = {
  tables?: Table[];
};

export type SetTableEditRefsAtomProps = { rect: Rect; text: Text };
