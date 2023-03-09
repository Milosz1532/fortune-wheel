import './Item.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

const Item = ({ id, title, color, deleteItem }) => {
	return (
		<li>
			<div className='item-span' style={{ backgroundColor: color }}></div>
			<span>{title}</span>
			<button onClick={() => deleteItem(id)} className='remove'>
				<FontAwesomeIcon icon={faTrash} />
			</button>
		</li>
	)
}

export default Item
