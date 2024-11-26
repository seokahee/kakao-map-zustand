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

// 매장 데이터가 4000개 정도 되는데 지도 영역 안에 마커를 찍어야하는 매장인지 4000번 반복해서 찾으면 오래걸리니깐

// 매장 중심지의 주소를 알아내서 그 주소로 한번 필터 (지도 중심 주소가 성남시이면 성남시 매장으로만 필터)

// 그래서 한번 걸러진 데이터를 가지고 마커 찍기

// 데이터상으로는 성남시 매장은 175개가 나오니 실제로 연산이 4000번에서 175번으로 줄어드는것

// 중심좌표 함수도 있고
// 주소 변환 함수도있어
// 그럼 이동할때마다 중심좌표랑 영역값가져와

// 1. 중심 좌표 기준 주소 변환
// 2. 마커 주소와 중심 주소 비교 필터
// 3. 필터된 데이터로 영역 마커 필터
