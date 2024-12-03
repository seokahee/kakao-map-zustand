// import { useEffect, useRef } from "react";
// import { MAX_Y, MIN_Y } from "./bottomSheetOption";

import { useEffect, useRef } from "react";

// type BottomSheetMetrics = {
//   touchStart: {
//     sheetY: number;
//     touchY: number;
//   };
//   touchMove: {
//     prevTouchY?: number;
//     movingDirection: "none" | "down" | "up";
//   };
//   isContentAreaTouched: boolean;
// };

// // touchStart : 터치 시작
// // sheetY : 바텀시트 최상단 Y좌표 (화면에서의 위치)
// // touchY : 사용자가 터치한 Y좌표
// // touchMove : 터치 이동 중의 정보
// // prevTouchY : 이전 터치 Y좌표 (이전 이동 거리 추적)
// // movingDirection : 터치 이동 방향 (위로/아래로)
// // isContentAreaTouched :  컨텐츠 영역이 터치되었는지 여부

// export default function useBottomSheet() {
//   const sheet = useRef<HTMLDivElement>(null); // 바텀시트 참조
//   const content = useRef<HTMLDivElement>(null); // 컨텐츠 참조

//   // 터치 전 기본 설정 0
//   const metrics = useRef<BottomSheetMetrics>({
//     touchStart: {
//       sheetY: 0,
//       touchY: 0,
//     },
//     touchMove: {
//       prevTouchY: 0,
//       movingDirection: "none",
//     },
//     isContentAreaTouched: false,
//   });

//   // 컴포넌트 마운트 시 작동
//   useEffect(() => {
//     // 바텀시트가 움직일 수 있는지 체크
//     const canUserMoveBottomSheet = () => {
//       const { touchMove, isContentAreaTouched } = metrics.current;

//       // 컨텐츠 영역이 아닌 곳을 터치하고 있다면 바텀시트를 이동시킬 수 있음
//       if (!isContentAreaTouched) {
//         return true;
//       }

//       // 옵션에서 지정해준 Y값이 MIN_Y와 다르면 바텀시트를 이동시킬 수 있음
//       if (sheet.current!.getBoundingClientRect().y !== MIN_Y) {
//         return true;
//       }

//       // 바텀시트가 최대로 내려갔을 때 이동 가능
//       if (touchMove.movingDirection === "down") {
//         return content.current!.scrollTop <= 0; // 컨텐츠 영역을 스크롤 할 수 있으면 이동 가능
//       }
//       return false;
//     };

//     // 터치 시작 함수
//     // getBoundingClientRect 요소 위치 정보 확인 메서드
//     const handleTouchStart = (e: TouchEvent) => {
//       const { touchStart } = metrics.current;
//       touchStart.sheetY = sheet.current!.getBoundingClientRect().y; // 바텀시트 초기 Y좌표
//       touchStart.touchY = e.touches[0].clientY; // 사용자가 터치한 Y좌표
//     };

//     // 터치 이동 중 호출
//     const handleTouchMove = (e: TouchEvent) => {
//       const { touchStart, touchMove } = metrics.current;
//       const currentTouch = e.touches[0]; // 현재 터치 위치

//       // 첫 실행 시 이전 터치 Y값 초기화
//       if (touchMove.prevTouchY === undefined) {
//         touchMove.prevTouchY = touchStart.touchY;
//       }

//       // 터치 이동 방향 (위/아래)
//       if (touchMove.prevTouchY === 0) {
//         touchMove.prevTouchY = touchStart.touchY;
//       }

//       if (touchMove.prevTouchY < currentTouch.clientY) {
//         touchMove.movingDirection = "down";
//       }

//       if (touchMove.prevTouchY > currentTouch.clientY) {
//         touchMove.movingDirection = "up";
//       }

//       // 바텀시트 이동이 가능한 경우 이동
//       if (canUserMoveBottomSheet()) {
//         e.preventDefault();

//         const touchOffset = currentTouch.clientY - touchStart.touchY; // 터치 이동량 계산
//         let nextSheetY = touchStart.sheetY + touchOffset; // 바텀시트 이동 Y좌표 계산

//         // Y좌표가 MIN_Y보다 작으면 움직임 제한
//         if (nextSheetY <= MIN_Y) {
//           nextSheetY = MIN_Y;
//         }

//         // Y좌표가 MAX_Y보다 크면 움직임 제한
//         if (nextSheetY >= MAX_Y) {
//           nextSheetY = MAX_Y;
//         }

//         // 바텀시트 이동
//         sheet.current!.style.setProperty(
//           "transform",
//           `translateY(${nextSheetY - MAX_Y}px)`
//         );
//       } else {
//         document.body.style.overflowY = "hidden"; // 바텀시트를 움직일수없으면 스크롤 방지
//       }
//     };

//     // 터치 종료
//     const handleTouchEnd = (e: TouchEvent) => {
//       document.body.style.overflowY = "auto"; // 터치 종료 후 스크롤 복원
//       const { touchMove } = metrics.current;

//       // Snap 애니메이션으로 바텀시트 위치 조정
//       // const currentSheetY = sheet.current!.getBoundingClientRect().y;

//       // 현재 Y좌표가 MIN_Y가 아니면 위치를 스냅해서 설정
//       // if (currentSheetY !== MIN_Y) {
//       //   if (touchMove.movingDirection === "down") {
//       //     sheet.current!.style.setProperty("transform", "translateY(0)"); // 바텀시트를 최상단으로
//       //   }

//       //   if (touchMove.movingDirection === "up") {
//       //     sheet.current!.style.setProperty(
//       //       "transform",
//       //       `translateY(${MIN_Y - MAX_Y}px)`  // 바텀시트를 최하단으로
//       //     );
//       //   }
//       // }

//       // metrics 초기화.
//       metrics.current = {
//         touchStart: {
//           sheetY: 0,
//           touchY: 0,
//         },
//         touchMove: {
//           prevTouchY: 0,
//           movingDirection: "none",
//         },
//         isContentAreaTouched: false,
//       };
//     };

//     // 터치 이벤트 리스너 추가
//     sheet.current!.addEventListener("touchstart", handleTouchStart);
//     sheet.current!.addEventListener("touchmove", handleTouchMove);
//     sheet.current!.addEventListener("touchend", handleTouchEnd);
//   }, []);

//   useEffect(() => {
//     const handleTouchStart = () => {
//       metrics.current!.isContentAreaTouched = true; // 컨텐츠 영역을 터치한 경우
//     };
//     content.current!.addEventListener("touchstart", handleTouchStart);
//   }, []);

//   return { sheet, content };
// }

export const MIN_Y = 60;
export const MAX_Y = window.innerHeight - 160;
export const BOTTOM_SHEET_HEIGHT = window.innerHeight - MIN_Y;

// MIN_Y 바텀 시트가 최대로 올라갔을 때 Y좌표 값
// MAX_Y 바컴 시트가 최대로 내려갔을 때 Y좌표 값
// MAX_Y_SHEET_HEIGHT 바텀시트 높이

type BottomSheetMetrics = {
  touchStart: {
    sheetY: number;
    touchY: number;
  };
  touchMove: {
    prevTouchY?: number;
    movingDirection: "none" | "down" | "up";
  };
  isContentAreaTouched: boolean;
};
// touchStart : 터치 시작
// sheetY : 바텀시트의 Y값
// touchY : 내가 터치한 곳의 Y값
// touchMove : 터치하고 움직일 때
// prevTouchY : 움직이는 동안의 Y값(이전값)
// movingDirection : 움직이는 방향(위, 아래)
// isContentAreaTouched : 컨텐츠 영역 터치 여부

export default function useBottomSheet() {
  const sheet = useRef<HTMLDivElement>(null);

  const content = useRef<HTMLDivElement>(null);

  const metrics = useRef<BottomSheetMetrics>({
    touchStart: {
      sheetY: 0,
      touchY: 0,
    },
    touchMove: {
      prevTouchY: 0,
      movingDirection: "none",
    },
    isContentAreaTouched: false,
  });

  useEffect(() => {
    // 바텀 시트 움직임 판별 함수 (움직일수있는가, 아닌가)
    const canUserMoveBottomSheet = () => {
      const { touchMove, isContentAreaTouched } = metrics.current;

      if (!isContentAreaTouched) {
        return true;
      } // 바텀시트 콘텐츠 영역이 아닌, 헤더를 터치하면 바텀시트 이동 가능

      if (sheet.current!.getBoundingClientRect().y !== MIN_Y) {
        return true;
      } // 바텀시트의 현재 위치가 최소 높이와 같지 않으면 이동 가능

      if (touchMove.movingDirection === "down") {
        return content.current!.scrollTop <= 0;
      }
      return false; // 터치상태에서 콘텐츠를 올리는데 더이상 내용이없으면 시트 움직이는거, 난 필요없는듯
    };

    // 바텀시트를 터치하면 호출
    const handleTouchStart = (e: TouchEvent) => {
      const { touchStart } = metrics.current;
      touchStart.sheetY = sheet.current!.getBoundingClientRect().y; // 현재 시트의 높이
      touchStart.touchY = e.touches[0].clientY; // 현재 사용자가 터치한 높이
    };

    //치를 유지한 채로 움직일 때(=드래그 할 때)
    const handleTouchMove = (e: TouchEvent) => {
      const { touchStart, touchMove } = metrics.current;
      const currentTouch = e.touches[0];

      console.log("currentTouch", currentTouch);
      console.log("e.touches", e.touches);

      if (touchMove.prevTouchY === undefined || touchMove.prevTouchY === 0) {
        touchMove.prevTouchY = touchStart.touchY;
      } // 이전 터치 값이 없으면 현재 터치 y값을 넣는다

      // if (touchMove.prevTouchY === 0) {
      //   touchMove.prevTouchY = touchStart.touchY;
      // }

      // 이전 터치 값보다 사용자 터치 값이 크면 바텀시트를 내려라
      if (touchMove.prevTouchY < currentTouch.clientY) {
        touchMove.movingDirection = "down";
      }

      if (touchMove.prevTouchY > currentTouch.clientY) {
        touchMove.movingDirection = "up";
      }

      // 바텀시트를 움직이는 함수가 호출된 상황
      if (canUserMoveBottomSheet()) {
        e.preventDefault();

        const touchOffset = currentTouch.clientY - touchStart.touchY; // 터치값은 사용자 터치 값에서 시트 높이를 빼라
        // 시트 높이 계산
        let nextSheetY = touchStart.sheetY + touchOffset;

        if (nextSheetY <= MIN_Y) {
          nextSheetY = MIN_Y;
        }

        if (nextSheetY >= MAX_Y) {
          nextSheetY = MAX_Y;
        }

        sheet.current!.style.setProperty(
          "transform",
          `translateY(${nextSheetY - MAX_Y}px)`
        ); // 끝까지 아래로 내려도 헤더 노출
      } else {
        document.body.style.overflowY = "hidden";
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      document.body.style.overflowY = "auto";
      const { touchMove } = metrics.current;

      // // Snap Animation
      // const currentSheetY = sheet.current!.getBoundingClientRect().y;

      // if (currentSheetY !== MIN_Y) {
      //   if (touchMove.movingDirection === "down") {
      //     sheet.current!.style.setProperty("transform", "translateY(0)");
      //   }

      //   if (touchMove.movingDirection === "up") {
      //     sheet.current!.style.setProperty(
      //       "transform",
      //       `translateY(${MIN_Y - MAX_Y}px)`
      //     );
      //   }
      // }

      // metrics 초기화.
      metrics.current = {
        touchStart: {
          sheetY: 0,
          touchY: 0,
        },
        touchMove: {
          prevTouchY: 0,
          movingDirection: "none",
        },
        isContentAreaTouched: false,
      };
    };

    sheet.current!.addEventListener("touchstart", handleTouchStart);
    sheet.current!.addEventListener("touchmove", handleTouchMove);
    sheet.current!.addEventListener("touchend", handleTouchEnd);
  }, []);

  useEffect(() => {
    const handleTouchStart = () => {
      metrics.current!.isContentAreaTouched = true;
    };
    content.current!.addEventListener("touchstart", handleTouchStart);
  }, []);

  return { sheet, content };
}
