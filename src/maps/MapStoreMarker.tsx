import { MapMarker } from "react-kakao-maps-sdk";
import { MapStoreMarkerPropsType } from "../types/type";

function MapStoreMarker({
  item,
  isOpenStates,
  setIsOpenStates,
  getMarkerImage,
}: MapStoreMarkerPropsType) {
  const lat = Number(item.lat);
  const lng = Number(item.lng);
  const markerImage = getMarkerImage(item.machine);

  return (
    <div>
      <MapMarker
        key={item.id}
        position={{ lat, lng }}
        image={markerImage}
        clickable={true}
        onMouseOver={() =>
          setIsOpenStates((prev) => ({
            ...prev,
            [item.id]: true,
          }))
        }
        onMouseOut={() =>
          setIsOpenStates((prev) => ({
            ...prev,
            [item.id]: false,
          }))
        }
      >
        {isOpenStates[item.id] && (
          <div className="info-window-div">{item.storeName}</div>
        )}
      </MapMarker>
    </div>
  );
}

export default MapStoreMarker;
