import { useState } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { Map, MapMarker, MarkerClusterer } from "react-kakao-maps-sdk";
import { useMap } from "../util/useMap";

function DragMap() {
  const {
    myMarkerState,
    isOpenStates,
    setIsOpenStates,
    visibleMarkers,
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
  } = useMap(); // 카카오 맵

  const [menuHeight, setMenuHeight] = useState(50); // 메뉴의 초기 높이
  const [isDragging, setIsDragging] = useState(false); // 드래그 중인지 여부

  const onDragEnd = () => {
    console.log("드롭!!!!!!!!!!!!!!!!!!!!!!!!!");
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="map-wrap">
        <div className="map-container">
          <Map
            center={isSaved ? saveState.center : myMarkerState}
            style={{
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
        </div>

        <Droppable droppableId="drop-menu">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="menu-btn"
            >
              <div className="menu-btn">메뉴 버튼</div>

              {/* <DragMenu /> */}

              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    </DragDropContext>
  );
}

export default DragMap;
