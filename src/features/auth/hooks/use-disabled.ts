import { useAtomValue } from 'jotai';
import { authStatusAtom, captchaTokenAtom } from '../store/auth-atom';

export default function useDisabledState() {
  const authStatus = useAtomValue(authStatusAtom);
  const captchaToken = useAtomValue(captchaTokenAtom);
  const disabled = authStatus === 'loading' || !captchaToken;

  return { disabled, authStatus };
}
