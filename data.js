window.tableColumns = [
    { key: "index", title: "№" },
    { key: "model", title: "Модель / Псевдоним" },
    { key: "formFactor", title: "Формат" }, // Сократили заголовок
    { key: "capacity", title: "Объем" },
    { key: "efficiency", title: "Энергоэффективность" },
    { key: "score", title: "Балл (0-20)" },
    { key: "serial", title: "Серийный номер" },
    { key: "status", title: "Краткий статус" }
];

window.driveData = [
    {
        id: 1, name: "FORESEE XP1000F256G", alias: "system nvme", form: "M.2 NVMe", size: "256.06 GB", score: 18, sn: "MH8888Q022193", class: "good", badge: "excellent", statusText: "Отличное состояние",
        powerWatts: 6.0, sizeTb: 0.25,
        metrics: "Percentage Used = 0%, Available Spare = 100%, Unsafe Shutdowns = 111, Data Integrity Errors = 0.",
        rec: "Твердотельный накопитель работает безупречно, износа нет. Рекомендуется обратить внимание на показатель небезопасных отключений питания (111 раз) для контроля стабильности сервера."
    },
    {
        id: 2, name: "HGST HTS541010A9E680", alias: "cable error", form: "2.5\"", size: "1.00 TB", score: 18, sn: "JD100ADM198N7K", class: "good", badge: "excellent", statusText: "Отличное состояние",
        powerWatts: 2.8, sizeTb: 1.0,
        metrics: "Reallocated = 0, Pending = 0, Наработка = 6 218 часов, UDMA_CRC_Error_Count = 35 273.",
        rec: "Поверхность диска идеальна, наработка минимальна. Огромный лог ошибок ID 199 указывает на проблемы со шлейфом. Немедленно замените кабель SATA, чтобы убрать фризы в системе."
    },
    {
        id: 3, name: "WDC WD10PURX-64D85Y0", alias: "purple ok", form: "3.5\"", size: "1.00 TB", score: 16, sn: "WD-WCC4J8RH97A7", class: "good", badge: "good", statusText: "Хорошее состояние",
        powerWatts: 4.4, sizeTb: 1.0,
        metrics: "Reallocated = 0, Pending = 0, Наработка = 19 486 часов, Power-Off_Retract_Count = 3 962.",
        rec: "Надежный диск 'фиолетовой' серии для непрерывной работы. Поверхность идеальная, наработка умеренная. Высока доля аварийных парковок при отключении питания, но рисков сейчас нет."
    },
    {
        id: 4, name: "WDC WD2502ABYS-02B7A0", alias: "old raid", form: "3.5\"", size: "251.06 GB", score: 16, sn: "WD-WCAT1E788808", class: "good", badge: "good", statusText: "Хорошее состояние",
        powerWatts: 7.2, sizeTb: 0.25,
        metrics: "Reallocated = 0, Pending = 0, Наработка = 18 062 часа. Минимальный износ механики.",
        rec: "Серверный накопитель старого поколения RE3. Полностью здоров. Из-за скромного объема отлично подойдет под хранение конфигурационных файлов или нетребовательных бэкапов."
    },
    {
        id: 5, name: "Seagate Barracuda (ST2000DM001)", alias: "big storage", form: "3.5\"", size: "2000 GB", score: 16, sn: "Z1E6687D", class: "good", badge: "good", statusText: "Исправен",
        powerWatts: 8.0, sizeTb: 2.0,
        metrics: "Reallocated = 0, Pending = 0, Наработка = 54 854 часа. Ошибок чтения/записи нет.",
        rec: "Поверхность накопителя чистая, но у диска внушительный пробег (более 6 лет). Использовать в критически важных узлах не стоит, но для файлового архива подходит отлично."
    },
    {
        id: 6, name: "WDC WD10SPCX-21KHST0", alias: "battered slim", form: "2.5\"", size: "1.00 TB", score: 15, sn: "WD-WX71AB4HFTCT", class: "good", badge: "good", statusText: "Хорошее состояние",
        powerWatts: 2.5, sizeTb: 1.0,
        metrics: "Reallocated = 0, Pending = 0, Наработка = 4 995 часов, G-Sense_Error_Rate = 530.",
        rec: "Магнитные пластины в норме, наработка малая. Датчик удара зафиксировал 530 сильных встрясок в прошлом. Избегайте механических воздействий на систему в будущем."
    },
    {
        id: 7, name: "ST1000DM003-1CH162", alias: "old seagate", form: "3.5\"", size: "1.00 TB", score: 14, sn: "S1DGSZCL", class: "warn-crit", badge: "warning", statusText: "Удовлетворительное",
        powerWatts: 5.9, sizeTb: 1.0,
        metrics: "Reallocated = 0, Pending = 0, Наработка = 55 914 часов, Runtime_Bad_Block = 1.",
        rec: "Поверхность чистая, но наработка огромная (6.3 года) and был зафиксирован один сбойный блок. Использовать накопитель под базы данных без резервного копирования нельзя."
    },
    {
        id: 8, name: "HGST HTS541010A9E680", alias: "sleepy slim", form: "2.5\"", size: "1.00 TB", score: 13, sn: "JD1000191DJLMA", class: "warn-crit", badge: "warning", statusText: "Удовлетворительное",
        powerWatts: 3.2, sizeTb: 1.0,
        metrics: "Reallocated = 0, Pending = 0, Наработка = 15 639 часов, Load_Cycle_Count = 313 968.",
        rec: "Ошибок на пластинах нет, но механика изношена наполовину из-за частых циклов парковки (более 313 тысяч). При возможности отключите агрессивное энергосбережение через APM."
    },
    {
        id: 9, name: "ST1000LM024 HN-M101MBB", alias: "tired mobile", form: "2.5\"", size: "1.00 TB", score: 9, sn: "S318J9EGA11344", class: "warn-crit", badge: "danger", statusText: "Плохое состояние",
        powerWatts: 3.0, sizeTb: 1.0,
        metrics: "Multi_Zone_Error_Rate = 3427, Load_Cycle_Count = 354 494. Ошибки позиционирования головок.",
        rec: "Критический износ привода головок (354 тысячи парковок) и лавинообразные ошибки записи. Диск работает нестабильно, не доверяйте ему важные системные разделы."
    },
    {
        id: 10, name: "WDC WD10PURX-64D85Y0", alias: "purple bad", form: "3.5\"", size: "1.00 TB", score: 5, sn: "WD-WCC4J4316573", class: "warn-crit", badge: "danger", statusText: "Предаварийное",
        powerWatts: 4.4, sizeTb: 1.0,
        metrics: "Current_Pending_Sector = 51, Raw_Read_Error_Rate = 7063. Ошибки чтения магнитных поверхностей.",
        rec: "Накопитель начал сыпаться. 51 нестабильный сектор угрожает потерей данных в любой момент. Срочно снимите бэкапы, выведите диск из пулов виртуализации и замените."
    },
    {
        id: 11, name: "Western Digital RE4 (WD1003FBYX)", alias: "black es", form: "3.5\"", size: "1.00 TB", score: 3, sn: "WCAW31953144", class: "warn-crit", badge: "danger", statusText: "Предаварийное",
        powerWatts: 7.9, sizeTb: 1.0,
        metrics: "Current_Pending_Sector = 78, Offline_Uncorrectable = 33, Multi_Zone_Error_Rate = 222.",
        rec: "Физическое разрушение пластин диска. Множественные неисправимые ошибки. Диск полностью непригоден для эксплуатации, данные с него считывать на минимальной нагрузке."
    }
];
