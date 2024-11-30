import { motion } from "framer-motion";
import { useState } from "react";
import { useStoreMarkersStore } from "../store";
import { StorePositionsType } from "../types/type";

function BottomSheetContents({
  setIsMotion,
}: {
  setIsMotion: (arg: boolean) => void;
}) {
  const storeMarkers = useStoreMarkersStore((state) => state.storeMarkers); // 지도 영역에 포함되는 매장
  const [isDragged, setIsDragged] = useState(false); // 드래그 상태 관리

  const handleStartDrag = () => {
    setIsDragged(true); // 드래그 시작
    setIsMotion(false); // 부모 모션 비활성화
  };

  const handleEndDrag = (e: any, info: any) => {
    setIsDragged(false); // 드래그 끝
    setIsMotion(true); // 부모 모션 활성화
  };

  const handleDelete = (id: string) => {
    console.log(`삭제: ${id}`);
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
            dragConstraints={{ left: -150, right: 0 }} // 왼쪽으로 최대 150px까지 드래그 가능
            onPointerDown={handleStartDrag} // 드래그 시작 시 부모 모션 비활성화
            onDragEnd={handleEndDrag} // 드래그 끝났을 때 부모 모션 활성화
          >
            <div className="sheet-content">
              <img
                src="https://i.namu.wiki/i/cRmy09fCmil6W_AKYhSNoAluIvm1gNrmGBpLacGMeef8RW4CXohhn9dC-Q8zP5RjiTvErkfQ1Z3vZUpaiFe1ig.gif"
                alt="부리부리 임시 이미지"
                className="store-img"
              />
              <div className="content-info">
                <div>{item.storeName}</div>
                <div>{item.machine}</div>
                <div>{item.address}</div>
              </div>
            </div>

            {/* 삭제 버튼 */}
            {isDragged && (
              <motion.div
                className="sheet-content-btn"
                initial={{ opacity: 0, x: "100%" }} // 기본적으로 숨겨진 버튼
                animate={{
                  opacity: isDragged ? 1 : 0,
                  x: isDragged ? 0 : "100%",
                }} // 드래그할 때만 버튼이 보이도록 설정
                transition={{ type: "tween", duration: 0.3 }} // 애니메이션 설정
                onClick={() => handleDelete(item.id)} // 삭제 버튼 클릭 시
              >
                삭제
              </motion.div>
            )}
          </motion.div>
        );
      })}
    </div>
  );
}

export default BottomSheetContents;
