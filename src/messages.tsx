import { FC } from 'react'
import { MyMessage } from './my-message'
import { OtherMessage } from './other-message'
import { Log } from './types'

type Props = {
  logs: Log[]
}

export const Messages: FC<Props> = ({ logs }) => {
  return (
    <div className="flex flex-col gap-10">
      {logs.map((log, i) => {
        if (log.name) {
          return <OtherMessage key={i} {...log} />
        } else {
          return <MyMessage key={i} {...log} />
        }
      })}
    </div>
  )
}
