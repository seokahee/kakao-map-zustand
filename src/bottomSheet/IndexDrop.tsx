// import { Reorder, useDragControls } from "framer-motion";
// import { useState } from "react";
// import { useStoreMarkersStore } from "../store";
// import ContentDragBtn from "./ContentDragBtn";
// import ContentItem from "./ContentItem";

// function IndexDrop({
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
//     setIsTest(false);
//   };

//   const dragControls = useDragControls();
//   return (
//     <>
//       <Reorder.Group axis="y" values={storeMarkers} onReorder={setStoreMarkers}>
//         {storeMarkers.map((item) => {
//           const isItemDragged = draggedItems.has(item.id);
//           console.log("draggedItems", draggedItems.has(item.id));

//           return (
//             <Reorder.Item
//               key={item.id}
//               value={item}
//               // dragListener={false}
//               dragControls={dragControls}
//               onTouchEnd={onPointerDown}
//             >
//               <div className="sheet-content" onPointerDown={onPointerDown}>
//                 <ContentItem item={item} />

//                 {!isItemDragged && (
//                   <div className="dnd-btn">
//                     <ContentDragBtn dragControls={dragControls} />
//                   </div>
//                 )}

//                 {isItemDragged && (
//                   <div className="sheet-content-btn">
//                     <img
//                       src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjzkKApgCqmIe2-XZnAZURKLuDmNVwO7jALA&s"
//                       alt="삭제 임시 이미지"
//                     />
//                   </div>
//                 )}
//               </div>
//             </Reorder.Item>
//           );
//         })}
//       </Reorder.Group>
//     </>
//   );
// }

// export default IndexDrop;
export {};
