// document.addEventListener('DOMContentLoaded', function() {
//     const pageButtons = document.querySelectorAll('.button-num');
//     const pagesWrapper = document.querySelector('.pages-wrapper');
//     const newsPages = document.querySelectorAll('.news-page');
//     const newsSlider = document.querySelector('.news-slider');
//     let currentPage = 4;
//     const totalPages = newsPages.length;
    
//     // Инициализация
//     updatePagination();
    
//     // Обработчики кликов
//     pageButtons.forEach(button => {
//         button.addEventListener('click', function() {
//             const pageNum = parseInt(this.getAttribute('data-page'));
//             if (pageNum !== currentPage) {
//                 // Анимация перехода
//                 animateToPage(pageNum);
                
//                 currentPage = pageNum;
//                 updatePagination();
                
//                 // Центрирование активной кнопки
//                 centerActiveButton();
//             }
//         });
//     });
    
//     function animateToPage(newPage) {
//         const currentActive = document.querySelector('.news-page.active');
//         const newActive = document.querySelector(`.news-page[data-page="${newPage}"]`);
        
//         if (!currentActive || !newActive) return;
        
//         // Определяем направление анимации
//         const direction = newPage > currentPage ? 'next' : 'prev';
        
//         // Устанавливаем классы для анимации
//         currentActive.classList.remove('active');
//         currentActive.classList.add(direction);
        
//         newActive.classList.remove('prev', 'next');
//         newActive.classList.add('active');
        
//         // Для бесконечного перелистывания
//         if (newPage === 1 && direction === 'prev') {
//             // Если идем назад с первой страницы - переходим на последнюю
//             const lastPage = document.querySelector(`.news-page[data-page="${totalPages}"]`);
//             lastPage.classList.add('prev');
//             setTimeout(() => {
//                 lastPage.classList.remove('prev', 'active');
//             }, 800);
//         } else if (newPage === totalPages && direction === 'next') {
//             // Если идем вперед с последней страницы - переходим на первую
//             const firstPage = document.querySelector('.news-page[data-page="1"]');
//             firstPage.classList.add('next');
//             setTimeout(() => {
//                 firstPage.classList.remove('next', 'active');
//             }, 800);
//         }
//     }
    
//     function updatePagination() {
//         pageButtons.forEach(button => {
//             const pageNum = parseInt(button.getAttribute('data-page'));
//             button.classList.remove('active', 'prev', 'next');
            
//             if (pageNum === currentPage) {
//                 button.classList.add('active');
//             } else if (pageNum === currentPage - 1) {
//                 button.classList.add('prev');
//             } else if (pageNum === currentPage + 1) {
//                 button.classList.add('next');
//             }
//         });
//     }
    
//     function centerActiveButton() {
//         const activeButton = document.querySelector('.button-num.active');
//         if (activeButton) {
//             const buttonWidth = activeButton.offsetWidth + 10; // + margin
//             const buttonIndex = currentPage - 1;
//             const offset = (pagesWrapper.offsetWidth / 2) - (buttonWidth * (buttonIndex + 0.5));
//             pagesWrapper.style.transform = `translateX(${offset}px)`;
//         }
//     }
    
//     // Адаптация при изменении размера окна
//     window.addEventListener('resize', centerActiveButton);
    
//     // Инициализация центрирования
//     centerActiveButton();
// });

// // ? 

document.addEventListener('DOMContentLoaded', function() {
    const pageButtons = document.querySelectorAll('.button-num');
    const pagesWrapper = document.querySelector('.pages-wrapper');
    const newsPages = document.querySelectorAll('.news-page');
    const newsContainer = document.querySelector('.secind-news-container');
    let currentPage = 4;
    const totalPages = newsPages.length;
    
    // Инициализация
    updateAllPages();
    updatePagination();
    
    // Обработчики кликов
    pageButtons.forEach(button => {
        button.addEventListener('click', function() {
            const pageNum = parseInt(this.getAttribute('data-page'));
            if (pageNum !== currentPage) {
                // Анимация перехода
                animateToPage(pageNum);
                
                currentPage = pageNum;
                updateAllPages();
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
        let direction;
        
        // Обрабатываем специальные переходы через границы
        if (newPage === totalPages && currentPage === 1) {
            direction = 'prev';
        } else if (newPage === 1 && currentPage === totalPages) {
            direction = 'next';
        } else {
            direction = newPage > currentPage ? 'next' : 'prev';
        }
        
        // Сначала ставим новую страницу в начальную позицию
        newActive.classList.remove('prev', 'next');
        if (direction === 'prev') {
            newActive.classList.add('next'); // ставим справа
        } else {
            newActive.classList.add('prev'); // ставим слева
        }
        
        // Ждем один кадр для применения стилей
        requestAnimationFrame(() => {
            // Убираем начальную позицию и добавляем активный класс
            newActive.classList.remove('prev', 'next');
            newActive.classList.add('active');
            
            // Анимируем текущую страницу
            currentActive.classList.remove('active');
            currentActive.classList.add(direction);
        });
    }
    
    function updateAllPages() {
        // Удаляем все классы у всех страниц
        newsPages.forEach(page => {
            page.classList.remove('active', 'prev', 'next');
        });
        
        // Устанавливаем активную страницу
        const activePage = document.querySelector(`.news-page[data-page="${currentPage}"]`);
        if (activePage) {
            activePage.classList.add('active');
        }
        
        // Устанавливаем соседние страницы
        let prevPageNum = currentPage - 1;
        let nextPageNum = currentPage + 1;
        
        // Циклическая логика
        if (prevPageNum < 1) prevPageNum = totalPages;
        if (nextPageNum > totalPages) nextPageNum = 1;
        
        // Устанавливаем классы для видимых соседних страниц
        const prevPage = document.querySelector(`.news-page[data-page="${prevPageNum}"]`);
        const nextPage = document.querySelector(`.news-page[data-page="${nextPageNum}"]`);
        
        if (prevPage && prevPage !== activePage) {
            prevPage.classList.add('prev');
        }
        if (nextPage && nextPage !== activePage) {
            nextPage.classList.add('next');
        }
    }
    
    function updatePagination() {
        pageButtons.forEach(button => {
            const pageNum = parseInt(button.getAttribute('data-page'));
            button.classList.remove('active', 'prev', 'next');
            
            if (pageNum === currentPage) {
                button.classList.add('active');
            } else if (pageNum === currentPage - 1 || (currentPage === 1 && pageNum === totalPages)) {
                button.classList.add('prev');
            } else if (pageNum === currentPage + 1 || (currentPage === totalPages && pageNum === 1)) {
                button.classList.add('next');
            }
        });
    }
    
    function centerActiveButton() {
        const activeButton = document.querySelector('.button-num.active');
        if (activeButton) {
            const buttonWidth = activeButton.offsetWidth + 10;
            const buttonIndex = currentPage - 1;
            const offset = (pagesWrapper.offsetWidth / 2) - (buttonWidth * (buttonIndex + 0.5));
            pagesWrapper.style.transform = `translateX(${offset}px)`;
        }
    }
    
    window.addEventListener('resize', centerActiveButton);
    centerActiveButton();
});