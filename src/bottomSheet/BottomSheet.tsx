import { motion } from "framer-motion";
import useBottomSheet from "../util/useBottomSheet ";
import BottomSheetHeader from "./BottomSheetHeader";
import BottomSheetContents from "./BottomSheetContents";

function BottomSheet() {
  const { sheet, content } = useBottomSheet();

  // const bottomSheetVariants = {
  //   closed: { y: 0 }, // 기본 닫힌 상태
  //   open: { y: -window.innerHeight * 0.9 }, // 열렸을때 위치
  // };
  const onDragEnd = (e: MouseEvent | TouchEvent | PointerEvent, info: any) => {
    if (info.point.y < window.innerHeight / 2) {
      sheet.current!.style.transform = "translateY(-300px)";
    } else {
      sheet.current!.style.transform = "translateY(0)";
    }
    console.log("드래그 종료! 위치:", info.point.y);
  };

  const onDragStart = (
    e: MouseEvent | TouchEvent | PointerEvent,
    info: any
  ) => {
    console.log("드래그! 위치:", info.point.y);
  };

  return (
    <motion.div
      className="bottom-sheet-wrap"
      ref={sheet}
      drag="y"
      dragConstraints={{ top: -window.innerHeight * 0.8, bottom: 0 }} // 위, 아래 제한
      dragElastic={1} // 드래그 탄성 효과
      // variants={bottomSheetVariants}
      initial="closed"
      animate="closed"
      onDragEnd={(e, info) => onDragEnd(e, info)}
      onDragStart={(e, info) => onDragStart(e, info)}
    >
      <BottomSheetHeader />
      <div className="contents-wrap">
        <div ref={content} className="contents">
          <BottomSheetContents />
        </div>
      </div>
    </motion.div>
  );
}

export default BottomSheet;
