import React, { useEffect, useState } from 'react';

import Board from './components/board/Board';
import Editable from './components/editable/Editable';

import './App.css';

function App() {

  const [target, setTarget] = useState({ cardId: "", boardId: "" })
  const [boards, setBoards] = useState(JSON.parse(localStorage.getItem('task-tracker')) || [])

  useEffect(() => {
    localStorage.setItem('task-tracker', JSON.stringify(boards))
  }, [boards])

  const addCard = (title, boardId) => {
    const card = {
      id: Date.now() * Math.random(),
      title,
      labels: [],
      tasks: [],
      date: "",
      desc: ""
    }
    const boardindex = boards.findIndex(item => item.id === boardId)
    if (boardindex < 0) return;

    const tempBoards = [...boards]
    tempBoards[boardindex].cards.push(card)
    setBoards(tempBoards)
  }

  const removeCard = (cardId, boardId) => {
    const boardindex = boards.findIndex(item => item.id === boardId)
    if (boardindex < 0) return;

    const cardIndex = boards[boardindex].cards.findIndex(item => item.id === cardId)
    if (cardIndex < 0) return;

    const tempBoards = [...boards]
    tempBoards[boardindex].cards.splice(cardIndex, 1)
    setBoards(tempBoards)
  }

  const addBoard = (title) => {
    setBoards([
      ...boards,
      {
        id: Date.now() * Math.random(),
        title,
        cards: [],
      }
    ])
  }

  const removeBoard = (boardId) => {
    const tempBoards = boards.filter((item) => item.id !== boardId)
    setBoards(tempBoards)
  }

  const handleDragEnter = (cardId, boardId) => {
    setTarget({ cardId, boardId })
  }

  const handleDragEnd = (cardId, boardId) => {
    let s_bIndex, s_cIndex, t_bIndex, t_cIndex

    s_bIndex = boards.findIndex((item) => item.id === boardId)
    if (s_bIndex < 0) return

    s_cIndex = boards[s_bIndex].cards?.findIndex((item) => item.id === cardId)
    if (s_cIndex < 0) return

    t_bIndex = boards.findIndex((item) => item.id === target.boardId)
    if (t_bIndex < 0) return

    t_cIndex = boards[t_bIndex].cards?.findIndex((item) => item.id === target.cardId)
    if (t_cIndex < 0) return

    const tempBoards = [...boards]
    const tempCard = tempBoards[s_bIndex].cards[s_cIndex]

    tempBoards[s_bIndex].cards.splice(s_cIndex, 1)
    tempBoards[t_bIndex].cards.splice(t_cIndex, 0, tempCard)

    setBoards(tempBoards)

  }

  const updateCard = (cardId, boardId, card) => {
    const bIndex = boards.findIndex((item) => item.id === boardId)
    if (bIndex < 0) return

    const cIndex = boards[bIndex].cards?.findIndex((item) => item.id === cardId)
    if (cIndex < 0) return

    const tempBoards = [...boards]
    tempBoards[bIndex].cards[cIndex] = card
    setBoards(tempBoards)
  }

  return (
    <div className="app">
      <div className='app-navbar'>
        <h2>Tasks</h2>
      </div>
      <div className='app-outer'>
        <div className='app-boards'>
          {
            boards.map((item) => <Board
              key={item.id}
              board={item}
              removeBoard={removeBoard}
              addCard={addCard}
              removeCard={removeCard}
              handleDragEnd={handleDragEnd}
              handleDragEnter={handleDragEnter}
              updateCard={updateCard}
            />
            )
          }
          <div className='app-boards-board'>
            <Editable
              text="Add Board"
              placeholder="Add Board Title"
              displayClass="app-boards-board-add"
              onSubmit={(value) => addBoard(value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
