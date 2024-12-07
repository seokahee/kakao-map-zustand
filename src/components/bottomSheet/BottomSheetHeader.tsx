import React from "react";
import { BottomEventTypes } from "../../types/bottomSheet";

function BottomSheetHeader({
  handleMoveStart,
}: {
  handleMoveStart: ({ e }: BottomEventTypes) => void;
}) {
  return (
    <div
      onMouseDown={(e) => handleMoveStart({ e })} // 마우스 클릭
      onTouchStart={(e) => handleMoveStart({ e })} // 터치 시작
      className="sheet-header"
    >
      <div className="sheet-handle"></div>
    </div>
  );
}

export default BottomSheetHeader;
