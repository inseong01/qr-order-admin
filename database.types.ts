import { Order, TableInit } from './src/types/common';

export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
  public: {
    Tables: {
      'qr-order-allOrderList': {
        Row: {
          created_at: string;
          id: string;
          isDone: boolean;
          orderList: Order['orderList'];
          orderNum: number;
          tableNum: number;
          updated_at: Date | null;
        };
        Insert: {
          created_at?: string;
          id?: string;
          isDone?: boolean;
          orderList: Order['orderList'];
          orderNum?: number;
          tableNum: number;
          updated_at?: Date | null;
        };
        Update: {
          created_at?: string;
          id?: string;
          isDone?: boolean;
          orderList?: Order['orderList'];
          orderNum?: number;
          tableNum?: number;
          updated_at?: Date | null;
        };
        Relationships: [];
      };
      'qr-order-category-menu': {
        Row: {
          id: number;
          title: string;
        };
        Insert: {
          id?: number;
          title: string;
        };
        Update: {
          id?: number;
          title?: string;
        };
        Relationships: [];
      };
      'qr-order-category-order': {
        Row: {
          alertCount: number | null;
          id: number;
          title: string;
        };
        Insert: {
          alertCount?: number | null;
          id?: number;
          title: string;
        };
        Update: {
          alertCount?: number | null;
          id?: number;
          title?: string;
        };
        Relationships: [];
      };
      'qr-order-category-request': {
        Row: {
          id: number;
          title: string;
        };
        Insert: {
          id?: number;
          title?: string;
        };
        Update: {
          id?: number;
          title?: string;
        };
        Relationships: [];
      };
      'qr-order-category-tab': {
        Row: {
          id: number;
          title: string;
        };
        Insert: {
          id?: number;
          title?: string;
        };
        Update: {
          id?: number;
          title?: string;
        };
        Relationships: [];
      };
      'qr-order-category-table': {
        Row: {
          id: number;
          title: string;
        };
        Insert: {
          id?: number;
          title: string;
        };
        Update: {
          id?: number;
          title?: string;
        };
        Relationships: [];
      };
      'qr-order-menu': {
        Row: {
          id: string;
          name: string;
          price: number;
          sort: string | null;
          sortId: number;
          tag: string;
          url: string;
        };
        Insert: {
          id?: string;
          name?: string;
          price: number;
          sort?: string | null;
          sortId?: number;
          tag?: string;
          url?: string | null;
        };
        Update: {
          id?: string;
          name?: string;
          price?: number;
          sort?: string | null;
          sortId?: number;
          tag?: string;
          url?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'qr-order-menu_sort_fkey';
            columns: ['sort'];
            isOneToOne: false;
            referencedRelation: 'qr-order-category-menu';
            referencedColumns: ['title'];
          },
          {
            foreignKeyName: 'qr-order-menu_sortId_fkey';
            columns: ['sortId'];
            isOneToOne: false;
            referencedRelation: 'qr-order-category-menu';
            referencedColumns: ['id'];
          }
        ];
      };
      'qr-order-request-list': {
        Row: {
          created_at: string;
          id: string;
          isRead: boolean;
          requestList: string;
          tableNum: number;
        };
        Insert: {
          created_at?: string;
          id?: string;
          isRead?: boolean;
          requestList?: string;
          tableNum: number;
        };
        Update: {
          created_at?: string;
          id?: string;
          isRead?: boolean;
          requestList?: string;
          tableNum?: number;
        };
        Relationships: [];
      };
      'qr-order-table-list': {
        Row: {
          id: string;
          init: Json | null | TableInit;
          order: Json[] | null | Order[];
          tableNum: number;
        };
        Insert: {
          id?: string;
          init?: Json | null | TableInit;
          order?: Json[] | null | Order[];
          tableNum: number;
        };
        Update: {
          id?: string;
          init?: Json | null | TableInit;
          order?: Json[] | null | Order[];
          tableNum?: number;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}

type PublicSchema = Database[Extract<keyof Database, 'public'>];

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema['Tables'] & PublicSchema['Views'])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
        Database[PublicTableNameOrOptions['schema']]['Views'])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
      Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema['Tables'] & PublicSchema['Views'])
  ? (PublicSchema['Tables'] & PublicSchema['Views'])[PublicTableNameOrOptions] extends {
      Row: infer R;
    }
    ? R
    : never
  : never;

export type TablesInsert<
  PublicTableNameOrOptions extends keyof PublicSchema['Tables'] | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
  ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
      Insert: infer I;
    }
    ? I
    : never
  : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends keyof PublicSchema['Tables'] | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
  ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
      Update: infer U;
    }
    ? U
    : never
  : never;

export type Enums<
  PublicEnumNameOrOptions extends keyof PublicSchema['Enums'] | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema['Enums']
  ? PublicSchema['Enums'][PublicEnumNameOrOptions]
  : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends keyof PublicSchema['CompositeTypes'] | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes']
    : never = never
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes'][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema['CompositeTypes']
  ? PublicSchema['CompositeTypes'][PublicCompositeTypeNameOrOptions]
  : never;
