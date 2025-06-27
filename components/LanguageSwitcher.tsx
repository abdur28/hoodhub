"use client";
import { usePathname, useRouter } from 'next/navigation';
import { Globe } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface LanguageSwitcherProps {
  currentLang: string;
  isTransparent?: boolean;
}

const languages = {
  en: { name: 'English', flag: '🇺🇸' },
  ru: { name: 'Русский', flag: '🇷🇺' },
};

export default function LanguageSwitcher({ currentLang, isTransparent = false }: LanguageSwitcherProps) {
  const pathname = usePathname();
  const router = useRouter();

  const switchLanguage = (newLang: string) => {
    // Remove current language from pathname
    const segments = pathname.split('/').filter(Boolean);
    if (segments[0] === 'en' || segments[0] === 'ru') {
      segments.shift();
    }
    
    // Create new path with new language
    const newPath = `/${newLang}${segments.length > 0 ? '/' + segments.join('/') : ''}`;
    router.push(newPath);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className={`flex items-center space-x-1 transition-colors ${
            isTransparent
              ? 'text-white/90 hover:text-white hover:bg-white/10'
              : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-800'
          }`}
        >
          <Globe className="w-5 h-5" />
          <span className=" font-medium">
            {languages[currentLang as keyof typeof languages]?.flag}
          </span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        {Object.entries(languages).map(([code, { name, flag }]) => (
          <DropdownMenuItem
            key={code}
            onClick={() => switchLanguage(code)}
            className={`flex items-center space-x-3 cursor-pointer ${
              currentLang === code ? 'bg-gray-100 dark:bg-gray-800' : ''
            }`}
          >
            <span>{flag}</span>
            <span>{name}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}