'use client';

import React, { useEffect, useState } from 'react';
import {
    UserPlus,
    CalendarPlus,
    Calendar as CalendarIcon,
    Users,
    Home,
    Settings,
    Search,
    Bell,
    Clock,
    Phone,
    MessageCircle
} from 'lucide-react';

/**
 * MOCK TELEGRAM WEB APP
 */
const mockTelegramWebApp = {
    initDataUnsafe: {
        user: {
            first_name: "Олексій",
            last_name: "Dev",
            username: "alex_dev",
        }
    },
    themeParams: {
        bg_color: "#ffffff",
        secondary_bg_color: "#f3f4f6",
        text_color: "#000000",
        hint_color: "#9ca3af",
        button_color: "#3b82f6",
        button_text_color: "#ffffff",
        header_bg_color: "#ffffff"
    },
    expand: () => console.log("Expanded"),
    ready: () => console.log("Ready"),
};

// --- HOOKS ---
const useTelegram = () => {
    const [webApp, setWebApp] = useState<any>(null);
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        const app = (window as any).Telegram?.WebApp || mockTelegramWebApp;
        if (app) {
            app.ready();
            app.expand();
            setWebApp(app);
            setUser(app.initDataUnsafe?.user);

            const root = document.documentElement;
            const params = app.themeParams;
            root.style.setProperty('--tg-bg', params.bg_color || '#ffffff');
            root.style.setProperty('--tg-secondary-bg', params.secondary_bg_color || '#f3f4f6');
            root.style.setProperty('--tg-text', params.text_color || '#000000');
            root.style.setProperty('--tg-hint', params.hint_color || '#9ca3af');
            root.style.setProperty('--tg-button', params.button_color || '#3b82f6');
            root.style.setProperty('--tg-button-text', params.button_text_color || '#ffffff');
        }
    }, []);

    return { webApp, user };
};

// --- COMPONENTS ---

const Card = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
    <div className={`bg-[var(--tg-bg)] border border-slate-200 rounded-xl shadow-sm overflow-hidden ${className}`}>
        {children}
    </div>
);

const SectionTitle = ({ title, action }: { title: string, action?: React.ReactNode }) => (
    <div className="flex items-center justify-between px-1 mb-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">{title}</h3>
        {action}
    </div>
);

// Оновлений бейдж статусу (текстовий)
const StatusBadge = ({ status }: { status: 'confirmed' | 'pending' | 'new' }) => {
    const styles = {
        confirmed: { bg: "bg-emerald-100", text: "text-emerald-700", label: "Підтверджено" },
        pending: { bg: "bg-amber-100", text: "text-amber-700", label: "Очікує" },
        new: { bg: "bg-blue-100", text: "text-blue-700", label: "Новий" }
    };
    const current = styles[status];
    return (
        <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wide ${current.bg} ${current.text}`}>
            {current.label}
        </span>
    );
};

// --- UPDATED SCHEDULE ITEM (With Actions) ---
const ScheduleItem = ({
    time,
    title,
    client,
    status,
}: {
    time: string,
    title: string,
    client: string,
    status: 'confirmed' | 'pending' | 'new',
}) => {
    return (
        <div className="flex flex-col p-3 bg-white border border-slate-100 rounded-xl mb-3 last:mb-0 shadow-sm">

            {/* Top Row: Time & Info */}
            <div className="flex items-start gap-3">
                {/* Time Block */}
                <div className="bg-slate-50 rounded-lg h-12 w-14 flex items-center justify-center border border-slate-100 shrink-0">
                    <span className="font-bold text-slate-900 text-sm">{time}</span>
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                        <h4 className="text-sm font-bold text-slate-900 truncate pr-2">{title}</h4>
                        <StatusBadge status={status} />
                    </div>
                    <div className="flex items-center gap-1.5 mt-1">
                        <Users className="w-3 h-3 text-slate-400" />
                        <p className="text-xs text-slate-500 truncate">{client}</p>
                    </div>
                </div>
            </div>

            {/* Bottom Row: Quick Actions */}
            <div className="flex gap-2 mt-3 pl-[68px]"> {/* Відступ зліва, щоб вирівняти під текстом */}
                <button
                    onClick={() => console.log('Call client')}
                    className="flex-1 h-8 bg-green-50 hover:bg-green-100 text-green-700 rounded-lg flex items-center justify-center gap-1.5 text-xs font-bold transition-colors border border-green-200"
                >
                    <Phone className="w-3.5 h-3.5" />
                    Подзвонити
                </button>

                <button
                    onClick={() => console.log('Message client')}
                    className="flex-1 h-8 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center gap-1.5 text-xs font-bold transition-colors border border-blue-200"
                >
                    <MessageCircle className="w-3.5 h-3.5" />
                    Написати
                </button>
            </div>

        </div>
    );
};

// --- MAIN APP ---

export default function App() {
    const { user } = useTelegram();
    const [activeTab, setActiveTab] = useState('home');
    const [mounted, setMounted] = useState(false);

    useEffect(() => { setMounted(true); }, []);

    if (!mounted) return null;

    const navItems = [
        { id: 'home', icon: Home, label: 'Головна' },
        { id: 'calendar', icon: CalendarIcon, label: 'Календар' },
        { id: 'clients', icon: Users, label: 'Клієнти' },
        { id: 'profile', icon: Settings, label: 'Профіль' },
    ];

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex">

            {/* SIDEBAR (Desktop) */}
            <aside className="hidden md:flex flex-col w-64 bg-white border-r border-slate-200 fixed h-full z-20">
                <div className="p-6 border-b border-slate-100">
                    <div className="flex items-center gap-3">
                        <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold shrink-0">
                            B
                        </div>
                        <span className="font-bold text-lg">BeautyBot</span>
                    </div>
                </div>

                <nav className="flex-1 p-4 space-y-1">
                    {navItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            className={`flex items-center gap-3 w-full p-3 rounded-lg text-sm font-medium transition-colors ${activeTab === item.id
                                    ? 'bg-blue-50 text-blue-700'
                                    : 'text-slate-600 hover:bg-slate-50'
                                }`}
                        >
                            <item.icon className="h-5 w-5 shrink-0" />
                            {item.label}
                        </button>
                    ))}
                </nav>

                <div className="p-4 border-t border-slate-100">
                    <div className="flex items-center gap-3">
                        <div className="h-9 w-9 bg-slate-100 rounded-full flex items-center justify-center text-slate-600 font-bold shrink-0">
                            {user?.first_name?.[0]}
                        </div>
                        <div className="flex flex-col overflow-hidden">
                            <span className="text-sm font-medium truncate">{user?.first_name}</span>
                            <span className="text-xs text-slate-400">Адміністратор</span>
                        </div>
                    </div>
                </div>
            </aside>

            {/* CONTENT AREA */}
            <div className="flex-1 w-full md:pl-64 flex flex-col min-w-0">

                {/* Header */}
                <header className="sticky top-0 z-10 bg-white/95 backdrop-blur-sm border-b border-slate-200 px-4 py-3 md:px-8 md:py-4 flex items-center justify-between">
                    <div className="md:hidden flex items-center gap-2">
                        <div className="h-8 w-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold">
                            {user?.first_name?.[0]}
                        </div>
                        <h1 className="font-bold text-lg truncate">Привіт, {user?.first_name}</h1>
                    </div>

                    <div className="hidden md:block">
                        <h2 className="text-xl font-bold">Панель керування</h2>
                    </div>

                    <div className="flex items-center gap-3">
                        <button className="p-2 hover:bg-slate-100 rounded-full text-slate-500">
                            <Search className="h-5 w-5" />
                        </button>
                        <button className="p-2 hover:bg-slate-100 rounded-full text-slate-500 relative">
                            <Bell className="h-5 w-5" />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
                        </button>
                    </div>
                </header>

                {/* Scrollable Content */}
                <main className="flex-1 p-4 md:p-8 w-full max-w-7xl mx-auto pb-24 md:pb-8">

                    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

                        {/* Left Column (Stats & Actions) */}
                        <div className="xl:col-span-2 space-y-6 min-w-0">

                            {/* Actions */}
                            <div className="grid grid-cols-2 gap-4">
                                <button className="flex flex-col items-start p-4 bg-blue-600 text-white rounded-xl shadow-md active:scale-95 transition-transform hover:bg-blue-700">
                                    <UserPlus className="h-6 w-6 mb-3" />
                                    <span className="text-xs opacity-80 uppercase tracking-wide font-medium">Додати</span>
                                    <span className="text-lg font-bold">Клієнта</span>
                                </button>
                                <button className="flex flex-col items-start p-4 bg-white border border-slate-200 text-slate-900 rounded-xl shadow-sm active:scale-95 transition-transform hover:bg-slate-50">
                                    <CalendarPlus className="h-6 w-6 mb-3 text-blue-600" />
                                    <span className="text-xs text-slate-500 uppercase tracking-wide font-medium">Запланувати</span>
                                    <span className="text-lg font-bold">Візит</span>
                                </button>
                            </div>

                            {/* Stats */}
                            <div>
                                <SectionTitle title="Огляд" />
                                <div className="grid grid-cols-2 gap-4">
                                    <Card className="p-4 flex flex-col gap-1 hover:border-blue-200 transition-colors">
                                        <span className="text-xs text-slate-500 font-bold uppercase">Візитів</span>
                                        <div className="flex items-baseline gap-2">
                                            <span className="text-2xl font-bold">12</span>
                                            <span className="text-xs text-green-600 bg-green-50 px-1 rounded">+2</span>
                                        </div>
                                    </Card>
                                    <Card className="p-4 flex flex-col gap-1 hover:border-blue-200 transition-colors">
                                        <span className="text-xs text-slate-500 font-bold uppercase">Дохід</span>
                                        <div className="flex items-baseline gap-2">
                                            <span className="text-2xl font-bold">$450</span>
                                            <span className="text-xs text-green-600 bg-green-50 px-1 rounded">+15%</span>
                                        </div>
                                    </Card>
                                </div>
                            </div>
                        </div>

                        {/* Right Column (Schedule with Actions) */}
                        <div className="xl:col-span-1 min-w-0">
                            <SectionTitle title="Розклад на сьогодні" action={<button className="text-xs text-blue-600 font-bold hover:underline">Всі</button>} />

                            <div className="flex flex-col">
                                {/* Item 1 */}
                                <ScheduleItem
                                    time="10:00"
                                    title="Манікюр Гель"
                                    client="Марія К."
                                    status="confirmed"
                                />

                                {/* Item 2 */}
                                <ScheduleItem
                                    time="12:30"
                                    title="Педикюр SPA"
                                    client="Олена В."
                                    status="pending"
                                />

                                {/* Item 3 */}
                                <ScheduleItem
                                    time="14:00"
                                    title="Консультація"
                                    client="Новий клієнт"
                                    status="new"
                                />

                                {/* Empty State */}
                                <div className="mt-2 text-center p-4 border border-dashed border-slate-200 rounded-xl bg-slate-50/50">
                                    <span className="text-xs text-slate-400 font-medium">На сьогодні більше немає записів</span>
                                </div>
                            </div>
                        </div>

                    </div>
                </main>
            </div>

            {/* MOBILE NAV */}
            <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 pb-safe pt-1 px-4 z-50 h-16 flex justify-between items-center shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
                {navItems.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => setActiveTab(item.id)}
                        className={`flex flex-col items-center justify-center w-16 h-full gap-1 transition-colors ${activeTab === item.id ? 'text-blue-600' : 'text-slate-400 hover:text-slate-600'
                            }`}
                    >
                        <item.icon className={`h-6 w-6 ${activeTab === item.id ? 'fill-current' : ''}`} strokeWidth={2} />
                        <span className="text-[10px] font-medium">{item.label}</span>
                    </button>
                ))}
            </nav>

        </div>
    );
}