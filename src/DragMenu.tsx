import { useState } from "react";

function DragMenu() {
  const [storeData, setStoreData] = useState([
    {
      id: "1",
      storeName: "일팔이이칠",
      machine: "아이머신",
      lat: "37.50678475",
      lng: "127.0247075",
      address: "서울 강남구 강남대로118길 15 (논현동)",
    },
    {
      id: "2",
      storeName: "행복나누기(기숙사)(홍성)",
      machine: "아이머신",
      lat: "36.56031324",
      lng: "126.6876354",
      address: "충남 홍성군 홍동면 홍장북로 8-4",
    },
    {
      id: "3",
      storeName: "알리바바(평택신장동)",
      machine: "아이머신",
      lat: "37.0816121",
      lng: "127.0541813",
      address: "경기 평택시 목천로 5 (신장동)",
    },
    {
      id: "4",
      storeName: "드림싱어노래(대전가오동)",
      machine: "케이머신",
      lat: "36.30567834",
      lng: "127.4559046",
      address: "대전 동구 은어송로52번길 5-4 (가오동)",
    },
    {
      id: "5",
      storeName: "다있다아이스크림(개롱점)",
      machine: "아이머신",
      lat: "37.4986414",
      lng: "127.1365867",
      address: "서울 송파구 오금로 407 (오금동, 상아아파트)",
    },
  ]);

  return (
    <div className="menu-wrap">
      <div className="menu-btn">
        {storeData.map((item) => {
          return (
            <div key={item.id} className="store-info">
              <img
                src="https://pbs.twimg.com/media/D_j9rTBUYAA-_YW.jpg"
                alt="부리부리 임시 이미지 "
                className="store-img"
              />
              <div className="store-txt">
                <div>{item.storeName}</div>
                <div>{item.machine}</div>
                <div>{item.address}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default DragMenu;
// 드래그앤드롭 메뉴바
// 리스트 내에서 드래그할경우 삭제 버튼이나온다

// 드래그를 3등분으로 쪼개?
