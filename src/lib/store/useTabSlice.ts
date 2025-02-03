import { StateCreator } from 'zustand';

type Title = 'menu' | 'table' | 'order';

type InitialState = {
  tab: {
    id: number;
    title: Title;
  };
};

const initialState: InitialState = {
  tab: {
    id: 0,
    title: 'menu',
  },
};

export interface UseTabSlice {
  tab: {
    id: number;
    title: Title;
  };
  changeTabState: ({ tabId }: { tabId: number }) => void;
}

export const useTabSlice: StateCreator<UseTabSlice, [['zustand/devtools', never]], [], UseTabSlice> =
  import.meta.env.MODE === 'development'
    ? (set) => ({
        ...initialState,
        changeTabState: ({ tabId }) =>
          set(
            () => {
              let title: Title = 'menu';
              switch (tabId) {
                case 0: {
                  title = 'menu';
                  break;
                }
                case 1: {
                  title = 'table';
                  break;
                }
                case 2: {
                  title = 'order';
                  break;
                }
                default: {
                  console.error('There is no correct tabeId');
                }
              }
              return {
                tab: {
                  id: tabId,
                  title,
                },
              };
            },
            undefined,
            'tab/changeTabState'
          ),
      })
    : (set) => ({
        ...initialState,
        changeTabState: ({ tabId }) =>
          set(() => {
            let title: Title = 'menu';
            switch (tabId) {
              case 0: {
                title = 'menu';
                break;
              }
              case 1: {
                title = 'table';
                break;
              }
              case 2: {
                title = 'order';
                break;
              }
              default: {
                console.error('There is no correct tabeId');
              }
            }
            return {
              tab: {
                id: tabId,
                title,
              },
            };
          }),
      });
