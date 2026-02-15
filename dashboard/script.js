const ctx = document.getElementById('co2Chart').getContext('2d');

const labels = Array.from({length: 13}, (_, i) => `${i*5} min ago`).reverse();

const data = {
  labels,
  datasets: [{
    label: 'CO₂ (ppm)',
    data: [520, 528, 535, 549, 572, 595, 618, 636, 648, 655, 642, 628, 615],
    borderColor: '#f59e0b',
    backgroundColor: 'rgba(245, 158, 11, 0.15)',
    tension: 0.25,
    fill: true,
    pointRadius: 0,
    borderWidth: 3,
  }]
};

const config = {
  type: 'line',
  data: data,
  options: {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        min: 450,
        max: 800,
        ticks: { stepSize: 50, font: { size: 13 } },
        grid: { color: '#e2e8f0' }
      },
      x: {
        ticks: { font: { size: 13 }, maxRotation: 0 },
        grid: { display: false }
      }
    },
    plugins: {
      legend: { display: false },
      tooltip: { mode: 'index', intersect: false }
    },
    interaction: {
      mode: 'nearest',
      axis: 'x',
      intersect: false
    }
  }
};

const chart = new Chart(ctx, config);

setInterval(() => {
  const newValue = Math.round(580 + Math.random() * 90 - 45);
  chart.data.datasets[0].data.shift();
  chart.data.datasets[0].data.push(newValue);

  const temp = (23.8 + Math.random() * 1.4).toFixed(1);
  document.querySelector('.temperature .value').textContent = `${temp} °C`;

  chart.update();
}, 8000);