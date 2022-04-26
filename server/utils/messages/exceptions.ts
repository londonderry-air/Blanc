export const exceptions = {
  user: {
    email_used: <BlancExceptionMessage>{
      content: {
        en: '',
        jp: '入力されたメールアドレスは既に登録されています。'
      },
      solution: {
        en: '',
        jp: `サインインページより、入力されたメールアドレス・パスワードを用いてログインをお試しください。ユーザーを新規登録する場合は、他のメールアドレスを使用して再度お試しください。`
      }
    }
  },
  content: {
    same_slug: <BlancExceptionMessage>{
      content: {
        en: '',
        jp: '入力されたスラッグは既に他のコンテンツで使用されています。'
      },
      solution: {
        en: '',
        jp: 'スラッグは、他のコンテンツと被らないように設定してください。'
      }
    }
  },
  post: {
    same_slug: <BlancExceptionMessage>{
      content: {
        en: '',
        jp: '投稿を保存できませんでした。'
      },
      solution: {
        en: '',
        jp: '入力されたスラッグは既に他の投稿で使用されています。スラッグは、同じコンテンツを持つ他の投稿と被らないように設定してください。'
      }
    }
  }
}

export type BlancExceptionMessage = {
  content: {
    en: string
    jp: string
  }
  solution: {
    en: string
    jp: string
  }
}
