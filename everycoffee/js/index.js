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


$('.drag_slide').draggable({axis:"x", containment:"parent"});
  document.addEventListener('DOMContentLoaded', () => {
    const sliders = document.querySelectorAll('.drag_slide');
    sliders.forEach(slider => {
      let isDown = false;
      let startX;
      let scrollLeft;
      slider.addEventListener('mousedown', (e) => {
        isDown = true;
        slider.classList.add('dragging');
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
      });

      slider.addEventListener('mouseleave', () => {
        isDown = false;
        slider.classList.remove('dragging');
      });
      slider.addEventListener('mouseup', () => {
        isDown = false;
        slider.classList.remove('dragging');
      });
      slider.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - slider.offsetLeft;
        const walk = (x - startX) * 1; 
        slider.scrollLeft = scrollLeft - walk;
      });
      slider.addEventListener('touchstart', (e) => {
        isDown = true;
        slider.classList.add('dragging');
        startX = e.touches[0].pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
      });
      slider.addEventListener('touchend', () => {
        isDown = false;
        slider.classList.remove('dragging');
      });
      slider.addEventListener('touchmove', (e) => {
        if (!isDown) return;
        const x = e.touches[0].pageX - slider.offsetLeft;
        const walk = (x - startX) * 1;
        slider.scrollLeft = scrollLeft - walk;
      });
    });
  });

  const openmembershipbutton = document.getElementById("open-membership");
  const dialog = document.getElementById("my-membership");

  openmembershipbutton.addEventListener('click', () => {
    dialog.classList.remove('dialog-fade-out');
    dialog.classList.add('dialog-fade-in');
    // html 기본속성...
    dialog.showModal(); 
  });

  const closeButton = document.getElementById('close-button');
  closeButton.addEventListener("click", () => {
    dialog.classList.remove('dialog-fade-in');
    dialog.classList.add('dialog-fade-out');
    
    // 애니메이션이 끝난 후 dialog를 닫음
    setTimeout(() => {
        dialog.close();
    }, 300); // 애니메이션 지속 시간과 일치시킴
  });