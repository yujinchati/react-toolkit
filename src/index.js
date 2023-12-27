import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
// import youtubeReducer from './redux/youtubeSlice';
// import memberReducer from './redux/memberSlice';
// import historyReducer from './redux/historySlice';
// import flickrReducer from './redux/flickrSlice';
import modalReducer from './redux/modalSlice';
import { configureStore } from '@reduxjs/toolkit';
import menuReducer from './redux/menuSlice';
import darkReducer from './redux/darkSlice';
import youtubeReducer, { fetchYoutube } from './redux/youtubeSlice';
import memberReducer, { fetchMember } from './redux/memberSlice';
import historyReducer, { fetchHistory } from './redux/historySlice';
import flickrReducer, { fetchFlickr } from './redux/flickrSlice';

const store = configureStore({
	reducer: {
		youtube: youtubeReducer,
		member: memberReducer,
		history: historyReducer,
		flickr: flickrReducer,
		modal: modalReducer,
		menu: menuReducer,
		dark: darkReducer
	}
});

ReactDOM.render(
	<BrowserRouter>
		<Provider store={store}>
			<App api={[fetchFlickr, fetchYoutube, fetchMember, fetchHistory]} />
		</Provider>
	</BrowserRouter>,
	document.getElementById('root')
);
