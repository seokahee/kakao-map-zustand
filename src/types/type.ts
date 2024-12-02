export type StorePositionsType = {
  id: string;
  storeName: string;
  machine: string;
  lat: string | number;
  lng: string | number;
  address: string;
};

export type LatLngType = {
  lat: number;
  lng: number;
};

export type MapType = {
  center: LatLngType;
  address: string;
  errMsg: string;
};

export type MAX_YSheetMetrics = {
  touchStart: {
    sheetY: number;
    touchY: number;
  };
  touchMove: {
    prevTouchY?: number;
    movingDirection: "none" | "down" | "up";
  };
  isContentAreaTouched: boolean;
};

export type MapStoreMarkerPropsType = {
  item: StorePositionsType;
  isOpenStates: Record<string, boolean>;
  setIsOpenStates: React.Dispatch<
    React.SetStateAction<Record<string, boolean>>
  >; // 상태 업데이트 함수
  getMarkerImage: (machineType: string) => {
    src: string;
    size: { width: number; height: number };
    options: { offset: { x: number; y: number } };
  };
};

export type MapPositionBtnsProps = {
  myMarkerState: LatLngType;
  setSaveState: (center: { lat: number; lng: number }) => void;
  setIsSaved: (isSaved: boolean) => void;
  getAddressHandle: (lat: number, lng: number) => void;
  getCurrentAddress: () => void;
};
