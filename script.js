/**
 * EasyTrip - Production-Ready Travel Platform
 * Modular architecture with real-time API integrations
 */

// ========================================
// STATE & CONFIGURATION
// ========================================

const AppState = {
    packages: [],
    stories: [],
    likedPackages: JSON.parse(localStorage.getItem('likedPackages') || '[]'),
    userCurrency: localStorage.getItem('userCurrency') || 'USD',
    userLocation: null,
    exchangeRates: null,
    weatherCache: new Map(),
    currentPackage: null,
    theme: localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
};

const CONFIG = {
    CACHE_TTL: 10 * 60 * 1000, // 10 minutes
    NOTIFICATION_DURATION: 5000,
    COUNTDOWN_TARGET_HOURS: 4,
    API_ENDPOINTS: {
        weather: 'https://api.open-meteo.com/v1',
        forecast: 'https://api.open-meteo.com/v1',
        currency: 'https://api.frankfurter.app',
        geoIp: 'https://ip-api.com/json'
    }
};

// ========================================
// CACHE MANAGER
// ========================================

const CacheManager = {
    get(key) {
        const item = localStorage.getItem(`cache_${key}`);
        if (!item) return null;
        const { data, timestamp } = JSON.parse(item);
        if (Date.now() - timestamp > CONFIG.CACHE_TTL) {
            localStorage.removeItem(`cache_${key}`);
            return null;
        }
        return data;
    },
    set(key, data) {
        localStorage.setItem(`cache_${key}`, JSON.stringify({ data, timestamp: Date.now() }));
    }
};

// ========================================
// API SERVICES
// ========================================

const ApiService = {
    async fetchWithTimeout(url, options = {}, timeout = 8000) {
        const controller = new AbortController();
        const id = setTimeout(() => controller.abort(), timeout);
        try {
            const response = await fetch(url, { ...options, signal: controller.signal });
            clearTimeout(id);
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            return response;
        } catch (error) {
            clearTimeout(id);
            throw error;
        }
    },

    async getWeather(lat, lon) {
        const cacheKey = `weather_${lat}_${lon}`;
        const cached = CacheManager.get(cacheKey);
        if (cached) return cached;

        const url = `${CONFIG.API_ENDPOINTS.weather}/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m,precipitation,uv_index&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto`;
        const response = await this.fetchWithTimeout(url);
        const data = await response.json();
        CacheManager.set(cacheKey, data);
        return data;
    },

    async getExchangeRates(base = 'USD') {
        const cacheKey = `rates_${base}`;
        const cached = CacheManager.get(cacheKey);
        if (cached) return cached;

        const url = `${CONFIG.API_ENDPOINTS.currency}/latest?from=${base}`;
        const response = await this.fetchWithTimeout(url);
        const data = await response.json();
        CacheManager.set(cacheKey, data);
        return data;
    },

    async getGeoLocation() {
        const cached = CacheManager.get('geoip');
        if (cached) return cached;

        const response = await this.fetchWithTimeout(CONFIG.API_ENDPOINTS.geoIp);
        const data = await response.json();
        CacheManager.set('geoip', data);
        return data;
    },

    getBrowserLocation() {
        return new Promise((resolve, reject) => {
            if (!navigator.geolocation) {
                reject(new Error('Geolocation not supported'));
                return;
            }
            navigator.geolocation.getCurrentPosition(
                pos => resolve({ lat: pos.coords.latitude, lon: pos.coords.longitude }),
                err => reject(err),
                { timeout: 10000, enableHighAccuracy: false }
            );
        });
    }
};

// ========================================
// CURRENCY SERVICE
// ========================================

const CurrencyService = {
    rates: null,
    symbols: {
        USD: '$', EUR: '€', GBP: '£', JPY: '¥', CAD: 'C$',
        AUD: 'A$', INR: '₹', BRL: 'R$', THB: '฿', SGD: 'S$'
    },

    async init() {
        try {
            const data = await ApiService.getExchangeRates('USD');
            this.rates = data.rates;
            AppState.exchangeRates = data.rates;
            this.updateRateDisplay();
        } catch (error) {
            console.warn('Currency service unavailable:', error);
            this.rates = {};
        }
    },

    convert(amount, from = 'USD', to = AppState.userCurrency) {
        if (from === to) return amount;
        if (!this.rates) return amount;
        const inUSD = from === 'USD' ? amount : amount / this.rates[from];
        return to === 'USD' ? inUSD : inUSD * this.rates[to];
    },

    format(amount, currency = AppState.userCurrency) {
        const symbol = this.symbols[currency] || currency;
        const converted = this.convert(amount, 'USD', currency);
        return `${symbol}${converted.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
    },

    updateRateDisplay() {
        if (!this.rates) return;
        const setRate = (id, rate) => {
            const el = document.getElementById(id);
            if (el) el.textContent = rate ? rate.toFixed(4) : '--';
        };
        setRate('rate-usd-eur', this.rates.EUR);
        setRate('rate-usd-gbp', this.rates.GBP);
        setRate('rate-usd-jpy', this.rates.JPY);
    }
};

// ========================================
// NOTIFICATION MANAGER
// ========================================

const NotificationManager = {
    container: document.getElementById('notification-container'),

    show({ title, message, type = 'info', duration = CONFIG.NOTIFICATION_DURATION }) {
        if (!this.container) return;

        const toast = document.createElement('div');
        toast.className = `notification-toast ${type}`;
        toast.setAttribute('role', 'alert');

        const icons = { success: 'fa-check-circle', info: 'fa-info-circle', warning: 'fa-bell' };
        toast.innerHTML = `
            <i class="fas ${icons[type] || icons.info} notification-icon" aria-hidden="true"></i>
            <div class="notification-content">
                <strong>${title}</strong>
                <p>${message}</p>
            </div>
            <button class="notification-close" aria-label="Close notification"><i class="fas fa-times"></i></button>
        `;

        toast.querySelector('.notification-close').addEventListener('click', () => this.dismiss(toast));
        this.container.appendChild(toast);

        setTimeout(() => this.dismiss(toast), duration);
    },

    dismiss(toast) {
        toast.classList.add('removing');
        setTimeout(() => toast.remove(), 300);
    },

    simulateSocialProof() {
        const actions = [
            { name: 'Sarah from London', action: 'booked Bali Adventure', time: '2 min ago' },
            { name: 'Mike from Toronto', action: 'viewed Paris Getaway', time: 'just now' },
            { name: 'Emma from Sydney', action: 'saved Maldives Retreat', time: '5 min ago' },
            { name: 'David from Berlin', action: 'booked Kyoto Tour', time: '1 min ago' },
            { name: 'Lisa from NYC', action: 'viewed Greek Islands', time: '3 min ago' }
        ];
        const random = actions[Math.floor(Math.random() * actions.length)];
        this.show({
            title: `${random.name} ${random.action}`,
            message: random.time,
            type: 'info',
            duration: 6000
        });
    }
};

// ========================================
// THEME MANAGER
// ========================================

const ThemeManager = {
    toggle() {
        AppState.theme = AppState.theme === 'light' ? 'dark' : 'light';
        localStorage.setItem('theme', AppState.theme);
        this.apply();
    },

    apply() {
        document.body.classList.toggle('dark-mode', AppState.theme === 'dark');
        const btn = document.getElementById('theme-toggle');
        if (btn) {
            btn.innerHTML = AppState.theme === 'dark'
                ? '<i class="fas fa-sun" aria-hidden="true"></i>'
                : '<i class="fas fa-moon" aria-hidden="true"></i>';
            btn.setAttribute('aria-label', AppState.theme === 'dark' ? 'Toggle light mode' : 'Toggle dark mode');
        }
    },

    init() {
        this.apply();
        document.getElementById('theme-toggle')?.addEventListener('click', () => this.toggle());
    }
};

// ========================================
// MOBILE MENU
// ========================================

const MobileMenu = {
    init() {
        const toggle = document.querySelector('.mobile-menu-toggle');
        const nav = document.getElementById('nav-links');
        if (!toggle || !nav) return;

        toggle.addEventListener('click', () => {
            const expanded = toggle.getAttribute('aria-expanded') === 'true';
            toggle.setAttribute('aria-expanded', !expanded);
            nav.classList.toggle('open');
        });

        nav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                toggle.setAttribute('aria-expanded', 'false');
                nav.classList.remove('open');
            });
        });
    }
};

// ========================================
// SCROLL REVEAL
// ========================================

const ScrollReveal = {
    init() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

        document.querySelectorAll('.feature-section').forEach(el => {
            el.classList.add('reveal');
            observer.observe(el);
        });
    }
};

// ========================================
// LIVE STATS & COUNTDOWN
// ========================================

const LiveStats = {
    init() {
        this.animateCounter('stat-travelers', 2847);
        this.animateCounter('stat-bookings', 156);
        this.startCountdown();
        this.startLiveUpdates();
    },

    animateCounter(id, target) {
        const el = document.getElementById(id);
        if (!el) return;
        const duration = 2000;
        const start = performance.now();

        const tick = (now) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const easeOut = 1 - Math.pow(1 - progress, 3);
            el.textContent = Math.floor(easeOut * target).toLocaleString();
            if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
    },

    startCountdown() {
        let totalSeconds = CONFIG.COUNTDOWN_TARGET_HOURS * 3600 + 1800;
        const update = () => {
            totalSeconds = Math.max(0, totalSeconds - 1);
            const h = Math.floor(totalSeconds / 3600);
            const m = Math.floor((totalSeconds % 3600) / 60);
            const s = totalSeconds % 60;
            const set = (id, val) => {
                const el = document.getElementById(id);
                if (el) el.textContent = String(val).padStart(2, '0');
            };
            set('timer-hours', h);
            set('timer-minutes', m);
            set('timer-seconds', s);
        };
        update();
        setInterval(update, 1000);
    },

    startLiveUpdates() {
        setInterval(() => {
            const travelers = document.getElementById('stat-travelers');
            if (travelers) {
                const current = parseInt(travelers.textContent.replace(/,/g, ''));
                travelers.textContent = (current + Math.floor(Math.random() * 5) - 2).toLocaleString();
            }
        }, 5000);

        setTimeout(() => NotificationManager.simulateSocialProof(), 8000);
        setInterval(() => NotificationManager.simulateSocialProof(), 25000 + Math.random() * 20000);
    }
};

// ========================================
// GEOLOCATION SERVICE
// ========================================

const GeoService = {
    async init() {
        try {
            const geo = await ApiService.getGeoLocation();
            AppState.userLocation = geo;
            this.displayLocation(geo);

            try {
                const browserGeo = await ApiService.getBrowserLocation();
                AppState.userLocation = { ...geo, ...browserGeo, precise: true };
            } catch {
                // Fallback to IP geolocation is fine
            }
        } catch (error) {
            console.warn('Geolocation failed:', error);
            this.displayLocation(null);
        }
    },

    displayLocation(geo) {
        const el = document.getElementById('user-location');
        const distEl = document.getElementById('user-distance');
        if (!el) return;

        if (geo) {
            el.textContent = `${geo.city || geo.country || 'Your Location'}`;
            if (distEl && geo.lat && geo.lon) {
                distEl.textContent = 'Select a package to see distance';
            }
        } else {
            el.textContent = 'Location unavailable';
        }
    },

    calculateDistance(lat1, lon1, lat2, lon2) {
        const R = 6371;
        const dLat = (lat2 - lat1) * Math.PI / 180;
        const dLon = (lon2 - lon1) * Math.PI / 180;
        const a = Math.sin(dLat / 2) ** 2 + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLon / 2) ** 2;
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return Math.round(R * c);
    }
};

// ========================================
// WEATHER SERVICE
// ========================================

const WeatherService = {
    weatherCodes: {
        0: { label: 'Clear sky', icon: 'fa-sun' },
        1: { label: 'Mainly clear', icon: 'fa-cloud-sun' },
        2: { label: 'Partly cloudy', icon: 'fa-cloud-sun' },
        3: { label: 'Overcast', icon: 'fa-cloud' },
        45: { label: 'Foggy', icon: 'fa-smog' },
        48: { label: 'Foggy', icon: 'fa-smog' },
        51: { label: 'Light drizzle', icon: 'fa-cloud-rain' },
        53: { label: 'Drizzle', icon: 'fa-cloud-rain' },
        55: { label: 'Heavy drizzle', icon: 'fa-cloud-showers-heavy' },
        61: { label: 'Light rain', icon: 'fa-cloud-rain' },
        63: { label: 'Rain', icon: 'fa-cloud-rain' },
        65: { label: 'Heavy rain', icon: 'fa-cloud-showers-heavy' },
        71: { label: 'Light snow', icon: 'fa-snowflake' },
        73: { label: 'Snow', icon: 'fa-snowflake' },
        75: { label: 'Heavy snow', icon: 'fa-snowflake' },
        95: { label: 'Thunderstorm', icon: 'fa-bolt' }
    },

    async displayForPackage(pkg) {
        const section = document.getElementById('live-weather-section');
        const container = document.getElementById('weather-info');
        if (!section || !container || !pkg.coordinates) return;

        container.innerHTML = '<div class="skeleton-grid" style="grid-column:1/-1;"><div class="skeleton-line" style="height:120px;"></div></div>';
        section.style.display = 'block';

        try {
            const data = await ApiService.getWeather(pkg.coordinates.lat, pkg.coordinates.lon);
            this.render(data, pkg.destination);
        } catch (error) {
            container.innerHTML = `<div style="text-align:center;padding:2rem;color:var(--color-text-muted);">
                <i class="fas fa-cloud-slash" style="font-size:2rem;margin-bottom:1rem;display:block;"></i>
                Weather data temporarily unavailable for ${pkg.destination}
            </div>`;
        }
    },

    render(data, destination) {
        const container = document.getElementById('weather-info');
        const current = data.current;
        const daily = data.daily;
        const code = this.weatherCodes[current.weather_code] || { label: 'Unknown', icon: 'fa-cloud' };

        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const today = new Date().getDay();

        let forecastHTML = '';
        for (let i = 1; i <= 5; i++) {
            const dayIndex = (today + i) % 7;
            const fCode = this.weatherCodes[daily.weather_code[i]] || { icon: 'fa-cloud' };
            forecastHTML += `
                <div class="weather-forecast-item">
                    <div class="day">${days[dayIndex]}</div>
                    <div class="forecast-icon"><i class="fas ${fCode.icon}" aria-hidden="true"></i></div>
                    <div class="temps">
                        <span class="temp-high">${Math.round(daily.temperature_2m_max[i])}°</span>
                        <span class="temp-low">${Math.round(daily.temperature_2m_min[i])}°</span>
                    </div>
                </div>
            `;
        }

        container.innerHTML = `
            <div class="weather-current">
                <div class="weather-current-icon"><i class="fas ${code.icon}" aria-hidden="true"></i></div>
                <div class="weather-current-info">
                    <h3>Current Weather in ${destination}</h3>
                    <div class="weather-current-temp">${Math.round(current.temperature_2m)}°C</div>
                    <div class="weather-current-desc">${code.label} · Humidity ${current.relative_humidity_2m}% · Wind ${current.wind_speed_10m} km/h</div>
                </div>
            </div>
            <div style="grid-column:1/-1;margin-bottom:var(--space-4);">
                <h4 style="color:var(--color-text-secondary);font-size:0.9rem;text-transform:uppercase;letter-spacing:0.05em;margin-bottom:var(--space-4);">5-Day Forecast</h4>
            </div>
            ${forecastHTML}
        `;
    },

    getCurrentIcon(code) {
        return (this.weatherCodes[code] || this.weatherCodes[0]).icon;
    }
};

// ========================================
// PACKAGE RENDERING
// ========================================

function createPackageElement(pkg) {
    const div = document.createElement('div');
    div.className = 'recommendation-item';
    div.setAttribute('role', 'listitem');
    div.dataset.packageId = pkg.id;

    const discountHTML = pkg.discount > 0
        ? `<span class="discount-badge">${(pkg.discount * 100).toFixed(0)}% OFF</span>`
        : '';

    const originalPriceHTML = pkg.discount > 0
        ? `<span class="original-price">${CurrencyService.format(pkg.price)}</span>`
        : '';

    const discountedPrice = pkg.price * (1 - pkg.discount);
    const priceHTML = pkg.discount > 0
        ? `<span class="discounted-price">${CurrencyService.format(discountedPrice)}</span>`
        : `<span class="discounted-price">${CurrencyService.format(pkg.price)}</span>`;

    const couponHTML = pkg.couponCode
        ? `<span class="coupon-code">${pkg.couponCode}</span>`
        : '';

    const badgesHTML = [];
    if (pkg.isEcoCertified) badgesHTML.push('<span class="badge badge-eco"><i class="fas fa-leaf"></i> Eco Certified</span>');
    if (pkg.popularityScore > 90) badgesHTML.push('<span class="badge badge-popular"><i class="fas fa-fire"></i> Trending</span>');

    const viewers = Math.floor(Math.random() * 40) + 8;
    badgesHTML.push(`<span class="badge badge-urgency"><i class="fas fa-eye"></i> ${viewers} viewing</span>`);

    let distanceHTML = '';
    if (AppState.userLocation && AppState.userLocation.lat && pkg.coordinates) {
        const dist = GeoService.calculateDistance(
            AppState.userLocation.lat, AppState.userLocation.lon,
            pkg.coordinates.lat, pkg.coordinates.lon
        );
        distanceHTML = `<p style="font-size:0.85rem;color:var(--color-text-muted);margin-top:var(--space-1);">
            <i class="fas fa-location-arrow" aria-hidden="true"></i> ${dist.toLocaleString()} km away
        </p>`;
    }

    div.innerHTML = `
        ${discountHTML}
        <div class="package-image-wrapper">
            <img src="images/${pkg.image}" alt="${pkg.title}" class="package-image" loading="lazy">
            <div class="package-weather-overlay" id="weather-overlay-${pkg.id}">
                <i class="fas fa-spinner fa-spin" aria-hidden="true"></i> Loading...
            </div>
        </div>
        <div class="recommendation-item-content">
            <h3>${pkg.title}</h3>
            <p><i class="fas fa-map-marker-alt" aria-hidden="true"></i> ${pkg.destination} · ${pkg.duration}</p>
            <div class="price-row">${originalPriceHTML} ${priceHTML}</div>
            ${couponHTML}
            <div class="package-badges">${badgesHTML.join('')}</div>
            ${distanceHTML}
            <div class="recommendation-item-footer">
                <button class="view-details-button" aria-expanded="false">
                    <i class="fas fa-info-circle" aria-hidden="true"></i> Details
                </button>
                <button class="like-button ${isPackageLiked(pkg.id) ? 'liked' : ''}">
                    <i class="${isPackageLiked(pkg.id) ? 'fas' : 'far'} fa-heart" aria-hidden="true"></i>
                    ${isPackageLiked(pkg.id) ? 'Liked' : 'Like'}
                </button>
                <button class="book-now-button">
                    <i class="fas fa-calendar-check" aria-hidden="true"></i> Book Now
                </button>
            </div>
        </div>
        <div class="package-details">${createDetailsHTML(pkg)}</div>
    `;

    const detailsBtn = div.querySelector('.view-details-button');
    detailsBtn.addEventListener('click', () => toggleDetails(div, detailsBtn));

    const likeBtn = div.querySelector('.like-button');
    likeBtn.addEventListener('click', () => toggleLike(pkg.id, likeBtn));

    const bookBtn = div.querySelector('.book-now-button');
    bookBtn.addEventListener('click', () => bookPackage(pkg));

    return div;
}

function createDetailsHTML(pkg) {
    return `
        <h4><i class="fas fa-concierge-bell" aria-hidden="true"></i> Amenities</h4>
        <ul>${pkg.amenities.map(a => `<li>${a}</li>`).join('')}</ul>
        <h4><i class="fas fa-map-signs" aria-hidden="true"></i> Itinerary</h4>
        <ul>${pkg.itinerary.map(day => `<li>${day}</li>`).join('')}</ul>
    `;
}

function toggleDetails(card, btn) {
    const details = card.querySelector('.package-details');
    const isExpanded = details.classList.toggle('expanded');
    btn.setAttribute('aria-expanded', isExpanded);
    btn.innerHTML = isExpanded
        ? '<i class="fas fa-chevron-up" aria-hidden="true"></i> Hide'
        : '<i class="fas fa-info-circle" aria-hidden="true"></i> Details';
}

function toggleLike(packageId, btn) {
    const index = AppState.likedPackages.indexOf(packageId);
    if (index > -1) {
        AppState.likedPackages.splice(index, 1);
        btn.innerHTML = '<i class="far fa-heart" aria-hidden="true"></i> Like';
        btn.classList.remove('liked');
    } else {
        AppState.likedPackages.push(packageId);
        btn.innerHTML = '<i class="fas fa-heart" aria-hidden="true"></i> Liked';
        btn.classList.add('liked');
        NotificationManager.show({
            title: 'Added to favorites',
            message: 'This package has been saved to your liked list.',
            type: 'success'
        });
    }
    localStorage.setItem('likedPackages', JSON.stringify(AppState.likedPackages));
}

function isPackageLiked(packageId) {
    return AppState.likedPackages.includes(packageId);
}

function bookPackage(pkg) {
    NotificationManager.show({
        title: 'Booking Initiated',
        message: `Processing your booking for ${pkg.title}. You will receive a confirmation email shortly.`,
        type: 'success'
    });
}

// ========================================
// MAP & PANORAMA
// ========================================

let map;

function initMap(lat, lon, name) {
    if (map) map.remove();
    map = L.map('destination-map').setView([lat, lon], 12);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);
    L.marker([lat, lon]).addTo(map).bindPopup(`<b>${name}</b><br>Your selected destination`).openPopup();
}

function loadPanorama(url) {
    const container = document.getElementById('panorama-viewer');
    container.innerHTML = '';
    try {
        pannellum.viewer('panorama-viewer', {
            type: 'equirectangular',
            panorama: url,
            autoLoad: true,
            compass: false,
            showControls: true
        });
    } catch (e) {
        container.innerHTML = `<div style="display:flex;align-items:center;justify-content:center;height:100%;color:var(--color-text-muted);">
            360° preview unavailable for this destination
        </div>`;
    }
}

// ========================================
// TRAVEL STORIES
// ========================================

function displayTravelStories(stories) {
    const grid = document.getElementById('travel-stories-grid');
    if (!grid) return;
    grid.innerHTML = '';

    stories.forEach(story => {
        const card = document.createElement('article');
        card.className = 'travel-story-card';
        card.setAttribute('role', 'listitem');

        const stars = Array(5).fill(0).map((_, i) =>
            `<i class="fas fa-star${i < story.rating ? '' : ' far'}" aria-hidden="true"></i>`
        ).join('');

        const tagsHTML = (story.tags || []).map(tag =>
            `<span class="story-tag">${tag}</span>`
        ).join('');

        card.innerHTML = `
            <div class="story-image-container">
                <img src="images/${story.image}" alt="${story.title}" class="story-image" loading="lazy">
                <div class="story-meta">
                    <span class="story-rating" aria-label="${story.rating} out of 5 stars">${stars}</span>
                    <span class="story-read-time">${story.readTime || 5} min read</span>
                </div>
            </div>
            <div class="story-content">
                <h3 class="story-title">${story.title}</h3>
                <p class="story-author">By ${story.author} · ${new Date(story.date).toLocaleDateString()}</p>
                <p class="story-excerpt">${story.excerpt}</p>
                <div class="story-tags">${tagsHTML}</div>
                <a href="${story.link}" class="read-more-link">Read More <i class="fas fa-arrow-right" aria-hidden="true"></i></a>
            </div>
        `;
        grid.appendChild(card);
    });
}

// ========================================
// CARBON OFFSET
// ========================================

function calculateCarbonFootprint(pkg) {
    let base = 500;
    if (pkg.destinationRegion === 'long-haul') base += 300;
    if (pkg.budget === 'luxury') base += 100;
    if (['asia', 'africa', 'south-america'].includes(pkg.destinationRegion)) base += 200;
    return base;
}

function displayCarbonOffsetSection(pkg) {
    const section = document.getElementById('carbon-offset-section');
    const value = document.getElementById('footprint-value');
    const btn = document.getElementById('offset-button');
    if (!section || !value || !btn) return;

    const footprint = calculateCarbonFootprint(pkg);
    value.textContent = `${footprint} kg CO2`;
    section.style.display = 'block';

    btn.onclick = () => {
        NotificationManager.show({
            title: 'Carbon Offset Added',
            message: `Thank you for offsetting ${footprint}kg of CO2 for your trip to ${pkg.destination}.`,
            type: 'success'
        });
    };
}

// ========================================
// RECOMMENDATIONS ENGINE
// ========================================

function getRecommendations() {
    const theme = document.getElementById('theme').value;
    const budget = document.getElementById('budget').value;
    const season = document.getElementById('season').value;
    const discountOnly = document.getElementById('discount').checked;
    const eco = document.getElementById('eco-certified').checked;
    const ethical = document.getElementById('ethical-tours').checked;
    const local = document.getElementById('local-businesses').checked;

    const list = document.getElementById('recommendations-list');
    const relatedList = document.getElementById('related-recommendations-list');
    const relatedSection = document.getElementById('related-recommendations-section');
    const aiSection = document.getElementById('ai-concierge-recommendations');

    list.innerHTML = `
        <div class="skeleton-grid" aria-label="Loading recommendations">
            <div class="skeleton-card"><div class="skeleton-image"></div><div class="skeleton-body"><div class="skeleton-line"></div><div class="skeleton-line short"></div><div class="skeleton-line medium"></div></div></div>
            <div class="skeleton-card"><div class="skeleton-image"></div><div class="skeleton-body"><div class="skeleton-line"></div><div class="skeleton-line short"></div><div class="skeleton-line medium"></div></div></div>
            <div class="skeleton-card"><div class="skeleton-image"></div><div class="skeleton-body"><div class="skeleton-line"></div><div class="skeleton-line short"></div><div class="skeleton-line medium"></div></div></div>
        </div>
    `;
    relatedList.innerHTML = '';
    relatedSection.style.display = 'none';
    aiSection.style.display = 'none';

    setTimeout(() => {
        const seasonMonths = { spring: [3,4,5], summer: [6,7,8], autumn: [9,10,11], winter: [12,1,2] };
        const currentMonth = new Date().getMonth() + 1;

        const filtered = AppState.packages.filter(pkg => {
            const themeMatch = !theme || pkg.theme === theme;
            const budgetMatch = !budget || pkg.budget === budget.toLowerCase().replace('-friendly', '');
            const discountMatch = !discountOnly || pkg.discount > 0;
            const ecoMatch = !eco || pkg.isEcoCertified;
            const ethicalMatch = !ethical || pkg.hasEthicalTours;
            const localMatch = !local || pkg.supportsLocalBusinesses;
            const seasonMatch = !season || (pkg.bestMonths || []).some(m => seasonMonths[season]?.includes(m));
            return themeMatch && budgetMatch && discountMatch && ecoMatch && ethicalMatch && localMatch && seasonMatch;
        });

        if (filtered.length === 0) {
            list.innerHTML = `<p id="no-recommendations">
                    <i class="fas fa-search" style="font-size:2rem;color:var(--color-text-muted);margin-bottom:1rem;display:block;"></i>
                    No packages found matching your preferences. Try adjusting your filters.
                </p>`;
            return;
        }

        list.innerHTML = '';
        filtered.forEach(pkg => list.appendChild(createPackageElement(pkg)));

        // Load weather overlays for visible packages
        filtered.slice(0, 3).forEach(async pkg => {
            if (!pkg.coordinates) return;
            try {
                const data = await ApiService.getWeather(pkg.coordinates.lat, pkg.coordinates.lon);
                const overlay = document.getElementById(`weather-overlay-${pkg.id}`);
                if (overlay && data.current) {
                    const icon = WeatherService.getCurrentIcon(data.current.weather_code);
                    overlay.innerHTML = `<i class="fas ${icon}" aria-hidden="true"></i> ${Math.round(data.current.temperature_2m)}°C`;
                }
            } catch {
                const overlay = document.getElementById(`weather-overlay-${pkg.id}`);
                if (overlay) overlay.style.display = 'none';
            }
        });

        const related = getRelatedPackages(filtered, theme, budget);
        if (related.length > 0) {
            relatedSection.style.display = 'block';
            related.forEach(pkg => relatedList.appendChild(createPackageElement(pkg)));
        }

        displayAIRecommendations({ theme, budget: budget.toLowerCase().replace('-friendly', '') });

        if (filtered.length > 0) {
            const first = filtered[0];
            AppState.currentPackage = first;
            loadPanorama(`images/${first.image.replace('.jpg', '-panorama.jpg')}`);
            if (first.coordinates) {
                initMap(first.coordinates.lat, first.coordinates.lon, first.destination);
            }
            WeatherService.displayForPackage(first);
            displayCarbonOffsetSection(first);
        }
    }, 600);
}

function getRelatedPackages(current, themePref, budgetPref) {
    const currentIds = new Set(current.map(p => p.id));
    const related = AppState.packages.filter(pkg =>
        !currentIds.has(pkg.id) &&
        ((themePref && pkg.theme === themePref) || (budgetPref && pkg.budget === budgetPref.toLowerCase().replace('-friendly', '')))
    );
    return related.slice(0, 3);
}

function getAIRecommendations(prefs) {
    return AppState.packages.filter(pkg => {
        let score = 0;
        if (prefs.theme && pkg.theme === prefs.theme) score += 2;
        if (prefs.budget && pkg.budget === prefs.budget) score += 1;
        return score >= 2;
    }).sort((a, b) => b.discount - a.discount).slice(0, 3);
}

function displayAIRecommendations(prefs) {
    const list = document.getElementById('ai-recommendations-list');
    const section = document.getElementById('ai-concierge-recommendations');
    if (!list || !section) return;

    list.innerHTML = '';
    const aiPackages = getAIRecommendations(prefs);

    if (aiPackages.length > 0) {
        section.style.display = 'block';
        aiPackages.forEach(pkg => list.appendChild(createPackageElement(pkg)));
    } else {
        section.style.display = 'none';
    }
}

// ========================================
// DATA LOADING
// ========================================

async function fetchTravelData() {
    try {
        const [packagesRes, storiesRes] = await Promise.all([
            fetch('travel-packages.json'),
            fetch('travel-stories.json')
        ]);

        AppState.packages = await packagesRes.json();
        AppState.stories = await storiesRes.json();

        displayTravelStories(AppState.stories);
        getRecommendations();
    } catch (error) {
        console.error('Error fetching travel data:', error);
        document.getElementById('recommendations-list').innerHTML = `
            <p style="text-align:center;padding:3rem;color:var(--color-danger);">
                <i class="fas fa-exclamation-triangle" style="font-size:2rem;margin-bottom:1rem;display:block;"></i>
                Failed to load travel data. Please refresh the page.
            </p>`;
    }
}

// ========================================
// INITIALIZATION
// ========================================

document.addEventListener('DOMContentLoaded', async () => {
    ThemeManager.init();
    MobileMenu.init();
    ScrollReveal.init();
    LiveStats.init();

    // Initialize currency selector
    const currencySelect = document.getElementById('currency-select');
    if (currencySelect) {
        currencySelect.value = AppState.userCurrency;
        currencySelect.addEventListener('change', (e) => {
            AppState.userCurrency = e.target.value;
            localStorage.setItem('userCurrency', e.target.value);
            getRecommendations();
        });
    }

    // Load APIs in parallel
    await Promise.all([
        CurrencyService.init(),
        GeoService.init(),
        fetchTravelData()
    ]);

    // Show welcome notification
    setTimeout(() => {
        NotificationManager.show({
            title: 'Welcome to EasyTrip',
            message: 'Explore curated packages with real-time weather and live exchange rates.',
            type: 'info'
        });
    }, 1500);
});
