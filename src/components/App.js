import React, { useState } from 'react'

import AddItem from './AddItem'
import Wheel from './Wheel'
import List from './List'

import './App.css'

const colorList = [
	'CornflowerBlue',
	'CornflowerBlue',
	'DarkSalmon',
	'DarkSlateBlue',
	'DarkOrchid',
	'LightGreen',
	'Plum',
	'Tomato',
	'SteelBlue',
	'YellowGreen',
	'SlateGray',
	'Peru',
	'MediumTurquoise',
	'Brown',
	'Magenta',
	'LawnGreen',
	'LightPink',
	'LightSeaGreen',
	'Navy',
	'Orange',
	'Coral',
]

function App() {
	const [itemList, setItemList] = useState([])

	const addItem = text => {
		if (itemList.length >= 20) {
			alert('There can be a maximum of 20 items')
			return
		}
		setItemList(oldArray => [
			...oldArray,
			{
				id: oldArray.length + 1,
				title: text,
				color: colorList[oldArray.length + 1],
			},
		])
	}

	const deleteItem = id => {
		const newArray = itemList.filter(item => item.id !== id)
		setItemList(newArray)
	}

	return (
		<div className='App'>
			<div className='container'>
				<h4 id='logo'>Fortune Wheel</h4>
				<AddItem addNewItem={addItem} />
				<div className='main-wheel'>
					<Wheel itemList={itemList} />
				</div>
				{itemList.length > 0 ? <List items={itemList} deleteItem={deleteItem} /> : false}
			</div>
		</div>
	)
}

export default App
