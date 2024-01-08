// import Anime from '../asset/anime';
// import { useRef, useEffect } from 'react';

// export function useScroll(frame = '.wrap') {
// 	//스크롤 이벤트가 발생하는 프레임 요소
// 	const scrollFrame = useRef(null);

// 	//선택자로 스크롤을 제어해야 되는 루트컴포넌트의 클래스명을 받아 DOM요소를 참조객체에 연결
// 	//targetPos위치값으로 스크롤이동하는 함수 정의
// 	const scrollTo = targetPos => {
// 		new Anime(scrollFrame.current, { scroll: targetPos });
// 	};

// 	//실시간 scroll값 반환 메서드
// 	const getCurrentScroll = selfEl => {
// 		const scroll = scrollFrame.current.scrollTop;
// 		const modifiedScroll = scroll - selfEl?.offsetTop;
// 		return modifiedScroll;
// 	};
// 	//컴포넌트 마운트시 frameRef에 선택자 담기
// 	useEffect(() => {
// 		scrollFrame.current = document.querySelector(frame);
// 	}, [frame]);

// 	//scrollTo함수를 비구조화할당으로 뽑아내기 위해서 객체로 묶어서 반환
// 	return { scrollTo, getCurrentScroll, scrollFrame: scrollFrame.current };
// }

import Anime from '../asset/anime';
import { useState, useEffect, useRef } from 'react';

//useScroll훅을 처음 초기화할때 무조건 인수로 state에 담겨있는 ScrollFrame요소를 전달 (중요)
export function useScroll(customHandeler) {
	const refEl = useRef(null);
	const [Frame, setFrame] = useState(null);
	const scrollTo = targetPos => {
		Frame && new Anime(Frame, { scroll: targetPos });
	};
	//기존에 scrollTop값을 제어하는 wrap요소를 참조객체에 담아서 반환하는것이 문제
	//이유: wrap.scrollTop의 변경되는 값을 계속 활용해되는데
	//참조객체에 담으면 담는 순간의 참조객체값이 고정되는 문제 발생
	//해결방법: wrap요소를 호출 부모컴포넌트에서 State에 담도록 처리

	//getCurrentScroll(호출하는 부모프레임요소, 기준점 보정값)
	const getCurrentScroll = (baseLine = 0) => {
		const scroll = Frame.scrollTop - baseLine;
		//순서5- 부모컴포넌트에서 참조객체 연결된 값을 hook내부적으로 활용
		const modifiedScroll = scroll - refEl.current?.offsetTop;
		return modifiedScroll;
	};

	useEffect(() => {
		setFrame(document.querySelector('.wrap'));
	}, []);

	useEffect(() => {
		Frame?.addEventListener('scroll', handleScroll);
		return () => Frame?.removeEventListener('scroll', handleScroll);
	}, [Frame, handleScroll]);
	//순서2 - 부모에서 해당 참조객체를 활용하도록 리턴
	return { scrollTo, getCurrentScroll, Frame, refEl };
}
