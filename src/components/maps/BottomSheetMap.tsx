// import { Map, MarkerClusterer } from "react-kakao-maps-sdk";
// import { useKakaoMap } from "../../hook/useKakaoMap";
// import MapPositionBtns from "./MapPositionBtns";
// import MapStoreMarker from "./MapStoreMarker";
// import BottomSheet from "../bottomSheet/BottomSheet";

// function BottomSheetMap() {
//   const {
//     myMarkerState,
//     isOpenStates,
//     setIsOpenStates,
//     storeMarkers,
//     saveState,
//     isSaved,
//     setSaveState,
//     setIsSaved,
//     getCurrentAddress,
//     getAddressHandle,
//     centerChangeHandler,
//     onBoundsChangeHandler,
//     getMarkerImage,
//     clustererStyles,
//   } = useKakaoMap(); // 카카오 맵

//   return (
//     <div className="wrap">
//       <Map
//         center={isSaved ? saveState.center : myMarkerState}
//         level={7}
//         onDragEnd={(map) => centerChangeHandler(map)}
//         onBoundsChanged={(map) => onBoundsChangeHandler(map)}
//         className="map"
//       >
//         <MarkerClusterer
//           averageCenter={true}
//           minLevel={3}
//           styles={clustererStyles}
//         >
//           {storeMarkers.map((item) => (
//             <MapStoreMarker
//               key={item.id}
//               item={item}
//               isOpenStates={isOpenStates}
//               setIsOpenStates={setIsOpenStates}
//               getMarkerImage={getMarkerImage}
//             />
//           ))}
//         </MarkerClusterer>
//       </Map>
//       <MapPositionBtns
//         myMarkerState={myMarkerState}
//         setSaveState={setSaveState}
//         setIsSaved={setIsSaved}
//         getAddressHandle={getAddressHandle}
//         getCurrentAddress={getCurrentAddress}
//       />
//       <BottomSheet />
//     </div>
//   );
// }

// export default BottomSheetMap;

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
  } = useKakaoMap(); // 카카오 맵

  return (
    <div className="wrap">
      <Map
        center={isSaved ? saveState.center : myMarkerState}
        level={7}
        ref={mapRef}
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
