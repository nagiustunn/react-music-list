import React, { Component, createContext, useRef } from 'react'
import Topbar from '../common/Topbar'
import Content from '../common/Content'
import Sidebar from '../common/Sidebar'
import Playbar from '../common/Playbar'
import {initialState, reducer} from '../redux/reducers/musicReducer'
import './MusicPlayer.css'

export const StoreContext = createContext(null)

const [state, dispatch] = useReducer(reducer, initialState); 
  const audioRef = useRef();

  useEffect(() => {
    if (state.playing) {
      audioRef.current.load()
      audioRef.current.play()
    } else audioRef.current.pause()
  }, [state.playing, state.currentSongId])

  useEffect(() => {
    audioRef.current.volume = state.volume
  }, [state.volume])

  const song = state.media[state.currentSongId] 

export default class MusicPlayer extends Component {
  
  render() {
    return <StoreContext.Provider value = {{state,dispatch}}>
      <div className="home">
        <Topbar></Topbar>
        <Sidebar></Sidebar>
        <Content></Content>
        <Playbar></Playbar>

        <audio>

        </audio>
      </div>
    </StoreContext.Provider>
  }
}
