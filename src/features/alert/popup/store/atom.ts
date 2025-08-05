import { atom } from 'jotai';

interface SubmissionStatusAlertState {
  isOpen: boolean;
  title: string;
}

export const submissionStatusAlertAtom = atom<SubmissionStatusAlertState>({
  isOpen: false,
  title: '',
});

export const openSubmissionAlertAtom = atom(null, (_, set, title: string) => {
  set(submissionStatusAlertAtom, {
    isOpen: true,
    title,
  });
});
