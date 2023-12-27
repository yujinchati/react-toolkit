import { useEffect, useRef, useState } from 'react';
import Layout from '../../common/layout/Layout';
import './Department.scss';
import { useCustomText } from '../../../hooks/useText';

//비동기 데이터를 내부적으로 활용하는 컴포넌트에서 너무 빨리 다른 컴포넌트로 이용시
//특정값이 없다고 뜨면서 memory leak이라는 에러문구 뜨는 현상
//이유: 특정 컴포넌트 마운트시 만약 비동기 데이터 fectching로직이 들어가있다면 fetching 완료하고 해당 값을 state에 담는데 물리적인 시간 필요
//아직 데이터가 fetcing요청이 들어가고 데이터 바환되기 전에 해당 컴포넌트가 언마운트 되면 이미 담을 state는 사라졌는데 fetching요청은 계속 수해되굈음(메모리 누수현상 발생)

//해당방법 : 해당 컴포넌트에 state를 만들어서 초기값을 true로 지정하고 추후 데이터 해당 컴포넌트가 언마운트시 해당 state값을 강제로 true로 변경
//해당 state 값이 true일때는 state에 값 담기는 것을 실행되지않도록 조건문 처리

export default function Department() {
	const [Mounted, setMounted] = useState(true);

	const combinedTitle = useCustomText('combined');
	const path = useRef(process.env.PUBLIC_URL);
	const [MemberTit, setMemberTit] = useState('');
	const [MemberData, setMemberData] = useState([]);
	const [HistoryTit, setHistoryTit] = useState('');
	const [HistoryData, setHistoryData] = useState([]);

	useEffect(() => {
		return () => {
			setMounted(false);
		};
	}, [Mounted]);

	const fetchDepartment = () => {
		fetch(`${path.current}/DB/department.json`)
			.then(data => data.json())
			.then(json => {
				setMemberTit(Object.keys(json)[0]);
				setMemberData(Object.values(json)[0]);
			});
	};

	const fetchHistory = () => {
		fetch(`${path.current}/DB/history.json`)
			.then(data => data.json())
			.then(json => {
				setHistoryTit(Object.keys(json)[0]);
				setHistoryData(Object.values(json)[0]);
			});
	};

	useEffect(() => {
		fetchDepartment();
		fetchHistory();
	}, []);

	return (
		<Layout title={'Department'}>
			<section className='historyBox'>
				<h2>{combinedTitle(HistoryTit)}</h2>
				<div className='con'>
					{HistoryData.map((history, idx) => {
						return (
							<article key={history + idx}>
								<h3>{Object.keys(history)[0]}</h3>
								<ul>
									{Object.values(history)[0].map((list, idx) => {
										return <li key={list + idx}>{list}</li>;
									})}
								</ul>
							</article>
						);
					})}
				</div>
			</section>

			<section className='memberBox'>
				<h2>{combinedTitle(MemberTit)}</h2>

				<div className='con'>
					{MemberData.map((member, idx) => {
						return (
							<article key={member + idx}>
								<div className='pic'>
									<img src={`${path.current}/img/${member.pic}`} alt={member.name} />
								</div>
								<h3>{member.name}</h3>
								<p>{member.position}</p>
							</article>
						);
					})}
				</div>
			</section>
		</Layout>
	);
}
