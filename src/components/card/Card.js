import React, { useState } from 'react'
import { MoreHorizontal, Clock, CheckSquare } from 'react-feather'

import Dropdown from '../dropdown/Dropdown'
import Chip from '../chip/Chip'
import CardInfo from './cardInfo/CardInfo'

import './card.css'

const Card = (props) => {
    const [showDropdown, setShowDropdown] = useState(false)
    const [showModal, setShowModal] = useState(false)

    return (
        <>
            {showModal && <CardInfo
                card={props.card}
                onClose={() => setShowModal(false)}
                boardId={props.boardId}
                updateCard={props.updateCard}
            />}

            <div className='card' draggable
                onDragEnd={() => props.handleDragEnd(props.card?.id, props.boardId)}
                onDragEnter={() => props.handleDragEnter(props.card?.id, props.boardId)}
                onClick={() => setShowModal(true)}
            >
                <div className='card-top'>
                    <div className='card-top-labels'>
                        {props.card?.labels?.map((item, index) => <Chip
                            key={index}
                            text={item.text}
                            color={item.color}
                        />
                        )}
                    </div>
                    <div className='card-top-more' style={{ cursor: "pointer" }}>
                        <MoreHorizontal onClick={(e) => { e.stopPropagation(); setShowDropdown(true) }} />
                        {showDropdown &&
                            <Dropdown onClose={() => setShowDropdown(false)}>
                                <div className='card-dropdown'>
                                    <p onClick={() => props.removeCard(props.card?.id, props.boardId)}>Delete Card</p>
                                </div>
                            </Dropdown>}

                    </div>
                </div>
                <div className='card-title'>
                    {props.card?.title}
                </div>
                <div className='card-footer'>
                    {props.card?.date && <p><Clock />{props.card?.date}</p>}
                    {props.card?.tasks?.length > 0 && <p>
                        <CheckSquare />{props.card?.tasks?.filter(item => item.completed).length}/{props?.card?.tasks.length}
                    </p>}
                </div>
            </div>
        </>
    )
}

export default Card
