import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, HelpCircle, Save, Share2, DollarSign, ArrowRight, ChevronLeft, ChevronRight } from 'react-feather';
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
  const [currentStep, setCurrentStep] = useState(1);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  
  useEffect(() => {
    // Загрузка сохраненных расчетов из localStorage
    const saved = JSON.parse(localStorage.getItem('marginCalculations') || '[]');
    setSavedCalculations(saved);
    
    // Отслеживание изменения размера окна
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
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
    const commissionRate = parseFloat(commission || '15') / 100;
    
    // Расчет комиссии Wildberries
    const commissionAmount = selling * commissionRate;
    
    // Расчет общих затрат
    const totalCosts = purchase + logistics + packaging + additional + commissionAmount;
    
    // Расчет прибыли
    const profit = selling - totalCosts;
    
    // Расчет маржинальности в процентах
    const marginPercent = (profit / selling) * 100;
    
    // Расчет ROI
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
    
    // Если мы на мобильном устройстве, переходим к шагу с результатами
    if (isMobile) {
      setCurrentStep(3);
    }
  };
  
  const saveCalculation = () => {
    if (!results) return;
    
    const newCalculation = {
      id: Date.now(),
      ...results,
      name: `Расчет от ${new Date().toLocaleDateString()}`
    };
    
    const updatedCalculations = [...savedCalculations, newCalculation];
    setSavedCalculations(updatedCalculations);
    localStorage.setItem('marginCalculations', JSON.stringify(updatedCalculations));
    
    addToast({
      variant: 'success',
      title: 'Сохранено',
      message: 'Расчет успешно сохранен'
    });
  };
  
  const shareCalculation = () => {
    if (!results) return;
    
    // Формирование текста для шаринга
    const shareText = `
      Расчет маржинальности на Wildberries:
      
      Закупочная цена: ${results.purchasePrice} ₽
      Цена продажи: ${results.sellingPrice} ₽
      Комиссия WB: ${(results.commission * 100).toFixed(1)}% (${results.commissionAmount.toFixed(2)} ₽)
      Логистика: ${results.logisticsCost} ₽
      Упаковка: ${results.packagingCost} ₽
      Доп. расходы: ${results.additionalCosts} ₽
      
      Общие затраты: ${results.totalCosts.toFixed(2)} ₽
      Прибыль: ${results.profit.toFixed(2)} ₽
      Маржинальность: ${results.marginPercent.toFixed(2)}%
      ROI: ${results.roi.toFixed(2)}%
      
      Расчет выполнен с помощью WB Решение
    `.trim();
    
    // Проверка наличия Telegram Web App API
    if (window.Telegram && window.Telegram.WebApp) {
      window.Telegram.WebApp.openTelegramLink(`https://t.me/share/url?url=${encodeURIComponent(shareText)}`);
    } else {
      // Запасной вариант - копирование в буфер обмена
      navigator.clipboard.writeText(shareText).then(() => {
        addToast({
          variant: 'success',
          title: 'Скопировано',
          message: 'Результаты расчета скопированы в буфер обмена'
        });
      }).catch(err => {
        console.error('Не удалось скопировать текст: ', err);
        addToast({
          variant: 'error',
          title: 'Ошибка',
          message: 'Не удалось скопировать результаты'
        });
      });
    }
  };
  
  const resetForm = () => {
    setPurchasePrice('');
    setSellingPrice('');
    setLogisticsCost('');
    setPackagingCost('');
    setAdditionalCosts('');
    setCommission('15');
    setResults(null);
    setCurrentStep(1);
  };
  
  const nextStep = () => {
    if (currentStep === 1 && (!purchasePrice || !sellingPrice)) {
      addToast({
        variant: 'error',
        title: 'Ошибка',
        message: 'Заполните обязательные поля: закупочная цена и цена продажи'
      });
      return;
    }
    
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
    
    if (currentStep === 2) {
      calculateMargin();
    }
  };
  
  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="step-content">
            <h3 className="step-title">Шаг 1: Основные параметры</h3>
            <div className="form-group">
              <label htmlFor="purchasePrice" className="form-label">
                Закупочная цена (₽) <span className="required">*</span>
              </label>
              <div className="form-input-wrapper">
                <input
                  id="purchasePrice"
                  type="number"
                  className="form-input"
                  value={purchasePrice}
                  onChange={(e) => setPurchasePrice(e.target.value)}
                  placeholder="Введите закупочную цену"
                  min="0"
                  step="0.01"
                  required
                />
                <div className="form-input-hint">
                  Цена, по которой вы приобретаете товар у поставщика
                </div>
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="sellingPrice" className="form-label">
                Цена продажи (₽) <span className="required">*</span>
              </label>
              <div className="form-input-wrapper">
                <input
                  id="sellingPrice"
                  type="number"
                  className="form-input"
                  value={sellingPrice}
                  onChange={(e) => setSellingPrice(e.target.value)}
                  placeholder="Введите цену продажи"
                  min="0"
                  step="0.01"
                  required
                />
                <div className="form-input-hint">
                  Цена, по которой товар будет продаваться на Wildberries
                </div>
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="commission" className="form-label">
                Комиссия Wildberries (%)
              </label>
              <div className="form-input-wrapper">
                <input
                  id="commission"
                  type="number"
                  className="form-input"
                  value={commission}
                  onChange={(e) => setCommission(e.target.value)}
                  placeholder="Введите процент комиссии"
                  min="0"
                  max="100"
                  step="0.1"
                />
                <div className="form-input-hint">
                  Стандартная комиссия Wildberries составляет 15%
                </div>
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="step-content">
            <h3 className="step-title">Шаг 2: Дополнительные расходы</h3>
            <div className="form-group">
              <label htmlFor="logisticsCost" className="form-label">
                Логистика (₽)
              </label>
              <div className="form-input-wrapper">
                <input
                  id="logisticsCost"
                  type="number"
                  className="form-input"
                  value={logisticsCost}
                  onChange={(e) => setLogisticsCost(e.target.value)}
                  placeholder="Введите стоимость логистики"
                  min="0"
                  step="0.01"
                />
                <div className="form-input-hint">
                  Расходы на доставку товара до склада Wildberries
                </div>
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="packagingCost" className="form-label">
                Упаковка (₽)
              </label>
              <div className="form-input-wrapper">
                <input
                  id="packagingCost"
                  type="number"
                  className="form-input"
                  value={packagingCost}
                  onChange={(e) => setPackagingCost(e.target.value)}
                  placeholder="Введите стоимость упаковки"
                  min="0"
                  step="0.01"
                />
                <div className="form-input-hint">
                  Расходы на упаковку товара (коробки, пакеты, этикетки и т.д.)
                </div>
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="additionalCosts" className="form-label">
                Дополнительные расходы (₽)
              </label>
              <div className="form-input-wrapper">
                <input
                  id="additionalCosts"
                  type="number"
                  className="form-input"
                  value={additionalCosts}
                  onChange={(e) => setAdditionalCosts(e.target.value)}
                  placeholder="Введите дополнительные расходы"
                  min="0"
                  step="0.01"
                />
                <div className="form-input-hint">
                  Прочие расходы (фотосъемка, реклама, хранение и т.д.)
                </div>
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="step-content">
            <h3 className="step-title">Результаты расчета</h3>
            {results ? (
              <div className="results-container">
                <div className="results-section">
                  <h4 className="results-section-title">Основные показатели</h4>
                  <div className="results-grid">
                    <div className="result-item">
                      <div className="result-label">Прибыль</div>
                      <div className={`result-value ${results.profit < 0 ? 'negative' : 'positive'}`}>
                        {results.profit.toFixed(2)} ₽
                      </div>
                    </div>
                    <div className="result-item">
                      <div className="result-label">Маржинальность</div>
                      <div className={`result-value ${results.marginPercent < 0 ? 'negative' : 'positive'}`}>
                        {results.marginPercent.toFixed(2)}%
                      </div>
                    </div>
                    <div className="result-item">
                      <div className="result-label">ROI</div>
                      <div className={`result-value ${results.roi < 0 ? 'negative' : 'positive'}`}>
                        {results.roi.toFixed(2)}%
                      </div>
                    </div>
                    <div className="result-item">
                      <div className="result-label">Общие затраты</div>
                      <div className="result-value">{results.totalCosts.toFixed(2)} ₽</div>
                    </div>
                  </div>
                </div>
                
                <div className="results-section">
                  <h4 className="results-section-title">Детализация затрат</h4>
                  <div className="costs-breakdown">
                    <div className="cost-item">
                      <div className="cost-label">Закупка</div>
                      <div className="cost-value">{results.purchasePrice.toFixed(2)} ₽</div>
                      <div className="cost-percent">{((results.purchasePrice / results.totalCosts) * 100).toFixed(1)}%</div>
                    </div>
                    <div className="cost-item">
                      <div className="cost-label">Комиссия WB</div>
                      <div className="cost-value">{results.commissionAmount.toFixed(2)} ₽</div>
                      <div className="cost-percent">{((results.commissionAmount / results.totalCosts) * 100).toFixed(1)}%</div>
                    </div>
                    {results.logisticsCost > 0 && (
                      <div className="cost-item">
                        <div className="cost-label">Логистика</div>
                        <div className="cost-value">{results.logisticsCost.toFixed(2)} ₽</div>
                        <div className="cost-percent">{((results.logisticsCost / results.totalCosts) * 100).toFixed(1)}%</div>
                      </div>
                    )}
                    {results.packagingCost > 0 && (
                      <div className="cost-item">
                        <div className="cost-label">Упаковка</div>
                        <div className="cost-value">{results.packagingCost.toFixed(2)} ₽</div>
                        <div className="cost-percent">{((results.packagingCost / results.totalCosts) * 100).toFixed(1)}%</div>
                      </div>
                    )}
                    {results.additionalCosts > 0 && (
                      <div className="cost-item">
                        <div className="cost-label">Доп. расходы</div>
                        <div className="cost-value">{results.additionalCosts.toFixed(2)} ₽</div>
                        <div className="cost-percent">{((results.additionalCosts / results.totalCosts) * 100).toFixed(1)}%</div>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="results-actions">
                  <Button 
                    variant="outline" 
                    onClick={saveCalculation}
                    icon={<Save size={16} />}
                  >
                    Сохранить
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={shareCalculation}
                    icon={<Share2 size={16} />}
                  >
                    Поделиться
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={resetForm}
                  >
                    Новый расчет
                  </Button>
                </div>
              </div>
            ) : (
              <div className="no-results">
                <p>Нажмите "Рассчитать" для получения результатов</p>
              </div>
            )}
          </div>
        );
      default:
        return null;
    }
  };
  
  const renderStepIndicator = () => {
    return (
      <div className="step-indicator">
        {[1, 2, 3].map((step) => (
          <div 
            key={step} 
            className={`step-dot ${currentStep === step ? 'active' : ''} ${currentStep > step ? 'completed' : ''}`}
            onClick={() => {
              if (currentStep > step || (step === 3 && results)) {
                setCurrentStep(step);
              }
            }}
          >
            {currentStep > step ? '✓' : step}
          </div>
        ))}
      </div>
    );
  };
  
  return (
    <div className="margin-calculator-page">
      <AdaptiveContainer>
        <AnimatedElement animation="fade-up">
          <div className="page-header">
            <Link to="/tools" className="back-link">
              <ArrowLeft size={20} />
              <span>Назад к инструментам</span>
            </Link>
            <h1 className="page-title">
              <DollarSign className="title-icon" size={24} />
              Калькулятор маржинальности
            </h1>
            <p className="page-description">
              Рассчитайте прибыльность вашего товара на Wildberries с учетом всех комиссий и затрат
            </p>
          </div>
          
          <div className="calculator-container">
            {isMobile && renderStepIndicator()}
            
            <div className="calculator-content">
              {renderStepContent()}
            </div>
            
            {isMobile && (
              <div className="step-navigation">
                {currentStep > 1 && (
                  <Button 
                    variant="outline" 
                    onClick={prevStep}
                    icon={<ChevronLeft size={16} />}
                  >
                    Назад
                  </Button>
                )}
                
                {currentStep < 3 && (
                  <Button 
                    onClick={nextStep}
                    icon={<ChevronRight size={16} />}
                    iconPosition="right"
                  >
                    {currentStep === 2 ? 'Рассчитать' : 'Далее'}
                  </Button>
                )}
                
                {currentStep === 3 && !results && (
                  <Button 
                    onClick={calculateMargin}
                  >
                    Рассчитать
                  </Button>
                )}
              </div>
            )}
            
            {!isMobile && (
              <div className="calculator-actions">
                <Button 
                  onClick={calculateMargin}
                  disabled={!purchasePrice || !sellingPrice}
                >
                  Рассчитать
                </Button>
                <Button 
                  variant="outline" 
                  onClick={resetForm}
                >
                  Сбросить
                </Button>
              </div>
            )}
          </div>
          
          <div className="calculator-help">
            <div className="help-header">
              <HelpCircle size={16} />
              <h3>Как пользоваться калькулятором</h3>
            </div>
            <div className="help-content">
              <ol className="help-steps">
                <li>Введите закупочную цену товара и цену продажи на Wildberries</li>
                <li>Укажите процент комиссии Wildberries (по умолчанию 15%)</li>
                <li>Добавьте дополнительные расходы, если они есть</li>
                <li>Нажмите кнопку "Рассчитать" для получения результатов</li>
                <li>Вы можете сохранить расчет или поделиться им</li>
              </ol>
            </div>
          </div>
        </AnimatedElement>
      </AdaptiveContainer>
    </div>
  );
};

export default MarginCalculator; 