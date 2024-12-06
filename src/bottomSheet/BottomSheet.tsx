import { motion, useAnimation } from "framer-motion";
import { PointerEvent, useEffect, useState } from "react";
import BottomSheetContents from "./BottomSheetContents";
import BottomSheetHeader from "./BottomSheetHeader";

function BottomSheet() {
  // 애니메이션 컨트롤러 애니메이션 효과 + 상태변화(동작) 제어를 통해 if (dragY > threshold) 조건에 따라 원위치됨
  const controls = useAnimation(); // 애니메이션 컨트롤러

  const onDragEnd = (e: MouseEvent | TouchEvent | PointerEvent, info: any) => {
    const dragY = info.point.y; // 드래그가 끝난 위치의 y좌표

    // 화면 높이의 2/3 지점 (하단 1/3 기준)
    // 이 지점보다 아래로 드래그되었는지를 판단하기 위해 사용.
    const threshold = window.innerHeight * (2 / 3);

    // y좌표(`dragY`)가 `threshold`보다 클 경우 바텀시트를 화면 아래쪽으로 완전히 내림 (화면의 100% - 50px 위치).
    // y: window.innerHeight * 1 - 50 => 화면 높이의 100%에서 50px 위.
    if (dragY > threshold) {
      // 1/3 지점 아래로 내려가면 바닥까지 이동
      controls.start({
        y: window.innerHeight * 1 - 50, // 바닥 지점으로 이동
        transition: { type: "tween", duration: 0.5, ease: "easeInOut" },
      });
    }
  };

  const [isMotion, setIsMotion] = useState(true);

  useEffect(() => {
    console.log(isMotion);
  }, [isMotion]);
  return (
    <motion.div
      className="sheet-wrap"
      drag={isMotion ? "y" : false}
      // drag={"y"}
      dragMomentum={false} // 모션 밀림 방지
      dragConstraints={{
        top: window.innerHeight * 0.1, // 화면 높이의 10%
        bottom: window.innerHeight * 1 - 50, // 화면 높이의 100% - 50px
      }}
      initial={{
        y: window.innerHeight * 1 - 50, // 렌더 시 바텀시트 위치 지점
      }}
      animate={controls}
      onDragEnd={(e, info) => onDragEnd(e, info)}
      onDragStart={() => console.log("내가 부모다")}
    >
      <BottomSheetHeader />
      <div className="sheet-contents-wrap">
        <div className="contents-body">
          <BottomSheetContents setIsMotion={setIsMotion} />
        </div>
      </div>
    </motion.div>
  );
}

export default BottomSheet;
