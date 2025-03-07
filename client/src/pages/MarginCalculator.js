import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, HelpCircle, Save, Share2, DollarSign } from 'react-feather';
import AdaptiveContainer from '../components/AdaptiveContainer';
import AnimatedElement from '../components/AnimatedElement';
import Button from '../components/Button';
import '../styles/MarginCalculator.css';

const MarginCalculator = ({ addToast }) => {
  const [purchasePrice, setPurchasePrice] = useState('');
  const [sellingPrice, setSellingPrice] = useState('');
  const [logisticsCost, setLogisticsCost] = useState('');
  const [packagingCost, setPackagingCost] = useState('');
  const [additionalCosts, setAdditionalCosts] = useState('');
  const [commission, setCommission] = useState('15');
  const [results, setResults] = useState(null);
  const [savedCalculations, setSavedCalculations] = useState([]);
  
  useEffect(() => {
    // Загрузка сохраненных расчетов из localStorage
    const saved = JSON.parse(localStorage.getItem('marginCalculations') || '[]');
    setSavedCalculations(saved);
  }, []);
  
  const calculateMargin = () => {
    // Проверка на заполнение обязательных полей
    if (!purchasePrice || !sellingPrice) {
      addToast({
        variant: 'error',
        title: 'Ошибка',
        message: 'Заполните обязательные поля: закупочная цена и цена продажи'
      });
      return;
    }
    
    // Преобразование строк в числа
    const purchase = parseFloat(purchasePrice);
    const selling = parseFloat(sellingPrice);
    const logistics = parseFloat(logisticsCost || '0');
    const packaging = parseFloat(packagingCost || '0');
    const additional = parseFloat(additionalCosts || '0');
    const commissionRate = parseFloat(commission) / 100;
    
    // Расчет комиссии Wildberries
    const commissionAmount = selling * commissionRate;
    
    // Расчет общих затрат
    const totalCosts = purchase + logistics + packaging + additional + commissionAmount;
    
    // Расчет прибыли
    const profit = selling - totalCosts;
    
    // Расчет маржинальности в процентах
    const marginPercent = (profit / selling) * 100;
    
    // Расчет рентабельности
    const roi = (profit / totalCosts) * 100;
    
    // Сохранение результатов
    const calculationResults = {
      purchasePrice: purchase,
      sellingPrice: selling,
      logisticsCost: logistics,
      packagingCost: packaging,
      additionalCosts: additional,
      commission: commissionRate,
      commissionAmount,
      totalCosts,
      profit,
      marginPercent,
      roi,
      date: new Date().toISOString()
    };
    
    setResults(calculationResults);
  };
  
  const saveCalculation = () => {
    if (!results) return;
    
    const updatedCalculations = [...savedCalculations, results];
    setSavedCalculations(updatedCalculations);
    localStorage.setItem('marginCalculations', JSON.stringify(updatedCalculations));
    
    addToast({
      variant: 'success',
      title: 'Сохранено',
      message: 'Расчет успешно сохранен'
    });
  };
  
  const shareResults = () => {
    if (!results) return;
    
    const shareText = `
Расчет маржинальности товара на Wildberries:
Закупочная цена: ${results.purchasePrice} ₽
Цена продажи: ${results.sellingPrice} ₽
Комиссия WB: ${(results.commissionAmount).toFixed(2)} ₽ (${(results.commission * 100).toFixed(0)}%)
Прибыль: ${results.profit.toFixed(2)} ₽
Маржинальность: ${results.marginPercent.toFixed(2)}%
Рентабельность: ${results.roi.toFixed(2)}%
    `;
    
    if (window.Telegram && window.Telegram.WebApp) {
      window.Telegram.WebApp.openTelegramLink(`https://t.me/share/url?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(shareText)}`);
    } else {
      navigator.clipboard.writeText(shareText);
      addToast({
        variant: 'success',
        title: 'Поделиться',
        message: 'Результаты скопированы в буфер обмена'
      });
    }
  };
  
  const resetCalculator = () => {
    setPurchasePrice('');
    setSellingPrice('');
    setLogisticsCost('');
    setPackagingCost('');
    setAdditionalCosts('');
    setCommission('15');
    setResults(null);
  };
  
  return (
    <div className="margin-calculator-page">
      <AdaptiveContainer>
        <AnimatedElement animation="fade-up">
          <div className="calculator-header">
            <Link to="/tools" className="back-link">
              <ArrowLeft size={20} />
              <span>Назад к инструментам</span>
            </Link>
            <h1 className="calculator-title">Калькулятор маржинальности</h1>
          </div>
          
          <div className="calculator-description">
            <p>
              Рассчитайте прибыльность вашего товара на Wildberries с учетом всех комиссий и затрат.
              Введите закупочную цену, цену продажи и дополнительные расходы для получения точного расчета.
            </p>
          </div>
          
          <div className="calculator-container">
            <div className="calculator-form">
              <div className="form-group">
                <label htmlFor="purchasePrice">
                  Закупочная цена (₽) <span className="required">*</span>
                </label>
                <input
                  type="number"
                  id="purchasePrice"
                  value={purchasePrice}
                  onChange={(e) => setPurchasePrice(e.target.value)}
                  placeholder="Введите закупочную цену"
                  min="0"
                  step="0.01"
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="sellingPrice">
                  Цена продажи (₽) <span className="required">*</span>
                </label>
                <input
                  type="number"
                  id="sellingPrice"
                  value={sellingPrice}
                  onChange={(e) => setSellingPrice(e.target.value)}
                  placeholder="Введите цену продажи"
                  min="0"
                  step="0.01"
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="commission">
                  Комиссия Wildberries (%)
                  <button className="help-button" title="Стандартная комиссия Wildberries составляет от 15% до 25% в зависимости от категории товара">
                    <HelpCircle size={16} />
                  </button>
                </label>
                <input
                  type="number"
                  id="commission"
                  value={commission}
                  onChange={(e) => setCommission(e.target.value)}
                  placeholder="Введите процент комиссии"
                  min="0"
                  max="100"
                  step="0.1"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="logisticsCost">Логистика (₽)</label>
                <input
                  type="number"
                  id="logisticsCost"
                  value={logisticsCost}
                  onChange={(e) => setLogisticsCost(e.target.value)}
                  placeholder="Введите стоимость логистики"
                  min="0"
                  step="0.01"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="packagingCost">Упаковка (₽)</label>
                <input
                  type="number"
                  id="packagingCost"
                  value={packagingCost}
                  onChange={(e) => setPackagingCost(e.target.value)}
                  placeholder="Введите стоимость упаковки"
                  min="0"
                  step="0.01"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="additionalCosts">Дополнительные расходы (₽)</label>
                <input
                  type="number"
                  id="additionalCosts"
                  value={additionalCosts}
                  onChange={(e) => setAdditionalCosts(e.target.value)}
                  placeholder="Введите дополнительные расходы"
                  min="0"
                  step="0.01"
                />
              </div>
              
              <div className="calculator-actions">
                <Button 
                  variant="primary" 
                  size="large" 
                  onClick={calculateMargin}
                >
                  Рассчитать
                </Button>
                <Button 
                  variant="outline" 
                  size="large" 
                  onClick={resetCalculator}
                >
                  Сбросить
                </Button>
              </div>
            </div>
            
            {results && (
              <AnimatedElement animation="fade-up">
                <div className="calculator-results">
                  <h2 className="results-title">Результаты расчета</h2>
                  
                  <div className="results-grid">
                    <div className="result-item">
                      <div className="result-label">Закупочная цена:</div>
                      <div className="result-value">{results.purchasePrice.toFixed(2)} ₽</div>
                    </div>
                    
                    <div className="result-item">
                      <div className="result-label">Цена продажи:</div>
                      <div className="result-value">{results.sellingPrice.toFixed(2)} ₽</div>
                    </div>
                    
                    <div className="result-item">
                      <div className="result-label">Комиссия WB:</div>
                      <div className="result-value">
                        {results.commissionAmount.toFixed(2)} ₽ ({(results.commission * 100).toFixed(0)}%)
                      </div>
                    </div>
                    
                    <div className="result-item">
                      <div className="result-label">Логистика:</div>
                      <div className="result-value">{results.logisticsCost.toFixed(2)} ₽</div>
                    </div>
                    
                    <div className="result-item">
                      <div className="result-label">Упаковка:</div>
                      <div className="result-value">{results.packagingCost.toFixed(2)} ₽</div>
                    </div>
                    
                    <div className="result-item">
                      <div className="result-label">Доп. расходы:</div>
                      <div className="result-value">{results.additionalCosts.toFixed(2)} ₽</div>
                    </div>
                    
                    <div className="result-item">
                      <div className="result-label">Общие затраты:</div>
                      <div className="result-value">{results.totalCosts.toFixed(2)} ₽</div>
                    </div>
                    
                    <div className="result-item result-profit">
                      <div className="result-label">Прибыль:</div>
                      <div className={`result-value ${results.profit < 0 ? 'negative' : 'positive'}`}>
                        {results.profit.toFixed(2)} ₽
                      </div>
                    </div>
                    
                    <div className="result-item result-margin">
                      <div className="result-label">Маржинальность:</div>
                      <div className={`result-value ${results.marginPercent < 0 ? 'negative' : 'positive'}`}>
                        {results.marginPercent.toFixed(2)}%
                      </div>
                    </div>
                    
                    <div className="result-item result-roi">
                      <div className="result-label">Рентабельность:</div>
                      <div className={`result-value ${results.roi < 0 ? 'negative' : 'positive'}`}>
                        {results.roi.toFixed(2)}%
                      </div>
                    </div>
                  </div>
                  
                  <div className="results-actions">
                    <Button 
                      variant="outline" 
                      size="medium" 
                      icon={<Save size={16} />}
                      iconPosition="left"
                      onClick={saveCalculation}
                    >
                      Сохранить
                    </Button>
                    <Button 
                      variant="outline" 
                      size="medium" 
                      icon={<Share2 size={16} />}
                      iconPosition="left"
                      onClick={shareResults}
                    >
                      Поделиться
                    </Button>
                  </div>
                </div>
              </AnimatedElement>
            )}
            
            {savedCalculations.length > 0 && (
              <div className="saved-calculations">
                <h3>Сохраненные расчеты</h3>
                <div className="saved-list">
                  {savedCalculations.map((calc, index) => (
                    <div key={index} className="saved-item">
                      <div className="saved-item-header">
                        <span className="saved-date">
                          {new Date(calc.date).toLocaleDateString()}
                        </span>
                        <span className={`saved-profit ${calc.profit < 0 ? 'negative' : 'positive'}`}>
                          {calc.profit.toFixed(2)} ₽
                        </span>
                      </div>
                      <div className="saved-item-details">
                        <div>Закупка: {calc.purchasePrice.toFixed(2)} ₽</div>
                        <div>Продажа: {calc.sellingPrice.toFixed(2)} ₽</div>
                        <div>Маржа: {calc.marginPercent.toFixed(2)}%</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </AnimatedElement>
      </AdaptiveContainer>
    </div>
  );
};

export default MarginCalculator; 