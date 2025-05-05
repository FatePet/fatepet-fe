'use client';
import LongInput from '@/components/inputs/LongInput';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import BigButton from '@/components/buttons/BigButton';
import { useRouter } from 'next/navigation';

function AdminLogin() {
	// 아이디 입력폼 컴포넌트
	const [idInputData, setIdInputData] = useState<string>('');
	const handleIdInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const tirmmedId = e.target.value.trim();
		setIdInputData(tirmmedId);
	};

	// 비밀번호 입력폼 컴포넌트
	const [pwInputData, setPwInputData] = useState<string>('');
	const handlePwInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const trimmedPw = e.target.value.trim();
		setPwInputData(trimmedPw);
	};

	// 로그인 버튼 컴포넌트
	interface Props extends IPostLoginResquestType {};
	
	const router = useRouter();
	const [loginErr, setLoginErr] = useState<string>('');
	const [body, setBody] = useState<Props>({ username: '', password: '' });

	// 테스트 로그인용 유저 => id: admin pw: 1234
	const [isMount, setIsMount] = useState(false);
	const handleTestSubmit = () => {
		setBody({ username: idInputData, password: pwInputData })
	};
	useEffect(() => {
		if(!isMount) {
			setIsMount(true)
			return;
		}

		if (body.username === "admin" && body.password === "1234") {
			setLoginErr('');
			router.push("/admin/main");
		} else {
			setLoginErr('아이디 또는 비밀번호가 잘못되었습니다.');
		};
	}, [body])

	return <div>
		<div className='flex flex-col justify-center items-center h-[50vh]'>
			<Image
				src={'/logo/fatepetLogo.svg'}
				width={220}
				height={220}
				alt='fatepet logo'
			/>
			<div className='font-bold text-2xl mt-3'>
				업체관리
			</div>
		</div>
		<div className='mx-2'>
			<div className='mb-3'>
				<LongInput
					inputData={idInputData}
					onChange={handleIdInputChange}
					placeHolder='아이디'
					disabled={false}
					errorMsg=''
				/>
			</div>
			<div className='mb-3'>
				<LongInput
					inputData={pwInputData}
					onChange={handlePwInputChange}
					placeHolder='비밀번호'
					disabled={false}
					errorMsg={loginErr}
					inputType='password'
				/>
			</div>
			<div>
				<BigButton
					buttonText='로그인'
					handleClick={handleTestSubmit}
				/>
			</div>
		</div>
		<div className='flex flex-col text-gray-500 m-20'>
			<div className='flex justify-center whitespace-nowrap'>
				아이디/비밀번호 분실 시 고객센터로 문의주세요.
			</div>
			<div className='flex justify-center'>
				fatepet@~~~.com
			</div>
		</div>
	</div>
}

export default AdminLogin;
