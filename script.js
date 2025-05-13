// Countdown Timer
function startCountdown(date) {
    const countdownElement = document.getElementById('countdown');
    const targetDate = new Date(date);

    function updateCountdown() {
        const now = new Date();
        const timeDifference = targetDate - now;

        if (timeDifference <= 0) {
            countdownElement.innerHTML = 'Time is up!';
            clearInterval(interval);
            return;
        }

        const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

        countdownElement.innerHTML = `
            <span id="days">${String(days).padStart(2, '0')}</span><span class="colon">:</span>
            <span id="hours">${String(hours).padStart(2, '0')}</span><span class="colon">:</span>
            <span id="minutes">${String(minutes).padStart(2, '0')}</span><span class="colon">:</span>
            <span id="seconds">${String(seconds).padStart(2, '0')}</span>
        `;
    }

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
}

// Replace with your wedding date
startCountdown('2025-09-08T15:00:00');

// Function to toggle map visibility
function toggleMapVisibility(button, mapToShow, mapToHide) {
    if (window.innerWidth < 768) { // Mobile view
        const mobileUrl = button.getAttribute('data-mobile-url');
        if (mobileUrl) {
            window.location.href = mobileUrl;
        } else {
            console.error('Mobile URL not found for button:', button.id);
        }
    } else {
        if (mapToShow.style.display === 'none' || mapToShow.style.display === '') {
            mapToShow.style.display = 'block';
            mapToHide.style.display = 'none';
        } else {
            mapToShow.style.display = 'none';
        }
    }
}

// Optional: Function to hide all map items
function hideAllMaps() {
    const mapItems = document.querySelectorAll('.map-item');
    mapItems.forEach(item => {
        item.style.display = 'none';
    });
}

// Event listener for DOMContentLoaded
document.addEventListener('DOMContentLoaded', function() {
    const weddingVenueButton = document.getElementById('wedding-venue-button');
    const receptionVenueButton = document.getElementById('reception-venue-button');
    const weddingVenueMap = document.getElementById('wedding-venue');
    const receptionVenueMap = document.getElementById('reception-venue');

    weddingVenueButton.addEventListener('click', function() {
        toggleMapVisibility(weddingVenueButton, weddingVenueMap, receptionVenueMap);
    });

    receptionVenueButton.addEventListener('click', function() {
        toggleMapVisibility(receptionVenueButton, receptionVenueMap, weddingVenueMap);
    });

    // Handle window resize
    window.addEventListener("resize", function() {
        hideAllMaps();
    });

    // Initial hide all maps
    hideAllMaps();
});

//boarder radius wedding details hero icon
document.addEventListener('scroll', function() {
    var homeSection = document.getElementById('home');
    if (window.scrollY > 0) {
        homeSection.style.borderRadius = '0px 0px 50px 50px';
    } else {
        homeSection.style.borderRadius = '0px';
    }
});

// Entrance overlay ring icon click - fade out overlay & fade in content + navbar
(function () {
    const entranceOverlay = document.getElementById('entrance-overlay');
    const ringIcon = document.getElementById('ring-icon');
    const mainContent = document.querySelector('main');
    const navbar = document.getElementById('navbar');

    function openSite() {
     ringIcon.style.animationPlayState = 'paused';
     ringIcon.style.transform = 'scale(1.2)';
     setTimeout(() => ringIcon.style.transform = 'scale(1)', 300);

     entranceOverlay.style.transition = 'opacity s ease';
     entranceOverlay.style.opacity = 0;

     setTimeout(() => {
        entranceOverlay.style.display = 'none';
        mainContent.hidden = false;
        mainContent.removeAttribute('aria-hidden');
        mainContent.focus();
        navbar.hidden = false;
        navbar.style.top = '0';
        mainContent.querySelector('#home').classList.add('visible');
     }, 1000);
    }

    ringIcon.addEventListener('click', openSite);
    ringIcon.addEventListener('keydown', (e) => {
     if (e.key === 'Enter' || e.key === ' ') {
       e.preventDefault();
       openSite();
     }
    });

    document.addEventListener('DOMContentLoaded', () => {
       mainContent.hidden = true;
       mainContent.setAttribute('aria-hidden', 'true');
       navbar.hidden = true;
       navbar.style.top = '-70px';
     });
    })();

// Check if the overlay has been shown before
if (!localStorage.getItem('overlayShown')) {
    // Show the overlay
    document.getElementById('entrance-overlay').style.display = 'flex';
    // Add event listener to the SVG icon to hide the overlay on click
    document.getElementById('ring-icon').addEventListener('click', function() {
        // Hide the overlay
        document.getElementById('entrance-overlay').style.display = 'none';
        
        // Set the item in localStorage to indicate the overlay has been shown
        localStorage.setItem('overlayShown', 'true');
    });
} else {
    // If already shown, hide the overlay
    document.getElementById('entrance-overlay').style.display = 'none';
}
