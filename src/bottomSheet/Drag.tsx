// import { motion, PanInfo, useDragControls } from "framer-motion";
// import { useState } from "react";
// import { useStoreMarkersStore } from "../store";
// import { StorePositionsType } from "../types/type";
// import ContentDragBtn from "./ContentDragBtn";

// function Drag({
//   setIsMotion,
//   setIsTest,
// }: {
//   setIsMotion: (arg: boolean) => void;
//   setIsTest: (arg: boolean) => void;
// }) {
//   const { storeMarkers, setStoreMarkers } = useStoreMarkersStore(); // 지도 영역에 포함되는 매장
//   const [draggedItems, setDraggedItems] = useState<Set<string>>(new Set()); // 아이템 드래그 상태

//   const onPointerDown = () => {
//     setIsMotion(false); // 부모 모션 비활성화
//     setIsTest(true);
//   };

//   const onDragEnd = (
//     e: MouseEvent | TouchEvent | PointerEvent,
//     info: PanInfo,
//     id: string
//   ) => {
//     const offset = info.offset;

//     // 왼쪽으로 100이상 드래그 시 요소 밀기
//     if (offset.x < -100) {
//       setDraggedItems((prev) => new Set(prev).add(id)); // 드래그된 항목 추적
//     }
//     // 오른쪽으로 드래그하면 원상복귀
//     if (offset.x > 100) {
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

//   const dragControls = useDragControls();

//   return (
//     <>
//       {storeMarkers.map((item: StorePositionsType) => {
// const isItemDragged = draggedItems.has(item.id); // 해당 아이템이 드래그된 상태인지 체크
//         return (
//           <motion.div
//             key={item.id}
//             className="sheet-content"
//             drag="x"
//             dragMomentum={false} // 모션 밀림 방지
//             dragConstraints={{ left: -200, right: 0 }}
//             onPointerDown={onPointerDown}
// onDragEnd={(e, info) => onDragEnd(e, info, item.id)}
//           >
//             <div className="content-item">
//               <img
//                 src="https://i.namu.wiki/i/cRmy09fCmil6W_AKYhSNoAluIvm1gNrmGBpLacGMeef8RW4CXohhn9dC-Q8zP5RjiTvErkfQ1Z3vZUpaiFe1ig.gif"
//                 alt="부리부리 임시 이미지"
//                 className="store-img"
//               />
//               <div className="content-info">
//                 <div>{item.storeName}</div>
//                 <div>{item.machine}</div>
//                 <div>{item.address}</div>
//               </div>
//             </div>

// {!isItemDragged && (
//   <div className="dnd-btn">
//     <ContentDragBtn dragControls={dragControls} />
//   </div>
// )}

//             {/* 삭제 버튼 */}
// <motion.div
//   className="sheet-content-btn"
//   initial={{ opacity: 0, x: "100%" }} // 기본적으로 숨겨진 버튼
//   animate={{
//     opacity: isItemDragged ? 1 : 0,
//     x: isItemDragged ? 0 : "100%",
//   }}
//   transition={{ type: "tween", duration: 0.5 }} // 애니메이션 설정
//   onClick={() => handleDelete(item.id)} // 삭제 버튼 클릭 시
// >
//   <img
//     src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjzkKApgCqmIe2-XZnAZURKLuDmNVwO7jALA&s"
//     alt="삭제 임시 이미지"
//   />
// </motion.div>
//           </motion.div>
//         );
//       })}
//     </>
//   );
// }

// export default Drag;
export {};
