import { useProto } from '../store/prototype'
import { dict, type Lang } from './translations'

type Params = Record<string, string | number>

export function useT() {
  const lang = useProto((s) => s.language)
  return (key: string, params?: Params): string => translate(lang, key, params)
}

export function translate(lang: Lang, key: string, params?: Params): string {
  let s = dict[lang]?.[key] ?? dict.en[key] ?? key
  if (params) {
    for (const [k, v] of Object.entries(params)) {
      s = s.split(`{${k}}`).join(String(v))
    }
  }
  return s
}
