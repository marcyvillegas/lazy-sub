'use client'

import React from 'react'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const VideoSample = ({ blob }: any) => {
  return (
    <>
      {blob && (
        <video
          src={URL.createObjectURL(blob)}
          controls
          autoPlay
          style={{ width: '700px', margin: '1em' }}
        />
      )}
    </>
  )
}

export default VideoSample
