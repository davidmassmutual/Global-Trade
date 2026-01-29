// JavaScript for Global Trade Pro Fake Broker Website

// DOM Elements
const tradeButtons = document.querySelectorAll('.trade-btn');
const priceElement = document.querySelector('.price');
const changeElement = document.querySelector('.change');
const symbolElement = document.querySelector('.symbol');

// Trading Simulation Data
const tradingData = {
    'EUR/USD': { price: 1.0856, change: 0.0025, trend: 'up' },
    'GBP/USD': { price: 1.2689, change: -0.0012, trend: 'down' },
    'USD/JPY': { price: 149.87, change: 0.15, trend: 'up' },
    'BTC/USD': { price: 43250.50, change: -150.25, trend: 'down' }
};

// Current trading symbol
let currentSymbol = 'EUR/USD';

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeTradingSimulation();
    setupEventListeners();
    animateHeroStats();
    setupScrollAnimations();
});

// Trading Simulation Functions
function initializeTradingSimulation() {
    updateTradingDisplay();
    
    // Update prices every 2 seconds
    setInterval(() => {
        updatePrices();
        updateTradingDisplay();
    }, 2000);
}

function updatePrices() {
    // Simulate price movement
    Object.keys(tradingData).forEach(symbol => {
        const data = tradingData[symbol];
        const volatility = 0.0005; // Price volatility
        const randomChange = (Math.random() - 0.5) * volatility;
        
        data.price += randomChange;
        data.change += randomChange;
        
        // Determine trend
        data.trend = randomChange > 0 ? 'up' : 'down';
    });
}

function updateTradingDisplay() {
    const data = tradingData[currentSymbol];
    
    // Update price
    priceElement.textContent = data.price.toFixed(4);
    
    // Update change
    const changePercent = (data.change / (data.price - data.change)) * 100;
    changeElement.textContent = `${data.change > 0 ? '+' : ''}${data.change.toFixed(4)} (${changePercent.toFixed(2)}%)`;
    
    // Update change color
    if (data.change > 0) {
        changeElement.className = 'change positive';
    } else {
        changeElement.className = 'change negative';
    }
}

function setupEventListeners() {
    // Trade button animations
    tradeButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 100);
            
            // Show trade confirmation
            showTradeConfirmation(this.textContent);
        });
    });
    
    // Navigation smooth scrolling
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Demo account button
    document.querySelectorAll('.btn-large').forEach(button => {
        if (button.textContent.includes('Demo')) {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                alert('Demo account feature would be implemented here. This is a fake broker website for demonstration purposes only.');
            });
        }
    });
}

function showTradeConfirmation(action) {
    // Create confirmation overlay
    const overlay = document.createElement('div');
    overlay.className = 'trade-confirmation';
    overlay.innerHTML = `
        <div class="confirmation-content">
            <div class="confirmation-icon">
                <i class="fas fa-check-circle"></i>
            </div>
            <h3>Trade Executed Successfully!</h3>
            <p>${action} order placed for ${currentSymbol}</p>
            <p class="confirmation-price">Price: ${tradingData[currentSymbol].price.toFixed(4)}</p>
            <button class="btn btn-primary close-confirmation">Continue Trading</button>
        </div>
    `;
    
    document.body.appendChild(overlay);
    
    // Close confirmation
    overlay.querySelector('.close-confirmation').addEventListener('click', function() {
        overlay.remove();
    });
    
    // Auto close after 3 seconds
    setTimeout(() => {
        if (overlay.parentNode) {
            overlay.remove();
        }
    }, 3000);
}

function animateHeroStats() {
    const stats = document.querySelectorAll('.stat-number');
    
    stats.forEach(stat => {
        const target = parseFloat(stat.textContent);
        const increment = target / 100;
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            stat.textContent = current.toFixed(1);
        }, 20);
    });
}

function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe feature cards
    document.querySelectorAll('.feature-card, .market-category, .testimonial-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
}

// Add CSS for trade confirmation overlay
const style = document.createElement('style');
style.textContent = `
    .trade-confirmation {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
        backdrop-filter: blur(5px);
    }
    
    .confirmation-content {
        background: white;
        padding: 2rem;
        border-radius: 16px;
        text-align: center;
        max-width: 400px;
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        animation: popIn 0.3s ease-out;
    }
    
    .confirmation-icon {
        font-size: 3rem;
        color: #10b981;
        margin-bottom: 1rem;
    }
    
    .confirmation-content h3 {
        color: #1f2937;
        margin-bottom: 0.5rem;
    }
    
    .confirmation-content p {
        color: #6b7280;
        margin-bottom: 1rem;
    }
    
    .confirmation-price {
        font-weight: 700;
        color: #2563eb;
        font-size: 1.2rem;
    }
    
    @keyframes popIn {
        from {
            opacity: 0;
            transform: scale(0.8);
        }
        to {
            opacity: 1;
            transform: scale(1);
        }
    }
`;
document.head.appendChild(style);

// Add regulatory badges to hero section
function addRegulatoryBadges() {
    const heroStats = document.querySelector('.hero-stats');
    const badges = document.createElement('div');
    badges.className = 'regulatory-badges';
    badges.innerHTML = `
        <span class="badge">FCA Regulated</span>
        <span class="badge">CySEC Licensed</span>
        <span class="badge">ASIC Approved</span>
        <span class="badge">Segregated Accounts</span>
    `;
    heroStats.appendChild(badges);
}

// Initialize badges
document.addEventListener('DOMContentLoaded', addRegulatoryBadges);