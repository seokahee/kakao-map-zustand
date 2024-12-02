function BottomSheetHeader({
  setIsMotion,
}: {
  setIsMotion: (arg: boolean) => void;
}) {
  return (
    <div onMouseOver={() => setIsMotion(true)} className="sheet-handle-wrap">
      <div className="sheet-btn-handle"></div>
    </div>
  );
}

export default BottomSheetHeader;
