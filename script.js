const travelPackages = [
    {
        id: 1,
        title: "Bali Adventure",
        destination: "Bali, Indonesia",
        theme: "adventure",
        budget: "moderate",
        duration: "7 Days",
        price: 1500,
        description: "Explore Bali's beauty.",
        image: "bali.jpg",
        discount: 0.10,
        couponCode: "BALISUN10",
        amenities: ["Surfing Lessons", "Volcano Hiking", "Temple Visits"],
        itinerary: ["Day 1: Arrival, Beach Time", "Day 2: Surfing", "Day 3: Volcano Trek", "Day 4: Cultural Tour", "Day 5-7: Relaxation, Departure"],
        isEcoCertified: false,
        hasEthicalTours: true,
        supportsLocalBusinesses: true,
        destinationRegion: 'asia'
    },
    {
        id: 2,
        title: "Paris Romantic Getaway",
        destination: "Paris, France",
        theme: "romantic",
        budget: "luxury",
        duration: "5 Days",
        price: 2500,
        description: "Experience Parisian romance.",
        image: "paris.jpg",
        amenities: ["Eiffel Tower Views", "Seine River Cruise", "Gourmet Dining"],
        itinerary: ["Day 1: Arrival, City Stroll", "Day 2: Eiffel Tower, Louvre", "Day 3: Seine Cruise, Romantic Dinner", "Day 4-5: Shopping, Departure"],
        isEcoCertified: false,
        hasEthicalTours: false,
        supportsLocalBusinesses: false,
        destinationRegion: 'europe'
    },
    {
        id: 3,
        title: "Kyoto Cultural Tour",
        destination: "Kyoto, Japan",
        theme: "cultural",
        budget: "moderate",
        duration: "6 Days",
        price: 1800,
        description: "Discover Kyoto's ancient culture.",
        image: "kyoto.jpg",
        discount: 0.15,
        couponCode: "KYOTOCULTURE15",
        amenities: ["Temple Visits", "Zen Gardens", "Tea Ceremony"],
        itinerary: ["Day 1: Arrival, Gion District", "Day 2: Golden Pavilion, Ryoan-ji", "Day 3: Fushimi Inari, Tea Ceremony", "Day 4-6:  Exploring, Departure"],
        isEcoCertified: true,
        hasEthicalTours: true,
        supportsLocalBusinesses: true,
        destinationRegion: 'asia'
    },
    {
        id: 4,
        title: "Family Fun in Orlando",
        destination: "Orlando, USA",
        theme: "family",
        budget: "moderate",
        duration: "7 Days",
        price: 2000,
        description: "Orlando for family fun.",
        image: "orlando.jpg",
        amenities: ["Theme Park Tickets", "Kid-Friendly Activities", "Resort Stay"],
        itinerary: ["Day 1-3: Theme Parks", "Day 4: Water Park", "Day 5:  Relaxation Day", "Day 6-7: Shopping, Departure"],
        isEcoCertified: false,
        hasEthicalTours: false,
        supportsLocalBusinesses: false,
        destinationRegion: 'usa'
    },
    {
        id: 5,
        title: "Thailand Beach Relaxation",
        destination: "Phuket, Thailand",
        theme: "relaxation",
        budget: "budget",
        duration: "7 Days",
        price: 1200,
        description: "Relax on Thailand's beaches.",
        image: "phuket.jpg",
        discount: 0.20,
        couponCode: "THAIBEACH20",
        amenities: ["Beachfront Resort", "Thai Massage", "Island Hopping"],
        itinerary: ["Day 1: Arrival, Beach Relaxation", "Day 2: Thai Massage", "Day 3: Island Tour", "Day 4-7: Beach Time, Departure"],
        isEcoCertified: true,
        hasEthicalTours: false,
        supportsLocalBusinesses: true,
        destinationRegion: 'asia'
    },
    {
        id: 6,
        title: "Andes Mountains Trek",
        destination: "Peru",
        theme: "adventure",
        budget: "budget",
        duration: "10 Days",
        price: 900,
        description: "Trek the Andes Mountains.",
        image: "andes.jpg",
        amenities: ["Machu Picchu Visit", "Inca Trail Trek", "Cultural Immersion"],
        itinerary: ["Day 1-3: Cusco, Acclimatization", "Day 4-7: Inca Trail Trek", "Day 8: Machu Picchu", "Day 9-10: Return, Departure"],
        isEcoCertified: false,
        hasEthicalTours: true,
        supportsLocalBusinesses: true,
        destinationRegion: 'south-america'
    },
    {
        id: 7,
        title: "Italian Culinary Journey",
        destination: "Tuscany, Italy",
        theme: "cultural",
        budget: "luxury",
        duration: "7 Days",
        price: 3000,
        description: "Italian food and wine tour.",
        image: "tuscany.jpg",
        discount: 0.05,
        couponCode: "TUSCANYFOOD5",
        amenities: ["Wine Tasting", "Cooking Classes", "Vineyard Tours"],
        itinerary: ["Day 1: Arrival, Florence", "Day 2: Cooking Class", "Day 3: Vineyard Tour", "Day 4-7: Tuscany Exploration, Departure"],
        isEcoCertified: false,
        hasEthicalTours: false,
        supportsLocalBusinesses: false,
        destinationRegion: 'europe'
    },
    {
        id: 8,
        title: "Maldives Overwater Bungalow Retreat",
        destination: "Maldives",
        theme: "romantic",
        budget: "luxury",
        duration: "7 Days",
        price: 4000,
        description: "Luxury Maldives retreat.",
        image: "maldives.jpg",
        amenities: ["Overwater Bungalow", "Snorkeling", "Ocean Views"],
        itinerary: ["Day 1: Arrival, Overwater Bungalow", "Day 2-6: Relaxation, Snorkeling", "Day 7: Departure"],
        isEcoCertified: true,
        hasEthicalTours: false,
        supportsLocalBusinesses: false,
        destinationRegion: 'asia'
    },
    {
        id: 9,
        title: "Canadian Rockies Adventure",
        destination: "Banff, Canada",
        theme: "adventure",
        budget: "moderate",
        duration: "8 Days",
        price: 1900,
        description: "Explore the Canadian Rockies.",
        image: "banff.jpg",
        amenities: ["Hiking", "Lake Louise Visit", "Wildlife Viewing"],
        itinerary: ["Day 1: Arrival, Banff Town", "Day 2-4: Hiking Trails", "Day 5: Lake Louise", "Day 6-8: Wildlife, Departure"],
        isEcoCertified: false,
        hasEthicalTours: true,
        supportsLocalBusinesses: false,
        destinationRegion: 'canada'
    },
    {
        id: 10,
        title: "Greek Island Hopping",
        destination: "Santorini & Mykonos, Greece",
        theme: "romantic",
        budget: "luxury",
        duration: "7 Days",
        price: 3500,
        description: "Island hopping in Greece.",
        image: "greece.jpg",
        amenities: ["Santorini Sunset Views", "Mykonos Beaches", "Luxury Hotels"],
        itinerary: ["Day 1: Arrival, Santorini", "Day 2-3: Santorini Exploration", "Day 4: Ferry to Mykonos", "Day 5-7: Mykonos Beaches, Departure"],
        isEcoCertified: false,
        hasEthicalTours: false,
        supportsLocalBusinesses: false,
        destinationRegion: 'europe'
    },
    {
        id: 11,
        title: "Egyptian History Tour",
        destination: "Cairo, Egypt",
        theme: "cultural",
        budget: "budget",
        duration: "9 Days",
        price: 1100,
        description: "Explore ancient Egyptian history.",
        image: "egypt.jpg",
        amenities: ["Pyramids of Giza", "Nile River Cruise", "Valley of the Kings"],
        itinerary: ["Day 1: Arrival, Cairo", "Day 2-3: Pyramids & Sphinx", "Day 4-6: Nile Cruise", "Day 7-9: Luxor, Departure"],
        isEcoCertified: false,
        hasEthicalTours: true,
        supportsLocalBusinesses: true,
        destinationRegion: 'africa'
    },
    {
        id: 12,
        title: "Brazilian Carnival & Beaches",
        destination: "Rio de Janeiro, Brazil",
        theme: "adventure",
        budget: "moderate",
        duration: "7 Days",
        price: 1600,
        description: "Experience Rio's carnival and beaches.",
        image: "rio.jpg",
        amenities: ["Carnival Parade", "Copacabana Beach", "Sugarloaf Mountain"],
        itinerary: ["Day 1: Arrival, Rio", "Day 2-3: Carnival Events", "Day 4-5: Beach Relaxation", "Day 6-7: City Exploration, Departure"],
        isEcoCertified: false,
        hasEthicalTours: false,
        supportsLocalBusinesses: false,
        destinationRegion: 'south-america'
    },
    {
        id: 13,
        title: "Scottish Highlands Escape",
        destination: "Scottish Highlands, UK",
        theme: "relaxation",
        budget: "budget",
        duration: "6 Days",
        price: 850,
        description: "Escape to the serene Scottish Highlands.",
        image: "scotland.jpg",
        amenities: ["Loch Ness", "Whisky Distilleries", "Hiking"],
        itinerary: ["Day 1: Arrival, Inverness", "Day 2-3: Loch Ness & Urquhart Castle", "Day 4-5: Hiking & Nature Walks", "Day 6: Departure"],
        isEcoCertified: true,
        hasEthicalTours: false,
        supportsLocalBusinesses: true,
        destinationRegion: 'europe'
    },
    {
        id: 14,
        title: "Moroccan Desert Adventure",
        destination: "Marrakech, Morocco",
        theme: "adventure",
        budget: "moderate",
        duration: "8 Days",
        price: 1400,
        description: "Desert adventure in Morocco.",
        image: "morocco.jpg",
        amenities: ["Sahara Desert Trek", "Marrakech Souks", "Camel Riding"],
        itinerary: ["Day 1: Arrival, Marrakech", "Day 2-4: Desert Safari", "Day 5-7: Marrakech Exploration", "Day 8: Departure"],
        isEcoCertified: false,
        hasEthicalTours: true,
        supportsLocalBusinesses: true,
        destinationRegion: 'africa'
    },
    {
        id: 15,
        title: "Vietnamese Mekong Delta Cruise",
        destination: "Mekong Delta, Vietnam",
        theme: "cultural",
        budget: "budget",
        duration: "7 Days",
        price: 950,
        description: "Cruise through Vietnam's Mekong Delta.",
        image: "vietnam.jpg",
        amenities: ["Floating Markets", "Rice Paddy Tours", "Local Cuisine"],
        itinerary: ["Day 1: Arrival, Ho Chi Minh City", "Day 2-4: Mekong Delta Cruise", "Day 5-6:  Local Village Visits", "Day 7: Departure"],
        isEcoCertified: true,
        hasEthicalTours: true,
        supportsLocalBusinesses: true,
        destinationRegion: 'asia'
    }
];


let likedPackages = JSON.parse(localStorage.getItem('likedPackages') || '[]');

function getRecommendations() {
    const themePreference = document.getElementById('theme').value;
    const budgetPreference = document.getElementById('budget').value;
    const showDiscountsOnly = document.getElementById('discount').checked;
    const ecoCertifiedFilter = document.getElementById('eco-certified').checked;
    const ethicalToursFilter = document.getElementById('ethical-tours').checked;
    const localBusinessesFilter = document.getElementById('local-businesses').checked;


    const recommendationsListDiv = document.getElementById('recommendations-list');
    const relatedRecommendationsListDiv = document.getElementById('related-recommendations-list');
    const relatedSection = document.getElementById('related-recommendations-section');
    const aiRecommendationsSection = document.getElementById('ai-concierge-recommendations');


    recommendationsListDiv.innerHTML = '<p id="loading-message">Loading recommendations...</p>'; // Initial loading message
    relatedRecommendationsListDiv.innerHTML = '';
    relatedSection.style.display = 'none';
    aiRecommendationsSection.style.display = 'none'; // Hide AI section initially


    // Simulate loading delay (for better UX - remove in production if not needed)
    setTimeout(() => {
        recommendationsListDiv.innerHTML = ''; // Clear loading message after simulated delay

        let filteredPackages = travelPackages.filter(package => {
            let themeMatch = true;
            let budgetMatch = true;
            let discountMatch = true;
            let ecoMatch = true;
            let ethicalMatch = true;
            let localMatch = true;


            if (themePreference && themePreference !== "") {
                themeMatch = package.theme === themePreference;
            }
            if (budgetPreference && budgetPreference !== "") {
                budgetMatch = package.budget === budgetPreference.toLowerCase().replace("-friendly", "");
            }
            if (showDiscountsOnly) {
                discountMatch = package.discount > 0;
            }
            if (ecoCertifiedFilter) {
                ecoMatch = package.isEcoCertified === true;
            }
            if (ethicalToursFilter) {
                ethicalMatch = package.hasEthicalTours === true;
            }
            if (localBusinessesFilter) {
                localMatch = package.supportsLocalBusinesses === true;
            }


            return themeMatch && budgetMatch && discountMatch && ecoMatch && ethicalMatch && localMatch;
        });


        if (filteredPackages.length === 0) {
            filteredPackages = travelPackages.filter(package => { // Relax discount filter
                let themeMatch = true;
                let budgetMatch = true;
                let ecoMatch = true;
                let ethicalMatch = true;
                let localMatch = true;

                if (themePreference && themePreference !== "") {
                    themeMatch = package.theme === themePreference;
                }
                if (budgetPreference && budgetPreference !== "") {
                    budgetMatch = package.budget === budgetPreference.toLowerCase().replace("-friendly", "");
                }
                if (ecoCertifiedFilter) {
                    ecoMatch = package.isEcoCertified === true;
                }
                if (ethicalToursFilter) {
                    ethicalMatch = package.hasEthicalTours === true;
                }
                if (localBusinessesFilter) {
                    localMatch = package.supportsLocalBusinesses === true;
                }
                return themeMatch && budgetMatch && ecoMatch && ethicalMatch && localMatch;
            });
             if (filteredPackages.length === 0 && showDiscountsOnly) { // Relax discount and eco/ethical/local filters
                filteredPackages = travelPackages.filter(package => {
                    let themeMatch = true;
                    let budgetMatch = true;

                    if (themePreference && themePreference !== "") {
                        themeMatch = package.theme === themePreference;
                    }
                    if (budgetPreference && budgetPreference !== "") {
                        budgetMatch = package.budget === budgetPreference.toLowerCase().replace("-friendly", "");
                    }
                    return themeMatch && budgetMatch;
                });
                 if (filteredPackages.length === 0 && budgetPreference !== "") { // Relax budget filter if budget was initially selected
                     filteredPackages = travelPackages.filter(package => {
                        let themeMatch = true;
                        if (themePreference && themePreference !== "") {
                            themeMatch = package.theme === themePreference;
                        }
                        return themeMatch;
                    });
                    if (filteredPackages.length === 0 && themePreference !== "") { // Relax theme filter if theme was initially selected
                        filteredPackages = travelPackages; // Show all packages if no specific preferences yield results
                    }
                }
            }
             if (filteredPackages.length > 0 && showDiscountsOnly && !document.getElementById('discount-fallback-message')) { // Inform user about relaxed discount filter only once
                const messageParagraph = document.createElement('p');
                messageParagraph.id = 'discount-fallback-message';
                messageParagraph.textContent = "No discounted packages found with your exact preferences. Showing more options.";
                recommendationsListDiv.insertAdjacentElement('beforebegin', messageParagraph);
            } else if (filteredPackages.length === 0) {
                recommendationsListDiv.innerHTML = '<p id="no-recommendations">No packages found matching even broadened preferences. Please try again with different options or explore all packages.</p>';
                relatedSection.style.display = 'none'; // Hide related section if no main recommendations
                relatedRecommendationsListDiv.innerHTML = '';
                aiRecommendationsSection.style.display = 'none'; // Hide AI section if no main recommendations
                return; // Exit function if still no packages after full relaxation
            }
        }


        if (likedPackages.length > 0 && filteredPackages.length > 0) {
            const likedThemes = likedPackages.map(packageId => {
                const likedPackage = travelPackages.find(p => p.id === packageId);
                return likedPackage ? likedPackage.theme : null;
            }).filter(theme => theme != null);

            if (likedThemes.length > 0) {
                const themeCounts = {};
                likedThemes.forEach(theme => {
                    themeCounts[theme] = (themeCounts[theme] || 0) + 1;
                });
                const mostLikedTheme = Object.keys(themeCounts).reduce((a, b) => themeCounts[a] > themeCounts[b] ? a : b, null);

                if (mostLikedTheme) {
                    filteredPackages.sort((a, b) => {
                        if (a.theme === mostLikedTheme && b.theme !== mostLikedTheme) return -1;
                        if (a.theme !== mostLikedTheme && b.theme === mostLikedTheme) return 1;
                        if (a.discount > 0 && b.discount <= 0) return -1;
                        if (a.discount <= 0 && b.discount > 0) return 1;
                        return 0;
                    });
                } else {
                    filteredPackages.sort((a, b) => {
                        if (a.discount > 0 && b.discount <= 0) return -1;
                        if (a.discount <= 0 && b.discount > 0) return 1;
                        return 0;
                    });
                }
            } else if (filteredPackages.length > 0) {
                filteredPackages.sort((a, b) => {
                    if (a.discount > 0 && b.discount <= 0) return -1;
                    if (a.discount <= 0 && b.discount > 0) return 1;
                    return 0;
                });
            }
        }


        if (filteredPackages.length > 0) {
            recommendationsListDiv.innerHTML = ''; // Clear 'no recommendations' message if fallback yielded results
            const discountFallbackMessage = document.getElementById('discount-fallback-message');
            if (discountFallbackMessage) {
                recommendationsListDiv.insertAdjacentElement('beforebegin', discountFallbackMessage); // Keep fallback message if it was added
            }
            filteredPackages.forEach(package => {
                const packageDiv = createPackageElement(package);
                recommendationsListDiv.appendChild(packageDiv);
            });


            const relatedPackages = getRelatedPackages(filteredPackages, themePreference, budgetPreference);
            if (relatedPackages.length > 0) {
                relatedSection.style.display = 'block';
                relatedRecommendationsListDiv.innerHTML = ''; // Clear any previous related recommendations
                relatedPackages.forEach(package => {
                    const packageDiv = createPackageElement(package);
                    relatedRecommendationsListDiv.appendChild(packageDiv);
                });
            } else {
                relatedSection.style.display = 'none'; // Hide related section if no related packages after fallback
                relatedRecommendationsListDiv.innerHTML = '';
            }

             // AI Concierge Recommendations - after displaying regular and related recommendations
            const userPrefs = { // Simulate user preferences based on form input
                theme: themePreference,
                budget: budgetPreference.toLowerCase().replace("-friendly", "")
            };
            displayAIRecommendations(userPrefs);


            // Example - Load 360 Panorama and Map for the first recommended package
            if (filteredPackages.length > 0) {
                loadPanorama('images/bali-panorama.jpg'); // Example panorama for Bali (first package)
                initMap(25.2048, 55.2708, 'Dubai, UAE'); // Example map for Dubai
                displayCarbonOffsetSection(filteredPackages[0]); // Show carbon offset for the first package
            }


        } else {
            recommendationsListDiv.innerHTML = '<p id="no-recommendations">No packages found matching your preferences, even with broader search.</p>';
            relatedSection.style.display = 'none'; // Also hide related section if no main recommendations
            relatedRecommendationsListDiv.innerHTML = '';
            aiRecommendationsSection.style.display = 'none'; // Also hide AI section if no main recommendations
        }
    }, 500); // Simulated 0.5s loading delay
}

function getRelatedPackages(currentPackages, themePref, budgetPref) {
    const related = [];
    if (!themePref && !budgetPref) return related;

    const possibleRelated = travelPackages.filter(package => {
        if (currentPackages.some(currentPkg => currentPkg.id === package.id)) return false;

        let themeRelated = !themePref || package.theme === themePref;
        let budgetRelated = !budgetPref || package.budget === budgetPref.toLowerCase().replace("-friendly", "");

        return themeRelated && budgetRelated;
    });


    return possibleRelated.slice(0, Math.min(3, possibleRelated.length));
}


function createPackageElement(package) {
    const packageDiv = document.createElement('div');
    packageDiv.classList.add('recommendation-item');
    packageDiv.dataset.packageId = package.id;

    if (package.discount > 0) {
        const discountBadge = document.createElement('span');
        discountBadge.classList.add('discount-badge');
        discountBadge.textContent = `${(package.discount * 100).toFixed(0)}% Off`;
        packageDiv.appendChild(discountBadge);
    }

    const imageElement = document.createElement('img');
    imageElement.src = `images/${package.image}`;
    imageElement.alt = package.title;
    imageElement.classList.add('package-image');
    packageDiv.appendChild(imageElement);

    const titleElement = document.createElement('h3');
    titleElement.textContent = package.title;
    packageDiv.appendChild(titleElement);

    const destinationElement = document.createElement('p');
    destinationElement.textContent = `Destination: ${package.destination}`;
    packageDiv.appendChild(destinationElement);

    const themeElement = document.createElement('p');
    themeElement.textContent = `Theme: ${package.theme.charAt(0).toUpperCase() + package.theme.slice(1)}`;
    packageDiv.appendChild(themeElement);

    const budgetElement = document.createElement('p');
    budgetElement.textContent = `Budget: ${package.budget.charAt(0).toUpperCase() + package.budget.slice(1)}`;
    packageDiv.appendChild(budgetElement);

    const durationElement = document.createElement('p');
    durationElement.textContent = `Duration: ${package.duration}`;
    packageDiv.appendChild(durationElement);

    const priceContainer = document.createElement('p');
    if (package.discount > 0) {
        const originalPriceElement = document.createElement('span');
        originalPriceElement.classList.add('original-price');
        originalPriceElement.textContent = `Price: $${package.price.toFixed(2)}`;
        priceContainer.appendChild(originalPriceElement);

        const discountedPriceElement = document.createElement('span');
        discountedPriceElement.classList.add('discounted-price');
        const discountedPrice = package.price * (1 - package.discount);
        discountedPriceElement.textContent = `Now: $${discountedPrice.toFixed(2)}`;
        priceContainer.appendChild(discountedPriceElement);
    } else {
        priceContainer.textContent = `Price: $${package.price.toFixed(2)}`;
    }
    packageDiv.appendChild(priceContainer);


    if (package.couponCode) {
        const couponCodeElement = document.createElement('p');
        couponCodeElement.innerHTML = `Coupon: <span class="coupon-code">${package.couponCode}</span>`;
        packageDiv.appendChild(couponCodeElement);
    }

    const detailsButton = document.createElement('button');
    detailsButton.classList.add('view-details-button');
    detailsButton.innerHTML = '<i class="fas fa-info-circle"></i> View Details';
    detailsButton.addEventListener('click', () => toggleDetails(packageDiv));
    packageDiv.appendChild(detailsButton);

    const detailsDiv = createDetailsElement(package);
    packageDiv.appendChild(detailsDiv);


    const likeButton = document.createElement('button');
    likeButton.classList.add('like-button');
    likeButton.innerHTML = isPackageLiked(package.id) ? '<i class="fas fa-heart"></i> Liked' : '<i class="far fa-heart"></i> Like';
    likeButton.addEventListener('click', () => toggleLike(package.id, likeButton));
    packageDiv.appendChild(likeButton);

    return packageDiv;
}

function createDetailsElement(package) {
    const detailsDiv = document.createElement('div');
    detailsDiv.classList.add('package-details');

    const amenitiesHeader = document.createElement('h4');
    amenitiesHeader.textContent = "Amenities";
    detailsDiv.appendChild(amenitiesHeader);

    const amenitiesList = document.createElement('ul');
    package.amenities.forEach(amenity => {
        const li = document.createElement('li');
        li.textContent = amenity;
        amenitiesList.appendChild(li);
    });
    detailsDiv.appendChild(amenitiesList);


    const itineraryHeader = document.createElement('h4');
    itineraryHeader.textContent = "Itinerary Highlights";
    detailsDiv.appendChild(itineraryHeader);

    const itineraryList = document.createElement('ul');
    package.itinerary.forEach(day => {
        const li = document.createElement('li');
        li.textContent = day;
        itineraryList.appendChild(li);
    });
    detailsDiv.appendChild(itineraryList);


    return detailsDiv;
}


function toggleDetails(packageDiv) {
    const details = packageDiv.querySelector('.package-details');
    details.classList.toggle('expanded');
    const button = packageDiv.querySelector('.view-details-button');
    if (details.classList.contains('expanded')) {
        button.innerHTML = '<i class="fas fa-chevron-up"></i> Hide Details';
    } else {
        button.innerHTML = '<i class="fas fa-info-circle"></i> View Details';
    }
}


function toggleLike(packageId, likeButton) {
    const isLiked = isPackageLiked(packageId);
    if (isLiked) {
        likedPackages = likedPackages.filter(id => id !== packageId);
        likeButton.innerHTML = '<i class="far fa-heart"></i> Like';
        likeButton.classList.remove('liked');
    } else {
        likedPackages.push(packageId);
        likeButton.innerHTML = '<i class="fas fa-heart"></i> Liked';
        likeButton.classList.add('liked');
    }
    localStorage.setItem('likedPackages', JSON.stringify(likedPackages));
}

function isPackageLiked(packageId) {
    return likedPackages.includes(packageId);
}


function loadPanorama(imageUrl) {
    pannellum.viewer('panorama-viewer', {
        "type": "equirectangular",
        "panorama": imageUrl, // Path to your 360 image
        "autoLoad": true,
        "compass": false,
        "controls": { "mouseViewMode": "drag" }
    });
}


function initMap(latitude, longitude, destinationName) {
    var map = L.map('destination-map').setView([latitude, longitude], 13); // Set view to destination coordinates and zoom level 13

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    L.marker([latitude, longitude]).addTo(map)
        .bindPopup(`<b>${destinationName}</b>`).openPopup(); // Add a marker with destination name popup
}


const travelStories = [
    {
        title: "My Incredible Bali Adventure",
        author: "Sarah J.",
        image: "bali-story.jpg", // Replace with story-specific images
        excerpt: "Bali was a dream come true! From the stunning beaches of Seminyak to the lush rice paddies of Ubud, every moment was magical...",
        link: "#story1" // Link to full story page (you'd need to create these pages)
    },
    {
        title: "A Romantic Escape to Paris",
        author: "David L.",
        image: "paris-story.jpg",
        excerpt: "Paris in the spring... is there anything more romantic?  Exploring the Louvre, strolling along the Seine, and enjoying delicious pastries made for an unforgettable trip...",
        link: "#story2"
    },
    {
        title: "Kyoto: A Journey Through Ancient Japan",
        author: "Emily K.",
        image: "kyoto-story.jpg",
        excerpt: "Kyoto captivated me with its serene temples, beautiful gardens, and rich cultural heritage. The tea ceremonies and traditional markets were highlights...",
        link: "#story3"
    }
    // Add more story objects here
];

function displayTravelStories() {
    const storiesGrid = document.getElementById('travel-stories-grid');
    travelStories.forEach(story => {
        const storyCard = document.createElement('div');
        storyCard.classList.add('travel-story-card');

        storyCard.innerHTML = `
            <div class="story-image-container">
                <img src="images/${story.image}" alt="${story.title}" class="story-image">
            </div>
            <div class="story-content">
                <h3 class="story-title">${story.title}</h3>
                <p class="story-author">By ${story.author}</p>
                <p class="story-excerpt">${story.excerpt}</p>
                <a href="${story.link}" class="read-more-link">Read More <i class="fas fa-arrow-right"></i></a>
            </div>
        `;
        storiesGrid.appendChild(storyCard);
    });
}


function calculateCarbonFootprint(package) {
    // **Simplified example - In reality, this would involve complex calculations or API calls**
    let baseFootprint = 500; // Base kg CO2
    if (package.destinationRegion === 'long-haul') { // Example region-based factor
        baseFootprint += 300;
    }
    if (package.budget === 'luxury') { // Example budget-based factor
        baseFootprint += 100;
    }
    return baseFootprint;
}

function displayCarbonOffsetSection(package) {
    const carbonSection = document.getElementById('carbon-offset-section');
    const footprintValueSpan = document.getElementById('footprint-value');
    const offsetButton = document.getElementById('offset-button');

    const footprint = calculateCarbonFootprint(package); // Calculate footprint for the selected package
    footprintValueSpan.textContent = `${footprint} kg CO2`;
    carbonSection.style.display = 'block'; // Show the carbon offset section

    offsetButton.onclick = function() {
        alert("Redirect to carbon offsetting payment/information page (Not implemented in this example)");
        // In a real implementation, redirect to a carbon offsetting service or page
    };
}


function getAIRecommendations(userPreferences) {
    // **Simplified AI logic - In reality, this would involve complex AI algorithms and potentially backend calls**
    let aiFilteredPackages = travelPackages.filter(package => {
        let preferenceMatchScore = 0;

        if (userPreferences.theme && package.theme === userPreferences.theme) {
            preferenceMatchScore += 2; // Theme match is important
        }
        if (userPreferences.budget && package.budget === userPreferences.budget) {
            preferenceMatchScore += 1; // Budget match is also considered
        }
        // ... more sophisticated preference matching logic could be added here ...

        return preferenceMatchScore >= 2; // Example: Require a score of 2 or more for recommendation
    });

    // Sort AI recommendations (e.g., by match score, discount, etc.)
    aiFilteredPackages.sort((a, b) => b.discount - a.discount); // Example sorting by discount

    return aiFilteredPackages.slice(0, 3); // Limit to top 3 AI recommendations
}

function displayAIRecommendations(userPreferences) {
    const aiRecommendationsListDiv = document.getElementById('ai-recommendations-list');
    const aiRecommendationsSection = document.getElementById('ai-concierge-recommendations');
    aiRecommendationsListDiv.innerHTML = ''; // Clear previous AI recommendations

    const aiPackages = getAIRecommendations(userPreferences);

    if (aiPackages.length > 0) {
        aiRecommendationsSection.style.display = 'block'; // Show AI recommendations section
        aiPackages.forEach(package => {
            const packageDiv = createPackageElement(package); // Reuse the same package element creation
            aiRecommendationsListDiv.appendChild(packageDiv);
        });
    } else {
        aiRecommendationsSection.style.display = 'none'; // Hide if no AI recommendations
    }
}


// Initial call to get recommendations (optional - you can trigger it on button click only)
// getRecommendations();
displayTravelStories(); // Display travel stories on page load