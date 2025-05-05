document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // Chat widget
    const chatButton = document.getElementById('chat-button');
    const chatWidget = document.getElementById('chat-widget');
    const closeChat = document.getElementById('close-chat');
    const chatInput = document.getElementById('chat-input');
    const sendMessage = document.getElementById('send-message');
    const chatMessages = document.getElementById('chat-messages');

    if (chatButton && chatWidget && closeChat) {
        chatButton.addEventListener('click', function() {
            chatWidget.classList.toggle('hidden');
        });

        closeChat.addEventListener('click', function() {
            chatWidget.classList.add('hidden');
        });
    }

    if (sendMessage && chatInput && chatMessages) {
        sendMessage.addEventListener('click', sendChatMessage);
        chatInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendChatMessage();
            }
        });
    }

    function sendChatMessage() {
        const message = chatInput.value.trim();
        if (message) {
            // Add user message
            const userMessageHTML = `
                <div class="flex justify-end mb-4">
                    <div class="bg-orange-500 text-white rounded-lg p-3 max-w-[80%]">
                        <p class="text-sm">${message}</p>
                    </div>
                </div>
            `;
            chatMessages.innerHTML += userMessageHTML;
            
            // Clear input
            chatInput.value = '';
            
            // Scroll to bottom
            chatMessages.scrollTop = chatMessages.scrollHeight;
            
            // Simulate agent response after 1 second
            setTimeout(function() {
                const agentMessageHTML = `
                    <div class="flex mb-4">
                        <div class="bg-gray-100 rounded-lg p-3 max-w-[80%]">
                            <p class="text-sm">Terima kasih atas pesan Anda. Tim kami akan segera menghubungi Anda.</p>
                        </div>
                    </div>
                `;
                chatMessages.innerHTML += agentMessageHTML;
                chatMessages.scrollTop = chatMessages.scrollHeight;
            }, 1000);
        }
    }

    // Accessibility controls
    const accessibilityButton = document.getElementById('accessibility-button');
    const accessibilityMenu = document.getElementById('accessibility-menu');
    const darkModeBtn = document.getElementById('dark-mode-btn');
    const highContrastBtn = document.getElementById('high-contrast-btn');
    const textSizeBtns = document.querySelectorAll('.text-size-btn');

    if (accessibilityButton && accessibilityMenu) {
        accessibilityButton.addEventListener('click', function() {
            accessibilityMenu.classList.toggle('hidden');
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!accessibilityButton.contains(e.target) && !accessibilityMenu.contains(e.target)) {
                accessibilityMenu.classList.add('hidden');
            }
        });
    }

    if (darkModeBtn) {
        darkModeBtn.addEventListener('click', function() {
            document.body.classList.toggle('dark-mode');
            if (document.body.classList.contains('dark-mode')) {
                darkModeBtn.textContent = 'Mode Terang';
            } else {
                darkModeBtn.textContent = 'Mode Gelap';
            }
        });
    }

    if (highContrastBtn) {
        highContrastBtn.addEventListener('click', function() {
            document.body.classList.toggle('high-contrast');
            if (document.body.classList.contains('high-contrast')) {
                highContrastBtn.textContent = 'Nonaktifkan Kontras Tinggi';
            } else {
                highContrastBtn.textContent = 'Aktifkan Kontras Tinggi';
            }
        });
    }

    if (textSizeBtns) {
        textSizeBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const size = this.getAttribute('data-size');
                document.body.classList.remove('text-size-small', 'text-size-medium', 'text-size-large');
                document.body.classList.add(`text-size-${size}`);
            });
        });
    }

    // Add to cart functionality
    const addToCartBtns = document.querySelectorAll('.add-to-cart-btn');
    
    if (addToCartBtns) {
        addToCartBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const productId = this.getAttribute('data-id');
                addToCart(productId);
            });
        });
    }

    function addToCart(productId) {
        // Get current cart from localStorage or initialize empty array
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        
        // Check if product already in cart
        const existingProduct = cart.find(item => item.id === productId);
        
        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            // In a real app, you would fetch product details from an API
            // For demo purposes, we'll use hardcoded data
            const productData = {
                id: productId,
                name: getProductName(productId),
                price: getProductPrice(productId),
                image: `https://via.placeholder.com/100`,
                quantity: 1
            };
            cart.push(productData);
        }
        
        // Save updated cart to localStorage
        localStorage.setItem('cart', JSON.stringify(cart));
        
        // Show notification
        showNotification(`Produk ditambahkan ke keranjang!`);
    }

    function getProductName(id) {
        const products = {
            '1': 'Kue Lapis Legit',
            '2': 'Rendang Sapi',
            '3': 'Nasi Tumpeng Mini',
            '4': 'Kue Nastar'
        };
        return products[id] || 'Produk';
    }

    function getProductPrice(id) {
        const prices = {
            '1': 250000,
            '2': 180000,
            '3': 350000,
            '4': 120000
        };
        return prices[id] || 100000;
    }

    function showNotification(message) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-md shadow-lg z-50 transition-opacity duration-300';
        notification.textContent = message;
        
        // Add to DOM
        document.body.appendChild(notification);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.opacity = '0';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    // Wishlist functionality
    const wishlistBtns = document.querySelectorAll('.wishlist-btn');
    
    if (wishlistBtns) {
        wishlistBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const productId = this.getAttribute('data-id');
                toggleWishlist(productId, this);
            });
        });
    }

    function toggleWishlist(productId, button) {
        // Get current wishlist from localStorage or initialize empty array
        let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
        
        // Check if product already in wishlist
        const index = wishlist.indexOf(productId);
        
        if (index > -1) {
            // Remove from wishlist
            wishlist.splice(index, 1);
            button.innerHTML = '<i class="far fa-heart"></i>';
            showNotification('Produk dihapus dari wishlist');
        } else {
            // Add to wishlist
            wishlist.push(productId);
            button.innerHTML = '<i class="fas fa-heart text-red-500"></i>';
            showNotification('Produk ditambahkan ke wishlist');
        }
        
        // Save updated wishlist to localStorage
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
    }

    // Initialize wishlist buttons state
    function initWishlistButtons() {
        const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
        
        wishlistBtns.forEach(btn => {
            const productId = btn.getAttribute('data-id');
            if (wishlist.includes(productId)) {
                btn.innerHTML = '<i class="fas fa-heart text-red-500"></i>';
            }
        });
    }

    initWishlistButtons();

    // AR Preview functionality (simplified for demo)
    const arButtons = document.querySelectorAll('.ar-preview-btn');
    
    if (arButtons) {
        arButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                const productId = this.getAttribute('data-id');
                showARPreview(productId);
            });
        });
    }

    function showARPreview(productId) {
        // Create AR preview container
        const arContainer = document.createElement('div');
        arContainer.className = 'ar-preview-container';
        
        arContainer.innerHTML = `
            <div class="ar-preview-content">
                <video id="ar-camera-feed" autoplay playsinline style="width: 100%; height: 100%; object-fit: cover;"></video>
                <img src="https://via.placeholder.com/300" alt="Product Preview" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); max-width: 50%; max-height: 50%;">
            </div>
            <div class="ar-preview-controls">
                <button id="ar-capture-btn">Ambil Gambar</button>
                <button id="ar-close-btn">Tutup</button>
            </div>
        `;
        
        // Add to DOM
        document.body.appendChild(arContainer);
        
        // Get camera feed (if supported)
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
                .then(function(stream) {
                    const video = document.getElementById('ar-camera-feed');
                    video.srcObject = stream;
                })
                .catch(function(error) {
                    console.error('Camera error:', error);
                    showNotification('Tidak dapat mengakses kamera. Pastikan Anda memberikan izin.');
                });
        }
        
        // Close button
        document.getElementById('ar-close-btn').addEventListener('click', function() {
            // Stop camera stream
            const video = document.getElementById('ar-camera-feed');
            if (video.srcObject) {
                const tracks = video.srcObject.getTracks();
                tracks.forEach(track => track.stop());
            }
            
            // Remove container
            document.body.removeChild(arContainer);
        });
        
        // Capture button
        document.getElementById('ar-capture-btn').addEventListener('click', function() {
            showNotification('Gambar disimpan!');
        });
    }
});
