document.addEventListener('DOMContentLoaded', () => {

    /* ==== ЗАДАНИЕ 4. Бургер-меню ==== */
    const burger = document.getElementById('burger');
    const nav = document.getElementById('nav');

    if (burger && nav) {
        burger.addEventListener('click', () => {
            burger.classList.toggle('active');
            nav.classList.toggle('open');
        });

        nav.querySelectorAll('.nav__link').forEach(link => {
            link.addEventListener('click', () => {
                burger.classList.remove('active');
                nav.classList.remove('open');
            });
        });
    }

    /* ==== ЗАДАНИЯ 2 и 3. Модальное окно ==== */
    const modal = document.getElementById('modal');
    const modalOverlay = document.getElementById('modalOverlay');
    const modalClose = document.getElementById('modalClose');
    const openModalBtn = document.getElementById('openModalBtn');
    const openModalBtn2 = document.getElementById('openModalBtn2');
    const callbackForm = document.getElementById('callbackForm');
    const formNote = document.getElementById('formNote');

    const openModal = () => {
        modal.classList.add('open');
        document.body.style.overflow = 'hidden';
        setTimeout(() => {
            const firstInput = modal.querySelector('.modal__input');
            if (firstInput) firstInput.focus();
        }, 350);
    };

    const closeModal = () => {
        modal.classList.remove('open');
        document.body.style.overflow = '';
        if (formNote) formNote.textContent = '';
        if (callbackForm) callbackForm.reset();
    };

    if (openModalBtn) openModalBtn.addEventListener('click', openModal);
    if (openModalBtn2) openModalBtn2.addEventListener('click', openModal);
    if (modalClose) modalClose.addEventListener('click', closeModal);
    if (modalOverlay) modalOverlay.addEventListener('click', closeModal);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('open')) closeModal();
    });

    /* ==== Валидация формы ==== */
    if (callbackForm) {
        callbackForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name  = callbackForm.elements.name.value.trim();
            const phone = callbackForm.elements.phone.value.trim();

            const nameRegex = /^[А-Яа-яЁёA-Za-z][А-Яа-яЁёA-Za-z\s-]{1,49}$/;
            const digitsOnly = phone.replace(/\D/g, '');
            const phoneValid = /^[\d\s()+-]{10,20}$/.test(phone) &&
                               digitsOnly.length >= 10 &&
                               digitsOnly.length <= 15;

            if (!nameRegex.test(name)) {
                formNote.style.color = '#ef4444';
                formNote.textContent = 'Имя: только буквы, минимум 2 символа';
                return;
            }
            if (!phoneValid) {
                formNote.style.color = '#ef4444';
                formNote.textContent = 'Телефон: введите корректный номер (10–15 цифр)';
                return;
            }

            formNote.style.color = '#10b981';
            formNote.textContent = `Спасибо, ${name}! Мы свяжемся с вами.`;
            setTimeout(closeModal, 1500);
        });
    }

    /* ==== ЗАДАНИЕ 5. Кнопка «Наверх» ==== */
    const toTop = document.getElementById('toTop');

    if (toTop) {
        window.addEventListener('scroll', () => {
            toTop.classList.toggle('show', window.scrollY > 400);
        });
        toTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    /* ==== ЗАДАНИЕ 6. Аккордеон ==== */
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-item__question');
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            faqItems.forEach(other => other.classList.remove('active'));
            if (!isActive) item.classList.add('active');
        });
    });

    /* ==== ЗАДАНИЕ 7. Смена темы ==== */
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark');
    });
}

    /* ==== ЗАДАНИЕ 8. Галерея ==== */
    const galleryMain = document.getElementById('galleryMain');
    const galleryThumbs = document.getElementById('galleryThumbs');

    if (galleryMain && galleryThumbs) {
        galleryThumbs.addEventListener('click', (e) => {
            const thumb = e.target.closest('.gallery__thumb');
            if (!thumb) return;

            const fullSrc = thumb.dataset.full;
            if (!fullSrc || fullSrc === galleryMain.src) return;

            galleryThumbs.querySelectorAll('.gallery__thumb').forEach(t =>
                t.classList.remove('gallery__thumb--active')
            );
            thumb.classList.add('gallery__thumb--active');

            const preloader = new Image();
            preloader.onload = () => {
                galleryMain.style.opacity = '0';
                setTimeout(() => {
                    galleryMain.src = fullSrc;
                    galleryMain.style.opacity = '1';
                }, 200);
            };
            preloader.src = fullSrc;
        });
    }

});