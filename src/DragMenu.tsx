import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

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
    {
      id: "1033",
      storeName: "샵코인노래연습장(부천조마루)",
      machine: "케이머신",
      lat: "37.50036928",
      lng: "126.7759033",
      address: "경기 부천시 조마루로297번길 61",
    },
    {
      id: "1034",
      storeName: "비지트Comic&OTTCafe",
      machine: "멀티머신",
      lat: "36.48459192",
      lng: "127.2524926",
      address: "세종특별자치시 새롬중앙로 34 (새롬동)",
    },
    {
      id: "1035",
      storeName: "코로코(카카오스크린골프)",
      machine: "멀티머신",
      lat: "37.40422342",
      lng: "127.2340903",
      address: "경기 광주시 경충대로 1845 (장지동)",
    },
    {
      id: "1036",
      storeName: "크리드코인(안양호계동)",
      machine: "케이머신",
      lat: "37.36374",
      lng: "126.9603957",
      address: "경기 안양시 동안구 경수대로 454 (호계동)",
    },
    {
      id: "1037",
      storeName: "락휴코인(건대입구역점)-A",
      machine: "케이머신",
      lat: "37.54087789",
      lng: "127.0707809",
      address: "서울 광진구 능동로 109 (화양동)",
    },
  ]);

  const onDragEnd = (result: any) => {
    // 드래그 종료 시의 동작을 정의할 수 있음
    if (!result.destination) return;

    const items = Array.from(storeData);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setStoreData(items);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable">
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="menu-wrap"
          >
            {storeData.map((item, index) => {
              return (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="store-info"
                    >
                      <img
                        src="https://i.namu.wiki/i/cRmy09fCmil6W_AKYhSNoAluIvm1gNrmGBpLacGMeef8RW4CXohhn9dC-Q8zP5RjiTvErkfQ1Z3vZUpaiFe1ig.gif"
                        alt="부리부리 임시 이미지 "
                        className="store-img"
                      />
                      <div>
                        <div>{item.storeName}</div>
                        <div>{item.machine}</div>
                        <div>{item.address}</div>
                      </div>
                    </div>
                  )}
                </Draggable>
              );
            })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default DragMenu;

// 드래그앤드롭 메뉴바
// 리스트 내에서 드래그할경우 삭제 버튼이나온다

// 드래그를 3등분으로 쪼개?
