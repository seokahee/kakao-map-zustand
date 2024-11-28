import { motion } from "framer-motion";
import BottomSheetContents from "./BottomSheetContents";
import BottomSheetHeader from "./BottomSheetHeader";
import { useEffect, useState } from "react";

function BottomSheet() {
  const [dragConstraints, setDragConstraints] = useState({ top: 0, bottom: 0 });

  // 컴포넌트 마운트 시 드래그 제약조건 실행
  useEffect(() => {
    // 드래그 가능한 범위(제약조건) 설정 함수

    const updataConstraint = () => {
      setDragConstraints({ top: 10, bottom: window.innerHeight - 50 });
    };
  }, []);

  return (
    <motion.div
      className="sheet-wrap"
      drag="y"
      dragMomentum={false}
      dragConstraints={{ top: 50, bottom: window.innerHeight - 10 }}
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
