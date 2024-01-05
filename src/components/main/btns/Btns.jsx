import Anime from '../../../asset/anime';
import './Btns.scss';
import { useRef, useState, useEffect, useCallback } from 'react';
import { useThrottle } from '../../../hooks/useThrottle';

export default function Btns(opt) {
	const defOpt = useRef({ frame: '.wrap', items: '.myScroll', base: -window.innerHeight / 2, isAuto: false });
	const resultOpt = useRef({ ...defOpt.current, ...opt }); //opt값 덮어쓰기로

	const isAutoScroll = useRef(resultOpt.current.isAuto);
	const [Num, setNum] = useState(0);
	const wrap = useRef(null);
	const secs = useRef(null);
	const btns = useRef(null);
	const baseLine = useRef(resultOpt.current.base);
	//isMotion.current 값이 true 면 모션중이므로 재실행 방지, false면 모션중이 아니므로 재실행 가능
	const isMotion = useRef(false); //모션 중 아닌것 판단

	//activtion에서 null요소의 값을 읽을 수 없다는 오류 뜨는 이유(throttle과는 무관)
	//아래함수는 scroll동작될때다 실행되는 함수
	const activation = () => {
		const scroll = wrap.current?.scrollTop;

		secs.current.forEach((_, idx) => {
			if (scroll >= secs.current[idx].offsetTop + baseLine.current) {
				//아래 구문에서 children이 아닌 querySelectorAll을 써야 되는 이유
				//children(HTMLCollections반환 LiveDOM) vs querySelectorAll(NodeList반환, Static DOM)
				//버튼 li요소를 Btns컴포넌트 마운트시 동적으로 생성하기 때문에
				//만약 컴포넌트 unmounted시 querySelector로 찾은 NodeList는 optionial chaining 처리가능하나
				//children으로 구한 HTMLCollection은 실시간으로 DOM의 상태값을 추적하기 떄문에 optional chaining처리 불가
				const btnsArr = btns.current?.querySelectorAll('li');
				btnsArr?.forEach(btn => btn.classList.remove('on'));
				btns.current?.querySelectorAll('li')[idx]?.classList.add('on');
			}
		});
	};

	const moveScroll = idx => {
		//초기값이 false이므로 처음 한번은 해당 조건문이 무시되면서 아래코드 실행됨
		if (isMotion.current) return;
		isMotion.current = true;
		console.log('move');
		//모션함수가 실행되고 모션이 끝나는 순간 실행되는 callback으로 다시 isMotion.current 값을 false로 변경해서 재실행 가능하게 설정
		//결론 isMotion.current 값을 이용해서 모션중에서는 중복 함수호출 불가능하도록 모션 중 재 이벤트 방지 처리
		new Anime(wrap.current, { scroll: secs.current[idx].offsetTop }, { callback: () => (isMotion.current = false) });
	};

	const autoScroll = useCallback(
		e => {
			const btnsArr = Array.from(btns.current.children);
			const activeEl = btns.current.querySelector('li.on');
			//현재 활성화된 버튼의 순번구함
			const activeIndex = btnsArr.indexOf(activeEl);

			//휠 다운시
			if (e.deltaY > 0) {
				console.log('wheel down');
				//현재순번이 마지막순번이 아니면 다음순번 섹션위치로 모션이동
				activeIndex !== Num - 1 && moveScroll(activeIndex + 1);
			} else {
				//휠 UP 시
				console.log('wheel up');
				//현재순번이 첫번째순번이 아니면 이전순번 섹션 위치로 모션이동
				activeIndex !== 0 && moveScroll(activeIndex - 1);
			}
		},
		[Num]
	);

	const modifyPos = () => {
		const btnsArr = Array.from(btns.current.children);
		const activeEl = btns.current.querySelector('li.on');
		const activeIndex = btnsArr.indexOf(activeEl);
		wrap.current.scrollTop = secs.current[activeIndex].offsetTop;
	};

	const throttledActivation = useThrottle(activation);
	const throttledModifyPos = useThrottle(modifyPos, 200);

	useEffect(() => {
		wrap.current = document.querySelector(resultOpt.current.frame);
		secs.current = wrap.current.querySelectorAll(resultOpt.current.items);
		setNum(secs.current.length);

		window.addEventListener('resize', throttledModifyPos);
		wrap.current.addEventListener('scroll', throttledActivation);
		isAutoScroll.current && wrap.current.addEventListener('mousewheel', autoScroll);

		return () => {
			window.removeEventListener('resize', throttledModifyPos);
			wrap.current.removeEventListener('scroll', throttledActivation);
			wrap.current.removeEventListener('mousewheel', autoScroll);
		};
	}, [throttledActivation, autoScroll, throttledModifyPos, resultOpt.current.frame, resultOpt.current.items]);

	return (
		<ul className='Btns' ref={btns}>
			{Array(Num)
				.fill()
				.map((_, idx) => {
					return <li key={idx} className={idx === 0 ? 'on' : ''} onClick={() => moveScroll(idx)}></li>;
				})}
		</ul>
	);
}
