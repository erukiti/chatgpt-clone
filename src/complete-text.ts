import { Configuration, OpenAIApi } from 'openai'
import { useMemo } from 'react'

export const useCompleteText = ({ apiKey }: { apiKey: string }) => {
  return useMemo(() => {
    if (!apiKey) {
      return undefined
    }

    const configuration = new Configuration({ apiKey })
    const openai = new OpenAIApi(configuration)

    const completeText = async (prompt: string): Promise<string> => {
      const { data } = await openai.createCompletion({
        prompt,
        model: 'text-davinci-003',
        max_tokens: 200,
      })

      const choice = 0
      const isContinue = data.choices[choice].finish_reason === 'length'
      const text = data.choices[choice].text || ''

      if (isContinue) {
        return completeText(prompt + text)
      } else {
        return prompt + text
      }
    }

    return completeText
  }, [apiKey])
}
