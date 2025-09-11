import { TableMeta } from '@/features/tab/table/components/konva/common/types';

export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: '12.2.3 (519615d)';
  };
  public: {
    Tables: {
      menu: {
        Row: {
          category_id: string;
          id: string;
          img_url: string;
          name: string;
          price: number;
          tag: string;
        };
        Insert: {
          category_id?: string;
          id?: string;
          img_url?: string;
          name?: string;
          price: number;
          tag?: string;
        };
        Update: {
          category_id?: string;
          id?: string;
          img_url?: string;
          name?: string;
          price?: number;
          tag?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'menu_category_id_fkey';
            columns: ['category_id'];
            isOneToOne: false;
            referencedRelation: 'menu_category';
            referencedColumns: ['id'];
          },
        ];
      };
      menu_category: {
        Row: {
          id: string;
          title: string;
        };
        Insert: {
          id?: string;
          title?: string;
        };
        Update: {
          id?: string;
          title?: string;
        };
        Relationships: [];
      };
      order: {
        Row: {
          created_at: string;
          id: string;
          is_done: boolean;
          order_number: number;
          table_id: string;
          updated_at: string | null;
        };
        Insert: {
          created_at?: string;
          id?: string;
          is_done?: boolean;
          order_number: number;
          table_id?: string;
          updated_at?: string | null;
        };
        Update: {
          created_at?: string;
          id?: string;
          is_done?: boolean;
          order_number?: number;
          table_id?: string;
          updated_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'order_table_id_fkey';
            columns: ['table_id'];
            isOneToOne: false;
            referencedRelation: 'table';
            referencedColumns: ['id'];
          },
        ];
      };
      order_item: {
        Row: {
          id: string;
          menu_id: string;
          order_id: string;
          quantity: number;
        };
        Insert: {
          id?: string;
          menu_id: string;
          order_id: string;
          quantity: number;
        };
        Update: {
          id?: string;
          menu_id?: string;
          order_id?: string;
          quantity?: number;
        };
        Relationships: [
          {
            foreignKeyName: 'order_item_menu_id_fkey';
            columns: ['menu_id'];
            isOneToOne: false;
            referencedRelation: 'menu';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'order_item_order_id_fkey';
            columns: ['order_id'];
            isOneToOne: false;
            referencedRelation: 'order';
            referencedColumns: ['id'];
          },
        ];
      };
      request: {
        Row: {
          created_at: string | null;
          id: string;
          is_read: boolean;
          table_id: string;
          updated_at: string | null;
        };
        Insert: {
          created_at?: string | null;
          id?: string;
          is_read?: boolean;
          table_id?: string;
          updated_at?: string | null;
        };
        Update: {
          created_at?: string | null;
          id?: string;
          is_read?: boolean;
          table_id?: string;
          updated_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'request_table_id_fkey';
            columns: ['table_id'];
            isOneToOne: false;
            referencedRelation: 'table';
            referencedColumns: ['id'];
          },
        ];
      };
      request_category: {
        Row: {
          id: string;
          title: string;
        };
        Insert: {
          id?: string;
          title?: string;
        };
        Update: {
          id?: string;
          title?: string;
        };
        Relationships: [];
      };
      request_item: {
        Row: {
          category_id: string;
          created_at: string;
          id: string;
          quantity: number;
          request_id: string;
        };
        Insert: {
          category_id?: string;
          created_at?: string;
          id?: string;
          quantity: number;
          request_id?: string;
        };
        Update: {
          category_id?: string;
          created_at?: string;
          id?: string;
          quantity?: number;
          request_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'request_item_category_id_fkey';
            columns: ['category_id'];
            isOneToOne: false;
            referencedRelation: 'request_category';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'request_item_request_id_fkey';
            columns: ['request_id'];
            isOneToOne: false;
            referencedRelation: 'request';
            referencedColumns: ['id'];
          },
        ];
      };
      table: {
        Row: {
          id: string;
          meta: TableMeta;
          number: number;
        };
        Insert: {
          id?: string;
          meta: TableMeta;
          number: number;
        };
        Update: {
          id?: string;
          meta?: TableMeta;
          number?: number;
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
};

type DatabaseWithoutInternals = Omit<Database, '__InternalSupabase'>;

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, 'public'>];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema['Tables'] & DefaultSchema['Views'])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Views'])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema['Tables'] & DefaultSchema['Views'])
    ? (DefaultSchema['Tables'] & DefaultSchema['Views'])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables'] | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
    ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables'] | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
    ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema['Enums'] | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions['schema']]['Enums'][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema['Enums']
    ? DefaultSchema['Enums'][DefaultSchemaEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema['CompositeTypes']
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes']
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes'][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema['CompositeTypes']
    ? DefaultSchema['CompositeTypes'][PublicCompositeTypeNameOrOptions]
    : never;

export const Constants = {
  public: {
    Enums: {
      app_permission: ['qr-order.delete', 'qr-order.update', 'qr-order.select', 'qr-order.insert'],
      app_role: ['admin', 'member', 'viewer', 'guest'],
      user_role: ['guest', 'viewer', 'member', 'admin'],
    },
  },
} as const;

// export type Database = {
//   // Allows to automatically instanciate createClient with right options
//   // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
//   __InternalSupabase: {
//     PostgrestVersion: '12.2.3 (519615d)';
//   };
//   public: {
//     Tables: {
//       menu: {
//         Row: {
//           category_id: string;
//           id: string;
//           img_url: string;
//           name: string;
//           price: number;
//           tag: string;
//         };
//         Insert: {
//           category_id?: string;
//           id?: string;
//           img_url?: string;
//           name?: string;
//           price: number;
//           tag?: string;
//         };
//         Update: {
//           category_id?: string;
//           id?: string;
//           img_url?: string;
//           name?: string;
//           price?: number;
//           tag?: string;
//         };
//         Relationships: [
//           {
//             foreignKeyName: 'menu_category_id_fkey';
//             columns: ['category_id'];
//             isOneToOne: false;
//             referencedRelation: 'menu_category';
//             referencedColumns: ['id'];
//           },
//         ];
//       };
//       menu_category: {
//         Row: {
//           id: string;
//           title: string;
//         };
//         Insert: {
//           id?: string;
//           title?: string;
//         };
//         Update: {
//           id?: string;
//           title?: string;
//         };
//         Relationships: [];
//       };
//       order: {
//         Row: {
//           created_at: string;
//           id: string;
//           is_done: boolean;
//           order_number: number;
//           table_id: string;
//           updated_at: string | null;
//         };
//         Insert: {
//           created_at?: string;
//           id?: string;
//           is_done?: boolean;
//           order_number: number;
//           table_id: string;
//           updated_at?: string | null;
//         };
//         Update: {
//           created_at?: string;
//           id?: string;
//           is_done?: boolean;
//           order_number?: number;
//           table_id?: string;
//           updated_at?: string | null;
//         };
//         Relationships: [
//           {
//             foreignKeyName: 'order_table_id_fkey';
//             columns: ['table_id'];
//             isOneToOne: false;
//             referencedRelation: 'table';
//             referencedColumns: ['id'];
//           },
//         ];
//       };
//       order_item: {
//         Row: {
//           id: string;
//           menu_id: string;
//           order_id: string;
//           quantity: number;
//         };
//         Insert: {
//           id?: string;
//           menu_id: string;
//           order_id: string;
//           quantity: number;
//         };
//         Update: {
//           id?: string;
//           menu_id?: string;
//           order_id?: string;
//           quantity?: number;
//         };
//         Relationships: [
//           {
//             foreignKeyName: 'order_item_menu_id_fkey';
//             columns: ['menu_id'];
//             isOneToOne: false;
//             referencedRelation: 'menu';
//             referencedColumns: ['id'];
//           },
//           {
//             foreignKeyName: 'order_item_order_id_fkey';
//             columns: ['order_id'];
//             isOneToOne: false;
//             referencedRelation: 'order';
//             referencedColumns: ['id'];
//           },
//         ];
//       };
//       request: {
//         Row: {
//           created_at: string;
//           id: string;
//           is_read: boolean;
//           table_id: string;
//         };
//         Insert: {
//           created_at?: string;
//           id?: string;
//           is_read?: boolean;
//           table_id?: string;
//         };
//         Update: {
//           created_at?: string;
//           id?: string;
//           is_read?: boolean;
//           table_id?: string;
//         };
//         Relationships: [
//           {
//             foreignKeyName: 'request_table_id_fkey';
//             columns: ['table_id'];
//             isOneToOne: false;
//             referencedRelation: 'table';
//             referencedColumns: ['id'];
//           },
//         ];
//       };
//       request_category: {
//         Row: {
//           id: string;
//           title: string;
//         };
//         Insert: {
//           id?: string;
//           title?: string;
//         };
//         Update: {
//           id?: string;
//           title?: string;
//         };
//         Relationships: [];
//       };
//       request_item: {
//         Row: {
//           category_id: string;
//           quantity: number;
//           created_at: string;
//           id: string;
//           request_id: string | null;
//         };
//         Insert: {
//           category_id: string;
//           quantity: number;
//           created_at?: string;
//           id?: string;
//           request_id?: string | null;
//         };
//         Update: {
//           category_id?: string;
//           quantity?: number;
//           created_at?: string;
//           id?: string;
//           request_id?: string | null;
//         };
//         Relationships: [
//           {
//             foreignKeyName: 'request_item_request_id_fkey';
//             columns: ['request_id'];
//             isOneToOne: false;
//             referencedRelation: 'request';
//             referencedColumns: ['id'];
//           },
//           {
//             foreignKeyName: 'request_item_category_id_fkey';
//             columns: ['category_id'];
//             isOneToOne: false;
//             referencedRelation: 'request_category';
//             referencedColumns: ['id'];
//           },
//         ];
//       };
//       table: {
//         Row: {
//           id: string;
//           meta: TableMeta;
//           number: number;
//         };
//         Insert: {
//           id?: string;
//           meta?: TableMeta | null;
//           number: number;
//         };
//         Update: {
//           id?: string;
//           meta?: TableMeta | null;
//           number?: number;
//         };
//         Relationships: [];
//       };
//     };
//     Views: {
//       [_ in never]: never;
//     };
//     Functions: {
//       [_ in never]: never;
//     };
//     Enums: {
//       [_ in never]: never;
//     };
//     CompositeTypes: {
//       [_ in never]: never;
//     };
//   };
// };

// type DatabaseWithoutInternals = Omit<Database, '__InternalSupabase'>;

// type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, 'public'>];

// export type Tables<
//   DefaultSchemaTableNameOrOptions extends
//     | keyof (DefaultSchema['Tables'] & DefaultSchema['Views'])
//     | { schema: keyof DatabaseWithoutInternals },
//   TableName extends DefaultSchemaTableNameOrOptions extends {
//     schema: keyof DatabaseWithoutInternals;
//   }
//     ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
//         DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Views'])
//     : never = never,
// > = DefaultSchemaTableNameOrOptions extends {
//   schema: keyof DatabaseWithoutInternals;
// }
//   ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
//       DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Views'])[TableName] extends {
//       Row: infer R;
//     }
//     ? R
//     : never
//   : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema['Tables'] & DefaultSchema['Views'])
//     ? (DefaultSchema['Tables'] & DefaultSchema['Views'])[DefaultSchemaTableNameOrOptions] extends {
//         Row: infer R;
//       }
//       ? R
//       : never
//     : never;

// export type TablesInsert<
//   DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables'] | { schema: keyof DatabaseWithoutInternals },
//   TableName extends DefaultSchemaTableNameOrOptions extends {
//     schema: keyof DatabaseWithoutInternals;
//   }
//     ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables']
//     : never = never,
// > = DefaultSchemaTableNameOrOptions extends {
//   schema: keyof DatabaseWithoutInternals;
// }
//   ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
//       Insert: infer I;
//     }
//     ? I
//     : never
//   : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
//     ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
//         Insert: infer I;
//       }
//       ? I
//       : never
//     : never;

// export type TablesUpdate<
//   DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables'] | { schema: keyof DatabaseWithoutInternals },
//   TableName extends DefaultSchemaTableNameOrOptions extends {
//     schema: keyof DatabaseWithoutInternals;
//   }
//     ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables']
//     : never = never,
// > = DefaultSchemaTableNameOrOptions extends {
//   schema: keyof DatabaseWithoutInternals;
// }
//   ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
//       Update: infer U;
//     }
//     ? U
//     : never
//   : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
//     ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
//         Update: infer U;
//       }
//       ? U
//       : never
//     : never;

// export type Enums<
//   DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema['Enums'] | { schema: keyof DatabaseWithoutInternals },
//   EnumName extends DefaultSchemaEnumNameOrOptions extends {
//     schema: keyof DatabaseWithoutInternals;
//   }
//     ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions['schema']]['Enums']
//     : never = never,
// > = DefaultSchemaEnumNameOrOptions extends {
//   schema: keyof DatabaseWithoutInternals;
// }
//   ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions['schema']]['Enums'][EnumName]
//   : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema['Enums']
//     ? DefaultSchema['Enums'][DefaultSchemaEnumNameOrOptions]
//     : never;

// export type CompositeTypes<
//   PublicCompositeTypeNameOrOptions extends
//     | keyof DefaultSchema['CompositeTypes']
//     | { schema: keyof DatabaseWithoutInternals },
//   CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
//     schema: keyof DatabaseWithoutInternals;
//   }
//     ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes']
//     : never = never,
// > = PublicCompositeTypeNameOrOptions extends {
//   schema: keyof DatabaseWithoutInternals;
// }
//   ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes'][CompositeTypeName]
//   : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema['CompositeTypes']
//     ? DefaultSchema['CompositeTypes'][PublicCompositeTypeNameOrOptions]
//     : never;

// export const Constants = {
//   public: {
//     Enums: {},
//   },
// } as const;
