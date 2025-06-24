document.addEventListener('DOMContentLoaded', function() {
    const pageButtons = document.querySelectorAll('.button-num');
    const pagesWrapper = document.querySelector('.pages-wrapper');
    const newsPages = document.querySelectorAll('.news-page');
    const newsSlider = document.querySelector('.news-slider');
    let currentPage = 4;
    const totalPages = newsPages.length;
    
    // Инициализация
    updatePagination();
    
    // Обработчики кликов
    pageButtons.forEach(button => {
        button.addEventListener('click', function() {
            const pageNum = parseInt(this.getAttribute('data-page'));
            if (pageNum !== currentPage) {
                // Анимация перехода
                animateToPage(pageNum);
                
                currentPage = pageNum;
                updatePagination();
                
                // Центрирование активной кнопки
                centerActiveButton();
            }
        });
    });
    
    function animateToPage(newPage) {
        const currentActive = document.querySelector('.news-page.active');
        const newActive = document.querySelector(`.news-page[data-page="${newPage}"]`);
        
        if (!currentActive || !newActive) return;
        
        // Определяем направление анимации
        const direction = newPage > currentPage ? 'next' : 'prev';
        
        // Устанавливаем классы для анимации
        currentActive.classList.remove('active');
        currentActive.classList.add(direction);
        
        newActive.classList.remove('prev', 'next');
        newActive.classList.add('active');
        
        // Для бесконечного перелистывания
        if (newPage === 1 && direction === 'prev') {
            // Если идем назад с первой страницы - переходим на последнюю
            const lastPage = document.querySelector(`.news-page[data-page="${totalPages}"]`);
            lastPage.classList.add('prev');
            setTimeout(() => {
                lastPage.classList.remove('prev', 'active');
            }, 800);
        } else if (newPage === totalPages && direction === 'next') {
            // Если идем вперед с последней страницы - переходим на первую
            const firstPage = document.querySelector('.news-page[data-page="1"]');
            firstPage.classList.add('next');
            setTimeout(() => {
                firstPage.classList.remove('next', 'active');
            }, 800);
        }
    }
    
    function updatePagination() {
        pageButtons.forEach(button => {
            const pageNum = parseInt(button.getAttribute('data-page'));
            button.classList.remove('active', 'prev', 'next');
            
            if (pageNum === currentPage) {
                button.classList.add('active');
            } else if (pageNum === currentPage - 1) {
                button.classList.add('prev');
            } else if (pageNum === currentPage + 1) {
                button.classList.add('next');
            }
        });
    }
    
    function centerActiveButton() {
        const activeButton = document.querySelector('.button-num.active');
        if (activeButton) {
            const buttonWidth = activeButton.offsetWidth + 10; // + margin
            const buttonIndex = currentPage - 1;
            const offset = (pagesWrapper.offsetWidth / 2) - (buttonWidth * (buttonIndex + 0.5));
            pagesWrapper.style.transform = `translateX(${offset}px)`;
        }
    }
    
    // Адаптация при изменении размера окна
    window.addEventListener('resize', centerActiveButton);
    
    // Инициализация центрирования
    centerActiveButton();
});