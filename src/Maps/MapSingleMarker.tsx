import { useEffect, useMemo, useState } from "react";
import { CustomOverlayMap, Map, MapMarker } from "react-kakao-maps-sdk";
import { useMapStore } from "../store";
import { debounce } from "../useDebounce";

// 단일 마커
// 위치 저장, 현위치 복귀
// 커스텀 오버레이 적용
function MapSingleMarker() {
  const [mapState, setMapState] = useState({
    center: {
      lat: 33.450701,
      lng: 126.570667,
    },
    address: "",
    errMsg: "",
  });
  const [markerState, setMarkerState] = useState(mapState.center);
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
        console.log("주소 변환 요청:", lat, lng);
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

  const saveLocationHandler = () => {
    setSaveState(markerState);
    setIsSaved(true);
    getAddressHandle(markerState.lat, markerState.lng);
  };

  const currentLocation = () => {
    setIsSaved(false);
    getCurrentAddress();
  };

  return (
    <div className="map-wrap">
      {/* <KakaoMap></KakaoMap> */}
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
        <MapMarker
          position={markerState}
          image={{
            src: "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png", // 마커이미지의 주소입니다
            size: {
              width: 24,
              height: 35,
            }, // 마커이미지의 크기입니다
            options: {
              offset: {
                x: 20,
                y: 60,
              }, // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
            },
          }}
        ></MapMarker>

        <CustomOverlayMap position={markerState} yAnchor={1}>
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
        </CustomOverlayMap>
      </Map>
      <div className="pointer-btn-wrap">
        <button className="pointer-btn" onClick={saveLocationHandler}>
          위치 저장
        </button>
        <button className="pointer-btn" onClick={currentLocation}>
          현재 위치
        </button>
      </div>
    </div>
  );
}

export default MapSingleMarker;
