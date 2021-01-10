import {React, Component, Fragment} from 'react'
import { createDataToAPI, getDataFromAPI, updateDataAPI, removeDataAPI } from '../../../config/redux/action'
import { connect } from "react-redux";
import './dashboard.scss'

class Dashboard extends Component {
    state = {
        title : '',
        content : '',
        date : '',
        noteId : '',
        button : 'simpan',
    }

    componentDidMount(){
        const userData = JSON.parse(localStorage.getItem('userData'))
        this.props.getNotes(userData.uid)
    }

    handleSaveNote = () => {
        const {title, content, button, noteId} = this.state
        const { saveNote, updateNote } = this.props
        const userData = JSON.parse(localStorage.getItem('userData'))

        const data = {
            title: title,
            content: content,
            date: new Date().getTime(),
            userId: userData.uid
        }
        if (button == 'simpan') {
            saveNote(data)
        } else {
            data.noteId = noteId
            updateNote(data)
        }
    }

    onInputChange = (e, type) => {
        this.setState({
            [type] : e.target.value
        })
    }

    updateNotes = (note) => {
        this.setState({
            title: note.data.title,
            content: note.data.content,
            button: 'update',
            noteId: note.id,
        })
    }

    cancelUpdate = () => {
        this.setState({
            title: '',
            content: '',
            button: 'simpan',
        })
    }
    
    deleteNote = (e, note) => {
        e.stopPropagation();
        const {removeNote} = this.props
        const userData = JSON.parse(localStorage.getItem('userData'))
        const data = {
            userId : userData.uid,
            noteId : note.id
        }
        removeNote(data)
    }
    render(){
        const {title, content, button} = this.state
        const { notes } = this.props
        const { updateNotes, cancelUpdate, deleteNote, onInputChange, handleSaveNote} = this
        console.log('notes', notes)
        return(
            <div className='container'>
                <div className='input-form'>
                    <input className='input-title' placeholder='Title' value={title}  onChange={(e) => onInputChange(e, 'title')} />
                    <textarea placeholder='Isi content disini' className='input-content' value={content}  onChange={(e) => onInputChange(e, 'content')}></textarea>
                    <div className='section-wrapper'>
                        <button className='save-btn cancel' onClick={handleSaveNote} onClick={cancelUpdate}>Cancel</button>
                        <button className='save-btn' onClick={handleSaveNote}>{button}</button>
                    </div>
                </div>
                <hr />
                {
                    notes.length > 0 ? (
                        <Fragment>
                            {
                                notes.map(note => {
                                    return (
                                        <div className='card-content' key={note.id} onClick={() => updateNotes(note)}>
                                            <p className='title'>{note.data.title}</p>
                                            <p className='date'>{note.data.date}</p>
                                            <p className='content'>{note.data.content}</p>
                                            <div className='delete-btn' onClick={(e) => deleteNote(e , note)}>x</div>
                                        </div>
                                    )
                                })
                            }
                        </Fragment>
                    ) : null
                }
            </div>
        )
    }
}

const reduxState = (state) => ({
    userData : state.user,
    notes : state.note
})

const reduxDispatch = (dispatch) => ({
    saveNote : (data) => dispatch(createDataToAPI(data)),
    getNotes : (data) => dispatch(getDataFromAPI(data)),
    updateNote : (data) => dispatch(updateDataAPI(data)),
    removeNote : (data) => dispatch(removeDataAPI(data))
})
export default connect(reduxState, reduxDispatch) (Dashboard)