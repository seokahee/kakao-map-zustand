import { useEffect, useRef } from "react";

// state 미사용 useRef로 지도, 마커 출력만 완료
function MapBasic() {
  const mapRef = useRef(null);
  const { kakao } = window;

  const position = new kakao.maps.LatLng(37.50678475, 127.0247075);
  const mapOptions = {
    center: position,
    level: 3,
  };

  useEffect(() => {
    const map = new kakao.maps.Map(mapRef.current, mapOptions);
    const marker = new kakao.maps.Marker({ position });

    const content = `
    <div class="customoverlay">
      <span>마커</span>
    </div>`;

    new kakao.maps.CustomOverlay({
      map,
      position,
      content,
    });

    // 마커가 지도 위에 표시되도록 설정
    marker.setMap(map);
  }, []);
  return (
    <div
      id="map"
      ref={mapRef}
      style={{ width: "100%", height: "350px", display: "block" }}
    ></div>
  );
}

export default MapBasic;
