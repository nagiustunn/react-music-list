import React, { Component, useContext, useCallback } from 'react'
import StoreContext from '../music/MusicPlayer'
import './css/Playbar.css'

const formatTime = inputSeconds => {
    let seconds = Math.floor(inputSeconds % 60)
    if (seconds < 10) seconds = `0${seconds}`
  
    const minutes = Math.floor(inputSeconds / 60)
  
    return `${minutes}:${seconds}`
}

const handleProgress = (currentTime, duration) => 600 * (currentTime / duration)

export default class Playbar extends Component {
    render() {
        return (
            <div className="playbar">
                <div className="playbar-left">
                    {song && (
                    <>
                        <div>{song.title}</div>

                    <div className="artist">{song.artist}</div>
                    </>
                    )}
                </div>

                <div className="playbar-middle">
                    <div className="play-pause-circle" onClick={playOrPause}>
                        <i
                            className={`fa fa-${state.playing ? 'pause' : 'play'}`}
                            style={{ transform: state.playing ? '' : 'translateX(1.5px)' }}
                        />
                    </div>
                </div>

                <div style={{ marginTop: 2.5 }}>
                    <span>{formatTime(Math.floor(state.currentTime))}</span>

                    <div className="progress-container">
                            <div
                                className="bar"
                                style={{
                                    width: handleProgress(state.currentTime, state.duration)
                                }}
                            />
                    </div>

                    <span>{formatTime(state.duration)}</span>
                </div>
                
                <div className="player-right">
                    <i className="fa fa-volume-up" />

                    <input
                    type="range"
                    min="0"
                    max="1"
                    value={state.volume}
                    step="0.01"
                    style={{ marginLeft: 10 }}
                    onChange={setVolume}
                    />
                </div>
        </div>
        )
    }
}
