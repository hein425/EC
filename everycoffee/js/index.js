$(document).ready(function () {
    $('.slick').slick({
        autoplay: true,        // 자동 재생 활성화
        autoplaySpeed: 2000,   // 슬라이드 전환 시간 (밀리초 단위)
        arrows: false,         // 다음 및 이전 버튼 숨기기
        dots: false,           // 네비게이션 도트 숨기기
        draggable: true,       // 드래그 가능
        infinite: true,        // 무한 반복 모드 활성화
        speed: 500,            // 전환 속도 (밀리초 단위)
        slidesToShow: 1,       // 한 번에 보여줄 슬라이드 수
        slidesToScroll: 1      
    })
});

const productSlide = document.querySelector('.drag_slide');
let isDragging = false;
let startX;
let scrollLeft;
productSlide.addEventListener('mousedown', (e) => {
    isDragging = true;
    startX = e.pageX - productSlide.offsetLeft;
    scrollLeft = productSlide.scrollLeft;
    productSlide.classList.add('dragging');
});
productSlide.addEventListener('mouseleave', () => {
    isDragging = false;
    productSlide.classList.remove('dragging');
});
productSlide.addEventListener('mouseup', () => {
    isDragging = false;
    productSlide.classList.remove('dragging');
});
productSlide.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - productSlide.offsetLeft;
    const walk = (x - startX) * 1; // Adjust the scroll speed
    productSlide.scrollLeft = scrollLeft - walk;
});
// Touch support
productSlide.addEventListener('touchstart', (e) => {
    isDragging = true;
    startX = e.touches[0].pageX - productSlide.offsetLeft;
    scrollLeft = productSlide.scrollLeft;
});

productSlide.addEventListener('touchend', () => {
    isDragging = false;
});
productSlide.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.touches[0].pageX - productSlide.offsetLeft;
    const walk = (x - startX) * 1; // Adjust the scroll speed
    productSlide.scrollLeft = scrollLeft - walk;
});