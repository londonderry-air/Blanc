import { StoragePolicyOption } from '$/types/api'
import { GenerateSignedPostPolicyV4Response } from '@google-cloud/storage'

export type Methods = {
  post: {
    reqBody: StoragePolicyOption
    resBody: GenerateSignedPostPolicyV4Response | null
  }
}
