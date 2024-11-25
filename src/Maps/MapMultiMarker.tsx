import { useEffect, useMemo, useState } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import { useMapStore } from "../store";
import { storePositions } from "../storeData";
import { debounce } from "../useDebounce";

function MapMultiMarker() {
  const [mapState, setMapState] = useState({
    center: {
      lat: 33.450701,
      lng: 126.570667,
    },
    address: "",
    errMsg: "",
  });
  const [markerState, setMarkerState] = useState(mapState.center);
  const [storeMarkerState, setStoreMarkerState] = useState(storePositions);
  const [isOpenStates, setIsOpenStates] = useState<Record<string, boolean>>(
    Object.fromEntries(storePositions.map((item) => [item.id, false]))
  );

  const { saveState, isSaved, setSaveState, setIsSaved } = useMapStore();

  // 컴포넌트 마운트 시 초기화
  useEffect(() => {
    if (isSaved && saveState.center) {
      setMarkerState(saveState.center);
      setMapState((prev) => ({
        ...prev,
        center: saveState.center,
      }));
      getAddressHandle(saveState.center.lat, saveState.center.lng);
    } else {
      getCurrentAddress();
    }
  }, []);

  // 현재 위치 가져오기
  const getCurrentAddress = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newCenter = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };

          setMapState((prev) => ({
            ...prev,
            center: newCenter,
          }));

          setMarkerState(newCenter);
          getAddressHandle(newCenter.lat, newCenter.lng);
        },
        (err) => {
          setMapState((prev) => ({ ...prev, errMsg: err.message }));
        }
      );
    } else {
      setMapState((prev) => ({
        ...prev,
        errMsg: "현재 위치를 찾을 수 없습니다.",
      }));
    }
  };

  // 좌표를 주소로 변환
  const getAddressHandle = useMemo(
    () =>
      debounce((lat: number, lng: number) => {
        // console.log("주소 변환 요청:", lat, lng);
        const geocoder = new window.kakao.maps.services.Geocoder();
        geocoder.coord2Address(lng, lat, (result: any, status: any) => {
          if (status === kakao.maps.services.Status.OK) {
            const address = result[0].address.address_name;
            setMapState((prev) => ({
              ...prev,
              address,
            }));
          } else {
            setMapState((prev) => ({
              ...prev,
              address: "주소를 찾을 수 없습니다.",
            }));
          }
        });
      }, 300),
    [isSaved]
  );

  const centerChangeHandler = (map: any) => {
    const newCenter = map.getCenter();
    const newPosition = {
      lat: newCenter.getLat(),
      lng: newCenter.getLng(),
    };

    setMarkerState(newPosition);
    setMapState((prev) => ({
      ...prev,
      center: newPosition,
    }));

    // 주소 검색 디바운스 처리
    getAddressHandle(newPosition.lat, newPosition.lng);
  };

  // 머신 볗 마커 이미지 설정
  const getMarkerImage = (machineType: string) => {
    switch (machineType) {
      case "아이머신":
        return {
          src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGmkjuCUStRkZCr_t6i4sm1BVpvUfT8dPhMQ&s",
          size: { width: 32, height: 32 },
          options: { offset: { x: 16, y: 32 } },
        };
      case "케이머신":
        return {
          src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSC2ipsBLzm7rx3hFc3KHfZPw0AZFFpMH_Y7Q&s",
          size: { width: 32, height: 32 },
          options: { offset: { x: 16, y: 32 } },
        };
      case "멀티머신":
        return {
          src: "https://play-lh.googleusercontent.com/q8Bo5joSXW_ahRPpfvzlBGyRwRfDEjBEevOU496rLt54upZ_dbs9zTo9wUCMkmoBYx4=w240-h480-rw",
          size: { width: 32, height: 32 },
          options: { offset: { x: 16, y: 32 } },
        };
      default:
        return {
          src: "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png", // 기본 이미지
          size: { width: 32, height: 32 },
          options: { offset: { x: 16, y: 32 } },
        };
    }
  };

  return (
    <div className="map-wrap">
      <Map
        center={isSaved ? saveState.center : mapState.center}
        style={{
          maxWidth: "800px",
          width: "100%",
          height: "80vh",
        }}
        level={3}
        onCenterChanged={(map) => centerChangeHandler(map)}
      >
        {storeMarkerState.map((item) => {
          const lat = Number(item.lat);
          const lng = Number(item.lng);
          return (
            <MapMarker
              key={`${item.id}`}
              position={{ lat, lng }}
              // image={{
              //   src: "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png",
              //   size: {
              //     width: 24,
              //     height: 35,
              //   },
              //   options: {
              //     offset: {
              //       x: 27,
              //       y: 80,
              //     },
              //   },
              // }}
              clickable={true} // 마커를 클릭했을 때 지도의 클릭 이벤트가 발생하지 않도록 설정합니다
              onClick={() =>
                setIsOpenStates((prev) => ({
                  ...prev,
                  [item.id]: true,
                }))
              }
            >
              {isOpenStates[item.id] && (
                <div style={{ minWidth: "150px" }}>
                  <img
                    alt="close"
                    width="14"
                    height="13"
                    src="https://t1.daumcdn.net/localimg/localimages/07/mapjsapi/2x/bt_close.gif"
                    style={{
                      position: "absolute",
                      right: "5px",
                      top: "5px",
                      cursor: "pointer",
                    }}
                    onClick={() =>
                      setIsOpenStates((prev) => ({
                        ...prev,
                        [item.id]: false,
                      }))
                    }
                  />
                  <div style={{ padding: "5px", color: "#000" }}>
                    {item.storeName}
                  </div>
                </div>
              )}
            </MapMarker>
          );
        })}

        {/* <CustomOverlayMap position={markerState} yAnchor={1}>
          <div
            style={{
              backgroundColor: "#fff",
              padding: "10px",
              border: "1px solid #ddd",
              boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.2)",
            }}
          >
            {mapState.errMsg ? mapState.errMsg : mapState.address}
          </div>
        </CustomOverlayMap> */}
      </Map>
      <div className="pointer-btn-wrap">
        <button
          className="pointer-btn"
          onClick={() => {
            setSaveState(markerState);
            setIsSaved(true);
            getAddressHandle(markerState.lat, markerState.lng);
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
    </div>
  );
}

export default MapMultiMarker;
// 매장 위치마다 마커 띄우기 -완
// 마커 클릭 시 해당 위치로 확대되기?
// 각 머신마다 다른 다른 마커 이미지 씌우기
// 마커 클릭 시 인포윈도우 여닫기 -완
