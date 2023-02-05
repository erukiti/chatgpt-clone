import { FC } from 'react'
import { formatTime, convertMessageBreak } from './utils'

type Props = {
  message: string
  at: Date
}

export const MyMessage: FC<Props> = ({ message, at }) => {
  return (
    <div className="flex gap-2 justify-end">
      <div>
        <div className="flex items-end gap-2 mt-2 max-w-[600px]">
          <div>{formatTime(at)}</div>
          <div className="p-4 bg-[#5fcb76] rounded-2xl drop-shadow-md">
            {convertMessageBreak(message)}
          </div>
        </div>
      </div>
    </div>
  )
}
