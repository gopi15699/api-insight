import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from './index';

// Typed hooks — always use these instead of raw useDispatch / useSelector
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector = <T>(selector: (state: RootState) => T) =>
  useSelector<RootState, T>(selector);

// Convenience selector for auth
export const useAuth = () => useAppSelector((s) => s.auth);
