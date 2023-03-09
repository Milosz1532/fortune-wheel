import React from 'react'

import Item from './Item'

import './List.css'

const List = ({ items, deleteItem }) => {
	const itemList = items.map(item => (
		<Item key={item.id} id={item.id} title={item.title} color={item.color} deleteItem={deleteItem} />
	))
	return <ul className='item-list'>{itemList}</ul>
}

export default List
