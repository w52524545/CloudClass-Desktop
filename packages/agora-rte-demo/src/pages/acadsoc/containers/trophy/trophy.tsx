import React, { useEffect, useState, useRef, useMemo} from 'react'
import { observer } from 'mobx-react'
import {useRoomStore} from '@/hooks'
import './trophy.scss';

export const Trophy = observer(() => {

  const roomStore = useRoomStore()
  const [trophyState, setTrophyState] = useState<'none' | 'appear' | 'move'>('none')

  const giftRef = useRef<HTMLDivElement | null>(null)
  const trophyRef = useRef<HTMLDivElement | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null) 

  useEffect(() => {
    trophyRef.current?.addEventListener('transitionend', () => {
      roomStore.showTrophyAnimation = false
      setTrophyState('none')
    })
    giftRef.current?.addEventListener('animationend', () => {
      setTrophyState('move')
    })
  }, [])

  useEffect(() => {
    if (roomStore.showTrophyAnimation) {
      setTrophyState('appear')
      if (!audioRef.current) return
      audioRef.current.play().then(() => {
        setTimeout(() => {
          if(audioRef.current) {
            audioRef.current.pause()
            audioRef.current.currentTime = 0
          }
        }, 1500)
      })
    }
  }, [roomStore.showTrophyAnimation, audioRef.current])

  const animationStyle = useMemo(() => {
    let display = 'none'
    if(trophyState !== 'none') {
      display = 'block'
    } 
    if (trophyState !== 'move') {
      return {
        left: roomStore.trophyFlyout.startPosition.x + 'px',
        top: roomStore.trophyFlyout.startPosition.y + 'px',
        display,
      }
    } else {
      return {
        left: roomStore.trophyFlyout.endPosition.x + 'px',
        top: roomStore.trophyFlyout.endPosition.y + 'px',
        display,
        animation: 'trophyContainer 5s ease infinite'
      }
    }
  }, [trophyState, JSON.stringify(roomStore.trophyFlyout.startPosition), JSON.stringify(roomStore.trophyFlyout.endPosition)])

  return(
    <div 
      className="trophy-container"
      style={animationStyle}
      ref={trophyRef}
    >
      <section className="gift-animation-container" id="gift_animation_container">
        <div className="gift-animation scalc giftAnimationBig" ref={giftRef}>

        </div>
      </section>
      <div>
        <audio id={"gift_audio"}              
            controls
            src="https://webdemo.agora.io/effect_trophy.mp3"
            ref={audioRef}
            style={{"width":"1px","height":"1px","display":"none"}} 
        >
        </audio>
      </div>
    </div>
  )
})