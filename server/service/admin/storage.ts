import {
  GenerateSignedPostPolicyV4Options,
  GenerateSignedPostPolicyV4Response,
  Storage
} from '@google-cloud/storage'
import { StoragePolicyOption } from '$/types/api'

export const getStoragePolicy = async (body: StoragePolicyOption) => {
  if (!process.env.GCP_BUCKETNAME) return null
  const storage = new Storage({
    projectId: process.env.PROJECT_ID,
    keyFilename: process.env.GCP_CREDENTIALS
  })
  const bucket = storage.bucket(process.env.GCP_BUCKETNAME)
  const filename = Math.random().toString(32).substring(2)
  const file = bucket.file(filename)
  const options = getPolicyOption(body)
  const policy: GenerateSignedPostPolicyV4Response =
    await file.generateSignedPostPolicyV4(options)

  return policy
}

const getPolicyOption = (
  policy: StoragePolicyOption
): GenerateSignedPostPolicyV4Options => {
  return {
    expires: policy.expired ?? Date.now() + 1 * 60,
    conditions: [
      ['content-length-range', 0, policy.contentMaxLength ?? 1000000],
      ['eq', '$Content-Type', policy.contentType ?? 'application/octet-stream'],
      { 'x-goog-algorithm': 'GOOG4-RSA-SHA256' }
    ],
    fields: {
      'x-goog-meta-blancuser': 'user001',
      'x-goog-algorithm': 'GOOG4-RSA-SHA256',
      'Content-Type': policy.contentType ?? 'application/octet-stream'
    }
  }
}
