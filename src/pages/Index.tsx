import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';

export default function Index() {
  const currentDate = new Date();
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const clientData = {
    name: 'Сидоров Виталий Александрович',
    depositAmount: 1000000,
    rate: 18.5,
    openDate: '2025-07-10',
    term: 4,
    endDate: '2025-11-11'
  };

  const earnings = 0;
  const currentBalance = clientData.depositAmount;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto p-4 max-w-6xl">
        {/* Заголовок ВТБ */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="bg-primary text-primary-foreground rounded-lg p-3">
              <Icon name="Building2" className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">ВТБ Онлайн</h1>
              <p className="text-muted-foreground">Личный кабинет</p>
            </div>
          </div>
          <Badge variant="secondary" className="px-4 py-2">
            {formatDate(currentDate.toISOString().split('T')[0])}
          </Badge>
        </div>

        {/* Приветствие клиента */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <Icon name="User" className="w-5 h-5 text-primary" />
              Добро пожаловать, {clientData.name}
            </CardTitle>
            <CardDescription>Ваш персональный банковский кабинет</CardDescription>
          </CardHeader>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Основная информация о вкладе */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Icon name="PiggyBank" className="w-5 h-5 text-primary" />
                Вклад в плюсе
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Текущий баланс</p>
                    <p className="text-3xl font-bold text-primary">{formatCurrency(currentBalance)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Начальная сумма</p>
                    <p className="text-xl font-semibold">{formatCurrency(clientData.depositAmount)}</p>
                  </div>

                </div>

                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Процентная ставка</p>
                    <p className="text-2xl font-bold text-primary">{clientData.rate}%</p>
                    <p className="text-xs text-muted-foreground">годовых</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Срок вклада</p>
                    <p className="text-xl font-semibold">{clientData.term} месяца</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Дата открытия</p>
                    <p className="text-lg font-semibold">{formatDate(clientData.openDate)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Дата окончания</p>
                    <p className="text-lg font-semibold">{formatDate(clientData.endDate)}</p>
                  </div>
                  <Badge variant="default" className="w-fit">
                    <Icon name="Clock" className="w-4 h-4 mr-2" />
                    Активный
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* История операций */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Icon name="History" className="w-5 h-5 text-primary" />
                История операций
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-lg border bg-card">
                  <div className="flex items-center gap-3">
                    <div className="bg-green-100 p-2 rounded-full">
                      <Icon name="ArrowDown" className="w-4 h-4 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium">Поступление на вклад</p>
                      <p className="text-sm text-muted-foreground">{formatDate(clientData.openDate)}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-green-600">+{formatCurrency(clientData.depositAmount)}</p>
                    <Badge variant="secondary" className="text-xs">Выполнено</Badge>
                  </div>
                </div>


              </div>
            </CardContent>
          </Card>

          {/* Быстрые действия */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Icon name="Zap" className="w-5 h-5 text-primary" />
                Быстрые действия
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Button className="w-full justify-start" variant="secondary">
                  <Icon name="FileText" className="w-4 h-4 mr-3" />
                  Выписка по вкладу
                </Button>
                <Button className="w-full justify-start" variant="secondary">
                  <Icon name="Calculator" className="w-4 h-4 mr-3" />
                  Калькулятор доходности
                </Button>
                <Button className="w-full justify-start" variant="secondary">
                  <Icon name="Phone" className="w-4 h-4 mr-3" />
                  Связаться с банком
                </Button>
                <Separator />
                <Button className="w-full justify-start" variant="outline">
                  <Icon name="Settings" className="w-4 h-4 mr-3" />
                  Настройки уведомлений
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Подвал */}
        <div className="mt-8 text-center text-sm text-muted-foreground">
          <p>© 2025 ВТБ Банк. Все права защищены.</p>
          <p>Лицензия Банка России № 1000</p>
        </div>
      </div>
    </div>
  );
}