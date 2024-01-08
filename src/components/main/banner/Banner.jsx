import { useEffect, useRef, useState } from 'react';
import { useScroll } from '../../../hooks/useScroll';
import './Banner.scss';

export default function Banner() {
	const refBanner = useRef(null);
	const [Frame, setFrame] = useState(null);
	const [Scrolled, setScrolled] = useState(0);

	const { getCurrentScroll } = useScroll(Frame);

	useEffect(() => {
		setFrame(refBanner.current?.closest('.wrap'));
		Frame?.addEventListener('scroll', () => {
			const scroll = getCurrentScroll(refBanner.current, -window.innerHeight / 2);
			scroll >= 0 && setScrolled(scroll);
		});
	}, [Frame, getCurrentScroll]);

	return (
		<section className='Banner myScroll' ref={refBanner}>
			<div className='box' style={{ transform: `rotate(${Scrolled / 2}deg) scale(${1 + Scrolled / 400}) `, opacity: `${1 - Scrolled / 400}` }}></div>
		</section>
	);
}
