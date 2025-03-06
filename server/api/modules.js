// api/modules.js
const path = require('path');
const fs = require('fs');

module.exports = (req, res) => {
  // Разрешаем CORS и отключаем кэширование
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, private');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  res.setHeader('Content-Type', 'application/json');
  
  // Определяем путь к файлу с данными
  // Поскольку файлы могут быть в разных местах, проверим несколько возможных локаций
  const possiblePaths = [
    path.join(__dirname, '..', 'data', 'modules.json'),
    path.join(__dirname, '..', 'server', 'data', 'modules.json'),
    path.join(__dirname, '..', 'server', 'server', 'data', 'modules.json')
  ];
  
  // Находим работающий путь
  let modulesData;
  let foundPath = null;
  
  for (const dataPath of possiblePaths) {
    try {
      if (fs.existsSync(dataPath)) {
        modulesData = fs.readFileSync(dataPath, 'utf8');
        foundPath = dataPath;
        break;
      }
    } catch (err) {
      console.error(`Ошибка при проверке пути ${dataPath}:`, err);
    }
  }
  
  if (!foundPath) {
    console.error('Файл modules.json не найден ни в одном из ожидаемых мест');
    return res.status(500).json({ error: 'Файл данных не найден' });
  }
  
  try {
    // Пытаемся распарсить JSON
    const modules = JSON.parse(modulesData);
    
    // Возвращаем данные
    console.log(`Успешно отправлены данные из ${foundPath}`);
    return res.status(200).json(modules);
  } catch (error) {
    console.error('Ошибка при обработке JSON:', error);
    return res.status(500).json({ error: 'Ошибка при обработке данных модулей' });
  }
};