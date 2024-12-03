import { AppProgressBar as ProgressBar } from 'next-nprogress-bar'

export const NextNprogress = () => {
  return (
    <ProgressBar
      color={'#397DF6'}
      delay={10}
      disableSameURL={false}
      height={'4px'}
      options={{ showSpinner: false }}
      shallowRouting
      startPosition={0.1}
      stopDelay={250}
    />
  )
}
