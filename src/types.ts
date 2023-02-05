export type Log =
  | {
      imagePath?: never
      name?: never
      message: string
      at: Date
    }
  | {
      imagePath: string
      name: string
      message: string
      at: Date
    }
