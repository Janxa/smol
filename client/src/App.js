import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React, { useEffect, useState } from "react";
import Main from "./components/Main.jsx";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar";
import Popup from "./components/popups/Popup";
import CookiesBanner from "./components/Cookies";
import { useCookies } from "react-cookie";

function App() {
	const [cookies, setCookie] = useCookies();
	const [cookieTabVisible, setCookieTabVisible] = useState(
		cookies.urlList ? false : true
	);
	const [isSidebarVisible, setIsSidebarVisible] = useState(false);
	const [popup, setPopup] = useState({ content: null, visible: false });
	const [urlList, setUrlList] = useState(cookies.urlList || []);

	useEffect(() => {
		if (Object.keys(cookies).length > 0) {
			setCookie("urlList", urlList, {
				path: "/",
			});
		}
	}, [urlList]);

	function CreateCookie(urlList) {
		setCookie("urlList", urlList, {
			path: "/",
		});
		setCookieTabVisible(false);
	}
	function RefuseCookie() {
		setCookieTabVisible(false);
	}

	function OpenPopup(content) {
		if (popup.content === content) {
			return;
		}
		if (popup.visible) {
			setTimeout(() => setPopup({ content: content, visible: true }), 400);
		} else {
			setPopup({ content: content, visible: true });
		}
	}

	function ClosePopup() {
		setPopup({ content: null, visible: false });
	}
	function ToggleSidebar() {
		if (isSidebarVisible) {
			setIsSidebarVisible(false);
		} else {
			setIsSidebarVisible(true);
		}
	}
	return (
		<div className="flex flex-col h-screen bg-stone-600 ">
			<ToastContainer />
			<Header
				ToggleSidebar={ToggleSidebar}
				isSidebarVisible={isSidebarVisible}
			/>

			<Sidebar
				urlList={urlList}
				setUrlList={setUrlList}
				isVisible={isSidebarVisible}
				setIsVisible={setIsSidebarVisible}
				CreateCookie={CreateCookie}
			/>

			<Main urlList={urlList} setUrlList={setUrlList} />

			<Footer OpenPopup={OpenPopup} />

			{popup.visible && (
				<Popup
					Content={popup.content}
					visible={popup.visible}
					ClosePopup={ClosePopup}
				/>
			)}

			{cookieTabVisible && (
				<CookiesBanner
					RefuseCookie={RefuseCookie}
					CreateCookie={CreateCookie}
					urlList={urlList}
				/>
			)}
		</div>
	);
}

export default App;
