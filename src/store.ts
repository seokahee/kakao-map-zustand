import { create } from "zustand";
import { persist } from "zustand/middleware";

type MapType = {
  saveState: {
    center: {
      lat: number;
      lng: number;
    };
  };
  isSaved: boolean;
  setSaveState: (center: { lat: number; lng: number }) => void;
  setIsSaved: (isSaved: boolean) => void;
};

export const useMapStore = create(
  persist<MapType>(
    (set, _) => ({
      saveState: {
        center: {
          lat: 33.450701,
          lng: 126.570667,
        },
      },
      isSaved: false,

      setSaveState: (center: { lat: number; lng: number }) => {
        set({
          saveState: {
            center: { lat: center.lat, lng: center.lng },
          },
        });
      },
      setIsSaved: (isSaved: boolean) => {
        set({
          isSaved,
        });
      },
    }),
    {
      name: "saveState",
    }
  )
);
