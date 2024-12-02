import { motion } from "framer-motion";

function ContentDeleteBtn({
  isItemDragged,
  item,
}: {
  isItemDragged: boolean;
  item: string;
}) {
  const handleDelete = (id: string) => {
    console.log(`삭제: ${id}`);
  };

  return (
    <motion.div
      className="sheet-content-btn"
      initial={{ opacity: 0, x: "100%" }} // 기본적으로 숨겨진 버튼
      animate={{
        opacity: isItemDragged ? 1 : 0,
        x: isItemDragged ? 0 : "100%",
      }} // 드래그할 때만 버튼이 보이도록 설정
      transition={{ type: "tween", duration: 0.3 }} // 애니메이션 설정
      onClick={() => handleDelete(item)} // 삭제 버튼 클릭 시
    >
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjzkKApgCqmIe2-XZnAZURKLuDmNVwO7jALA&s"
        alt="삭제 임시 이미지"
      />
    </motion.div>
  );
}

export default ContentDeleteBtn;
