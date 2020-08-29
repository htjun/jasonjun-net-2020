import { useSpring } from 'react-spring'

export const introTransition = props =>
  useSpring({
    from: {
      opacity: 0,
      transform: 'translate3d(0, 8px, 0)',
    },
    to: {
      opacity: 1,
      transform: 'translate3d(0, 0, 0)',
    },
    delay: props.delay,
  })

export const pageTitleIn = props =>
  useSpring({
    from: {
      opacity: 0,
      transform: 'translate3d(16px, 0, 0)',
    },
    to: {
      opacity: 1,
      transform: 'translate3d(0, 0, 0)',
    },
    delay: props.delay,
    config: {
      tension: 200,
      mass: 2,
    },
  })
