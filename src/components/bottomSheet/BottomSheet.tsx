import { DndContext } from "@dnd-kit/core";
import { useBottomSheet } from "../../hook/useBottomSheet";
import BottomSheetContents from "./BottomSheetContents";
import BottomSheetHeader from "./BottomSheetHeader";

function BottomSheet() {
  const {
    initialHeight,
    isDragging,
    handleMoveStart,
    handleMouseMove,
    handleMoveEnd,
  } = useBottomSheet();

  return (
    <div
      className="bottom-sheet-wrap"
      onMouseMove={(e) => handleMouseMove({ e })} // 마우스 이동
      onTouchMove={(e) => handleMouseMove({ e })} // 터치 이동
      // onMouseLeave={(e) => handleMouseMove({ e })} // 드래그 중 마우스가 화면을 벗어날 때 드래그 종료
      onMouseLeave={handleMoveEnd} // 마우스가 빨리 움직이면 이벤트 종료되는것을 막음
      onMouseUp={handleMoveEnd} // 드래그 종료
      onTouchEnd={handleMoveEnd} // 터치 종료
    >
      <div
        className="bottom-sheet"
        style={{
          transform: `translateY(${initialHeight}px)`,
          transition: isDragging ? "none" : "transform 0.3s ease-in-out",
        }}
      >
        <BottomSheetHeader handleMoveStart={handleMoveStart} />
        {/* <DndContext> */}
        <BottomSheetContents />
        {/* </DndContext> */}
      </div>
    </div>
  );
}

export default BottomSheet;
