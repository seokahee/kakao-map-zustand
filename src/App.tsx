import { useEffect, useMemo, useState } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import "./App.css";
import { useMapStore } from "./store";
import { debounce } from "./useDebounce";

function App() {
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
        geocoder.coord2Address(lng, lat, (result, status) => {
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

  // 지도 이동에 따른 마커 이동
  // const centerChangeHandler = useMemo(
  //   () =>
  //     debounce((map: any) => {
  //       const newCenter = map.getCenter();

  //       setMapState((prev) => ({
  //         ...prev,
  //         center: {
  //           lat: newCenter.getLat(),
  //           lng: newCenter.getLng(),
  //         },
  //       }));

  //       setMarkerState({
  //         lat: newCenter.getLat(),
  //         lng: newCenter.getLng(),
  //       });

  //       getAddressHandle(newCenter.getLat(), newCenter.getLng());
  //     }, 300),

  //   []
  // );

  // const centerChangeHandler = (map:any) => {
  //   const newCenter = map.getCenter();

  //   setMapState((prev) => ({
  //     ...prev,
  //     center: {
  //       lat: newCenter.getLat(),
  //       lng: newCenter.getLng(),
  //     },
  //   }));

  //   setMarkerState({
  //     lat: newCenter.getLat(),
  //     lng: newCenter.getLng(),
  //   });

  //   getAddressHandle(newCenter.getLat(), newCenter.getLng());
  // };

  const centerChangeHandler = (map: any) => {
    const newCenter = map.getCenter();
    const newPosition = {
      lat: newCenter.getLat(),
      lng: newCenter.getLng(),
    };

    // 마커 위치 즉시 업데이트
    setMarkerState(newPosition);
    setMapState((prev) => ({
      ...prev,
      center: newPosition,
    }));

    // 주소 검색은 디바운스 처리
    getAddressHandle(newPosition.lat, newPosition.lng);
  };

  // 왜 콜백으로 감싸면 오류가날까?
  // const centerChangeHandler = useCallback(
  //   () =>
  //     debounce((map: any) => {
  //       const newCenter = map.getCenter();
  //       setMapState((prev) => ({
  //         ...prev,
  //         center: {
  //           lat: newCenter.getLat(),
  //           lng: newCenter.getLng(),
  //         },
  //       }));
  //     }, 300),

  //   []
  // );
  const handleSaveLocation = () => {
    setSaveState(markerState);
    setIsSaved(true);
    getAddressHandle(markerState.lat, markerState.lng);
  };

  const currentLocation = () => {
    setIsSaved(false);
    getCurrentAddress();
  };

  return (
    <div>
      <button onClick={handleSaveLocation}>위치 저장</button>
      <button onClick={currentLocation}>현재 위치</button>
      <Map
        center={isSaved ? saveState.center : mapState.center}
        style={{
          width: "100%",
          height: "100vh",
        }}
        level={3}
        onCenterChanged={(map) => centerChangeHandler(map)}
      >
        <MapMarker position={markerState}>
          <div
            style={{
              display: "inline",
              padding: "10px",
              color: "#000",
            }}
          >
            {mapState.errMsg ? mapState.errMsg : mapState.address}
          </div>
        </MapMarker>
      </Map>
    </div>
  );
}

export default App;
// 현재 위치 버튼 클릭 시 깜빡임
// 스타일 미적용
