import { atom } from 'jotai';

interface SubmissionStatusAlertState {
  isOpen: boolean;
  title: string;
}

export const toastStateAtom = atom<SubmissionStatusAlertState>({
  isOpen: false,
  title: '',
});

export const showToastAtom = atom(null, (_, set, title: string) => {
  set(toastStateAtom, {
    isOpen: true,
    title,
  });
});
