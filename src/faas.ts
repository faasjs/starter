import { faas as rawFaas } from '@faasjs/ant-design'
import type { FaasAction, FaasActionPaths, FaasParams } from '@faasjs/types'

export function faas<TAction extends FaasActionPaths>(
  action: TAction,
  params: FaasParams<TAction>,
  options?: Parameters<typeof rawFaas>[2]
) {
  return rawFaas<TAction>(action as FaasAction<TAction>, params, options)
}
