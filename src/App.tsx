import { FC, useCallback, useEffect, useState } from 'react'
import { useCompleteText } from './complete-text'
import { Input } from './input'
import { Messages } from './messages'
import { Log } from './types'
import { createAiLog, createMyLog, scrollToBottom } from './utils'

const App: FC = () => {
  const [logs, setLogs] = useState<Log[]>([
    createAiLog(
      '当サービスではOpenAI APIキーが必要です。チャットをするとOpenAI APIにアクセスするためOpenAIから課金されます。当サービスではAPIキーを他の目的に流用や保存などはしません。\nAPIキーの入力をお願いします。'
    ),
  ])
  const [apiKey, setApiKey] = useState('')
  const completeText = useCompleteText({ apiKey })
  const [memory, setMemory] = useState('')
  const [shouldScrollBottom, setShouldScrollBottom] = useState(false)

  useEffect(() => {
    if (shouldScrollBottom) {
      setShouldScrollBottom(false)
      scrollToBottom()
    }
  }, [shouldScrollBottom])

  const handleSubmit = useCallback(
    async (text: string) => {
      const sayAi = (message: string): void => {
        setLogs((prev) => [...prev, createAiLog(message)])
        setShouldScrollBottom(true)
      }

      if (!apiKey) {
        setApiKey(text)
        sayAi(
          'GPTちゃんです。なんでも聞いてください。\n楽しくお話ししましょう。'
        )
        setMemory(
          (prev) =>
            `${prev}AI: GPTちゃんです。なんでも聞いてください。\n楽しくお話ししましょう。\n`
        )
      } else {
        if (!completeText) {
          return
        }
        const prompt = `The following is a conversation with an AI assistant. The assistant is helpful, creative, clever, and very friendly.

${memory.trim()}
Human: ${text}
AI: `
        console.log(prompt)
        completeText(prompt)
          .then((res) => {
            const newText = res.slice(prompt.length)
            sayAi(newText)
            setMemory((prev) => `${prev}AI: ${newText.trim()}\n`)
          })
          .catch(() => {
            setApiKey('')
            setLogs((prev) => [
              ...prev,
              createAiLog(
                '有効なAPIキーではありません。有効なAPIキーを入力してください。'
              ),
            ])
            setShouldScrollBottom(true)
          })

        setLogs((prev) => [...prev, createMyLog(text)])
        setMemory((prev) => `${prev}Human: ${text}\n`)
        setShouldScrollBottom(true)
      }
    },
    [apiKey, completeText, memory]
  )

  return (
    <div className="flex justify-center">
      <div className="max-w-[800px] w-full pt-10">
        <Messages logs={logs} />
        <div className="w-full h-40" />
      </div>
      <div className="fixed bottom-0 left-0 w-full h-40 flex justify-center items-center bg-transparent">
        <Input onSubmit={handleSubmit} />
      </div>
    </div>
  )
}

export default App
