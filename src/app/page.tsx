import dynamic from 'next/dynamic'

const Animation = dynamic(() => import('../modules/animation/index'), {
  ssr: false,
})

export default Animation
