import { useEffect, useRef } from 'react';
import './Layout.scss';
import { useSplitText } from '../../../hooks/useText';
import { useScroll } from '../../../hooks/useScroll';

export default function Layout({ children, title }) {
	const refTitle = useRef(null);
	const refBtnTop = useRef(null);
	const splitText = useSplitText();

	const handleCustomScroll = scroll => {
		scroll >= 100 ? refBtnTop.current?.classList.add('on') : refBtnTop.current?.classList.remove('on');
	};
	const { scrollTo, refEl } = useScroll(handleCustomScroll, 0);

	useEffect(() => {
		splitText(refTitle.current, title, 0.7, 0.1);
		setTimeout(() => {
			refEl.current?.classList.add('on');
		}, 300);
	}, [splitText, title, refEl]);

	useEffect(() => {
		scrollTo(0);
	}, [scrollTo]);

	return (
		<main ref={refEl} className={`Layout ${title}`}>
			<h1 ref={refTitle}>{title}</h1>
			<div className='bar'></div>
			{children}
			<button ref={refBtnTop} className='btnTop' onClick={() => scrollTo(0)}>
				Top
			</button>
		</main>
	);
}
