import { MapPositionBtnsProps } from "../../types/type";

function MapPositionBtns({
  myMarkerState,
  setSaveState,
  setIsSaved,
  getAddressHandle,
  getCurrentAddress,
}: MapPositionBtnsProps) {
  return (
    <div className="pointer-btn-wrap">
      <button
        className="pointer-btn"
        onClick={() => {
          setSaveState(myMarkerState);
          setIsSaved(true);
          getAddressHandle(myMarkerState.lat, myMarkerState.lng);
        }}
      >
        위치 저장
      </button>
      <button
        className="pointer-btn"
        onClick={() => {
          setIsSaved(false);
          getCurrentAddress();
        }}
      >
        현재 위치
      </button>
    </div>
  );
}

export default MapPositionBtns;
