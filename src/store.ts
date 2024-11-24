import { create } from "zustand";
import { persist } from "zustand/middleware";

type MapType = {
  saveState: {
    center: {
      lat: number;
      lng: number;
    };
    isSave: boolean;
  };
  errMsg: string;
  address: string;
  setSaveState: (center: { lat: number; lng: number }, isSave: boolean) => void;
  setErrMsg: (errMsg: string) => void;
  setAddress: (address: string) => void;
};

export const useMapStore = create(
  persist<MapType>(
    (set, _) => ({
      saveState: {
        center: {
          lat: 33.450701,
          lng: 126.570667,
        },
        isSave: false,
      },
      errMsg: "",
      address: "",

      setSaveState: (center: { lat: number; lng: number }, isSave: boolean) => {
        set({
          saveState: {
            center: { lat: center.lat, lng: center.lng },
            isSave,
          },
        });
      },

      setErrMsg: (errMsg: string) =>
        set(() => ({
          errMsg: "",
        })),
      setAddress: (address: string) =>
        set(() => ({
          address: "",
        })),
    }),
    {
      name: "saveState",
    }
  )
);
