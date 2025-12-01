# Mini CRM - Telegram Mini App

Система управління клієнтами та записами для майстрів краси.

## Технології

- **Next.js 16** - React framework з App Router
- **TypeScript** - Типізація коду
- **Tailwind CSS** - Стилізація
- **Telegram WebApp SDK** - Інтеграція з Telegram
- **Turbopack** - Швидкий bundler

## Структура проекту

```
miniCRM/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Головна сторінка
│   ├── clients/           # Клієнти
│   │   ├── page.tsx       # Список клієнтів
│   │   └── add/page.tsx   # Додати клієнта
│   ├── visits/            # Записи
│   │   ├── page.tsx       # Список записів
│   │   └── add/page.tsx   # Додати запис
│   ├── calendar/page.tsx  # Календар
│   ├── services/page.tsx  # Послуги
│   ├── dashboard/page.tsx # Статистика
│   └── settings/page.tsx  # Налаштування
├── components/            # React компоненти
│   ├── ui/               # shadcn/ui компоненти
│   ├── layout/           # Layout компоненти
│   ├── cards/            # Card компоненти
│   └── elements/         # Базові елементи
├── hooks/                # Custom React hooks
│   └── useTelegram.ts    # Telegram WebApp hook
├── lib/                  # Утиліти
│   ├── mock-data.ts      # Тестові дані
│   └── utils.ts          # Допоміжні функції
├── styles/               # Стилі
│   └── globals.css       # Глобальні стилі
└── public/               # Статичні файли

```

## Встановлення

```bash
# Встановити залежності
npm install

# Запустити dev сервер
npm run dev

# Зібрати production версію
npm run build

# Запустити production сервер
npm start
```

## Розробка

Проект використовує:
- **App Router** - нова система роутингу Next.js
- **Server Components** - за замовчуванням
- **Client Components** - де потрібна інтерактивність (позначені `"use client"`)
- **TypeScript** - строга типізація
- **ESLint** - лінтинг коду

## Telegram Mini App

Для тестування в Telegram:
1. Створіть бота через @BotFather
2. Налаштуйте Mini App URL
3. Відкрийте додаток через Telegram

## Функціонал

- ✅ Управління клієнтами
- ✅ Управління записами
- ✅ Календар візитів
- ✅ Список послуг
- ✅ Статистика та аналітика
- ✅ Адаптивний дизайн
- ✅ Темна/світла тема (автоматично з Telegram)
- ✅ Мобільна навігація

## Ліцензія

MIT
