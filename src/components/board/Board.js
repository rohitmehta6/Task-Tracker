import React, { useState } from 'react'
import { MoreHorizontal } from 'react-feather'

import Card from '../card/Card'
import Dropdown from '../dropdown/Dropdown'
import Editable from '../editable/Editable'

import './board.css'

const Board = (props) => {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <div className='board'>
      <div className='board-top'>
        <p className='board-top-title'>
          {props.board?.title}{" "} <span>{props.board?.cards?.length}</span>
        </p>
        <div className='board-top-more' style={{ cursor: "pointer" }}>
          <MoreHorizontal onClick={() => setShowDropdown(true)} />
          {showDropdown &&
            <Dropdown
              onClose={() => setShowDropdown(false)}
            >
              <div className='board-dropdown'>
                <p onClick={() => props.removeBoard(props.board?.id)}>Delete Board</p>
              </div>
            </Dropdown>}

        </div>
      </div>
      <div className='custom-scroll board-cards'>
        {
          props.board?.cards?.map((item) => <Card
            key={item.id}
            card={item}
            removeCard={props.removeCard}
            boardId={props.board?.id}
            handleDragEnd={props.handleDragEnd}
            handleDragEnter={props.handleDragEnter}
            updateCard={props.updateCard}
          />)
        }
        <Editable
          text="Add card"
          placeholder="Enter Card Title"
          displayClass="board-cards-add"
          onSubmit={(value) => props.addCard(value, props.board?.id)}
        />

      </div>
    </div>
  )
}

export default Board