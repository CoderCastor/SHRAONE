import { configureStore } from "@reduxjs/toolkit";
import yourMonologueSliceReducers from "@/lib/features/app/monologe/yourMonologueSlice";
import { api } from "./services/apiSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      yourMonologues: yourMonologueSliceReducers,
      [api.reducerPath]: api.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(api.middleware),
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
