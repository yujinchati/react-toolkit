import { useRef } from 'react';
import './ThemeControl.scss';
import { useCookie } from '../../../hooks/useCookie';
import { useThrottle } from '../../../hooks/useThrottle';

export default function ThemeControl() {
	const inputEl = useRef(null);
	const { setCookie, isCookie } = useCookie();
	if (isCookie('theme')) {
		const color = document.cookie.split('theme=')[1].split(';')[0];
		document.body.style.setProperty('--pointColor', color);
	}
	const changeThemeColor = () => {
		const color = inputEl.current.value;
		setCookie('theme', color, 365);
		document.body.style.setProperty('--pointColor', color);
	};
	const resetThemeColor = () => {
		document.body.style.setProperty('--pointColor', 'hotpink');
		setCookie('theme', 'hotpink', 365);
	};

	//초기 마운트시에 컬러테마 쿠키값 유무에 따라 변수값 처리
	const throttledChangeTheme = useThrottle(changeThemeColor, 300);

	return (
		<nav className='ThemeControl'>
			<input type='color' ref={inputEl} onChange={throttledChangeTheme} />
			<button type='button' onClick={resetThemeColor}>
				reset
			</button>
		</nav>
	);
}
