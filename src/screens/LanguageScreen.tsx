import { useNavigate } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import BackHeader from '../components/BackHeader'
import { useT } from '../i18n/useT'
import { useProto } from '../store/prototype'

export default function LanguageScreen() {
  const t = useT()
  const navigate = useNavigate()
  const language = useProto((s) => s.language)
  const setLanguage = useProto((s) => s.setLanguage)

  const pick = (lang: 'en' | 'pt') => {
    setLanguage(lang)
    navigate(-1)
  }

  const options: { key: 'en' | 'pt'; label: string }[] = [
    { key: 'en', label: t('language.english') },
    { key: 'pt', label: t('language.portuguese') },
  ]

  return (
    <div className="flex flex-col h-full w-full bg-base-lowest">
      <BackHeader title={t('language.title')} />
      <div className="px-lg pt-md">
        <div className="bg-base-flat border border-border-normal rounded-xl overflow-hidden">
          {options.map((opt, i) => (
            <div key={opt.key}>
              <button
                type="button"
                onClick={() => pick(opt.key)}
                className="w-full px-lg py-lg flex items-center justify-between text-left"
              >
                <span
                  className={`text-display-sm ${
                    opt.key === language ? 'text-text-primary' : 'text-text-primary'
                  }`}
                >
                  {opt.label}
                </span>
                <ChevronRight size={20} strokeWidth={1.75} className="text-text-tertiary" />
              </button>
              {i < options.length - 1 && (
                <div className="mx-lg h-px bg-border-normal" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
