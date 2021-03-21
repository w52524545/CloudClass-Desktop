import { IMediaRenderer } from 'agora-rte-sdk'
import React, { useRef, useEffect } from 'react'
import classnames from 'classnames'

interface RendererPlayerProps {
  preview?: boolean,
  track?: IMediaRenderer,
  id?: string,
  className?: string,
  fitMode?: boolean,
  style?: React.CSSProperties,
  children?: any,
  mirror?: boolean,
  placeholderComponent?: React.ReactElement
}

export const RendererPlayer = (props: RendererPlayerProps) => {

  const cls = classnames({
    [`mirror`]: !!props.mirror,
    [`${props.className}`]: !!props.className
  })

  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (ref.current && props.track) {
      props.track.play && props.track.play(ref.current, props.fitMode)
    }
    return () => props.track && props.track.stop && props.track.stop(props.preview)
  }, [ref, props.track, props.fitMode, props.preview])

  return (
    <div className={cls} style={props.style} key={props.track && props.track.videoTrack ? props.track.videoTrack.getTrackId() : ''} id={props.id ? props.id : ''} ref={ref}>
      {props.children ? props.children : null}
    </div>
  )
}