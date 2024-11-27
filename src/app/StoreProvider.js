'use client'

import makeStore from "@/lib/features/makeStore";
import { useRef } from "react";
import { Provider } from "react-redux";

export default function StoreProvider({ children }) {
  const store = useRef(null);

  if (!store.current) {
    store.current = makeStore();
  };

  return (
    <Provider store={store.current}>
      {children}
    </Provider>
  )
}