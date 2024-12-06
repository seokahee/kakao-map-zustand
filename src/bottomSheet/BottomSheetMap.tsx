import { Map, MarkerClusterer } from "react-kakao-maps-sdk";
import MapPositionBtns from "../maps/MapPositionBtns";
import MapStoreMarker from "../maps/MapStoreMarker";
import { useKakaoMap } from "../util/useKakaoMap";
import BottomSheet from "./BottomSheet";

function BottomSheetMap() {
  const {
    myMarkerState,
    isOpenStates,
    setIsOpenStates,
    storeMarkers,
    saveState,
    isSaved,
    setSaveState,
    setIsSaved,
    getCurrentAddress,
    getAddressHandle,
    centerChangeHandler,
    onBoundsChangeHandler,
    getMarkerImage,
    clustererStyles,
  } = useKakaoMap(); // 카카오 맵

  return (
    <div className="wrap">
      {/* <div className="map-wrap"> */}
      <Map
        center={isSaved ? saveState.center : myMarkerState}
        level={7}
        onDragEnd={(map) => centerChangeHandler(map)}
        onBoundsChanged={(map) => onBoundsChangeHandler(map)}
        className="map"
      >
        <MarkerClusterer
          averageCenter={true}
          minLevel={3}
          styles={clustererStyles}
        >
          {storeMarkers.map((item) => (
            <MapStoreMarker
              key={item.id}
              item={item}
              isOpenStates={isOpenStates}
              setIsOpenStates={setIsOpenStates}
              getMarkerImage={getMarkerImage}
            />
          ))}
        </MarkerClusterer>
      </Map>
      <MapPositionBtns
        myMarkerState={myMarkerState}
        setSaveState={setSaveState}
        setIsSaved={setIsSaved}
        getAddressHandle={getAddressHandle}
        getCurrentAddress={getCurrentAddress}
      />
      {/* </div> */}
      <BottomSheet />
    </div>
  );
}

export default BottomSheetMap;
