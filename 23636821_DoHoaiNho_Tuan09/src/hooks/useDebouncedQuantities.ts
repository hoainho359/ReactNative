import { useCallback, useEffect, useRef, useState } from 'react';
import { useAppDispatch } from '../store';
import { setQuantity } from '../store/cartSlice';

export function useDebouncedQuantities(delay = 300) {
  const dispatch = useAppDispatch();
  const [drafts, setDrafts] = useState<Record<string, number>>({});
  const timers = useRef<Record<string, ReturnType<typeof setTimeout>>>({});
  const pending = useRef<Record<string, number>>({});

  const commit = useCallback(
    (id: string) => {
      const quantity = pending.current[id];
      if (quantity === undefined) return;
      dispatch(setQuantity({ id, quantity }));
      delete pending.current[id];
      delete timers.current[id];
      setDrafts((current) => {
        const { [id]: _removed, ...rest } = current;
        return rest;
      });
    },
    [dispatch],
  );

  const changeQuantity = useCallback(
    (id: string, quantity: number) => {
      pending.current[id] = quantity;
      setDrafts((current) => ({ ...current, [id]: quantity }));
      if (timers.current[id]) clearTimeout(timers.current[id]);
      timers.current[id] = setTimeout(() => commit(id), delay);
    },
    [commit, delay],
  );

  const discard = useCallback((id: string) => {
    if (timers.current[id]) clearTimeout(timers.current[id]);
    delete timers.current[id];
    delete pending.current[id];
    setDrafts((current) => {
      const { [id]: _removed, ...rest } = current;
      return rest;
    });
  }, []);

  useEffect(
    () => () => {
      Object.values(timers.current).forEach((timer) => clearTimeout(timer));
      Object.entries(pending.current).forEach(([id, quantity]) => {
        dispatch(setQuantity({ id, quantity }));
      });
    },
    [dispatch],
  );

  return { drafts, changeQuantity, discard };
}
