// 白银价格分析 - 主逻辑

// 数据定义
const silverData = {
  // 当前价格数据
  currentPrice: {
    usd: 82.30,
    cny: 20.24,
    change24h: -2.12,
    high52w: 120.00,
    low52w: 25.68
  },
  
  // 供需数据
  supplyDemand: {
    totalSupply: 10.5, // 亿盎司
    totalDemand: 11.17,
    deficit: -0.67, // 亿盎司
    deficitYears: 6
  },
  
  // 金银比
  goldSilverRatio: 60,
  
  // 库存覆盖率
  inventoryCoverage: 14,
  
  // 价格历史数据（年度）
  priceHistory: {
    labels: ['2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025', '2026'],
    cny: [3.25, 4.20, 5.00, 5.50, 4.50, 6.00, 7.00, 12.00, 20.24],
    usd: [15.5, 18.0, 24.0, 25.0, 21.0, 24.0, 28.0, 50.0, 82.30]
  },
  
  // 供应缺口历史
  deficitHistory: {
    labels: ['2021', '2022', '2023', '2024', '2025', '2026(E)'],
    values: [-5100, -5800, -6200, -6500, -11700, -6700] // 万盎司
  },
  
  // 需求结构
  demandStructure: {
    labels: ['工业需求', '珠宝首饰', '投资需求', 'ETF'],
    values: [59, 18, 16, 7],
    colors: ['#4ECDC4', '#FFE66D', '#95E1D3', '#F38181']
  },
  
  // 金银比历史
  ratioHistory: {
    labels: ['2020', '2021', '2022', '2023', '2024', '2025', '2026'],
    values: [100, 70, 80, 75, 70, 55, 60]
  }
};

// 看多论据
const bullishArguments = [
  {
    title: "供应短缺不可逆转",
    content: "连续6年结构性赤字，2026年预计缺口6700万盎司。全球75%白银是副产品，供给端对价格极度不敏感。"
  },
  {
    title: "工业需求爆发",
    content: "光伏用银量超8000吨/年，N型电池单位银耗增加30%-100%。AI服务器单台含银1.2公斤，新能源车用银量是燃油车的7倍。"
  },
  {
    title: "库存枯竭引发逼空",
    content: "COMEX库存覆盖率仅14%，较2020年高点蒸发70%。伦敦现货出现史无前例的溢价，实物供应极度紧张。"
  },
  {
    title: "金银比均值回归",
    content: "历史金银比均值约60:1，极端时可达30:1。若黄金维持5000美元，按40:1计算，白银可达125美元。"
  },
  {
    title: "机构集体看多",
    content: "花旗目标价150美元（3个月），高盛前董事预测150-180美元（年底），美银极端情景看至170美元。"
  }
];

// 看空论据
const bearishArguments = [
  {
    title: "经济衰退扼杀需求",
    content: "白银60%是工业属性，经济衰退将导致工厂停工、光伏装机延后。2018年贸易战期间白银全年下跌9.3%。"
  },
  {
    title: "技术替代加速",
    content: "电镀铜、银包铜技术正在研发，预计2027-2028年大规模商用。每公斤2.3万元的银价已逼近产业承受极限。"
  },
  {
    title: "投机泡沫风险",
    content: "白银波动率一度突破1800%，CME多次上调保证金。ETF持仓占比超40%，高度一致的市场情绪易引发雪崩式抛售。"
  },
  {
    title: "历史泡沫教训",
    content: "1980年亨特兄弟事件后3个月暴跌78%，2011年触顶后大幅回撤。当前走势与2011年泡沫破裂前夕惊人相似。"
  },
  {
    title: "美联储政策风险",
    content: "若美联储停止降息或重启加息，将直接击碎贵金属的货币溢价。美元走强直接压低以美元计价的白银。"
  }
];

// 初始化图表
let priceChart, deficitChart, demandChart, ratioChart;

function initCharts() {
  // 价格走势图
  const priceCtx = document.getElementById('priceChart').getContext('2d');
  priceChart = new Chart(priceCtx, {
    type: 'line',
    data: {
      labels: silverData.priceHistory.labels,
      datasets: [{
        label: '美元/盎司',
        data: silverData.priceHistory.usd,
        borderColor: '#C0C0C0',
        backgroundColor: 'rgba(192, 192, 192, 0.1)',
        fill: true,
        tension: 0.4
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false }
      },
      scales: {
        y: {
          grid: { color: 'rgba(255,255,255,0.1)' },
          ticks: { color: '#a0a0a0' }
        },
        x: {
          grid: { color: 'rgba(255,255,255,0.1)' },
          ticks: { color: '#a0a0a0' }
        }
      }
    }
  });

  // 供应缺口图
  const deficitCtx = document.getElementById('deficitChart').getContext('2d');
  deficitChart = new Chart(deficitCtx, {
    type: 'bar',
    data: {
      labels: silverData.deficitHistory.labels,
      datasets: [{
        label: '供应缺口（万盎司）',
        data: silverData.deficitHistory.values,
        backgroundColor: '#ff6b6b',
        borderRadius: 8
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false }
      },
      scales: {
        y: {
          grid: { color: 'rgba(255,255,255,0.1)' },
          ticks: { color: '#a0a0a0' }
        },
        x: {
          grid: { display: false },
          ticks: { color: '#a0a0a0' }
        }
      }
    }
  });

  // 需求结构饼图
  const demandCtx = document.getElementById('demandChart').getContext('2d');
  demandChart = new Chart(demandCtx, {
    type: 'doughnut',
    data: {
      labels: silverData.demandStructure.labels,
      datasets: [{
        data: silverData.demandStructure.values,
        backgroundColor: silverData.demandStructure.colors,
        borderWidth: 0
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'right',
          labels: { color: '#a0a0a0' }
        }
      }
    }
  });

  // 金银比走势图
  const ratioCtx = document.getElementById('ratioChart').getContext('2d');
  ratioChart = new Chart(ratioCtx, {
    type: 'line',
    data: {
      labels: silverData.ratioHistory.labels,
      datasets: [{
        label: '金银比',
        data: silverData.ratioHistory.values,
        borderColor: '#FFD700',
        backgroundColor: 'rgba(255, 215, 0, 0.1)',
        fill: true,
        tension: 0.4
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false }
      },
      scales: {
        y: {
          grid: { color: 'rgba(255,255,255,0.1)' },
          ticks: { color: '#a0a0a0' }
        },
        x: {
          grid: { color: 'rgba(255,255,255,0.1)' },
          ticks: { color: '#a0a0a0' }
        }
      }
    }
  });
}

// 渲染看多看空论据
function renderArguments() {
  const bullishList = document.getElementById('bullishArguments');
  const bearishList = document.getElementById('bearishArguments');
  
  bullishList.innerHTML = bullishArguments.map(arg => `
    <li>
      <strong>📈 ${arg.title}</strong>
      ${arg.content}
    </li>
  `).join('');
  
  bearishList.innerHTML = bearishArguments.map(arg => `
    <li>
      <strong>📉 ${arg.title}</strong>
      ${arg.content}
    </li>
  `).join('');
}

// 辩论Tab切换
function initDebateTabs() {
  const tabs = document.querySelectorAll('.debate-tab');
  const panels = document.querySelectorAll('.debate-panel');
  
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.target;
      
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      
      panels.forEach(panel => {
        if (target === 'all') {
          panel.classList.add('active');
          panel.classList.remove('full-width');
        } else if (panel.classList.contains(target)) {
          panel.classList.add('active');
          panel.classList.add('full-width');
        } else {
          panel.classList.remove('active');
        }
      });
    });
  });
}

// 平滑滚动
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

// 导航高亮
function initNavHighlight() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');
  
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      if (window.scrollY >= sectionTop - 200) {
        current = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  });
}

// 更新统计卡片
function updateStats() {
  document.getElementById('currentPrice').textContent = `$${silverData.currentPrice.usd}`;
  document.getElementById('priceChange').textContent = `${silverData.currentPrice.change24h}%`;
  document.getElementById('priceChange').className = 'change ' + (silverData.currentPrice.change24h >= 0 ? 'up' : 'down');
  
  document.getElementById('deficit').textContent = `${Math.abs(silverData.supplyDemand.deficit)}亿盎司`;
  document.getElementById('deficitYears').textContent = `连续${silverData.supplyDemand.deficitYears}年`;
  
  document.getElementById('goldSilverRatio').textContent = `${silverData.goldSilverRatio}:1`;
  document.getElementById('inventoryCoverage').textContent = `${silverData.inventoryCoverage}%`;
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
  updateStats();
  initCharts();
  renderArguments();
  initDebateTabs();
  initSmoothScroll();
  initNavHighlight();
});
