import React, { Component, useCallback, useContext, useState } from 'react'
import './css/Content.css'
import Modal from './Modal'
import Toast from './Toast'
import { StoreContext } from '../music/MusicPlayer'

const Content = () => {
  const { state, dispatch } = useContext(StoreContext)

  const [toast, setToast] = useState('')
  const [playlistSelect, setPlayListSelect] = useState('')
  const [playVisibleId, setPlayVisibleId] = useState(false)

  const currentPlaylist = state.currentPlaylist

  const playlists = Object.keys(state.playlists).filter(
    (list) => !['home', 'favorites'].includes(list)
  )
  const songIds = Array.from(state.playlists[currentPlaylist])

  const handleSelect = useCallback((e) => {
    setPlayListSelect(e.target.value)
  })
}

const Favorite = ({ isFavorite, songId }) => {
  const { dispatch } = useContext(StoreContext)

  return isFavorite ? (
    <i
      className="fa fa-heart"
      onClick={() => dispatch({ type: 'REMOVE_FAVORITE', songId })}
    />
  ) : (
    <i
      className="fa fa-heart-o"
      onClick={() => dispatch({ type: 'ADD_FAVORITE', songId })}
    />
  )
}

const PlayPause = ({ playing, songId, isCurrentSong, visible }) => {
  const { dispatch } = useContext(StoreContext)
  const style = { visibility: visible ? 'visible' : 'hidden' }

  if (isCurrentSong && playing) {
    return (
      <i
        className="fa fa-pause"
        onClick={() => dispatch({ type: 'PAUSE' })}
        style={style}
      />
    )
  } else {
    return (
      <i
        className="fa fa-play"
        onClick={() => dispatch({ type: 'PLAY', songId })}
        style={style}
      />
    )
  }
}
export default class Content extends Component {
  render() {
    return (
      <div className="Content">
        <div className="playlist-title">{currentPlaylist}</div>

        {songIds.length <= 0 ? (
          <p style={{ marginTop: 10 }}>
            Your playlist is empty. Start by adding some songs!
          </p>
        ) : (
          <table>
            <thead>
              <tr>
                <td />
                <td>Title</td>
                <td>Artist</td>
                <td>Length</td>
              </tr>
            </thead>

            <tbody>
              {songIds.map((id) => {
                const { title, artist, length } = state.media[id]
                const isFavorite = state.playlists.favorites.has(id)

                return (
                  <tr key={id}>
                    <td
                      onMouseEnter={() => setPlayVisibleId(id)}
                      onMouseLeave={() => setPlayVisibleId('')}
                      style={{ width: 75, paddingLeft: 5 }}
                    >
                      <PlayPause
                        playing={state.playing}
                        songId={id}
                        isCurrentSong={state.currentSongId === id}
                        visible={playVisibleId === id}
                      />

                      <span style={{ marginRight: 10 }} />

                      <Favorite isFavorite={isFavorite} songId={id} />

                      <span style={{ marginRight: 10 }} />

                      <i
                        className="fa fa-plus"
                        onClick={() => {
                          dispatch({
                            type: 'ADD_TO_PLAYLIST',
                            songId: id
                          })
                        }}
                      />
                    </td>
                    <td>{title}</td>
                    <td>{artist}</td>
                    <td>{length}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        )}

        <Modal
          show={state.addToPlaylistId}
          close={() => {
            dispatch({ type: 'ABORT_ADD_TO_PLAYLIST' })
          }}
        >
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 18, marginBottom: 20 }}>
              Add To Playlist
            </div>

            {playlists.length < 1 ? (
              <>
                <p>
                  You don't have any custom playlists yet. Start by creating one
                  in the sidebar menu!
                </p>

                <div style={{ marginTop: 15 }}>
                  <button>Ok</button>
                </div>
              </>
            ) : (
              <>
                <select
                  value={playlistSelect}
                  onChange={handleSelect}
                  style={{
                    fontSize: 16,
                    textTransform: 'capitalize',
                    width: 115,
                    height: 25
                  }}
                >
                  <option value="">Choose</option>

                  {playlists.map((list) => (
                    <option
                      key={list}
                      value={list}
                      disabled={state.playlists[list].has(
                        state.addToPlaylistId
                      )}
                    >
                      {list}
                    </option>
                  ))}
                </select>

                <div style={{ marginTop: 20 }}>
                  <button
                    onClick={() => {
                      if (playlistSelect === '') return

                      dispatch({
                        type: 'SAVE_TO_PLAYLIST',
                        playlist: playlistSelect
                      })

                      setToast('Successfully added to your playlist.')

                      setPlayListSelect('')
                    }}
                  >
                    Save
                  </button>
                </div>
              </>
            )}
          </div>
        </Modal>

        <Toast toast={toast} close={() => setToast('')} />
      </div>
    )
  }
}
