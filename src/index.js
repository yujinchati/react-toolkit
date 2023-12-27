import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { GobalProvider } from './hooks/useGlobalData';

ReactDOM.render(
	<BrowserRouter>
		<GobalProvider>
			<App />
		</GobalProvider>
	</BrowserRouter>,
	document.getElementById('root')
);
