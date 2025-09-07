window.addEventListener('load', function() {
            setTimeout(() => {
                document.getElementById('loading').style.opacity = '0';
                setTimeout(() => {
                    document.getElementById('loading').style.display = 'none';
                }, 500);
            }, 1500);
        });

        // Custom Cursor
        const cursor = document.getElementById('cursor');
        const cursorFollower = document.getElementById('cursor-follower');
        let mouseX = 0, mouseY = 0;
        let followerX = 0, followerY = 0;

        document.addEventListener('mousemove', function(e) {
            mouseX = e.clientX;
            mouseY = e.clientY;
            cursor.style.left = mouseX + 'px';
            cursor.style.top = mouseY + 'px';
        });

        function updateFollower() {
            followerX += (mouseX - followerX) * 0.1;
            followerY += (mouseY - followerY) * 0.1;
            cursorFollower.style.left = followerX + 'px';
            cursorFollower.style.top = followerY + 'px';
            requestAnimationFrame(updateFollower);
        }
        updateFollower();

        // Cursor hover effects
        document.addEventListener('mouseenter', function(e) {
            if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON' || e.target.classList.contains('btn')) {
                cursor.style.transform = 'scale(1.5)';
                cursorFollower.style.transform = 'scale(1.5)';
            }
        }, true);

        document.addEventListener('mouseleave', function(e) {
            if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON' || e.target.classList.contains('btn')) {
                cursor.style.transform = 'scale(1)';
                cursorFollower.style.transform = 'scale(1)';
            }
        }, true);

        // Mouse Trail Effect
        const mouseTrails = [];
        const maxTrails = 10;

        document.addEventListener('mousemove', function(e) {
            if (mouseTrails.length >= maxTrails) {
                document.body.removeChild(mouseTrails[0].element);
                mouseTrails.shift();
            }

            const trail = document.createElement('div');
            trail.className = 'mouse-trail';
            trail.style.left = e.clientX + 'px';
            trail.style.top = e.clientY + 'px';
            document.body.appendChild(trail);

            mouseTrails.push({ element: trail, time: Date.now() });

            setTimeout(() => {
                if (trail.parentNode) {
                    trail.style.opacity = '0';
                    setTimeout(() => {
                        if (trail.parentNode) {
                            document.body.removeChild(trail);
                        }
                    }, 300);
                }
            }, 100);
        });

        // Typing Animation
        const typingElement = document.getElementById('typing-text');
        const texts = ['Cybersecurity Enthusiast', 'Mobile Developer', 'Penetration Tester', 'Security Researcher', 'Full Stack Developer'];
        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function typeText() {
            const currentText = texts[textIndex];
            
            if (isDeleting) {
                typingElement.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
                
                if (charIndex === 0) {
                    isDeleting = false;
                    textIndex = (textIndex + 1) % texts.length;
                    setTimeout(typeText, 500);
                    return;
                }
            } else {
                typingElement.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
                
                if (charIndex === currentText.length) {
                    isDeleting = true;
                    setTimeout(typeText, 2000);
                    return;
                }
            }
            
            setTimeout(typeText, isDeleting ? 50 : 100);
        }
        typeText();

        // Navbar Scroll Effect
        window.addEventListener('scroll', function() {
            const navbar = document.getElementById('navbar');
            if (window.scrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });

        // Fade In Animation
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        document.querySelectorAll('.fade-in').forEach(el => {
            observer.observe(el);
        });

        // Smooth Scrolling
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Interactive Functions
        function createFireworks() {
            for (let i = 0; i < 15; i++) {
                setTimeout(() => {
                    const firework = document.createElement('div');
                    firework.style.cssText = `
                        position: fixed;
                        width: 4px;
                        height: 4px;
                        background: ${['#00ff88', '#00d4ff', '#ff0080'][Math.floor(Math.random() * 3)]};
                        border-radius: 50%;
                        pointer-events: none;
                        z-index: 9999;
                        left: ${mouseX}px;
                        top: ${mouseY}px;
                        animation: firework 1s ease-out forwards;
                    `;
                    
                    const angle = (Math.PI * 2 * i) / 15;
                    const distance = 100 + Math.random() * 100;
                    const endX = mouseX + Math.cos(angle) * distance;
                    const endY = mouseY + Math.sin(angle) * distance;
                    
                    firework.style.setProperty('--endX', endX + 'px');
                    firework.style.setProperty('--endY', endY + 'px');
                    
                    document.body.appendChild(firework);
                    
                    setTimeout(() => {
                        if (firework.parentNode) {
                            document.body.removeChild(firework);
                        }
                    }, 1000);
                }, i * 50);
            }
        }

        // Add firework animation CSS
        const style = document.createElement('style');
        style.textContent = `
            @keyframes firework {
                0% {
                    transform: translate(0, 0) scale(1);
                    opacity: 1;
                }
                100% {
                    transform: translate(calc(var(--endX) - ${mouseX}px), calc(var(--endY) - ${mouseY}px)) scale(0);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);

        function animateSkillCategory(element) {
            element.style.transform = 'translateY(-20px) rotateY(10deg) scale(1.05)';
            element.style.boxShadow = '0 30px 60px rgba(0, 255, 136, 0.3)';
            
            setTimeout(() => {
                element.style.transform = '';
                element.style.boxShadow = '';
            }, 300);

            // Create particle explosion
            const rect = element.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            for (let i = 0; i < 8; i++) {
                const particle = document.createElement('div');
                particle.style.cssText = `
                    position: fixed;
                    width: 3px;
                    height: 3px;
                    background: #00ff88;
                    border-radius: 50%;
                    pointer-events: none;
                    z-index: 9999;
                    left: ${centerX}px;
                    top: ${centerY}px;
                `;
                
                const angle = (Math.PI * 2 * i) / 8;
                const distance = 50;
                const endX = centerX + Math.cos(angle) * distance;
                const endY = centerY + Math.sin(angle) * distance;
                
                document.body.appendChild(particle);
                
                particle.animate([
                    { transform: 'translate(0, 0)', opacity: 1 },
                    { transform: `translate(${endX - centerX}px, ${endY - centerY}px)`, opacity: 0 }
                ], {
                    duration: 600,
                    easing: 'ease-out'
                }).onfinish = () => {
                    if (particle.parentNode) {
                        document.body.removeChild(particle);
                    }
                };
            }
        }

        function skillTagClick(event) {
            event.stopPropagation();
            const tag = event.target;
            
            // Create ripple effect
            const ripple = document.createElement('div');
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(0, 255, 136, 0.3);
                pointer-events: none;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                width: 100px;
                height: 100px;
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%) scale(0);
            `;
            
            tag.style.position = 'relative';
            tag.appendChild(ripple);
            
            setTimeout(() => {
                if (ripple.parentNode) {
                    tag.removeChild(ripple);
                }
            }, 600);
        }

        function projectCardClick(card) {
            card.style.transform = 'translateY(-20px) scale(1.05) rotateY(5deg)';
            setTimeout(() => {
                card.style.transform = '';
            }, 300);
        }

        function buttonClick(event) {
            event.stopPropagation();
            const button = event.target;
            
            // Create expanding circle effect
            const circle = document.createElement('div');
            circle.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.3);
                pointer-events: none;
                transform: scale(0);
                width: 100px;
                height: 100px;
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%) scale(0);
                z-index: 1;
            `;
            
            button.style.position = 'relative';
            button.style.overflow = 'hidden';
            button.appendChild(circle);
            
            circle.animate([
                { transform: 'translate(-50%, -50%) scale(0)', opacity: 1 },
                { transform: 'translate(-50%, -50%) scale(2)', opacity: 0 }
            ], {
                duration: 400,
                easing: 'ease-out'
            }).onfinish = () => {
                if (circle.parentNode) {
                    button.removeChild(circle);
                }
            };
        }

        // Add ripple animation CSS
        const rippleStyle = document.createElement('style');
        rippleStyle.textContent = `
            @keyframes ripple {
                0% {
                    transform: translate(-50%, -50%) scale(0);
                    opacity: 1;
                }
                100% {
                    transform: translate(-50%, -50%) scale(2);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(rippleStyle);

        // Form Submission with Animation
        document.getElementById('contact-form').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const button = e.target.querySelector('button[type="submit"]');
            const originalText = button.textContent;
            
            button.textContent = 'Sending...';
            button.style.background = 'linear-gradient(45deg, #ff0080, #00d4ff)';
            
            setTimeout(() => {
                button.textContent = 'Message Sent! ✓';
                button.style.background = 'linear-gradient(45deg, #00ff88, #00d4ff)';
                
                setTimeout(() => {
                    button.textContent = originalText;
                    button.style.background = '';
                    this.reset();
                }, 2000);
            }, 1500);
        });

        // Parallax Effect
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const bg = document.querySelector('.bg-animation');
            bg.style.transform = `translateY(${scrolled * 0.2}px)`;
            
            // Parallax for bubbles
            const bubbles = document.querySelectorAll('.bubble');
            bubbles.forEach((bubble, index) => {
                const speed = 0.1 + (index * 0.05);
                bubble.style.transform += ` translateY(${scrolled * speed}px)`;
            });
        });

        // Interactive bubble hover effect
        document.addEventListener('mousemove', function(e) {
            const bubbles = document.querySelectorAll('.bubble');
            bubbles.forEach(bubble => {
                const rect = bubble.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;
                
                const distance = Math.sqrt(
                    Math.pow(e.clientX - centerX, 2) + Math.pow(e.clientY - centerY, 2)
                );
                
                if (distance < 100) {
                    const strength = (100 - distance) / 100;
                    bubble.style.transform += ` scale(${1 + strength * 0.2})`;
                    bubble.style.opacity = 0.8 + (strength * 0.2);
                }
            });
        });