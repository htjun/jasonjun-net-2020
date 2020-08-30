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
      tension: 150,
      mass: 1,
    },
  })

export const fadeIn = props =>
  useSpring({
    from: {
      opacity: 0,
    },
    to: {
      opacity: 1,
    },
    delay: props.delay,
    config: {
      tension: props.tension ? props.tension : 100,
      mass: 1,
    },
  })
