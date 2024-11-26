import { useState } from "react";
import { CustomOverlayMap, Map, Polygon } from "react-kakao-maps-sdk";

function Test() {
  const [isdrawing, setIsdrawing] = useState<any>(false);
  const [polygon, setPolygon] = useState<any>();
  const [paths, setPaths] = useState<any>([]);
  const [mousePosition, setMousePosition] = useState<any>({
    lat: 0,
    lng: 0,
  });

  const handleClick = (_map: any, mouseEvent: any) => {
    if (!isdrawing) {
      setPaths([]);
    }
    setPaths((prev: any) => [
      ...prev,
      {
        lat: mouseEvent.latLng.getLat(),
        lng: mouseEvent.latLng.getLng(),
      },
    ]);
    setIsdrawing(true);
  };

  const handleMouseMove = (_map: any, mouseEvent: any) => {
    setMousePosition({
      lat: mouseEvent.latLng.getLat(),
      lng: mouseEvent.latLng.getLng(),
    });
  };

  const handleRightClick = (_map: any, _mouseEvent: any) => {
    setIsdrawing(false);
  };

  return (
    <>
      {/* <CalculatePolygonAreaStyle /> */}
      <Map // 지도를 표시할 Container
        id={`map`}
        center={{
          // 지도의 중심좌표
          lat: 37.498004414546934,
          lng: 127.02770621963765,
        }}
        style={{
          // 지도의 크기
          width: "100%",
          height: "450px",
        }}
        level={3} // 지도의 확대 레벨
        onClick={handleClick}
        onRightClick={handleRightClick}
        onMouseMove={handleMouseMove}
      >
        <Polygon
          path={isdrawing ? [...paths, mousePosition] : paths}
          strokeWeight={3} // 선의 두께입니다
          strokeColor={"#00a0e9"} // 선의 색깔입니다
          strokeOpacity={1} // 선의 불투명도입니다 0에서 1 사이값이며 0에 가까울수록 투명합니다
          strokeStyle={"solid"} // 선의 스타일입니다
          fillColor={"#00a0e9"} // 채우기 색깔입니다
          fillOpacity={0.2} // 채우기 불투명도입니다
          onCreate={setPolygon}
        />
        {!isdrawing && paths.length > 2 && polygon && (
          <CustomOverlayMap position={paths[paths.length - 1]}>
            <div className="info">
              총면적{" "}
              <span className="number"> {Math.round(polygon.getArea())}</span> m
              <sup>2</sup>
            </div>
            '
          </CustomOverlayMap>
        )}
      </Map>
    </>
  );
}

export default Test;
