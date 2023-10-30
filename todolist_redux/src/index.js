import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
//使用ANTD组件组的流程, ANTD自带按需导入,整天装antd后,打包的时候只打包使用的
//如果不需要国际化,或者没有全局配置的话,可以不用ConfigProvider进行包裹
import { ConfigProvider } from "antd";
import store from "./store";
import { Provider } from "react-redux";
import zhCN from "antd/locale/zh_CN";

import "./index.less";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<Provider store={store}>
		<App />
	</Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
