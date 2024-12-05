import React from "react";

// function Basic() {

//   const { storeMarkers, setStoreMarkers } = useStoreMarkersStore();

//   const [draggedItems, setDraggedItems] = useState<Set<string>>(new Set()); // 아이템 드래그 상태
//   const [dragStart, setDragStart] = useState(0); // 초기 드래그 X좌표

//   const dragX = useRef<HTMLDivElement | null>(null);

//   const onPointerDown = () => {
//     setIsMotion(false); // 부모 모션 비활성화
//   };

//   const onDragStart = (e: React.DragEvent<HTMLDivElement>, id: string) => {
//     dragX.current = e.currentTarget; // dragX에 현재 요소 할당
//     setDragStart(e.clientX); // 드래그 시작 위치 설정
//     if (dragStart) {
//       dragX.current.classList.remove("drag-left");
//     }
//   };

//   const onDrag = (e: React.DragEvent<HTMLDivElement>, id: string) => {
//     if (!dragX.current) return;
//   };

//   const onDragEnd = (e: React.DragEvent<HTMLDivElement>, id: string) => {
//     if (!dragX.current) return;

//     // 드래그 거리 계산 (드래그 길이 - 드래그 시작지점 = 왼쪽(음수) 오른쪽(양수)가 나옴)
//     const offsetX = e.clientX - dragStart;

//     // 왼쪽으로 100이상 드래그 시 요소 밀기
//     if (offsetX < -100) {
//       dragX.current.classList.add("drag-left");
//       setDraggedItems((prev) => new Set(prev).add(id)); // 드래그된 항목 추적
//     }
//     // 오른쪽으로 드래그하면 원상복귀
//     if (offsetX > 100) {
//       dragX.current.classList.remove("drag-left");

//       setDraggedItems((prev) => {
//         const updatedItems = new Set(prev);
//         updatedItems.delete(id); // 드래그 끝나면 해당 아이템 삭제
//         return updatedItems;
//       });
//     }
//   };

//   const handleDelete = (id: string) => {
//     console.log(`Deleted: ${id}`);
//   };

//   const dragHandler = (
//     e: React.DragEvent<HTMLDivElement>,
//     item: StorePositionsType
//   ) => {
//     e.dataTransfer.setData(
//       "storeData",
//       JSON.stringify({
//         id: item.id,
//         storeName: item.storeName,
//         machine: item.machine,
//         lat: item.lat,
//         lng: item.lng,
//         address: item.address,
//       })
//     );
//   };

//   const dropHandler = () => {
//     console.log("내려놔유");
//   };

//   const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
//     e.preventDefault();
//   };

//   return (
//     <div
//       className="sheet-content-wrap"
//       // onDrop={dropHandler}
//       // onDragOver={(e) => onDragOver(e)}
//     >
//       {storeMarkers.map((item) => {
//         const isDragged = draggedItems.has(item.id); // 드래그된 항목 확인
//         return (
//           <div
//             key={item.id}
//             className="sheet-content"
//             onPointerDown={onPointerDown}
//             draggable="true"
//             onDragStart={(e) => onDragStart(e, item.id)} // onDragStart에 dragX.current 설정
//             onDrag={(e) => onDrag(e, item.id)}
//             onDragEnd={(e) => onDragEnd(e, item.id)}
//           >
//             <div className="content-item">
//               <img
//                 src="https://i.namu.wiki/i/cRmy09fCmil6W_AKYhSNoAluIvm1gNrmGBpLacGMeef8RW4CXohhn9dC-Q8zP5RjiTvErkfQ1Z3vZUpaiFe1ig.gif"
//                 alt="Temporary image"
//                 className="store-img"
//               />
//               <div className="content-info">
//                 <div>{item.storeName}</div>
//                 <div>{item.machine}</div>
//                 <div>{item.address}</div>
//               </div>
//             </div>

//             <div
//               className="dnd-btn"
//               onDragStart={(e) => dragHandler(e, item)}
//               draggable="true"
//               style={{
//                 opacity: isDragged ? 0 : 1,
//                 transform: isDragged ? "translateX(0)" : "translateX(100%)",
//                 transition: "transform 0.3s ease, opacity 0.3s ease",
//               }}
//             >
//               <ContentDragBtn />
//             </div>

//             <div
//               className="delete-btn"
//               style={{
//                 opacity: isDragged ? 1 : 0,
//                 transform: isDragged ? "translateX(0)" : "translateX(100%)",
//                 transition: "transform 0.3s ease, opacity 0.3s ease",
//               }}
//               onClick={() => handleDelete(item.id)}
//             >
//               <img
//                 src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjzkKApgCqmIe2-XZnAZURKLuDmNVwO7jALA&s"
//                 alt="Delete"
//               />
//             </div>
//           </div>
//         );
//       })}
//     </div>
//   );
// }

// export default Basic;
export {};
