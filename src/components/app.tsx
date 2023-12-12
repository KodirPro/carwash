"use client";

import { Screen, StateProvider } from ".";
import { IData } from "./types";

export const App = ({ data }: { data: IData }) => {
  return (
    <StateProvider>
      <Screen data={data} />
    </StateProvider>
  );
};
