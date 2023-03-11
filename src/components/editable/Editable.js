import React, { useState } from 'react'
import { X } from 'react-feather'

import './editable.css'

const Editable = (props) => {
    const [showEdit, setShowEdit] = useState(false)
    const [inputValue, setInputValue] = useState(props.default || "")
    return (
        <div className='editable'>
            {
                showEdit ?
                    <form
                        className={`editable-edit ${props.editClass || ""}`}
                        onSubmit={(e) => {
                            e.preventDefault()
                            if (props.onSubmit) props.onSubmit(inputValue)
                            setShowEdit(false)
                            setInputValue("")
                        }}>
                        <input
                            type="text"
                            autoFocus
                            value={inputValue}
                            placeholder={props.placeholder || "Enter item"}
                            onChange={(e) => setInputValue(e.target.value)}
                        />
                        <div className='editable-edit-footer'>
                            <button type='submit'>{props.buttonText || "Add"}</button>
                            <X onClick={() => setShowEdit(false)} />
                        </div>
                    </form>
                    :
                    <p className={`editable-display ${props.displayClass}`} onClick={() => setShowEdit(true)}>{props.text || "Add item"}</p>
            }
        </div>
    )
}

export default Editable