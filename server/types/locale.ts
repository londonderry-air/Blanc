export type Locale = 'ja-JP' | 'en-US'

export type WordListKey =
  | 'publish'
  | 'draft'
  | 'comingsoon'
  | 'expired'
  | 'search'
  | 'text'
  | 'number'
  | 'area'
  | 'date'
  | 'switch'
  | 'image'
  | 'json'

export type LocaleWordList = {
  key: WordListKey
  words: LocaleWord[]
}

export type LocaleWord = {
  locale: Locale
  word: string
}
