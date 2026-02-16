import { faas as rawFaas } from '@faasjs/ant-design'
import type { FaasActionPaths, FaasParams } from '@faasjs/types'

const callFaas = rawFaas as (
  action: string,
  params?: Record<string, any>,
  options?: Parameters<typeof rawFaas>[2]
) => ReturnType<typeof rawFaas>

export function faas<TAction extends FaasActionPaths>(
  action: TAction,
  params: FaasParams<TAction>,
  options?: Parameters<typeof rawFaas>[2]
) {
  return callFaas(action, params as Record<string, any>, options)
}
