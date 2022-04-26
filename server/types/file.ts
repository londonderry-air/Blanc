import { BlancFile } from '@prisma/client'

export type ClientBlancFile = Omit<BlancFile, 'dataURL' | 'deleted'>
