import { useEffect, useMemo, useState } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import { useMapStore } from "../store";
import { storePositions } from "../storeData";
import { StorePositionsType } from "../type";
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
  // const [filteredMarkers, setFilteredMarkers] = useState(storePositions);

  const [myMarkerState, setMyMarkerState] = useState(mapState.center);
  // const [storeMarkerState, setStoreMarkerState] = useState(mapState.center);
  const [isOpenStates, setIsOpenStates] = useState<Record<string, boolean>>(
    Object.fromEntries(storePositions.map((item) => [item.id, false]))
  );
  const [visibleMarkers, setVisibleMarkers] = useState<StorePositionsType[]>(
    []
  );
  const { saveState, isSaved, setSaveState, setIsSaved } = useMapStore();

  // 컴포넌트 마운트 시 초기화
  useEffect(() => {
    if (isSaved && saveState.center) {
      // setStoreMarkerState(saveState.center);
      setMyMarkerState(saveState.center);
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

          // setStoreMarkerState(newCenter);
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
        // console.log("주소 변환 요청:", lat, lng);
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

            // console.log(region);
            // console.log(
            //   "markers",
            //   storePositions.map((item) => item.address.includes(region)),
            //   markers
            // );
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

    // setStoreMarkerState(newPosition);
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

    // console.log("bounds", bounds);

    const filteredMarkers = visibleMarkers.filter((marker) => {
      const markerLatLng = new kakao.maps.LatLng(
        Number(marker.lat),
        Number(marker.lng)
      );
      return bounds.contain(markerLatLng); // 지도 경계 내 포함 여부 확인
    });

    setVisibleMarkers(filteredMarkers);

    // console.log(
    //   "Visible Markers:",
    //   `${visibleMarkers.length}개`,
    //   visibleMarkers
    // );
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

  // const isDragging = useRef(false);

  // 드롭 이벤트로 드롭 시 마커 표시되게
  return (
    <div className="map-wrap">
      <Map
        center={isSaved ? saveState.center : mapState.center}
        style={{
          // maxWidth: "800px",
          width: "100%",
          height: "80vh",
        }}
        level={4}
        // onDragStart={() => {
        //   isDragging.current = true;
        //   setVisibleMarkers([]);
        // }}
        onDragEnd={(map) => centerChangeHandler(map)}
        // onCenterChanged={(map) => centerChangeHandler(map)}
        onBoundsChanged={(map) => onBoundsChangeHandler(map)}
      >
        {visibleMarkers.map((item) => {
          const lat = Number(item.lat);
          const lng = Number(item.lng);
          const markerImage = getMarkerImage(item.machine); // 머신 종류에 따른 이미지 가져오기

          return (
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
          );
        })}

        {/* <CustomOverlayMap position={storeMarkerState} yAnchor={1}>
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
        <button className="pointer-btn"> 내 위치 마커</button>
      </div>
    </div>
  );
}

export default MapMultiMarker;
// 마커 겹침 문제
// 마우스 이동 시 지도 영역에 마커가 들어오면 출력하고싶은데 어떤건 이동중에도 나오고 , 어떤건 내려놔야나온다

// 현재 내 위치 마커 다시 표시하기

// 클러스터 (영역 분리 확실하게 구분되도록 작업 ex 다방)

// 그 외
// 드롭슬라이드 메뉴
// 드롭시 삭제버튼이 오른쪽에 나오게

// 완료 목록
// 지도 영역에 존재하는 마커 출력
//  - 마우스 이동 완료 후 마커가 출력되는 형식
//  - 지도 중심 좌표 주소 변환 후 마커 필터링으로 로딩 속도 향상
//  - 지도 영역 변경 시 드롭 상태에 마커 생성
