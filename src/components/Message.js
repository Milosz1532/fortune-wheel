import React, { useState } from 'react'

import './Message.css'

import icon from '../images/happy.svg'

const Message = ({ title, color, onClick }) => {
	const [animWindow, setAnimWindow] = useState(false)

	setTimeout(() => {
		setAnimWindow(true)
	}, 0)

	return (
		<div className={animWindow ? 'message-box active' : 'message-box'}>
			<div className='content'>
				<img src={icon} alt='Happy Icon' />
				<h5>Congratulations</h5>
				{/* <p style={{color}}>{title}</p> */}
				<p>The drawn item is <span>{title}</span>. Press the button to spin again.</p>
				<button onClick={onClick} className='spin-again'>
					Spin again
				</button>
			</div>
		</div>
	)
}

export default Message
