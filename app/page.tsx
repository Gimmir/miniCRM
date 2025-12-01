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
  Phone,
  MessageCircle,
  MoreHorizontal,
  TrendingUp,
  ArrowRight,
  Clock,
  MapPin,
  XCircle,
  CheckCircle2,
  CalendarClock,
  ChevronDown,
  ChevronUp
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
    if (typeof window !== 'undefined') {
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
    }
  }, []);

  return { webApp, user };
};

// --- COMPONENTS ---

const SectionTitle = ({ title, action }: { title: string, action?: React.ReactNode }) => (
  <div className="flex items-center justify-between px-1 mb-3 md:mb-4">
    <h3 className="text-[11px] font-bold uppercase tracking-widest text-slate-400">{title}</h3>
    {action}
  </div>
);

// Оновлений бейдж статусу
const StatusIcon = ({ status }: { status: 'confirmed' | 'cancelled' }) => {
  if (status === 'cancelled') {
    return <XCircle className="w-5 h-5 text-red-500" />;
  }
  return <CheckCircle2 className="w-5 h-5 text-emerald-500" />;
};

// --- STATS CARD ---
const StatsCard = ({
  title,
  value,
  trend,
  trendLabel,
  chartColor = "green"
}: {
  title: string,
  value: string,
  trend: string,
  trendLabel: string,
  chartColor?: "green" | "blue"
}) => {
  const isGreen = chartColor === "green";
  const colorClass = isGreen ? "text-emerald-600" : "text-blue-600";
  const strokeColor = isGreen ? "#10b981" : "#3b82f6";
  const gradientId = isGreen ? "gradient-green" : "gradient-blue";

  return (
    <div className="bg-white border border-slate-100/80 rounded-2xl p-4 md:p-5 shadow-[0_2px_12px_-4px_rgba(0,0,0,0.02)] relative overflow-hidden group hover:border-slate-200 transition-all duration-300 z-0 select-none">
       <div className="relative z-10 flex flex-col h-full justify-between">
         <div className="flex justify-between items-start mb-2 md:mb-4">
            <span className="text-xs md:text-sm font-medium text-slate-500 truncate mr-2">{title}</span>
            <div className="hidden md:block bg-slate-50 p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
              <ArrowRight className="w-3 h-3 text-slate-400" />
            </div>
         </div>
         <div>
            <h3 className="text-xl md:text-3xl font-extrabold text-slate-900 mb-1 tracking-tight">{value}</h3>
            <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-1.5">
               <div className={`flex items-center gap-0.5 px-1.5 py-0.5 rounded-md w-fit ${isGreen ? 'bg-emerald-50' : 'bg-blue-50'}`}>
                 <TrendingUp className={`w-3 h-3 ${colorClass}`} />
                 <span className={`text-[10px] md:text-xs font-bold ${colorClass}`}>{trend}</span>
               </div>
               <span className="text-[10px] md:text-xs text-slate-400 font-medium truncate">{trendLabel}</span>
            </div>
         </div>
       </div>
       <div className="absolute bottom-0 left-0 right-0 h-12 md:h-20 opacity-20 z-0 pointer-events-none">
          <svg viewBox="0 0 100 40" className="w-full h-full" preserveAspectRatio="none">
            <defs>
              <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={strokeColor} stopOpacity="0.5" />
                <stop offset="100%" stopColor={strokeColor} stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d="M0,40 L0,30 C20,32 40,15 60,20 C80,25 90,5 100,0 L100,40 Z" fill={`url(#${gradientId})`} />
            <path d="M0,30 C20,32 40,15 60,20 C80,25 90,5 100,0" fill="none" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
          </svg>
       </div>
    </div>
  );
};

// --- ACTION BUTTON ---
const QuickActionBtn = ({ 
  icon: Icon, 
  label, 
  subLabel, 
  color = "blue" 
}: { 
  icon: any, 
  label: string, 
  subLabel: string, 
  color?: "blue" | "white" 
}) => {
  const isBlue = color === "blue";
  return (
    <button className={`
      relative flex items-center p-3 rounded-2xl transition-all duration-300 group w-full text-left shadow-sm
      ${isBlue 
        ? 'bg-blue-600 text-white shadow-blue-500/20 active:bg-blue-700' 
        : 'bg-white border border-slate-100 text-slate-900 active:bg-slate-50'
      }
      active:scale-[0.98] z-0 select-none
    `}>
      <div className={`
        p-2 rounded-xl mr-3 shrink-0 transition-transform group-hover:scale-110 duration-300
        ${isBlue ? 'bg-white/15' : 'bg-blue-50'}
      `}>
         <Icon className={`w-5 h-5 ${isBlue ? 'text-white' : 'text-blue-600'}`} />
      </div>
      
      <div className="flex-1 min-w-0">
        <span className={`block text-[9px] font-bold uppercase tracking-wider opacity-80 mb-0.5 ${isBlue ? 'text-blue-100' : 'text-slate-400'}`}>
          {subLabel}
        </span>
        <span className="block text-sm font-bold leading-none truncate">
          {label}
        </span>
      </div>

      {isBlue && (
        <div className="absolute -top-4 -right-4 w-16 h-16 bg-white/10 rounded-full blur-xl pointer-events-none"></div>
      )}
    </button>
  );
}

// --- SCHEDULE ITEM ---
const ScheduleItem = ({ 
  time, 
  endTime,
  title, 
  client, 
  status,
  price
}: { 
  time: string, 
  endTime: string,
  title: string, 
  client: string, 
  status: 'confirmed' | 'cancelled',
  price: string
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const isCancelled = status === 'cancelled';

  return (
    <div 
      onClick={() => setIsExpanded(!isExpanded)}
      className={`
        relative flex flex-col bg-white rounded-2xl mb-3 last:mb-0 transition-all duration-300 cursor-pointer overflow-hidden z-0 select-none
        border border-slate-100 shadow-[0_2px_8px_-2px_rgba(0,0,0,0.03)]
        ${isCancelled ? 'bg-slate-50/60' : 'active:bg-slate-50'}
        ${isExpanded ? 'ring-2 ring-blue-500/10' : ''}
      `}
    >
      {/* Status Stripe */}
      <div className={`absolute left-0 top-0 bottom-0 w-1 ${isCancelled ? 'bg-red-400' : 'bg-emerald-500'}`}></div>

      {/* Main Content */}
      <div className="pl-4 pr-4 py-3 flex items-center justify-between gap-3">
        
        {/* Left: Time */}
        <div className="flex flex-col items-center w-12 shrink-0 border-r border-slate-100 pr-3 mr-1">
          <span className={`text-sm font-bold leading-none ${isCancelled ? 'text-slate-400 line-through' : 'text-slate-900'}`}>
            {time}
          </span>
          <span className="text-[10px] text-slate-400 mt-1">{endTime}</span>
        </div>

        {/* Center: Info */}
        <div className="flex-1 min-w-0 flex flex-col">
           <div className="flex items-center gap-2 mb-0.5">
             <h4 className={`text-sm font-bold truncate ${isCancelled ? 'text-slate-500' : 'text-slate-900'}`}>
               {title}
             </h4>
             {isCancelled && <span className="text-[10px] font-bold text-red-500 bg-red-50 px-1.5 rounded">СКАСОВАНО</span>}
           </div>
           
           <div className="flex items-center gap-1.5 text-xs text-slate-500">
             <div className={`w-4 h-4 rounded-full flex items-center justify-center text-[8px] font-bold ${isCancelled ? 'bg-slate-200 text-slate-500' : 'bg-blue-50 text-blue-600'}`}>
               {client.charAt(0)}
             </div>
             <span className="truncate font-medium">{client}</span>
             <span className="text-slate-300 mx-1">•</span>
             <span className={`${isCancelled ? 'line-through text-slate-400' : 'text-slate-700 font-semibold'}`}>{price}</span>
           </div>
        </div>

        {/* Right: Expand Icon */}
        <div className="shrink-0 text-slate-300">
           {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </div>
      </div>

      {/* Actions (Expandable Area) */}
      <div className={`
        bg-slate-50/50 border-t border-slate-100 px-4 transition-all duration-300 ease-in-out
        ${isExpanded ? 'max-h-20 py-3 opacity-100' : 'max-h-0 py-0 opacity-0'}
      `}>
        <div className="flex gap-2">
            <button 
              onClick={(e) => { e.stopPropagation(); console.log('Call'); }}
              className="flex-1 h-9 text-[11px] font-bold text-slate-600 bg-white hover:bg-green-50 hover:text-green-700 hover:border-green-200 active:bg-green-50 active:border-green-200 border border-slate-200 rounded-xl flex items-center justify-center gap-1.5 transition-all active:scale-95 shadow-sm"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Дзвінок</span>
            </button>
            <button 
              onClick={(e) => { e.stopPropagation(); console.log('Message'); }}
              className="flex-1 h-9 text-[11px] font-bold text-slate-600 bg-white hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200 active:bg-blue-50 active:border-blue-200 border border-slate-200 rounded-xl flex items-center justify-center gap-1.5 transition-all active:scale-95 shadow-sm"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Написати</span>
            </button>
            <button 
              onClick={(e) => { e.stopPropagation(); console.log('Reschedule'); }}
              className="flex-1 h-9 text-[11px] font-bold text-slate-600 bg-white hover:bg-amber-50 hover:text-amber-700 hover:border-amber-200 active:bg-amber-50 active:border-amber-200 border border-slate-200 rounded-xl flex items-center justify-center gap-1.5 transition-all active:scale-95 shadow-sm"
            >
              <CalendarClock className="w-3.5 h-3.5" />
              <span>Перенести</span>
            </button>
        </div>
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
    <div 
      className="min-h-[100dvh] bg-[#fafafa] text-slate-900 font-sans flex overflow-x-hidden"
      style={{ WebkitTapHighlightColor: 'transparent' }} // ВИМКНЕННЯ СІРОГО ФОНУ ПРИ НАТИСКАННІ
    >
      
      {/* SIDEBAR (Desktop) */}
      <aside className="hidden md:flex flex-col w-72 bg-white border-r border-slate-100 fixed h-full z-20 shadow-[2px_0_24px_rgba(0,0,0,0.02)]">
        <div className="p-8 pb-6">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold shrink-0 shadow-lg shadow-blue-600/20">
              B
            </div>
            <div>
              <span className="font-bold text-lg leading-none block">BeautyBot</span>
              <span className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">CRM System</span>
            </div>
          </div>
        </div>
        
        <nav className="flex-1 px-4 space-y-1.5">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`group flex items-center gap-3.5 w-full p-3.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                activeTab === item.id 
                  ? 'bg-blue-50 text-blue-700 shadow-sm' 
                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <item.icon 
                className={`h-5 w-5 shrink-0 transition-transform duration-200 ${activeTab === item.id ? 'text-blue-600' : 'text-slate-400 group-hover:text-slate-600'}`} 
                strokeWidth={activeTab === item.id ? 2.5 : 2}
              />
              {item.label}
              {activeTab === item.id && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-600"></div>
              )}
            </button>
          ))}
        </nav>

        <div className="p-4 m-4 bg-slate-50 rounded-2xl border border-slate-100">
           <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-white rounded-full flex items-center justify-center text-slate-700 font-bold shrink-0 border border-slate-200 shadow-sm">
                 {user?.first_name?.[0]}
              </div>
              <div className="flex flex-col overflow-hidden">
                 <span className="text-sm font-bold truncate">{user?.first_name}</span>
                 <span className="text-xs text-slate-400">Адміністратор</span>
              </div>
           </div>
        </div>
      </aside>

      {/* CONTENT AREA */}
      <div className="flex-1 w-full md:pl-72 flex flex-col min-w-0">
        
        {/* Header */}
        <header className="sticky top-0 z-30 bg-[#fafafa]/95 backdrop-blur-md border-b border-slate-200/60 px-4 py-3 md:px-8 md:py-5 flex items-center justify-between">
          <div className="md:hidden flex items-center gap-3">
             <div className="h-9 w-9 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold shadow-md shadow-blue-600/20">
                {user?.first_name?.[0]}
             </div>
             <div>
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-0.5">Привіт,</span>
                <h1 className="font-bold text-lg leading-none truncate">{user?.first_name}</h1>
             </div>
          </div>
          
          <div className="hidden md:block">
            <h2 className="text-2xl font-bold tracking-tight">Панель керування</h2>
          </div>

          <div className="flex items-center gap-3">
             <button className="h-10 w-10 flex items-center justify-center hover:bg-white rounded-full text-slate-500 transition-all hover:shadow-sm hover:text-slate-900 active:scale-95">
                <Search className="h-5 w-5" />
             </button>
             <button className="h-10 w-10 flex items-center justify-center hover:bg-white rounded-full text-slate-500 transition-all hover:shadow-sm hover:text-slate-900 active:scale-95 relative">
                <Bell className="h-5 w-5" />
                <span className="absolute top-2.5 right-3 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
             </button>
          </div>
        </header>

        {/* Scrollable Content */}
        <main className="flex-1 p-4 md:p-10 w-full max-w-7xl mx-auto pb-24 md:pb-10 relative z-0">
          
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            
            {/* Left Column (Stats & Actions) */}
            <div className="xl:col-span-2 space-y-8 min-w-0">
               
               {/* Actions */}
               <div className="grid grid-cols-2 gap-3 md:gap-6">
                  <QuickActionBtn 
                    icon={UserPlus}
                    subLabel="Додати"
                    label="Клієнта"
                    color="blue"
                  />
                  <QuickActionBtn 
                    icon={CalendarPlus}
                    subLabel="Запланувати"
                    label="Візит"
                    color="white"
                  />
               </div>

               {/* Stats */}
               <div>
                  <SectionTitle title="Огляд за тиждень" />
                  <div className="grid grid-cols-2 gap-3 md:gap-6">
                     <StatsCard 
                        title="Візитів"
                        value="42"
                        trend="+12%"
                        trendLabel="минулий тижд."
                        chartColor="green"
                     />
                     <StatsCard 
                        title="Дохід"
                        value="54 500 ₴"
                        trend="+8%"
                        trendLabel="минулий тижд."
                        chartColor="blue"
                     />
                  </div>
               </div>
            </div>

            {/* Right Column (Schedule with Actions) */}
            <div className="xl:col-span-1 min-w-0">
               <SectionTitle title="Сьогоднішній розклад" action={<button className="text-[10px] font-bold text-blue-600 hover:text-blue-700 bg-blue-50 px-2 py-1 rounded-md transition-colors uppercase tracking-wide">Всі події</button>} />
               
               <div className="flex flex-col">
                  <ScheduleItem 
                    time="10:00"
                    endTime="11:30"
                    title="Манікюр Гель"
                    client="Марія К."
                    status="confirmed"
                    price="800 ₴"
                  />
                  <ScheduleItem 
                    time="12:30"
                    endTime="13:30"
                    title="Педикюр SPA"
                    client="Олена В."
                    status="cancelled"
                    price="950 ₴"
                  />
                  <ScheduleItem 
                    time="14:00"
                    endTime="14:45"
                    title="Консультація"
                    client="Новий клієнт"
                    status="confirmed"
                    price="Безкоштовно"
                  />
                  <div className="mt-4 text-center p-6 border border-dashed border-slate-200 rounded-2xl bg-slate-50/30 text-slate-400">
                     <Clock className="w-8 h-8 mx-auto mb-2 opacity-50" />
                     <span className="text-xs font-medium">На сьогодні більше немає записів</span>
                  </div>
               </div>
            </div>

          </div>
        </main>
      </div>

      {/* MOBILE NAV */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-lg border-t border-slate-200 pb-safe z-50 h-[76px] flex justify-between items-stretch px-4 shadow-[0_-4px_20px_-4px_rgba(0,0,0,0.05)]">
        {navItems.map((item) => (
           <button 
             key={item.id}
             onClick={() => setActiveTab(item.id)}
             className={`flex-1 flex flex-col items-center justify-center gap-1.5 transition-all duration-300 active:scale-95 select-none ${
                activeTab === item.id ? 'text-blue-600' : 'text-slate-400 hover:text-slate-600'
             }`}
           >
             <div className={`
               p-1.5 rounded-xl transition-all duration-300
               ${activeTab === item.id ? 'bg-blue-50 -translate-y-1' : ''}
             `}>
               <item.icon 
                 className={`h-5 w-5 transition-transform duration-300 ${activeTab === item.id ? 'scale-110' : ''}`} 
                 strokeWidth={activeTab === item.id ? 2.5 : 2}
               />
             </div>
             <span className={`text-[10px] leading-none transition-all duration-300 ${activeTab === item.id ? 'font-bold opacity-100' : 'font-medium opacity-80'}`}>
                {item.label}
             </span>
           </button>
        ))}
      </nav>

    </div>
  );
}