import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [calculatorForm, setCalculatorForm] = useState({
    amount: '',
    rate: '',
    term: ''
  });

  const [depositForm, setDepositForm] = useState({
    amount: '',
    depositId: '',
    description: ''
  });

  const [isDepositDialogOpen, setIsDepositDialogOpen] = useState(false);

  const [deposits, setDeposits] = useState([
    {
      id: 1,
      name: 'Классический вклад',
      amount: 500000,
      rate: 7.5,
      term: 12,
      startDate: '2024-01-15',
      endDate: '2025-01-15',
      earned: 37500,
      status: 'active'
    },
    {
      id: 2,
      name: 'Срочный депозит',
      amount: 1200000,
      rate: 8.2,
      term: 24,
      startDate: '2023-12-01',
      endDate: '2025-12-01',
      earned: 98400,
      status: 'active'
    },
    {
      id: 3,
      name: 'Пенсионный накопительный',
      amount: 300000,
      rate: 6.8,
      term: 6,
      startDate: '2024-06-10',
      endDate: '2024-12-10',
      earned: 10200,
      status: 'maturing'
    }
  ]);

  const [transactions, setTransactions] = useState([
    {
      id: 1,
      type: 'deposit',
      description: 'Пополнение Классический вклад',
      amount: 500000,
      date: '2024-01-15',
      status: 'completed'
    },
    {
      id: 2,
      type: 'interest',
      description: 'Начисление процентов',
      amount: 3125,
      date: '2024-02-15',
      status: 'completed'
    },
    {
      id: 3,
      type: 'deposit',
      description: 'Пополнение Срочный депозит',
      amount: 200000,
      date: '2024-03-01',
      status: 'completed'
    },
    {
      id: 4,
      type: 'interest',
      description: 'Начисление процентов',
      amount: 8200,
      date: '2024-03-01',
      status: 'completed'
    },
    {
      id: 5,
      type: 'withdrawal',
      description: 'Частичное снятие',
      amount: -50000,
      date: '2024-07-20',
      status: 'completed'
    }
  ]);

  const calculateProfit = () => {
    const amount = parseFloat(calculatorForm.amount);
    const rate = parseFloat(calculatorForm.rate);
    const term = parseFloat(calculatorForm.term);
    
    if (amount && rate && term) {
      const monthlyRate = rate / 100 / 12;
      const profit = amount * monthlyRate * term;
      const total = amount + profit;
      
      return { profit: profit.toFixed(2), total: total.toFixed(2) };
    }
    return { profit: '0', total: '0' };
  };

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('ru-RU').format(amount);
  };

  const getStatusBadge = (status: string) => {
    const statusMap = {
      active: { label: 'Активный', variant: 'default' as const },
      maturing: { label: 'Истекает', variant: 'secondary' as const },
      completed: { label: 'Завершен', variant: 'outline' as const }
    };
    
    const config = statusMap[status as keyof typeof statusMap] || statusMap.active;
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  const getTransactionIcon = (type: string) => {
    const icons = {
      deposit: 'ArrowDown',
      withdrawal: 'ArrowUp',
      interest: 'Percent'
    };
    return icons[type as keyof typeof icons] || 'Circle';
  };

  const handleDeposit = () => {
    if (!depositForm.amount || !depositForm.depositId) return;
    
    const amount = parseFloat(depositForm.amount);
    const selectedDeposit = deposits.find(d => d.id.toString() === depositForm.depositId);
    
    if (!selectedDeposit) return;

    // Обновляем вклад
    setDeposits(deposits.map(deposit => 
      deposit.id.toString() === depositForm.depositId 
        ? { ...deposit, amount: deposit.amount + amount }
        : deposit
    ));

    // Добавляем транзакцию
    const newTransaction = {
      id: transactions.length + 1,
      type: 'deposit',
      description: depositForm.description || `Пополнение ${selectedDeposit.name}`,
      amount: amount,
      date: new Date().toISOString().split('T')[0],
      status: 'completed'
    };

    setTransactions([newTransaction, ...transactions]);

    // Сбрасываем форму
    setDepositForm({ amount: '', depositId: '', description: '' });
    setIsDepositDialogOpen(false);
  };

  const totalBalance = deposits.reduce((sum, deposit) => sum + deposit.amount + deposit.earned, 0);
  const totalEarned = deposits.reduce((sum, deposit) => sum + deposit.earned, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Личный кабинет</h1>
              <p className="text-slate-600 mt-1">Управление депозитами и вкладами</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-slate-500">Общий баланс</p>
              <p className="text-2xl font-bold text-primary">{formatAmount(totalBalance)} ₽</p>
            </div>
          </div>
          
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <Card className="bg-white/60 backdrop-blur border-blue-100">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-600">Активные вклады</p>
                    <p className="text-2xl font-bold text-slate-900">{deposits.filter(d => d.status === 'active').length}</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Icon name="Landmark" className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-white/60 backdrop-blur border-green-100">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-600">Общий доход</p>
                    <p className="text-2xl font-bold text-green-600">+{formatAmount(totalEarned)} ₽</p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <Icon name="TrendingUp" className="w-6 h-6 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-white/60 backdrop-blur border-purple-100">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-600">Средняя ставка</p>
                    <p className="text-2xl font-bold text-purple-600">7.5%</p>
                  </div>
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Icon name="Percent" className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="flex justify-between items-center mb-6">
          <div className="flex gap-4">
            <Dialog open={isDepositDialogOpen} onOpenChange={setIsDepositDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-primary">
                  <Icon name="Plus" className="w-4 h-4 mr-2" />
                  Внести поступление
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Внесение поступления</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="deposit-select">Выберите вклад</Label>
                    <Select 
                      value={depositForm.depositId} 
                      onValueChange={(value) => setDepositForm({...depositForm, depositId: value})}
                    >
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Выберите вклад для пополнения" />
                      </SelectTrigger>
                      <SelectContent>
                        {deposits.filter(d => d.status === 'active').map(deposit => (
                          <SelectItem key={deposit.id} value={deposit.id.toString()}>
                            {deposit.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="deposit-amount">Сумма пополнения</Label>
                    <Input
                      id="deposit-amount"
                      type="number"
                      placeholder="Введите сумму"
                      value={depositForm.amount}
                      onChange={(e) => setDepositForm({...depositForm, amount: e.target.value})}
                      className="mt-2"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="deposit-description">Описание (необязательно)</Label>
                    <Input
                      id="deposit-description"
                      placeholder="Комментарий к операции"
                      value={depositForm.description}
                      onChange={(e) => setDepositForm({...depositForm, description: e.target.value})}
                      className="mt-2"
                    />
                  </div>
                  
                  <div className="flex gap-2 pt-4">
                    <Button 
                      onClick={handleDeposit}
                      disabled={!depositForm.amount || !depositForm.depositId}
                      className="flex-1"
                    >
                      <Icon name="Check" className="w-4 h-4 mr-2" />
                      Внести
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => setIsDepositDialogOpen(false)}
                      className="flex-1"
                    >
                      Отмена
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <Tabs defaultValue="deposits" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="deposits">Мои вклады</TabsTrigger>
            <TabsTrigger value="history">История операций</TabsTrigger>
            <TabsTrigger value="calculator">Калькулятор доходности</TabsTrigger>
          </TabsList>

          {/* Deposits Tab */}
          <TabsContent value="deposits" className="space-y-6">
            <div className="grid gap-6">
              {deposits.map((deposit) => (
                <Card key={deposit.id} className="bg-white/80 backdrop-blur border-slate-200 hover:shadow-md transition-shadow">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg font-semibold text-slate-900">{deposit.name}</CardTitle>
                      {getStatusBadge(deposit.status)}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                      <div>
                        <p className="text-sm text-slate-500">Сумма вклада</p>
                        <p className="text-xl font-bold text-slate-900">{formatAmount(deposit.amount)} ₽</p>
                      </div>
                      <div>
                        <p className="text-sm text-slate-500">Процентная ставка</p>
                        <p className="text-xl font-bold text-blue-600">{deposit.rate}% годовых</p>
                      </div>
                      <div>
                        <p className="text-sm text-slate-500">Срок</p>
                        <p className="text-xl font-bold text-slate-700">{deposit.term} мес.</p>
                      </div>
                      <div>
                        <p className="text-sm text-slate-500">Доход</p>
                        <p className="text-xl font-bold text-green-600">+{formatAmount(deposit.earned)} ₽</p>
                      </div>
                    </div>
                    
                    <Separator className="my-4" />
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div>
                          <p className="text-sm text-slate-500">Период вклада</p>
                          <p className="text-sm font-medium text-slate-700">
                            {deposit.startDate} — {deposit.endDate}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Icon name="Eye" className="w-4 h-4 mr-2" />
                          Подробнее
                        </Button>
                        {deposit.status === 'active' && (
                          <Button size="sm">
                            <Icon name="Plus" className="w-4 h-4 mr-2" />
                            Пополнить
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* History Tab */}
          <TabsContent value="history" className="space-y-6">
            <Card className="bg-white/80 backdrop-blur">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-slate-900">История транзакций</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {transactions.map((transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between p-4 bg-slate-50/50 rounded-lg border border-slate-200">
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          transaction.type === 'deposit' ? 'bg-blue-100' :
                          transaction.type === 'withdrawal' ? 'bg-red-100' : 'bg-green-100'
                        }`}>
                          <Icon 
                            name={getTransactionIcon(transaction.type)} 
                            className={`w-5 h-5 ${
                              transaction.type === 'deposit' ? 'text-blue-600' :
                              transaction.type === 'withdrawal' ? 'text-red-600' : 'text-green-600'
                            }`} 
                          />
                        </div>
                        <div>
                          <p className="font-medium text-slate-900">{transaction.description}</p>
                          <p className="text-sm text-slate-500">{transaction.date}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`text-lg font-bold ${
                          transaction.amount > 0 ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {transaction.amount > 0 ? '+' : ''}{formatAmount(transaction.amount)} ₽
                        </p>
                        <Badge variant="outline" className="mt-1">{transaction.status === 'completed' ? 'Завершено' : 'В обработке'}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Calculator Tab */}
          <TabsContent value="calculator" className="space-y-6">
            <Card className="bg-white/80 backdrop-blur">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-slate-900">Калькулятор доходности</CardTitle>
                <p className="text-slate-600">Рассчитайте потенциальную прибыль от вклада</p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div>
                      <Label htmlFor="amount" className="text-sm font-medium text-slate-700">
                        Сумма вклада (₽)
                      </Label>
                      <Input
                        id="amount"
                        type="number"
                        placeholder="Введите сумму"
                        value={calculatorForm.amount}
                        onChange={(e) => setCalculatorForm({...calculatorForm, amount: e.target.value})}
                        className="mt-2"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="rate" className="text-sm font-medium text-slate-700">
                        Процентная ставка (% годовых)
                      </Label>
                      <Input
                        id="rate"
                        type="number"
                        step="0.1"
                        placeholder="Введите ставку"
                        value={calculatorForm.rate}
                        onChange={(e) => setCalculatorForm({...calculatorForm, rate: e.target.value})}
                        className="mt-2"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="term" className="text-sm font-medium text-slate-700">
                        Срок вклада (месяцев)
                      </Label>
                      <Input
                        id="term"
                        type="number"
                        placeholder="Введите срок"
                        value={calculatorForm.term}
                        onChange={(e) => setCalculatorForm({...calculatorForm, term: e.target.value})}
                        className="mt-2"
                      />
                    </div>
                  </div>
                  
                  <div className="bg-slate-50/50 rounded-xl p-6 border border-slate-200">
                    <h3 className="text-lg font-semibold text-slate-900 mb-4">Расчет доходности</h3>
                    
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-slate-600">Первоначальная сумма:</span>
                        <span className="font-semibold text-slate-900">
                          {calculatorForm.amount ? formatAmount(parseFloat(calculatorForm.amount)) : '0'} ₽
                        </span>
                      </div>
                      
                      <div className="flex justify-between">
                        <span className="text-slate-600">Доход за период:</span>
                        <span className="font-semibold text-green-600">
                          +{formatAmount(parseFloat(calculateProfit().profit))} ₽
                        </span>
                      </div>
                      
                      <Separator />
                      
                      <div className="flex justify-between text-lg">
                        <span className="font-semibold text-slate-900">Итоговая сумма:</span>
                        <span className="font-bold text-primary">
                          {formatAmount(parseFloat(calculateProfit().total))} ₽
                        </span>
                      </div>
                    </div>
                    
                    {calculatorForm.amount && calculatorForm.rate && calculatorForm.term && (
                      <div className="mt-6">
                        <p className="text-sm text-slate-600 mb-2">
                          Эффективность вклада: {((parseFloat(calculateProfit().profit) / parseFloat(calculatorForm.amount)) * 100).toFixed(2)}%
                        </p>
                        <Progress 
                          value={(parseFloat(calculateProfit().profit) / parseFloat(calculatorForm.amount)) * 100} 
                          className="h-2"
                        />
                      </div>
                    )}
                    
                    <Button className="w-full mt-6" size="lg">
                      <Icon name="Calculator" className="w-4 h-4 mr-2" />
                      Открыть вклад
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;