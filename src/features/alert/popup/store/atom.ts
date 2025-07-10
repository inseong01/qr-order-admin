import { atom } from 'jotai';

interface SubmissionStatusAlertState {
  isOpen: boolean;
  title: string;
}

export const submissionStatusAlertAtom = atom<SubmissionStatusAlertState>({
  isOpen: false,
  title: '',
});

export const openSubmissionStatusAlertAtom = atom(null, (_, set, title: string) => {
  set(submissionStatusAlertAtom, {
    isOpen: true,
    title,
  });

  setTimeout(() => {
    set(submissionStatusAlertAtom, {
      isOpen: false,
      title: '',
    });
  }, 1500);
});
