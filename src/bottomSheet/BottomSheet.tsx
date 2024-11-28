import { motion } from "framer-motion";
import BottomSheetContents from "./BottomSheetContents";
import BottomSheetHeader from "./BottomSheetHeader";

function BottomSheet() {
  return (
    <motion.div
      className="sheet-wrap"
      drag="y"
      dragMomentum={false}
      dragConstraints={{
        top: 50,
        bottom: window.innerHeight - 50,
      }} // 위에서 50px 떨어질때까지, 아래 기준 스크린 화면 -50px까지
      initial={{
        y: window.innerHeight - 50, // 렌더 시 바텀시트 위치 지점
        // opacity: 0,
      }}
    >
      <BottomSheetHeader />
      <div className="sheet-contents-wrap">
        <div className="contents-body">
          <BottomSheetContents />
        </div>
      </div>
    </motion.div>
  );
}

export default BottomSheet;
