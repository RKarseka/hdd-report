function renderTableHeader() {
    const thead = document.getElementById('drive-table-header');
    const tr = document.createElement('tr');
    window.tableColumns.forEach(column => {
        const th = document.createElement('th');
        th.innerText = column.title;
        tr.appendChild(th);
    });
    thead.innerHTML = '';
    thead.appendChild(tr);
}

function sortDrives(data) {
    return data.sort((a, b) => {
        const aIsGreen = a.score >= 15;
        const bIsGreen = b.score >= 15;
        if (aIsGreen && bIsGreen) {
            return (a.powerWatts / a.sizeTb) - (b.powerWatts / b.sizeTb);
        }
        if (aIsGreen !== bIsGreen) return aIsGreen ? -1 : 1;
        return b.score - a.score;
    });
}

// Новая функция динамического расчета сводной статистики пула
function renderSummaryCards(data) {
    const summaryContainer = document.getElementById('summary-cards');
    if (!summaryContainer) return;

    let totalCapacity = 0;
    let totalPower = 0;
    let criticalCount = 0;

    data.forEach(drive => {
        totalCapacity += drive.sizeTb;
        totalPower += drive.powerWatts;
        if (drive.score <= 5) {
            criticalCount++;
        }
    });

    // Форматируем общую емкость для красоты (если больше 1000 ГБ, выводим в ТБ)
    const capacityText = totalCapacity >= 1 ? `${totalCapacity.toFixed(2)} ТБ` : `${(totalCapacity * 1000).toFixed(0)} ГБ`;
    const isDanger = criticalCount > 0 ? "card card-danger-active" : "card";

    summaryContainer.innerHTML = `
        <div class="card">
            <div class="card-title">📊 Общая емкость пула</div>
            <div class="card-value">${capacityText}</div>
            <div class="card-desc">Всего физических дисков: ${data.length} шт.</div>
        </div>
        <div class="card">
            <div class="card-title">🔌 Энергопотребление подсистемы</div>
            <div class="card-value">${totalPower.toFixed(1)} Вт</div>
            <div class="card-desc">Текущая средняя нагрузка накопителей</div>
        </div>
        <div class="${isDanger}">
            <div class="card-title">🚨 Требуют срочной замены</div>
            <div class="card-value">${criticalCount} шт.</div>
            <div class="card-desc">${criticalCount > 0 ? 'Обнаружены накопители в критическом состоянии!' : 'Все диски работают в пределах нормы'}</div>
        </div>
    `;
}

function renderTableBody(data) {
    const tbody = document.getElementById('drive-table-body');
    tbody.innerHTML = '';
    
    const sortedData = sortDrives([...data]);
    
    sortedData.forEach((drive, index) => {
        const tr = document.createElement('tr');
        tr.className = 'clickable-row';
        tr.onclick = () => openDetails(drive);
        
        window.tableColumns.forEach(column => {
            const td = document.createElement('td');
            switch (column.key) {
                case "index": td.innerHTML = `<strong>${index + 1}</strong>`; break;
                case "model": td.innerHTML = `<strong>${drive.name}</strong><br><span style="color: var(--text-muted); font-size:13px;">🏷️ ${drive.alias}</span>`; break;
                case "formFactor": 
                    const baseIconStyle = "display: inline-block; border: 1.5px solid currentColor; border-radius: 2px; margin-right: 6px; vertical-align: middle;";
                    if (drive.form === "M.2 NVMe") {
                        td.innerHTML = `<span style="background: rgba(59, 130, 246, 0.12); color: #60a5fa; padding: 4px 8px; border-radius: 4px; font-size: 13px; font-weight: 600; white-space: nowrap; display: inline-block;">⚡ NVMe</span>`;
                    } else if (drive.form === "3.5\"") {
                        td.innerHTML = `<span style="background: rgba(148, 163, 184, 0.12); color: #cbd5e1; padding: 4px 8px; border-radius: 4px; font-size: 13px; font-weight: 600; white-space: nowrap; display: inline-block;"><span style="${baseIconStyle} width: 14px; height: 10px; background: rgba(255,255,255,0.05);"></span>3.5"</span>`;
                    } else if (drive.form === "2.5\"") {
                        td.innerHTML = `<span style="background: rgba(168, 85, 247, 0.12); color: #c084fc; padding: 4px 8px; border-radius: 4px; font-size: 13px; font-weight: 600; white-space: nowrap; display: inline-block;"><span style="${baseIconStyle} width: 9px; height: 12px; background: rgba(255,255,255,0.05);"></span>2.5"</span>`;
                    } else {
                        td.innerText = drive.form;
                    }
                    break;
                case "capacity": td.innerText = drive.size; break;
                case "efficiency": 
                    const perTb = (drive.powerWatts / drive.sizeTb).toFixed(1);
                    td.innerHTML = `⚡ <strong>${perTb} Вт/ТБ</strong> <br><span style="color: var(--text-muted); font-size:12px;">(всего ${drive.powerWatts} Вт)</span>`;
                    break;
                case "score":
                    let scoreColor = drive.score <= 5 ? 'var(--accent-red)' : (drive.score <= 14 ? 'var(--accent-yellow)' : 'var(--accent-green)');
                    td.innerHTML = `<span class="score-val" style="color: ${scoreColor}">${drive.score}</span><span style="color:var(--text-muted); font-size:12px;"> /20</span>`;
                    break;
                case "serial": td.style.fontFamily = 'monospace'; td.innerText = drive.sn; break;
                case "status": td.innerHTML = `<span class="badge badge-${drive.badge}">${drive.statusText}</span>`; break;
                default: td.innerText = drive[column.key] || '';
            }
            tr.appendChild(td);
        });
        tbody.appendChild(tr);
    });
}

function applyFilter(filter, event) {
    document.querySelectorAll('.controls .btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');

    let filtered = window.driveData;
    if (filter === 'warn-crit') filtered = window.driveData.filter(d => d.class === 'warn-crit');
    else if (filter === 'good') filtered = window.driveData.filter(d => d.class === 'good');
    renderTableBody(filtered);
}

function openDetails(drive) {
    document.getElementById('modalTitle').innerText = `${drive.name} (${drive.alias})`;
    document.getElementById('modalMeta').innerText = `SN: ${drive.sn} | Объем: ${drive.size} | Формат: ${drive.form}`;
    document.getElementById('modalScore').innerHTML = `<strong>${drive.score} из 20</strong> — ${drive.statusText}`;
    
    const secStatus = document.getElementById('sectionStatus');
    const secAnalysis = document.getElementById('sectionAnalysis');
    secStatus.className = secAnalysis.className = 'detail-section';
    
    const borderClass = drive.score <= 5 ? 'border-danger' : (drive.score <= 14 ? 'border-warning' : 'border-success');
    secStatus.classList.add(borderClass);
    secAnalysis.classList.add(borderClass);

    document.getElementById('modalAnalysis').innerText = drive.metrics;
    document.getElementById('modalRecommendation').innerText = drive.rec;
    document.getElementById('detailsModal').style.display = 'flex';
}

document.getElementById('btn-all').onclick = (e) => applyFilter('all', e);
document.getElementById('btn-warn').onclick = (e) => applyFilter('warn-crit', e);
document.getElementById('btn-good').onclick = (e) => applyFilter('good', e);
document.getElementById('modal-close').onclick = () => document.getElementById('detailsModal').style.display = 'none';
document.getElementById('detailsModal').onclick = (e) => { if(e.target.id === 'detailsModal') e.target.style.display = 'none'; };

// Инициализация дашборда
renderSummaryCards(window.driveData); // Строим карточки статистики
renderTableHeader();
renderTableBody(window.driveData);
