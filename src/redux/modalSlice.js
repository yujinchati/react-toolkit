import { createSlice } from '@reduxjs/toolkit';

const modalSlice = createSlice({
	name: 'modal',
	initialState: { open: false },
	reducers: {
		modalOpen: state => {
			state.open = true;
		},
		modalClose: state => {
			state.open = false;
		}
	}
});

//slice함수 호출시 modalSlice라는 객체반환
//{reducer : 변경된 전역객체, actions : reducer에 등록된 action 객체 생성함수}

//아래 action객체 생성함수는 추후 컴포넌트에서 호출해서 반환된 action객체를 dispatch로 전달
export const { modalOpen, modalClose } = modalSlice.actions;

//아래 reducer 객체는 index에서 store에 담김
export default modalSlice.reducer;
