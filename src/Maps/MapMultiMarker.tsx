import { useEffect, useMemo, useState } from "react";
import { Map, MapMarker, MarkerClusterer } from "react-kakao-maps-sdk";
import DragMenu from "../DragMenu";
import { useMapStore } from "../store";
import { storePositions } from "../storeData";
import { StorePositionsType } from "../types/type";
import { debounce } from "../util/useDebounce";

function MapMultiMarker() {
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
  const [visibleMarkers, setVisibleMarkers] = useState<StorePositionsType[]>(
    []
  ); // 지도 영역에 포함되는 매장

  const { saveState, isSaved, setSaveState, setIsSaved } = useMapStore();

  // 컴포넌트 마운트 시 초기화
  useEffect(() => {
    // if (window.kakao && window.kakao.maps) {
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
    // }
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
            setVisibleMarkers(markers);
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

  // 중심좌표 구하기
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

    const filteredMarkers = visibleMarkers.filter((marker) => {
      const markerLatLng = new kakao.maps.LatLng(
        Number(marker.lat),
        Number(marker.lng)
      );
      return bounds.contain(markerLatLng); // 지도 경계 내 포함 여부 확인
    });

    setVisibleMarkers(filteredMarkers);
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
      minWidth: "20px",
      height: "30px",
      padding: "0px 5px",
      color: "rgb(255, 255, 255)",
      fontSize: "15px",
      lineHeight: "30px",
      textAlign: "center",
      borderRadius: "30px",
      backgroundColor: "rgb(50, 108, 249)",
      whiteSpace: "nowrap",
      position: "relative",
    },
  ];
  const onDragEnd = () => {
    console.log("드롭!!!!!!!!!!!!!!!!!!!!!!!!!");
  };
  return (
    <div className="map-wrap">
      <Map
        center={isSaved ? saveState.center : mapState.center}
        style={{
          // maxWidth: "800px",
          width: "100%",
          height: "80vh",
        }}
        level={7}
        onDragEnd={(map) => centerChangeHandler(map)}
        onBoundsChanged={(map) => onBoundsChangeHandler(map)}
      >
        <MarkerClusterer
          averageCenter={true}
          minLevel={3}
          styles={clustererStyles}
        >
          {visibleMarkers.map((item) => {
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
          })}
        </MarkerClusterer>
      </Map>

      <div className="pointer-btn-wrap">
        <button
          className="pointer-btn"
          onClick={() => {
            setSaveState(myMarkerState);
            setIsSaved(true);
            getAddressHandle(myMarkerState.lat, myMarkerState.lng);
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
      <DragMenu />
    </div>
  );
}

export default MapMultiMarker;
