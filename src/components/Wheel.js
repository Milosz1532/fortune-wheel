import React, { useRef, useEffect, useState } from 'react'

import Message from './Message'

const dia = 500
const rad = dia / 2
const PI = Math.PI
let ang = 0
const TAU = 2 * PI

const friction = 0.99
const angVelMin = 0.002
let angVelMax = 0
let angVel = 0
let isSpinning = false
let isAccelerating = false
let animFrame = null

const EmptyWheel = () => (
	<div className='empty-wheel'>
		<p>Add new elements to spin the wheel of a fortune</p>
	</div>
)

const Wheel = ({ itemList }) => {
	const canvasRef = useRef(null)
	const [finalItem, setFinalItem] = useState(null)
	const tot = itemList.length
	const arc = TAU / tot
	const getIndex = () => Math.floor(tot - (ang / TAU) * tot) % tot
	const rand = (m, M) => Math.random() * (M - m) + m
	const addItem = document.querySelector('.inputDesign')
	const ulList = document.querySelector('.item-list')

	const frame = () => {
		if (!isSpinning) return

		if (angVel >= angVelMax) isAccelerating = false

		if (isAccelerating) {
			angVel ||= angVelMin
			angVel *= 1.06
		} else {
			isAccelerating = false
			angVel *= friction

			if (angVel < angVelMin) {
				isSpinning = false
				angVel = 0
				cancelAnimationFrame(animFrame)
				disableElements()
				setFinalItem(itemList[getIndex()])
			}
		}

		ang += angVel
		ang %= TAU
		rotate()
	}

	const engine = () => {
		frame()
		animFrame = requestAnimationFrame(engine)
	}

	const disableElements = () => {
		addItem.classList.toggle('disable')
		ulList.classList.toggle('disable')
	}

	const handleClick = () => {
		if (isSpinning) return
		setFinalItem(null)
		isSpinning = true
		isAccelerating = true
		angVelMax = rand(0.25, 0.4)
		engine()
		disableElements()
	}

	const rotate = () => {
		const canvas = canvasRef.current
		canvas.style.transform = `rotate(${ang - PI / 2}rad)`
	}

	const drawElement = (index, title, color) => {
		const canvas = canvasRef.current
		const context = canvas.getContext('2d')
		const ang = arc * index
		context.save()

		context.beginPath()
		context.fillStyle = color

		context.moveTo(rad, rad)
		context.arc(rad, rad, rad, ang, ang + arc)
		context.lineTo(rad, rad)
		context.fill()

		context.translate(rad, rad)
		context.rotate(ang + arc / 2)
		context.textAlign = 'right'
		context.fillStyle = '#fff'
		context.font = 'bold 25px sans-serif'
		context.fillText(title, rad - 10, 10)
		context.restore()
	}

	useEffect(() => {
		itemList.forEach((value, index) => drawElement(index, value.title, value.color))
	})

	const hideMessage = e => {
		setFinalItem(null)
	}

	return (
		<>
			{itemList.length !== 0 ? (
				<>
					<canvas width={'500px'} height={'500px'} className='wheel' ref={canvasRef} />
					<div id='spin' onClick={handleClick}>
						<p>SPIN</p>
					</div>
				</>
			) : (
				<EmptyWheel />
			)}

			{finalItem !== null ? <Message title={finalItem.title} color={finalItem.color} onClick={hideMessage} /> : false}
		</>
	)
}

export default Wheel
