export type MenuGroupByCategory = { [key: string]: any };

export type MenuCategories = { id: string; title: string }[];

export type DataWrapperProps = {
  data: DataComponentProps['data'];
  error: boolean;
};

export type DataComponentProps = {
  data: {
    menuGroupByCategory: MenuGroupByCategory;
    menuCategories: MenuCategories;
    isExist: boolean;
  };
};
