// Car inventory data - Premium Kenyan market cars with correct images
const cars = [
    {
        id: 1,
        make: "Toyota",
        model: "Corolla",
        year: 2019,
        price: 850000,
        mileage: "85,000 km",
        transmission: "Automatic",
        fuel: "Petrol",
        engine: "1.6L",
        image: "https://images.unsplash.com/photo-1623869675781-80aa31012a5a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        description: "Elegantly refined Toyota Corolla with exceptional fuel economy. Perfect blend of comfort and reliability for Kenyan roads."
    },
    {
        id: 2,
        make: "Nissan",
        model: "X-Trail",
        year: 2018,
        price: 950000,
        mileage: "72,000 km",
        transmission: "Automatic",
        fuel: "Petrol",
        engine: "2.0L",
        image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        description: "Versatile 7-seater SUV with intelligent 4WD. Spacious interior perfect for family adventures across Kenya."
    },
    {
        id: 3,
        make: "Toyota",
        model: "Harrier",
        year: 2020,
        price: 1450000,
        mileage: "45,000 km",
        transmission: "Automatic",
        fuel: "Petrol",
        engine: "2.0L",
        image: "https://images.unsplash.com/photo-1542362567-b07e54358753?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        description: "Luxurious mid-size SUV with premium leather interior, advanced safety features, and sophisticated styling."
    },
    {
        id: 4,
        make: "Honda",
        model: "Fit",
        year: 2017,
        price: 650000,
        mileage: "68,000 km",
        transmission: "Automatic",
        fuel: "Petrol",
        engine: "1.3L",
        image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        description: "Compact yet surprisingly spacious. Outstanding fuel efficiency makes it ideal for Nairobi's urban environment."
    },
    {
        id: 5,
        make: "Mazda",
        model: "Demio",
        year: 2018,
        price: 720000,
        mileage: "62,000 km",
        transmission: "Automatic",
        fuel: "Petrol",
        engine: "1.3L",
        image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        description: "Sporty hatchback with KODO design language. Engaging driving dynamics with remarkable fuel economy."
    },
    {
        id: 6,
        make: "Subaru",
        model: "Forester",
        year: 2019,
        price: 1200000,
        mileage: "55,000 km",
        transmission: "Automatic",
        fuel: "Petrol",
        engine: "2.0L",
        image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        description: "Legendary Symmetrical AWD capability. Rugged, reliable, and ready for any adventure on Kenyan terrain."
    }
];

// Format price in Kenyan Shillings
function formatPrice(price) {
    return 'Ksh ' + price.toLocaleString('en-KE');
}

// Display cars in the grid with animations
function displayCars(filteredCars = cars) {
    const carsGrid = document.getElementById('carsGrid');
    carsGrid.innerHTML = '';
    
    if (filteredCars.length === 0) {
        carsGrid.innerHTML = '<p style="text-align: center; grid-column: 1/-1; padding: 3rem; color: var(--text-secondary);">No vehicles match your current filters.</p>';
        return;
    }
    
    filteredCars.forEach((car, index) => {
        const carCard = document.createElement('div');
        carCard.className = 'car-card';
        carCard.setAttribute('data-aos', 'fade-up');
        carCard.setAttribute('data-aos-delay', (index * 100).toString());
        carCard.innerHTML = `
            <div class="car-image">
                <img src="${car.image}" alt="${car.year} ${car.make} ${car.model}" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                <div class="car-image-placeholder" style="display: none;">
                    <i class="fas fa-car"></i>
                </div>
                <div class="car-badge">FEATURED</div>
            </div>
            <div class="car-details">
                <div class="car-header">
                    <h3 class="car-title">${car.year} ${car.make} ${car.model}</h3>
                    <div class="car-price">${formatPrice(car.price)}</div>
                </div>
                <div class="car-specs">
                    <div class="car-spec">
                        <i class="fas fa-tachometer-alt"></i>
                        <span>${car.mileage}</span>
                    </div>
                    <div class="car-spec">
                        <i class="fas fa-cog"></i>
                        <span>${car.transmission}</span>
                    </div>
                    <div class="car-spec">
                        <i class="fas fa-gas-pump"></i>
                        <span>${car.fuel}</span>
                    </div>
                    <div class="car-spec">
                        <i class="fas fa-car"></i>
                        <span>${car.engine}</span>
                    </div>
                </div>
                <p class="car-description">${car.description}</p>
                <button class="btn-inquire" onclick="inquireAboutCar('${car.year} ${car.make} ${car.model}')">
                    <i class="fas fa-phone-alt"></i>
                    <span>Inquire Now</span>
                </button>
            </div>
        `;
        carsGrid.appendChild(carCard);
    });
    
    // Trigger AOS animations
    setTimeout(() => {
        const elements = document.querySelectorAll('.car-card[data-aos]');
        elements.forEach(el => el.classList.add('aos-animate'));
    }, 50);
}

// Filter cars based on selected filters
function filterCars() {
    const makeFilter = document.getElementById('makeFilter').value;
    const priceFilter = document.getElementById('priceFilter').value;
    const yearFilter = document.getElementById('yearFilter').value;
    
    let filtered = cars.filter(car => {
        const makeMatch = makeFilter === 'all' || car.make === makeFilter;
        
        let priceMatch = true;
        if (priceFilter === '0-600000') {
            priceMatch = car.price < 600000;
        } else if (priceFilter === '600000-900000') {
            priceMatch = car.price >= 600000 && car.price <= 900000;
        } else if (priceFilter === '900000-1300000') {
            priceMatch = car.price >= 900000 && car.price <= 1300000;
        } else if (priceFilter === '1300000+') {
            priceMatch = car.price > 1300000;
        }
        
        let yearMatch = true;
        if (yearFilter === '2021-2024') {
            yearMatch = car.year >= 2021 && car.year <= 2024;
        } else if (yearFilter === '2018-2020') {
            yearMatch = car.year >= 2018 && car.year <= 2020;
        } else if (yearFilter === '2015-2017') {
            yearMatch = car.year >= 2015 && car.year <= 2017;
        } else if (yearFilter === '2012-2014') {
            yearMatch = car.year >= 2012 && car.year <= 2014;
        }
        
        return makeMatch && priceMatch && yearMatch;
    });
    
    displayCars(filtered);
}

// Inquire about a specific car
function inquireAboutCar(carName) {
    document.getElementById('carInterest').value = carName;
    document.getElementById('contact').scrollIntoView({ behavior: 'smooth', block: 'start' });
    
    const form = document.getElementById('inquiryForm');
    setTimeout(() => {
        form.querySelector('input[type="text"]').focus();
    }, 800);
}

// Mobile menu toggle
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }));
}

// Header scroll effect
function initHeaderScroll() {
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// Form submission
function initForm() {
    const form = document.getElementById('inquiryForm');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Asante sana for your inquiry! Our team will contact you within 24 hours.\n\nKaribu Nyumba Motors!');
        form.reset();
        document.getElementById('carInterest').value = 'general';
    });
}

// Initialize AOS animations
function initAOS() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('[data-aos]').forEach(el => {
        observer.observe(el);
    });
}

// Loading screen
function initLoading() {
    window.addEventListener('load', () => {
        setTimeout(() => {
            const loadingScreen = document.getElementById('loadingScreen');
            loadingScreen.classList.add('hidden');
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 800);
        }, 1500);
    });
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    initLoading();
    displayCars();
    
    // Add event listeners to filters
    document.getElementById('makeFilter').addEventListener('change', filterCars);
    document.getElementById('priceFilter').addEventListener('change', filterCars);
    document.getElementById('yearFilter').addEventListener('change', filterCars);
    
    initMobileMenu();
    initHeaderScroll();
    initForm();
    initAOS();
});
