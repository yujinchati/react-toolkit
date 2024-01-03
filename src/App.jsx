import Footer from './components/common/footer/Footer';
import Header from './components/common/header/Header';
import MainWrap from './components/main/mainWrap/MainWrap';
import Member from './components/sub/Members/Members';
import Community from './components/sub/community/Community';
import Contact from './components/sub/contact/Contact';
import Department from './components/sub/department/Department';
import Gallery from './components/sub/gallery/Gallery';
import Youtube from './components/sub/youtube/Youtube';
import { Route } from 'react-router-dom';
import './globalStyles/Variables.scss';
import './globalStyles/Reset.scss';
import { useState } from 'react';
import { useMedia } from './hooks/useMedia';
import Menu from './components/common/memu/Menu';
import Detail from './components/sub/youtube/Detail';
import Welcome from './components/sub/Members/Welcome';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useGlobalData } from './hooks/useGlobalData';
import { useCookie } from './hooks/useCookie';
import CookieModal from './components/common/cookieModal/CookieModal';

//git confige option 수정
export default function App() {
	const { Mode } = useGlobalData();
	const queryclient = new QueryClient();
	useCookie('today', 'done', 20);

	return (
		<QueryClientProvider client={queryclient}>
			<div className={`wrap ${Mode === 'light' ? 'light' : 'dark'} ${useMedia()}`}>
				<Header />
				<Route exact path='/' component={MainWrap} />
				<Route path='/department' component={Department} />
				<Route path='/gallery' component={Gallery} />
				<Route path='/community' component={Community} />
				<Route path='/members' component={Member} />
				<Route path='/contact' component={Contact} />
				<Route path='/youtube' component={Youtube} />
				<Route path='/detail/:id' component={Detail} />
				<Route path='/welcome/:id' component={Welcome} />
				<Footer />
				<Menu />
				<CookieModal wid={600} ht={400}>
					<h1>쿠키팝업</h1>
				</CookieModal>
			</div>
			<ReactQueryDevtools />
		</QueryClientProvider>
	);
}
