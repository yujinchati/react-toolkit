/*
  Cookie
  : 서버에서 https통신으로 client(Browser)에 데이터를 전달할때 header객체에 전달하는 경량의 문자데이터(4kb:개별 쿠기값당)
  : 사용자의 브라우저에 물리적인 파일형태로 저장이 되기 때문에 사용자를 브라우저를 닫더라도 유지시킬수 있는 값
  : 만료일이 존재해하고 사용자가 설정가능, 만약 만료일을 지정하지 않으면 브라우저를 닫는 순간 쿠키값 삭제됨
  Cookie vs Session
  : Cookie정보는 client쪽에 저장되는 반면 Session을 서버쪽에 저장됨
  : 덜 중요한 값을 유지시킬때 주로 Cookie사용 (장바구니 목록, 오늘하루 팝업안보이기, etc..)
  : 사용자 개인정보같이 중요한 정보값을 Session사용 (사용자 로그인 정보, etc...)
  Cookie ve Local Storage
  : Cookie데이터가 Local Storage에 비해서 경량의 문자값만 등록 가능 (cookie:4kb, local storage:5mb)
  : Cookie는 만료일 지정가능가능하기 때문에 자동적으로 값이 제거됨000
  : Local Storage는 사용자가 직접 삭제하기 전까지는 계속 유지됨
*/
/* 
export function useCookie(name, value, time) {
	let now = new Date();
	let duedate = now.getTime() + 1000 * time; //지금으로부터 time초 뒤의 만료시간
	now.setTime(duedate); //시간 객체값을 위해서 생성한 만료시간값으로 변경
	document.cookie = `${name}=${value}; expires=${now.toUTCString()}`;
}*/
// document.cookie = `${name}=${value}; path=/; expires=${now.toUTCString()}`;
//한국 시로 구하나 만료시간값을 전세계 표준시로 변횐해서 쿠키값을 만료시간 값으로 설정
//path값 경로의 url 에서만 쿠키가 생성됨
//csr방식의 리액트에서는 해당경로로 라우터 이동핟라도 서버쪽에서 해당url요청이 들어간것이 아니기때문에 쿠키 생성이 안됨
//해당 url경로에서 새로고침을 해야만 그때 쿠기가 생성
//가급적 리액트엣는 ㅜ키생성 경로 path=/로 지정

// export function useCookie() {
// 	return (name, value, time) => {
// 		let now = new Date();
// 		let duedate = now.getTime() + 1000 * time; //지금으로부터 time초 뒤의 만료시간
// 		now.setTime(duedate); //시간 객체값을 위해서 생성한 만료시간값으로 변경
// 		document.cookie = `${name}=${value}; expires=${now.toUTCString()}`;
// 	};
// }
//훅으로 처리하면 무조건 useEffect나 핸들러함수 호출 불가 이렇게 쓰면 안되고 이벤트를 통해 훅을 호출해야하기때문에 다른 형식으로 만들어야함

export function useCookie() {
	const setCookie = (name, value, time) => {
		let now = new Date();
		let duedate = now.getTime() + 1000 * time;
		now.setTime(duedate);
		document.cookie = `${name}=${value}; path=/; expires=${now.toUTCString()}`;
		console.log(document.cookie);
	};

	const isCookie = cookieKey => {
		if (document.cookie.indexOf(cookieKey) < 0) return false;
		else return true;
	};

	const viewCookie = () => console.log(document.cookie);

	return { setCookie, isCookie, viewCookie };
}
