import { useStoreMarkersStore } from "../../store/store";

function BottomSheetContents() {
  const { storeMarkers, setStoreMarkers } = useStoreMarkersStore(); // 지도 영역에 포함되는 매장

  return (
    <div className="sheet-content-wrap">
      {storeMarkers.map((item) => (
        <div key={item.id} className="sheet-content">
          <div>{item.storeName}</div>
          <div>{item.machine}</div>
          <div>{item.address}</div>
        </div>
      ))}
    </div>
  );
}

export default BottomSheetContents;
