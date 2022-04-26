/* eslint-disable @typescript-eslint/no-explicit-any */
import { PolicyFields } from '@google-cloud/storage'
import { BlancExceptionMessage } from '$/utils/messages/exceptions'

export type APIStatus = 'success' | 'failed'
export type APIResult = {
  status: APIStatus
  exception?: BlancExceptionMessage
}

export type DBValidationResult = {
  status: 'valid' | 'invalid'
  exception?: BlancExceptionMessage
}

export type ContentType =
  | 'image/jpeg'
  | 'image/png'
  | 'image/gif'
  | 'image/svg+xml'
  | 'application/zip'
  | 'audio/mpeg'
  | 'video/mp4'
  | 'video/mpeg'
  | 'application/pdf'
  | 'application/json'
  | 'text/plain'
  | 'text/csv'

export type StoragePolicyOption = {
  expired?: Date
  contentType?: ContentType
  contentMaxLength?: number
}

export type StoragePolicy = {
  url: string
  fields: PolicyFields
}
