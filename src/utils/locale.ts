import { Locale, LocaleWordList, WordListKey } from '$/types/locale'

const localeWordsLists: LocaleWordList[] = [
  {
    key: 'publish',
    words: [
      { locale: 'ja-JP', word: '公開中' },
      { locale: 'en-US', word: 'Publish' }
    ]
  },
  {
    key: 'comingsoon',
    words: [
      { locale: 'ja-JP', word: '近日公開' },
      { locale: 'en-US', word: 'Coming Soon' }
    ]
  },
  {
    key: 'draft',
    words: [
      { locale: 'ja-JP', word: '下書き' },
      { locale: 'en-US', word: 'Draft' }
    ]
  },
  {
    key: 'expired',
    words: [
      { locale: 'ja-JP', word: '期限切れ' },
      { locale: 'en-US', word: 'Expired' }
    ]
  },
  {
    key: 'search',
    words: [
      { locale: 'ja-JP', word: '検索' },
      { locale: 'en-US', word: 'Search' }
    ]
  },
  {
    key: 'text',
    words: [
      { locale: 'ja-JP', word: 'テキスト' },
      { locale: 'en-US', word: 'Text' }
    ]
  },
  {
    key: 'area',
    words: [
      { locale: 'ja-JP', word: 'テキストエリア' },
      { locale: 'en-US', word: 'Area' }
    ]
  },
  {
    key: 'number',
    words: [
      { locale: 'ja-JP', word: '番号' },
      { locale: 'en-US', word: 'Number' }
    ]
  },
  {
    key: 'date',
    words: [
      { locale: 'ja-JP', word: '日付' },
      { locale: 'en-US', word: 'Date' }
    ]
  },
  {
    key: 'switch',
    words: [
      { locale: 'ja-JP', word: 'スイッチ' },
      { locale: 'en-US', word: 'Switch' }
    ]
  },
  {
    key: 'image',
    words: [
      { locale: 'ja-JP', word: '画像' },
      { locale: 'en-US', word: 'Image' }
    ]
  },
  {
    key: 'json',
    words: [
      { locale: 'ja-JP', word: 'JSON' },
      { locale: 'en-US', word: 'JSON' }
    ]
  }
]

export const getLocalWord = (key: WordListKey, locale: Locale = 'en-US') => {
  // check that word in english is exist or not
  const targetWordList = localeWordsLists.filter((list) => list.key === key)
  if (!targetWordList) return ''

  // check that target locale's word is exist or not
  const targetWordItem = targetWordList[0].words.filter(
    (item) => item.locale === locale
  )
  if (!targetWordItem) return ''

  return targetWordItem[0].word
}

// export const getGlobalWord = (word: string) => {

// check that word in english is exist or not
//const targetWordLists= localeWordsLists.filter(list => {
//    return list.words.some(item => item.word === word)
//});
//if (!targetWordLists) return '';

//const targetWord= targetWordLists[0].words.filter(item => {
//    return item.locale === 'en-US';
//})[0];

//return targetWord;
//}

// this method is used for translating sentence
// but this method is incomplete because i've not decided to how blanc translate yet
export const getLocalSentence = (
  sentence: string,
  locale: Locale = 'en-US'
) => {
  return sentence
}
