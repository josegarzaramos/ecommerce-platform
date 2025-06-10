// src/lib/redux/StoreProvider.tsx

"use client";

import { useRef } from "react";
import { Provider } from "react-redux";
// THE FIX: Import 'makeStore' directly from './store' using curly braces {}
import { makeStore, AppStore } from "./store";

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const storeRef = useRef<AppStore | null>(null);

  if (!storeRef.current) {
    // This call will now work because 'makeStore' is a correctly imported function.
    storeRef.current = makeStore();
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}
