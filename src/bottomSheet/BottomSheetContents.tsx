import { motion } from "framer-motion";
import { useStoreMarkersStore } from "../store";
import { StorePositionsType } from "../types/type";

function BottomSheetContents({
  setIsMotion,
}: {
  setIsMotion: (arg: boolean) => void;
}) {
  const storeMarkers = useStoreMarkersStore((state) => state.storeMarkers); // 지도 영역에 포함되는 매장

  const handleStartDrag = () => {
    setIsMotion(false); // 부모 모션 비활성화
  };
  const handleEndDrag = () => {
    console.log(`handleEndDrag`);
    setIsMotion(true); // 부모 모션 비활성화
  };
  return (
    <div className="sheet-content-wrap">
      {storeMarkers.map((item: StorePositionsType) => {
        return (
          <motion.div
            key={item.id}
            className="sheet-content-body"
            drag="x" // 가로 드래그 활성화
            dragMomentum={false} // 모션 밀림 방지
            dragConstraints={{ left: 0, right: 0 }} // 드래그 제약
            onPointerDownCapture={(event) => {
              console.log("내가 자식이다");
              // event.stopPropagation();
            }}
            onMouseDown={handleStartDrag} // 마우스 이벤트
            onTouchStart={handleStartDrag} // 터치 이벤트
            onPointerDown={handleStartDrag} // 포인터 이벤트
            onTouchEnd={handleEndDrag}
          >
            <div className="sheet-content">
              <img
                src="https://i.namu.wiki/i/cRmy09fCmil6W_AKYhSNoAluIvm1gNrmGBpLacGMeef8RW4CXohhn9dC-Q8zP5RjiTvErkfQ1Z3vZUpaiFe1ig.gif"
                alt="부리부리 임시 이미지 "
                className="store-img"
              />
              <div className="content-info">
                <div>{item.storeName}</div>
                <div>{item.machine}</div>
                <div>{item.address}</div>
              </div>
            </div>

            {/* <div className="sheet-content-btn">여기에 버튼이 올거야</div> */}
          </motion.div>
        );
      })}
    </div>
  );
}

export default BottomSheetContents;

// import { motion, useAnimation } from "framer-motion";
// import { PointerEvent, useState } from "react";
// import BottomSheetContents from "./BottomSheetContents";
// import BottomSheetHeader from "./BottomSheetHeader";

// function BottomSheet() {
//   const controls = useAnimation(); // 애니메이션 컨트롤러

//   const [isMotion, setIsMotion] = useState(true);

//   const onDragEnd = (e: MouseEvent | TouchEvent | PointerEvent, info: any) => {
//     const dragY = info.point.y; // 드래그가 끝난 위치의 y좌표
//     const threshold = window.innerHeight * (2 / 3);

//     if (dragY > threshold) {
//       controls.start({
//         y: window.innerHeight * 1 - 50,
//         transition: { type: "tween", duration: 0.5, ease: "easeInOut" },
//       });
//     }
//   };

//   return (
//     <motion.div
//       className="sheet-wrap"
//       drag={isMotion ? "y" : false}
//       dragMomentum={false}
//       dragConstraints={{
//         top: window.innerHeight * 0.1,
//         bottom: window.innerHeight * 1 - 50,
//       }}
//       initial={{
//         y: window.innerHeight * 1 - 50,
//       }}
//       animate={controls}
//       onDragEnd={(e, info) => onDragEnd(e, info)}
//       key={isMotion ? "vertical" : "horizontal"} // 상태가 변경될 때마다 key를 업데이트
//     >
//       <BottomSheetHeader setIsMotion={setIsMotion} />
//       <div className="sheet-contents-wrap">
//         <div className="contents-body">
//           <BottomSheetContents setIsMotion={setIsMotion} />
//         </div>
//       </div>
//     </motion.div>
//   );
// }

// export default BottomSheet;
