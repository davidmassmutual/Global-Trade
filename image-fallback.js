// Image Loading Fallback Script
// This script handles image loading issues and provides fallback styles

(function() {
    'use strict';

    // Image loading fallback for hero section
    function handleHeroImageFallback() {
        const hero = document.querySelector('.hero');
        if (!hero) return;

        // Create an image element to test loading
        const testImage = new Image();
        testImage.src = 'business-team-investment-trading-do-260nw-707850085.webp';
        
        testImage.onload = function() {
            console.log('Hero image loaded successfully');
            // Image loaded successfully, no fallback needed
        };
        
        testImage.onerror = function() {
            console.log('Hero image failed to load, applying fallback');
            // Image failed to load, apply fallback styles
            hero.classList.add('no-image');
        };

        // Also check if the background image is already loaded
        const computedStyle = window.getComputedStyle(hero);
        const backgroundImage = computedStyle.backgroundImage;
        
        if (backgroundImage === 'none' || backgroundImage === '') {
            hero.classList.add('no-image');
        }
    }

    // Image loading fallback for signup page
    function handleSignupImageFallback() {
        const signupContainer = document.querySelector('.signup-container');
        if (!signupContainer) return;

        const testImage = new Image();
        testImage.src = 'pexels-tima-miroshnichenko-7567426.jpg';
        
        testImage.onerror = function() {
            const signupImage = document.querySelector('.signup-image');
            if (signupImage) {
                signupImage.style.background = 'linear-gradient(135deg, #2563eb, #7c3aed)';
            }
        };
    }

    // Image loading fallback for login page
    function handleLoginImageFallback() {
        const loginContainer = document.querySelector('.login-container');
        if (!loginContainer) return;

        const testImage = new Image();
        testImage.src = 'pexels-tima-miroshnichenko-7567426.jpg';
        
        testImage.onerror = function() {
            // Apply fallback styles for login page
            loginContainer.style.background = 'linear-gradient(135deg, #1f2937 0%, #111827 100%)';
        };
    }

    // Initialize all image fallbacks
    function initImageFallbacks() {
        handleHeroImageFallback();
        handleSignupImageFallback();
        handleLoginImageFallback();
    }

    // Run on DOM content loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initImageFallbacks);
    } else {
        initImageFallbacks();
    }

    // Also run on window load to ensure all images have been processed
    window.addEventListener('load', initImageFallbacks);

    // Export for potential external use
    window.imageFallback = {
        handleHeroImageFallback,
        handleSignupImageFallback,
        handleLoginImageFallback,
        initImageFallbacks
    };

})();