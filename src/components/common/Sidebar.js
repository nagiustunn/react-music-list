import React, { Component, useState, useRef, useContext } from 'react'
import './css/Sidebar.css'
import logo from '../img/spotify-logo.png'
import { StoreContext } from '../music/MusicPlayer'
import Toast from './Toast'
import Modal from './Modal'

const [sidebarState, setState] = useState({
    modal: false,
    toast: ''
  })

  const { state, dispatch } = useContext(StoreContext)

  const playlistRef = useRef(null)
  const playlists = Object.keys(state.playlists)

  const addPlaylist = e => {
    e.preventDefault()
    const list = playlistRef.current.value

    dispatch({ type: 'ADD_PLAYLIST', playlist: list })

    setState({
      ...sidebarState,
      modal: false,
      toast: 'Playlist was created successfully!'
    })
  }

  const handleModal = () =>
    setState({ ...sidebarState, modal: !sidebarState.modal })
    
export default class Sidebar extends Component {
  render() {
    return (
      <div className="sidebar">
        <ul className="Sidebar">
          <img src={logo} />

          <li className="library">Library</li>

          {playlists.map((list) => (
            <li
              key={list}
              className={list === state.currentPlaylist ? 'active' : ''}
              onClick={() => dispatch({ type: 'SET_PLAYLIST', playlist: list })}
              >
              {list}
            </li>
          ))}

          <li className="new-playlist" onClick={handleModal}>
            <i className="fa fa-plus-circle" />
            <span>New Playlist</span>
          </li>

          <Modal show={sidebarState.modal} close={handleModal}>
            <form onSubmit={addPlaylist}>
              <div className="title">New Playlist</div>

              <div className="content-wrap">
                <input
                  type="text"
                  placeholder="My Playlist"
                  ref={playlistRef}
                  required
                />

                <br />

                <button type="submit">Create</button>
              </div>
            </form>
          </Modal>

          <Toast
            toast={sidebarState.toast}
            close={() => setState({ ...sidebarState, toast: '' })}
          />
        </ul>
      </div>
    )
  }
}
