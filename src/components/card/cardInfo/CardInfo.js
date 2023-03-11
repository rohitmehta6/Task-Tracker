import React, { useEffect, useState } from 'react'
import Modal from '../../modal/Modal'
import { Calendar, CheckSquare, List, Tag, Trash, Type } from 'react-feather'
import Editable from '../../editable/Editable'
import './cardinfo.css'
import Chip from '../../chip/Chip'

const CardInfo = (props) => {
    const [values, setValues] = useState({ ...props.card })
    const [activeColor, setActiveColor] = useState("")
    const colors = ["#a8193d", "#4fcc25", "#1ebffa", "#8da377", "#9975bd", "#cf61a1", "#240959"]

    useEffect(() => {

        props.updateCard(props.card.id, props.boardId, values)
    }, [values])

    const calculatePercent = () => {
        if (values.tasks?.length === 0) return "0"
        const completed = values.tasks?.filter((item) => item.completed)?.length
        return (completed / values.tasks?.length) * 100 + ""
    }

    const addLabel = (text, color) => {
        const index = values.labels?.findIndex(item => item.text === text)
        if (index >= 0) return;
        const label = {
            text,
            color
        }
        setValues({ ...values, labels: [...values.labels, label] })
        setActiveColor("")
    }

    const removeLabel = (text) => {
        const tempLabels = values.labels.filter((item) => item.text !== text)
        setValues({ ...values, labels: tempLabels })
    }

    const addTask = (text) => {
        const task = {
            id: Date.now() * Math.random(),
            text,
            completed: false
        }
        setValues({ ...values, tasks: [...values.tasks, task] })
    }

    const removeTask = (id) => {
        const tempTasks = values.tasks?.filter(item => item.id !== id)
        setValues({ ...values, tasks: tempTasks })
    }

    const updateTask = (id, completed) => {
        const index = values.tasks?.findIndex(item => item.id === id)
        if (index < 0) return

        const tempTasks = [...values.tasks]
        tempTasks[index].completed = completed
        setValues({ ...values, tasks: tempTasks })
    }



    return (
        <Modal onClose={() => props.onClose()}>
            <div className='cardinfo'>
                <div className='cardinfo-box'>
                    <div className='cardinfo-box-title'>
                        <Type />Title No1
                    </div>
                    <div className='cardinfo-box-body'>
                        <Editable
                            text={values.title}
                            default={values.title}
                            placeholder="Enter title"
                            buttonText="Set Title"
                            onSubmit={(value) => setValues({ ...values, title: value })}
                        />
                    </div>
                </div>

                <div className='cardinfo-box'>
                    <div className='cardinfo-box-title'>
                        <List />Description
                    </div>
                    <div className='cardinfo-box-body'>
                        <Editable
                            text={values.desc}
                            default={values.desc}
                            placeholder="descr"
                            buttonText="Set Description"
                            onSubmit={(value) => setValues({ ...values, desc: value })}
                        />
                    </div>
                </div>

                <div className='cardinfo-box'>
                    <div className='cardinfo-box-title'>
                        <Calendar />Date
                    </div>
                    <div className='cardinfo-box-body'>
                        <input
                            type="date"
                            defaultValue={values.date ? new Date(values.date).toISOString().substr(0, 10) : ""}
                            onChange={(e) => setValues({ ...values, date: e.target.value })}
                        />
                    </div>
                </div>

                <div className='cardinfo-box'>
                    <div className='cardinfo-box-title'>
                        <Tag />Labels
                    </div>
                    <div className='cardinfo-box-labels'>
                        {values.labels?.map((item, index) => (
                            <Chip
                                key={item.text + index}
                                close
                                onClose={() => removeLabel(item.text)}
                                color={item.color}
                                text={item.text}
                            />
                        ))}
                    </div>
                    <div className='cardinfo-box-colors'>
                        {colors.map((item, index) => (
                            <li key={index}
                                className={item === activeColor ? "active" : ""}
                                style={{ background: item }}
                                onClick={() => setActiveColor(item)} />
                        ))}
                    </div>
                    <div className='cardinfo-box-body'>
                        <Editable
                            text="Add Label"
                            placeholder="Enter label"
                            buttonText="Add"
                            onSubmit={(text) => addLabel(text, activeColor)}
                        />
                    </div>
                </div>

                <div className='cardinfo-box'>
                    <div className='cardinfo-box-title'>
                        <CheckSquare />Tasks
                    </div>
                    <div className='cardinfo-box-progress-bar'>
                        <div className='cardinfo-box-progress' style={{ width: calculatePercent() + "%", backgroundColor: calculatePercent() === "100" ? "limegreen" : "" }}>
                        </div>
                    </div>
                    <div className='cardinfo-box-list'>
                        {values.tasks?.map((item, index) => (
                            <div key={item.id} className='cardinfo-task'>
                                <input type="checkbox" defaultChecked={item.completed} onChange={(e) => updateTask(item.id, e.target.checked)} />
                                <p>{item.text}</p>
                                <Trash onClick={() => removeTask(item.id)} />
                            </div>
                        ))}
                    </div>
                    <div className='cardinfo-box-body'>
                        <Editable
                            text="Add new task"
                            placeholder="Enter task"
                            buttonText="Add Task"
                            onSubmit={(text) => addTask(text)}
                        />
                    </div>
                </div>
            </div>
        </Modal>
    )
}

export default CardInfo
