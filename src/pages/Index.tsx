import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function Index() {
  return (
    <div className="min-h-screen bg-[#0D1B2E]">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#0D1B2E] border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Avatar className="w-10 h-10 bg-white/10">
            <AvatarFallback className="bg-white/10 text-white">
              <Icon name="User" size={20} />
            </AvatarFallback>
          </Avatar>

          <Button variant="ghost" size="sm" className="text-white bg-[#1E3A5F] px-6 rounded-full hover:bg-[#2A4A71] transition-colors">
            Выгода
          </Button>

          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/10 transition-colors">
              <Icon name="Search" size={20} />
            </Button>
            <Button variant="ghost" size="icon" className="text-white relative hover:bg-white/10 transition-colors">
              <Icon name="Gift" size={20} />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-purple-500 rounded-full"></span>
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6 pb-24">
        {/* Main Account Card */}
        <Card className="bg-white rounded-3xl p-6 mb-6 shadow-xl">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                <span>Мастер-счет в рублях</span>
                <span className="text-gray-400">• 7469</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-5xl font-medium">1 700</span>
                <span className="text-2xl text-gray-400">,12 ₽</span>
                <Icon name="Eye" size={24} className="text-gray-400 ml-2" />
              </div>
            </div>
            <Button variant="ghost" size="icon" className="text-gray-400">
              <Icon name="MoreVertical" size={20} />
            </Button>
          </div>

          {/* Cards */}
          <div className="flex items-center gap-3 mb-6 overflow-x-auto pb-2">
            <button className="flex items-center gap-3 bg-gray-50 rounded-2xl px-4 py-3 min-w-fit transition-all hover:bg-gray-100 hover:scale-105 active:scale-95">
              <div className="w-12 h-8 bg-gradient-to-r from-blue-400 to-blue-600 rounded-md flex items-center justify-center">
                <span className="text-white text-xs font-bold">МИР</span>
              </div>
              <span className="font-medium">0787</span>
            </button>
            <button className="flex items-center gap-3 bg-gray-50 rounded-2xl px-4 py-3 min-w-fit transition-all hover:bg-gray-100 hover:scale-105 active:scale-95">
              <div className="w-12 h-8 bg-gradient-to-r from-blue-600 to-blue-800 rounded-md flex items-center justify-center">
                <span className="text-white text-xs font-bold">МИР</span>
              </div>
              <span className="font-medium">4264</span>
            </button>
            <Button variant="ghost" className="rounded-2xl h-14 w-14 flex-shrink-0 bg-gray-50 hover:bg-gray-100 transition-colors">
              <Icon name="Plus" size={24} className="text-blue-600" />
            </Button>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-4 gap-4">
            <button className="flex flex-col items-center gap-2 transition-all hover:scale-105 active:scale-95">
              <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center transition-colors hover:bg-blue-100">
                <Icon name="QrCode" size={24} className="text-blue-600" />
              </div>
              <span className="text-xs text-center text-gray-700">QR и оплата по фото</span>
            </button>
            <button className="flex flex-col items-center gap-2 transition-all hover:scale-105 active:scale-95">
              <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center transition-colors hover:bg-blue-100">
                <Icon name="CirclePlus" size={24} className="text-blue-600" />
              </div>
              <span className="text-xs text-center text-gray-700">Пополнить счет</span>
            </button>
            <button className="flex flex-col items-center gap-2 transition-all hover:scale-105 active:scale-95">
              <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center transition-colors hover:bg-blue-100">
                <Icon name="ArrowRightLeft" size={24} className="text-blue-600" />
              </div>
              <span className="text-xs text-center text-gray-700">Перевести по телефону</span>
            </button>
            <button className="flex flex-col items-center gap-2 transition-all hover:scale-105 active:scale-95">
              <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center transition-colors hover:bg-blue-100">
                <Icon name="Smartphone" size={24} className="text-blue-600" />
              </div>
              <span className="text-xs text-center text-gray-700">Оплата мобильного</span>
            </button>
          </div>
        </Card>

        {/* Notification Card */}
        <Card className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-3xl p-4 mb-6 flex items-center gap-4">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-2xl flex items-center justify-center flex-shrink-0">
            <Icon name="Sparkles" size={32} className="text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-900 mb-1">Новые возможности главной</h3>
            <p className="text-sm text-gray-600">Узнайте, что изменилось</p>
          </div>
          <Button variant="ghost" size="icon" className="text-gray-400 flex-shrink-0">
            <Icon name="X" size={20} />
          </Button>
        </Card>

        {/* Savings Section */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-white flex items-center gap-2">
              Накопления
              <Icon name="ChevronDown" size={20} className="text-gray-400" />
            </h2>
            <Button variant="ghost" size="icon" className="text-gray-400">
              <Icon name="MoreVertical" size={20} />
            </Button>
          </div>

          <Card className="bg-white rounded-3xl p-5">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center flex-shrink-0">
                <Icon name="Percent" size={28} className="text-blue-600" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium text-gray-900">Накопительный ВТБ-Счет</span>
                  <span className="text-sm text-gray-400">• 6005</span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-medium">0,00 ₽</span>
                </div>
              </div>
              <div className="text-right">
                <span className="text-sm font-medium text-gray-900">15,00 %</span>
              </div>
            </div>
          </Card>
        </div>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-[#1A2332] border-t border-white/10">
        <div className="max-w-6xl mx-auto px-4 py-2">
          <div className="flex items-center justify-around">
            <button className="flex flex-col items-center gap-1 py-2 px-4 text-white transition-colors hover:bg-white/5">
              <Icon name="Home" size={24} />
              <span className="text-xs">Главная</span>
            </button>
            <button className="flex flex-col items-center gap-1 py-2 px-4 text-gray-400 transition-colors hover:text-white hover:bg-white/5">
              <Icon name="ArrowUpDown" size={24} />
              <span className="text-xs">Платежи</span>
            </button>
            <button className="flex flex-col items-center gap-1 py-2 px-4 text-gray-400 transition-colors hover:text-white hover:bg-white/5">
              <Icon name="Clock" size={24} />
              <span className="text-xs">История</span>
            </button>
            <button className="flex flex-col items-center gap-1 py-2 px-4 text-gray-400 transition-colors hover:text-white hover:bg-white/5">
              <Icon name="LayoutGrid" size={24} />
              <span className="text-xs">Сервисы</span>
            </button>
            <button className="flex flex-col items-center gap-1 py-2 px-4 text-gray-400 transition-colors hover:text-white hover:bg-white/5">
              <Icon name="MessageCircle" size={24} />
              <span className="text-xs">Чат</span>
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
}