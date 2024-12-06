import React, { useState } from "react";
import { miniData } from "../data";
import { AnimatePresence, motion } from "framer-motion";

function BottomSheetTest() {
  const [testState, setTestState] = useState(miniData);

  return (
    <AnimatePresence>
      <div className="test-header-wrap">
        <div className="test-header"></div>
      </div>
      {testState.map((item) => {
        return (
          <motion.div key={item.id} className="test-contents-wrap">
            <div></div>
            <div>{item.storeName}</div>
            <div>{item.machine}</div>
            <div>{item.address}</div>
          </motion.div>
        );
      })}
    </AnimatePresence>
  );
}

export default BottomSheetTest;

// AnimatePresence 컴포넌트 생명주기에 맞춰 모션을 띄워준다 react-lazy-suspense 와 비슷함
