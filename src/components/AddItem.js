import React, { useState } from 'react'

import './AddItem.css'

const AddItem = ({ addNewItem }) => {
	const [text, setText] = useState('')

	const addTask = () => {
		if (text.length === 0) return
		addNewItem(text)
		setText('')
	}

	const handleSubmit = e => {
		if (e.key === 'Enter') {
			addTask()
		}
	}

	return (
		<div className='row pt-3'>
			<div className='col-md-8 m-auto'>
				<div className='inputDesign'>
					<input
						value={text}
						onKeyDown={handleSubmit}
						onChange={event => setText(event.target.value)}
						placeholder='Add new item ...'
					/>
					<button onClick={addTask}>Add item</button>
				</div>
			</div>
		</div>
	)
}

export default AddItem
