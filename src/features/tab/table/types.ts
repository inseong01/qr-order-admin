import { Table } from '@/lib/supabase/tables/table';

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
