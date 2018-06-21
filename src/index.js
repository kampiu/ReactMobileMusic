import React from 'react';
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import { BrowserRouter } from 'react-router-dom'
import registerServiceWorker from './registerServiceWorker'
import 'antd-mobile/dist/antd-mobile.css'

import './index.css'
import App from './App'
import axios from './comment/http.js'
import { rootReducer } from './redux/index'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import crypto from 'crypto'

const store = createStore(rootReducer, compose(
	applyMiddleware(thunk),
	window.devToolsExtension ? window.devToolsExtension() : f => f
))

React.http = axios
React.crypto = crypto
ReactDOM.render(
	(<Provider store={store}>
		<BrowserRouter>
	        <App />
		</BrowserRouter>
	</Provider>),
	document.getElementById('root')
);

(function(d, w) {
	let dw = d.documentElement.clientWidth;
	d.documentElement.style.fontSize = dw / 7.5 + "px"
	w.onresize = () => {
		d.documentElement.style.fontSize = d.documentElement.clientWidth / 7.5 + "px"
	}
	d.getScrollTop = (() => {
		let sp
		if(w.pageYOffset) {
			sp = w.pageYOffset
		} else if(d.compatMode && d.compatMode !== 'BackCompat') {
			sp = d.documentElement.scrollTop
		} else if(d.body) {
			sp = d.body.scrollTop
		}
		return sp;
	})
})(document, window);

registerServiceWorker();