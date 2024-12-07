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
      onMouseLeave={handleMoveEnd} // 드래그 중 마우스가 화면을 벗어날 때 드래그 종료
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
        <BottomSheetContents />
      </div>
    </div>
  );
}

export default BottomSheet;
