import { Map, MarkerClusterer } from "react-kakao-maps-sdk";
import { useKakaoMap } from "../../hook/useKakaoMap";
import BottomSheet from "../bottomSheet/BottomSheet";
import MapPositionBtns from "./MapPositionBtns";
import MapStoreMarker from "./MapStoreMarker";

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
    mapRef,
  } = useKakaoMap();

  return (
    <div className="wrap">
      <Map
        ref={mapRef}
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
      <BottomSheet />
    </div>
  );
}

export default BottomSheetMap;
