import { FC } from 'react'
import { formatTime, convertMessageBreak } from './utils'

type Props = {
  imagePath: string
  name: string
  message: string
  at: Date
}

export const OtherMessage: FC<Props> = ({ imagePath, name, message, at }) => {
  return (
    <div className="flex gap-2 justify-start">
      <img src={imagePath} className="rounded-full w-12 h-12" />
      <div>
        <div className="font-bold">{name}</div>
        <div className="flex items-end gap-2 mt-2 max-w-[600px]">
          <div className="p-4 bg-white rounded-2xl drop-shadow-md">
            {convertMessageBreak(message)}
          </div>
          <div>{formatTime(at)}</div>
        </div>
      </div>
    </div>
  )
}
