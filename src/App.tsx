import { useEffect, useMemo, useState } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import "./App.css";
import { useMapStore } from "./store";

function App() {
  const [initialState, setInitialState] = useState({
    center: {
      lat: 33.450701,
      lng: 126.570667,
    },
    errMsg: "",
    address: "",
  });

  const { saveState, errMsg, address, setSaveState, setErrMsg, setAddress } =
    useMapStore();

  console.log("initialState", initialState);
  console.log("saveState", saveState);

  // 컴포넌트 렌더링 시 현 위치로 마커 이동
  useEffect(() => {
    getCurrentAddress();
  }, []);

  const getCurrentAddress = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newCenter = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setInitialState((prev) => ({
            ...prev,
            center: newCenter,
          }));

          getAddressHandle(newCenter.lat, newCenter.lng);
        },
        (err) => {
          setInitialState((prev) => ({ ...prev, errMsg: err.message }));
        }
      );
    } else {
      setInitialState((prev) => ({
        ...prev,
        errMsg: "현재 위치를 찾을 수 없습니다.",
      }));
    }
  };

  // 좌표를 주소로 변환
  const getAddressHandle = (lat: number, lng: number) => {
    const geocoder = new window.kakao.maps.services.Geocoder();
    geocoder.coord2Address(lng, lat, (result, status) => {
      if (status === kakao.maps.services.Status.OK) {
        const address = result[0].address.address_name;
        setInitialState((prev) => ({
          ...prev,
          address,
        }));
      } else {
        setInitialState((prev) => ({
          ...prev,
          address: "주소를 찾을 수 없습니다.",
        }));
      }
    });
  };

  // 디바운스
  const debounce = <T extends (...args: any[]) => any>(
    fn: T,
    delay: number
  ) => {
    let timeout: ReturnType<typeof setTimeout>;

    return (...args: Parameters<T>) => {
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(() => {
        fn(...args);
      }, delay);
    };
  };

  // 지도 이동에 따른 마커 이동
  // const centerChangeHandler = useMemo(
  //   () =>
  //     debounce((map: any) => {
  //       const newCenter = map.getCenter();

  //       // if (saveState.isSave === false) {
  //       setInitialState((prev) => ({
  //         ...prev,
  //         center: {
  //           lat: newCenter.getLat(),
  //           lng: newCenter.getLng(),
  //         },
  //       }));
  //       // }

  //       // if (saveState.isSave === true) {
  //       setSaveState(
  //         { lat: newCenter.getLat(), lng: newCenter.getLng() },
  //         true
  //       );
  //       // }

  //       getAddressHandle(newCenter.getLat(), newCenter.getLng());
  //     }, 300),

  //   []
  // );

  const centerChangeHandler = (map: any) => {
    const newCenter = map.getCenter();

    // if (saveState.isSave === false) {
    setInitialState((prev) => ({
      ...prev,
      center: {
        lat: newCenter.getLat(),
        lng: newCenter.getLng(),
      },
    }));
    // }

    // if (saveState.isSave === true) {
    setSaveState({ lat: newCenter.getLat(), lng: newCenter.getLng() }, true);
    // }

    getAddressHandle(newCenter.getLat(), newCenter.getLng());
  };

  // 왜 콜백으로 감싸면 오류가날까?
  // const centerChangeHandler = useCallback(
  //   () =>
  //     debounce((map: any) => {
  //       const newCenter = map.getCenter();
  //       setInitialState((prev) => ({
  //         ...prev,
  //         center: {
  //           lat: newCenter.getLat(),
  //           lng: newCenter.getLng(),
  //         },
  //       }));
  //     }, 300),

  //   []
  // );

  return (
    <div>
      <button onClick={() => setSaveState(saveState.center, true)}>
        위치 저장
      </button>
      <button onClick={() => getCurrentAddress()}>현재 위치</button>
      <Map
        center={saveState.isSave ? saveState.center : initialState.center}
        style={{
          width: "100%",
          height: "100vh",
        }}
        level={3}
        onCenterChanged={(map) => centerChangeHandler(map)}
      >
        <MapMarker
          position={saveState.isSave ? saveState.center : initialState.center}
        >
          <div
            style={{
              display: "inline",
              padding: "10px",
              color: "#000",
            }}
          >
            {initialState.errMsg ? initialState.errMsg : initialState.address}
          </div>
        </MapMarker>
      </Map>
    </div>
  );
}

export default App;
// 지도랑 마커는 별개로생각하고, 지도가 이동할때 마커는 고정으로 딸려가야한다
// 현재 위치돌아오기 미구현
// 위치 저장 시 내가 꽂은 위치가 아닌 다른 위치로 저장되는 문제
