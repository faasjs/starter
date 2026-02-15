import { faas } from '../faas'
import type { FaasParams } from '@faasjs/types'

type AddParams = FaasParams<'/pages/todo/api/add'>

const addParams: AddParams = { title: 'todo' }

// @ts-expect-error title is required for AddParams
const invalidAddParams: AddParams = {}

void faas('/pages/todo/api/add', addParams)

// @ts-expect-error title is required by /pages/todo/api/add
void faas('/pages/todo/api/add', {})

// @ts-expect-error title must be string
void faas('/pages/todo/api/add', { title: 123 })

void invalidAddParams
