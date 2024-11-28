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
  const markerImage = getMarkerImage(item.machine); // 머신 종류에 따른 이미지 가져오기

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
          <div style={{ minWidth: "250px", width: "100%" }}>
            <div
              style={{
                textAlign: "center",
                padding: "5px",
                color: "#000",
              }}
            >
              {item.storeName}
            </div>
          </div>
        )}
      </MapMarker>
    </div>
  );
}

export default MapStoreMarker;
