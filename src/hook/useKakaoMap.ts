import { useEffect, useMemo, useRef, useState } from "react";
import { useMapStore, useStoreMarkersStore } from "../store/store";
import { storePositions } from "../temp/storeData";
import { debounce } from "./useDebounce";

// 지도 상태와 관련된 모든 로직 관리
export const useKakaoMap = () => {
  const [mapState, setMapState] = useState({
    center: {
      lat: 33.450701,
      lng: 126.570667,
    },
    address: "",
    errMsg: "",
  });

  const [myMarkerState, setMyMarkerState] = useState(mapState.center); // 내 위치
  const [isOpenStates, setIsOpenStates] = useState<Record<string, boolean>>(
    Object.fromEntries(storePositions.map((item) => [item.id, false]))
  ); // 마커 인포윈도우

  // const [visibleMarkers, setVisibleMarkers] = useState<StorePositionsType[]>(
  //   []
  // ); // 지도 영역에 포함되는 매장

  const { saveState, isSaved, setSaveState, setIsSaved } = useMapStore();
  const { storeMarkers, setStoreMarkers } = useStoreMarkersStore(); // 지도 영역에 포함되는 매장

  const mapRef = useRef<kakao.maps.Map | null>(null);

  useEffect(() => {
    if (window.kakao && window.kakao.maps) {
      if (isSaved && saveState.center) {
        setMyMarkerState(saveState.center);
        setMapState((prev) => ({
          ...prev,
          center: saveState.center,
        }));
        getAddressHandle(saveState.center.lat, saveState.center.lng);
      } else {
        getCurrentAddress();
      }
    } else {
      console.error("Kakao Maps API가 로드되지 않았습니다.");
    }

    // 화면 크기 변경 이벤트 처리
    const handleResize = debounce(() => {
      // 화면 크기 변경 시 지도 중심, 현위치 갱신
      if (mapRef.current) {
        const map = mapRef.current;
        centerChangeHandler(map); // 중심 변경 처리
        getCurrentAddress();
      }
    }, 300);

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
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

          setMyMarkerState(newCenter);
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
        const geocoder = new window.kakao.maps.services.Geocoder();
        geocoder.coord2Address(lng, lat, (result: any, status: string) => {
          if (status === kakao.maps.services.Status.OK) {
            const address = result[0].address.address_name;
            setMapState((prev) => ({
              ...prev,
              address,
            }));

            const region = address.split(" ")[2];
            const markers = storePositions.filter((item) => {
              return item.address.includes(region);
            });

            setStoreMarkers(markers);
          } else {
            setMapState((prev) => ({
              ...prev,
              address: "주소를 찾을 수 없습니다.",
            }));
          }
        });
      }, 300),
    []
  );

  // // 중심좌표 구하기
  const centerChangeHandler = (map: any) => {
    const newCenter = map.getCenter();
    const newPosition = {
      lat: newCenter.getLat(),
      lng: newCenter.getLng(),
    };

    setMyMarkerState(newPosition);
    setMapState((prev) => ({
      ...prev,
      center: newPosition,
    }));

    // 주소 검색 디바운스 처리
    getAddressHandle(newPosition.lat, newPosition.lng);
  };

  // 지도영역에 포함된 마커만 출력
  const onBoundsChangeHandler = (map: any) => {
    const bounds = map.getBounds(); // 지도 영역값 가져오기

    const filteredMarkers = storeMarkers.filter((marker) => {
      const markerLatLng = new kakao.maps.LatLng(
        Number(marker.lat),
        Number(marker.lng)
      );
      return bounds.contain(markerLatLng); // 지도 경계 내 포함 여부 확인
    });

    setStoreMarkers(filteredMarkers);
  };

  // 머신 마커 이미지 설정
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
      case "조이머신":
        return {
          src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxUxPdchLCrOSC1JGr73rAwrpxOPsdOQxwcQ&s",
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

  const clustererStyles = [
    {
      minWidth: "30px",
      height: "30px",
      padding: "0px 0.3em",
      color: "rgb(255, 255, 255)",
      lineHeight: "30px",
      textAlign: "center",
      borderRadius: "50%",
      backgroundColor: "rgb(50, 108, 249)",
      whiteSpace: "nowrap",
      // position: "relative",
    },
  ];

  return {
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
  };
};
