document.addEventListener("DOMContentLoaded", () => {
            gsap.registerPlugin(ScrollTrigger);

            /* --- Loader --- */
            setTimeout(() => {
                const loader = document.getElementById('loader');
                loader.style.opacity = '0';
                setTimeout(() => loader.style.display = 'none', 800);
                
                // Trigger Hero Animations
                gsap.to('.hero-title', { opacity: 1, y: 0, duration: 1, delay: 0.5, ease: "power3.out" });
                gsap.to('.hero-subtitle', { opacity: 1, y: 0, duration: 1, delay: 0.7, ease: "power3.out" });
                gsap.to('.hero-btns', { opacity: 1, y: 0, duration: 1, delay: 0.9, ease: "power3.out" });
            }, 1500);

            /* --- Theme Toggle --- */
            const themeBtn = document.getElementById('themeBtn');
            const htmlEl = document.documentElement;
            const icon = themeBtn.querySelector('i');
            
            const savedTheme = localStorage.getItem('theme') || 'dark';
            htmlEl.setAttribute('data-theme', savedTheme);
            updateThemeIcon(savedTheme);

            themeBtn.addEventListener('click', () => {
                const currentTheme = htmlEl.getAttribute('data-theme');
                const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
                htmlEl.setAttribute('data-theme', newTheme);
                localStorage.setItem('theme', newTheme);
                updateThemeIcon(newTheme);
            });

            function updateThemeIcon(theme) {
                if (theme === 'dark') {
                    icon.className = 'fa-solid fa-moon';
                } else {
                    icon.className = 'fa-solid fa-sun';
                }
            }

            /* --- Navbar Scroll & Mobile Menu --- */
            const nav = document.querySelector('nav');
            window.addEventListener('scroll', () => {
                if (window.scrollY > 50) {
                    nav.style.padding = '10px 5%';
                    nav.style.boxShadow = '0 5px 20px rgba(0,0,0,0.5)';
                } else {
                    nav.style.padding = '20px 5%';
                    nav.style.boxShadow = 'none';
                }
                updateActiveLink();
            });

            const mobileMenuBtn = document.getElementById('mobileMenuBtn');
            const navLinks = document.querySelector('.nav-links');
            mobileMenuBtn.addEventListener('click', () => {
                navLinks.classList.toggle('active');
            });

            const sections = document.querySelectorAll('section');
            const navItems = document.querySelectorAll('.nav-links a');
            
            function updateActiveLink() {
                let current = '';
                sections.forEach(section => {
                    const sectionTop = section.offsetTop;
                    if (scrollY >= sectionTop - 150) {
                        current = section.getAttribute('id');
                    }
                });
                navItems.forEach(li => {
                    li.classList.remove('active');
                    if (li.getAttribute('href') === `#${current}`) {
                        li.classList.add('active');
                    }
                });
            }

            /* --- Data Sets --- */
            const menuData = [
                { id: 1, title: 'Paneer Tikka', category: 'starter', price: '₹350', img: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc0?auto=format&fit=crop&w=600&q=80', desc: 'Cottage cheese marinated in yogurt and Indian spices, roasted in tandoor.' },
                { id: 2, title: 'Veg Samosa', category: 'starter', price: '₹150', img: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=80', desc: 'Crispy pastry filled with spiced potatoes and peas. Served with mint chutney.' },
                { id: 3, title: 'Dal Makhani', category: 'main', price: '₹400', img: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=600&q=80', desc: 'Slow-cooked black lentils simmered overnight with tomatoes, butter, and cream.' },
                { id: 4, title: 'Veg Biryani', category: 'main', price: '₹450', img: 'https://images.unsplash.com/photo-1633940597669-7c387e076634?auto=format&fit=crop&w=600&q=80', desc: 'Aromatic basmati rice cooked with mixed vegetables, saffron, and exotic spices.' },
                { id: 5, title: 'Garlic Naan', category: 'bread', price: '₹120', img: 'https://images.unsplash.com/photo-1626074353765-517a681e40be?auto=format&fit=crop&w=600&q=80', desc: 'Soft and flaky flatbread topped with minced garlic and butter.' },
                { id: 6, title: 'Gulab Jamun', category: 'dessert', price: '₹180', img: 'https://images.unsplash.com/photo-1593701463371-55db211b6d0c?auto=format&fit=crop&w=600&q=80', desc: 'Deep-fried milk dumplings soaked in cardamom flavored sugar syrup.' }
            ];

            const galleryImages = [
                'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=600&q=80',
                'https://images.unsplash.com/photo-1631452180519-c014fe946bc0?auto=format&fit=crop&w=600&q=80',
                'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=600&q=80',
                'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=80',
                'https://images.unsplash.com/photo-1633940597669-7c387e076634?auto=format&fit=crop&w=600&q=80',
                'https://images.unsplash.com/photo-1593701463371-55db211b6d0c?auto=format&fit=crop&w=600&q=80'
            ];

            const reviewsData = [
                { text: "The best Dal Makhani I've ever had! The ambiance is pure luxury and the service is impeccable.", author: "- Rahul M.", stars: 5 },
                { text: "Vrindavan takes vegetarian dining to a whole new level. Highly recommend the Biryani.", author: "- Priya S.", stars: 5 },
                { text: "A truly divine experience. The flavors are authentic and the presentation is beautiful.", author: "- Amit T.", stars: 4 },
                { text: "Excellent place for family dinners. The staff goes above and beyond.", author: "- Neha K.", stars: 5 }
            ];

            /* --- Menu Rendering & Logic --- */
            const menuGrid = document.getElementById('menuGrid');
            const filterBtns = document.querySelectorAll('.filter-btn');
            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            
            function updateCartUI() {
                document.getElementById('cartCount').innerText = cart.length;
                const checkoutItems = document.getElementById('checkoutItems');
                const placeOrderBtn = document.getElementById('placeOrderBtn');
                
                if (cart.length === 0) {
                    checkoutItems.innerHTML = 'Cart is empty. Add items from the menu.';
                    placeOrderBtn.disabled = true;
                } else {
                    const itemsText = cart.map(item => `${item.title} (${item.price})`).join(', ');
                    checkoutItems.innerHTML = `<strong>Items:</strong> ${itemsText}`;
                    placeOrderBtn.disabled = false;
                }
            }
            updateCartUI();

            function renderMenu(filter) {
                menuGrid.innerHTML = '';
                const filtered = filter === 'all' ? menuData : menuData.filter(i => i.category === filter);
                
                filtered.forEach(item => {
                    const card = document.createElement('div');
                    card.className = 'menu-card';
                    card.innerHTML = `
                        <div class="menu-card-front">
                            <img src="${item.img}" alt="${item.title}">
                            <div class="menu-card-info">
                                <h3 class="menu-card-title">${item.title}</h3>
                                <p class="menu-card-price">${item.price}</p>
                            </div>
                        </div>
                        <div class="menu-card-back">
                            <h3 class="menu-card-title" style="color:var(--accent-gold);">${item.title}</h3>
                            <p class="menu-card-desc">${item.desc}</p>
                            <button class="add-to-cart-btn" data-id="${item.id}">Add to Cart</button>
                        </div>
                    `;
                    menuGrid.appendChild(card);
                });

                document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
                    btn.addEventListener('click', (e) => {
                        const id = parseInt(e.target.getAttribute('data-id'));
                        const item = menuData.find(i => i.id === id);
                        cart.push(item);
                        localStorage.setItem('cart', JSON.stringify(cart));
                        updateCartUI();
                        
                        // Small animation
                        e.target.innerText = 'Added!';
                        e.target.style.background = 'green';
                        setTimeout(() => {
                            e.target.innerText = 'Add to Cart';
                            e.target.style.background = 'var(--accent-gold)';
                        }, 1000);
                    });
                });
            }

            renderMenu('all');

            filterBtns.forEach(btn => {
                btn.addEventListener('click', () => {
                    filterBtns.forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                    renderMenu(btn.getAttribute('data-filter'));
                });
            });

            /* --- Gallery Rendering & 3D Tilt --- */
            const galleryGrid = document.getElementById('galleryGrid');
            galleryImages.forEach(src => {
                const item = document.createElement('div');
                item.className = 'gallery-item';
                item.innerHTML = `
                    <img src="${src}" alt="Gallery">
                    <div class="gallery-overlay">
                        <i class="fa-solid fa-expand gallery-icon"></i>
                    </div>
                `;
                galleryGrid.appendChild(item);

                // 3D Tilt effect
                item.addEventListener('mousemove', (e) => {
                    const rect = item.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    const centerX = rect.width / 2;
                    const centerY = rect.height / 2;
                    const rotateX = ((y - centerY) / centerY) * -15;
                    const rotateY = ((x - centerX) / centerX) * 15;
                    
                    item.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
                });
                item.addEventListener('mouseleave', () => {
                    item.style.transform = `perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)`;
                });

                // Lightbox trigger
                item.addEventListener('click', () => {
                    document.getElementById('lbImg').src = src;
                    document.getElementById('lightbox').style.display = 'flex';
                });
            });

            document.getElementById('closeLb').addEventListener('click', () => {
                document.getElementById('lightbox').style.display = 'none';
            });

            /* --- Reviews 3D Carousel --- */
            const carousel = document.getElementById('reviewCarousel');
            reviewsData.forEach((rev, idx) => {
                const angle = (360 / reviewsData.length) * idx;
                const card = document.createElement('div');
                card.className = 'review-card';
                card.style.transform = `rotateY(${angle}deg) translateZ(350px)`;
                
                let starsHTML = '';
                for(let i=0; i<rev.stars; i++) starsHTML += '<i class="fa-solid fa-star"></i>';
                
                card.innerHTML = `
                    <div class="stars">${starsHTML}</div>
                    <p class="review-text">"${rev.text}"</p>
                    <p class="review-author">${rev.author}</p>
                `;
                carousel.appendChild(card);
            });

            let currAngle = 0;
            setInterval(() => {
                currAngle -= (360 / reviewsData.length);
                carousel.style.transform = `rotateY(${currAngle}deg)`;
            }, 4000);

            /* --- Form Validation & Submission --- */
            function validateForm(formId) {
                let isValid = true;
                const form = document.getElementById(formId);
                const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
                
                inputs.forEach(input => {
                    if (!input.value.trim() || !input.checkValidity()) {
                        input.parentElement.classList.add('error');
                        isValid = false;
                    } else {
                        input.parentElement.classList.remove('error');
                    }
                });
                return isValid;
            }

            const inputs = document.querySelectorAll('.form-control');
            inputs.forEach(input => {
                input.addEventListener('input', () => {
                    if(input.value.trim() && input.checkValidity()) {
                        input.parentElement.classList.remove('error');
                    }
                });
            });

            const popup = document.getElementById('successPopup');
            const popupMsg = document.getElementById('popupMessage');
            const popupId = document.getElementById('popupId');

            function showPopup(msg) {
                popupMsg.innerText = msg;
                popupId.innerText = 'VRN' + Math.floor(Math.random() * 1000000);
                popup.classList.add('show');
                fireConfetti();
            }

            document.getElementById('closeSuccessPopup').addEventListener('click', () => {
                popup.classList.remove('show');
                document.getElementById('popup-canvas-container').style.display = 'none';
            });

            // Booking submit
            document.getElementById('bookingForm').addEventListener('submit', (e) => {
                e.preventDefault();
                if (validateForm('bookingForm')) {
                    const data = {
                        name: document.getElementById('bookName').value,
                        date: document.getElementById('bookDate').value,
                        time: document.getElementById('bookTime').value,
                        guests: document.getElementById('bookGuests').value
                    };
                    const bookings = JSON.parse(localStorage.getItem('bookings')) || [];
                    bookings.push(data);
                    localStorage.setItem('bookings', JSON.stringify(bookings));
                    
                    showPopup(`Table reserved successfully for ${data.name} on ${data.date} at ${data.time}.`);
                    e.target.reset();
                }
            });

            // Delivery submit
            document.getElementById('deliveryForm').addEventListener('submit', (e) => {
                e.preventDefault();
                if (validateForm('deliveryForm') && cart.length > 0) {
                    showPopup(`Order placed successfully! Preparing your delicious meal.`);
                    e.target.reset();
                    cart = [];
                    localStorage.setItem('cart', JSON.stringify(cart));
                    updateCartUI();
                    
                    // Start Tracker
                    document.getElementById('deliveryTracker').style.display = 'block';
                    document.getElementById('trackId').innerText = popupId.innerText;
                    startDeliveryTracker();
                }
            });

            function startDeliveryTracker() {
                const progress = document.getElementById('trackProgress');
                const steps = [document.getElementById('step1'), document.getElementById('step2'), document.getElementById('step3'), document.getElementById('step4'), document.getElementById('step5')];
                
                let currentStep = 0;
                progress.style.width = '0%';
                steps.forEach(s => s.classList.remove('active'));
                steps[0].classList.add('active');

                const interval = setInterval(() => {
                    currentStep++;
                    if (currentStep >= steps.length) {
                        clearInterval(interval);
                        return;
                    }
                    progress.style.width = `${currentStep * 25}%`;
                    steps[currentStep].classList.add('active');
                }, 3000); // Fast simulation
            }

            // Newsletter submit
            document.getElementById('newsletterForm').addEventListener('submit', (e) => {
                e.preventDefault();
                const btn = e.target.querySelector('button');
                btn.innerText = 'Subscribed!';
                btn.style.background = 'green';
                setTimeout(() => {
                    btn.innerText = 'Subscribe';
                    btn.style.background = 'var(--accent-gold)';
                    e.target.reset();
                }, 2000);
            });

            /* --- Chatbot Logic --- */
            const chatBtn = document.getElementById('chatBtn');
            const chatWindow = document.getElementById('chatWindow');
            const closeChat = document.getElementById('closeChat');
            const chatInput = document.getElementById('chatInput');
            const sendChat = document.getElementById('sendChat');
            const chatBody = document.getElementById('chatBody');

            chatBtn.addEventListener('click', () => chatWindow.classList.add('open'));
            closeChat.addEventListener('click', () => chatWindow.classList.remove('open'));

            // Load session history
            const history = JSON.parse(sessionStorage.getItem('chatHistory')) || [];
            if(history.length > 0) {
                chatBody.innerHTML = '';
                history.forEach(h => addMessage(h.text, h.sender, false));
            }

            function addMessage(text, sender, save=true) {
                const div = document.createElement('div');
                div.className = `msg ${sender}`;
                div.innerText = text;
                chatBody.appendChild(div);
                chatBody.scrollTop = chatBody.scrollHeight;
                
                if(save) {
                    history.push({text, sender});
                    sessionStorage.setItem('chatHistory', JSON.stringify(history));
                }
            }

            function showTyping() {
                const div = document.createElement('div');
                div.className = `typing-indicator`;
                div.id = 'typing';
                div.innerHTML = `<div class="dot"></div><div class="dot"></div><div class="dot"></div>`;
                chatBody.appendChild(div);
                chatBody.scrollTop = chatBody.scrollHeight;
            }

            function removeTyping() {
                const el = document.getElementById('typing');
                if(el) el.remove();
            }

            function botReply(userMsg) {
                showTyping();
                const msg = userMsg.toLowerCase();
                let reply = "I'm sorry, I didn't understand that. You can ask about our menu, booking a table, or opening hours.";
                
                setTimeout(() => {
                    removeTyping();
                    if(msg.includes('book') || msg.includes('table')) {
                        reply = "You can book a table using the 'Book Table' section on our website. Would you like me to scroll there for you? (Type 'yes' to scroll)";
                        sessionStorage.setItem('botAction', 'scrollBooking');
                    } else if(msg.includes('menu') || msg.includes('food') || msg.includes('veg')) {
                        reply = "We serve 100% pure vegetarian Indian cuisine. Our specialties include Dal Makhani, Paneer Tikka, and Veg Biryani. Check out the Menu section!";
                    } else if(msg.includes('hour') || msg.includes('time') || msg.includes('open')) {
                        reply = "We are open Mon-Fri from 11:00 AM to 10:30 PM, and Sat-Sun from 11:00 AM to 11:30 PM.";
                    } else if(sessionStorage.getItem('botAction') === 'scrollBooking' && msg === 'yes') {
                        document.getElementById('booking').scrollIntoView({behavior: 'smooth'});
                        reply = "Taking you to the booking section!";
                        sessionStorage.removeItem('botAction');
                    }
                    addMessage(reply, 'bot');
                }, 1000);
            }

            sendChat.addEventListener('click', () => {
                const text = chatInput.value.trim();
                if(!text) return;
                addMessage(text, 'user');
                chatInput.value = '';
                botReply(text);
            });
            chatInput.addEventListener('keypress', (e) => {
                if(e.key === 'Enter') sendChat.click();
            });


            
            /* --- Simple Confetti Popup --- */
            function fireConfetti() {
                const container = document.getElementById("popup-canvas-container");
                container.style.display = "block";
                container.innerHTML = "";
                
                for(let i=0; i<50; i++) {
                    const conf = document.createElement("div");
                    conf.style.position = "absolute";
                    conf.style.width = "10px";
                    conf.style.height = "10px";
                    conf.style.backgroundColor = ["#d4af37", "#ff6b35", "#ffffff"][Math.floor(Math.random()*3)];
                    conf.style.left = Math.random() * 100 + "vw";
                    conf.style.top = "-10px";
                    conf.style.opacity = Math.random();
                    conf.style.transform = `rotate(${Math.random() * 360}deg)`;
                    container.appendChild(conf);
                    
                    gsap.to(conf, {
                        y: window.innerHeight + 100,
                        x: `+=${(Math.random() - 0.5) * 200}`,
                        rotation: `+=${Math.random() * 360}`,
                        duration: 2 + Math.random() * 2,
                        ease: "power1.inOut",
                        onComplete: () => conf.remove()
                    });
                }
            }
/* --- GSAP Scroll Animations --- */
            gsap.from("#about-canvas-container", {
                scrollTrigger: {
                    trigger: "#about",
                    start: "top 80%",
                },
                x: -100,
                opacity: 0,
                duration: 1.5,
                ease: "power3.out"
            });
            gsap.from(".about-text", {
                scrollTrigger: {
                    trigger: "#about",
                    start: "top 80%",
                },
                x: 100,
                opacity: 0,
                duration: 1.5,
                ease: "power3.out"
            });
            
            gsap.utils.toArray('.section-header').forEach(header => {
                gsap.from(header, {
                    scrollTrigger: {
                        trigger: header,
                        start: "top 85%"
                    },
                    y: 50,
                    opacity: 0,
                    duration: 1
                });
            });
        });