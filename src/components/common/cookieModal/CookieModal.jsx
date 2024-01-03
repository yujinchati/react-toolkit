import { useRef, useState } from 'react';
import './CookieModal.scss';
import { useCookie } from '../../../hooks/useCookie';

export default function CookieModal({ wid, ht, children }) {
	const { isCookie, setCookie } = useCookie();
	const checkEl = useRef(null);
	const [Close, setClose] = useState(isCookie('today=done'));
	const handleClose = () => {
		const ischecked = checkEl.current.checked;
		if (ischecked) setCookie('today', 'done', 60 * 60 * 24);
		setClose(true);
	};
	return (
		<>
			{!Close && (
				<aside className='CookieModal' style={{ width: wid, height: ht, marginLeft: -wid / 2, marginTop: -ht / 2 }}>
					<div className='content'>{children}</div>

					<div className='controls'>
						<nav>
							<input type='checkbox' ref={checkEl} />
							<span>오늘하루 팝업보지 않기</span>
						</nav>
						<span
							onClick={() => {
								handleClose();
							}}>
							close
						</span>
					</div>
				</aside>
			)}
		</>
	);
}
