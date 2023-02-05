import { ReactNode } from 'react'
import { Log } from './types'

export const formatTime = (date: Date) =>
  `${date.getHours().toString().padStart(2, '0')}:${date
    .getMinutes()
    .toString()
    .padStart(2, '0')}`

export const convertMessageBreak = (message: string): ReactNode => {
  return message.split('\n').reduce(
    (prev, curr) => (
      <>
        {prev}
        {!!prev && <br />}
        {curr}
      </>
    ),
    '' as ReactNode
  )
}

const AI_NAME = 'GPTちゃん'
const AI_IMAGE_PATH = '/gpt-chan.png'

export const createAiLog = (message: string): Log => {
  return {
    name: AI_NAME,
    imagePath: AI_IMAGE_PATH,
    message,
    at: new Date(),
  }
}

export const createMyLog = (message: string): Log => {
  return {
    message,
    at: new Date(),
  }
}

export const scrollToBottom = (): void => {
  const element = document.documentElement
  const bottom = element.scrollHeight
  window.scroll(0, bottom)
}
