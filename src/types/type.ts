export type StorePositionsType = {
  id: string;
  storeName: string;
  machine: string;
  lat: string | number;
  lng: string | number;
  address: string;
};

export type LatLngType = {
  lat: number;
  lng: number;
};

export type MapType = {
  center: LatLngType;
  address: string;
  errMsg: string;
};

// 그 외
// 드롭슬라이드 메뉴
// 드롭시 삭제버튼이 오른쪽에 나오게

// 완료 목록
// - 마커 클러스터 적용
// - 카카오 지도 함수 유틸 파일로 분리
