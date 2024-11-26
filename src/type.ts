export type StorePositionsType = {
  id: string;
  storeName: string;
  machine: string;
  lat: string | number;
  lng: string | number;
  address: string;
};

// 마우스를 올리면 해당 마커의 z-index 위로 올라옴
// 그리고 어떤 마커에 마우스를 올렸는지 인포인도우를 통해 확인 가능
// 클릭하면 해당 마커를 선택했음을 직관적으로 알 수 있게 마커가 생김

// 카카오지도는 내 위치 마커가 찍히고
// 내 근처 영역이 드로잉으로 표시됨

// 마커들이 나랑 까꿍놀이해요
