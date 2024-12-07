import { create } from "zustand";
import { persist } from "zustand/middleware";
import { StorePositionsType } from "../types/kakaoMap";

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
    (set) => ({
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

type StoreMarkerType = {
  storeMarkers: StorePositionsType[];
  setStoreMarkers: (storeMarkers: StorePositionsType[]) => void;
};

// export const useStoreMarkersStore = create<StoreMarkerType>((set) => ({
//   storeMarkers: [],
//   setStoreMarkers: (storeMarkers: StorePositionsType[]) => {
//     set({
//       storeMarkers,
//     });
//   },
// }));

export const useStoreMarkersStore = create<StoreMarkerType>((set) => ({
  storeMarkers: [],
  setStoreMarkers: (storeMarkers: StorePositionsType[] | any[]) => {
    set({
      storeMarkers,
    });
  },
}));

// type StoreMarkerType = {
//   storeMarkers: StorePositionsType[];
//   setStoreMarkers: (storeMarkers: StorePositionsType[]) => void;
// };

// export const useStoreMarkersStore = create(
//   persist<StoreMarkerType>(
//     (set) => ({
//       storeMarkers: [],
//       setStoreMarkers: (storeMarkers: StorePositionsType[]) => {
//         set({
//           storeMarkers,
//         });
//       },
//     }),
//     {
//       name: "saveIndex",
//     }
//   )
// );
