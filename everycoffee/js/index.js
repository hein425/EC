$(document).ready(function () {

  // gnb 설정
  // line 초기 위치 설정    
  $('.gnb li').on("click", function () {
    // $('body').stop().animate({scrollTop : 0}, 500);
    $('.gnb li').removeClass("selected");
    $(this).addClass("selected");
    // line 업데이트
    var leftPos = $(this).position().left;
    var width = $(this).outerWidth();
    $('.gnb_line').css("left", leftPos + "px").css("width", width + "px");
  });
  $('.bk, .user, .order-btn').click(function () {
    $('.gnb_line').css({ "width": "0px" });
    $('.gnb li').removeClass("selected");
  })

  // mainContent 로딩 함수
  async function includeHTML(url, targetSelector) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Failed to fetch ${url}. Status: ${response.status}`);
      }
      const html = await response.text();
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');

      const targetElement = document.querySelector(targetSelector);
      targetElement.innerHTML = doc.body.innerHTML;
      // HTML 로드 후 추가 초기화
      initializeSlick();
      initializeDragSlide();
      initializeMembershipButton();
      checkbox();
      order_modal();
    } catch (error) {
      console.error('Error loading content:', error);
    }
  }


  // slick 슬라이더 함수
  function initializeSlick() {
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
    });
  }
  // 드래그 슬라이드 함수
  function initializeDragSlide() {
    $('.drag_slide').draggable({ axis: "x", containment: "parent" });
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
  }


  // 멤버십 다이얼로그 초기화 함수
  function initializeMembershipButton() {
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
  }

  // 장바구니 체크박스 함수
  function checkbox() {
    // 마스터 체크박스를 선택할 때 슬레이브 체크박스들도 함께 선택되거나 해제되도록 하는 함수
    document.getElementById('select-all').addEventListener('change', function () {
      // 모든 슬레이브 체크박스를 선택
      const slaveCheckboxes = document.querySelectorAll('.select');
      // 마스터 체크박스의 체크 상태를 모든 슬레이브 체크박스에 적용
      slaveCheckboxes.forEach(function (checkbox) {
        checkbox.checked = document.getElementById('select-all').checked;
      });
    });
    document.querySelectorAll('.cart-item').forEach(item => {
      item.addEventListener('click', function () {
        const checkboxId = this.getAttribute('select1');
        const checkbox = document.getElementById('select1');
        checkbox.checked = !checkbox.checked;
      });
    });
  }  

  // 결제창 모달 함수
  function order_modal() {
    document.querySelector('.to-sajang').addEventListener('click', function() {
        document.getElementById('modal-sajang').style.display = 'block';
    });
    document.querySelector('.to-rider').addEventListener('click', function() {
        document.getElementById('modal-rider').style.display = 'block';
    });
    // 모달 닫기
    document.querySelectorAll('.close').forEach(function(element) {
        element.addEventListener('click', function() {
            const target = this.getAttribute('data-target');
            document.getElementById(target).style.display = 'none';
        });
    });
    // 모달 바깥 클릭 시 닫기
    window.addEventListener('click', function(event) {
        if (event.target.classList.contains('modal')) {
            event.target.style.display = 'none';
        }
    });
  }

  // detail_page.html을 로드하는 이벤트 핸들러
  $('.gnb li').eq(0).click(async function () {
    const urlToInclude = 'index/main_coffee.html';
    const targetSelector = '#mainContent';
    await includeHTML(urlToInclude, targetSelector);
  });
  $('.gnb li').eq(1).click(async function () {
    const urlToInclude = 'index/main_ade.html';
    const targetSelector = '#mainContent';
    await includeHTML(urlToInclude, targetSelector);
  });
  $('.gnb li').eq(2).click(async function () {
    const urlToInclude = 'index/main_smoothie.html';
    const targetSelector = '#mainContent';
    await includeHTML(urlToInclude, targetSelector);
  });
  $('.gnb li').eq(3).click(async function () {
    const urlToInclude = 'index/main_tea.html';
    const targetSelector = '#mainContent';
    await includeHTML(urlToInclude, targetSelector);
  });
  $('.gnb li').eq(4).click(async function () {
    const urlToInclude = 'index/main_dessert.html';
    const targetSelector = '#mainContent';
    await includeHTML(urlToInclude, targetSelector);
  });
  $('.gnb li').eq(5).click(async function () {
    const urlToInclude = 'index/main_md.html';
    const targetSelector = '#mainContent';
    await includeHTML(urlToInclude, targetSelector);
  });

  $('.order-btn').click(async function () {
    const urlToInclude = 'index/charge.html';
    const targetSelector = '#mainContent';
    await includeHTML(urlToInclude, targetSelector);
  });


  $('.bk').click(async function () {
    const urlToInclude = 'index/basket.html';
    const targetSelector = '#mainContent';
    await includeHTML(urlToInclude, targetSelector);

    $('.check-btn').click(async function () {
      const urlToInclude = 'index/charge.html';
      const targetSelector = '#mainContent';
      await includeHTML(urlToInclude, targetSelector);
    });
  });


  $('.user').click(async function () {
    const urlToInclude = 'index/login.html';
    const targetSelector = '#mainContent';
    await includeHTML(urlToInclude, targetSelector);

    loadpage('index/login.html');
    function loadpage() {
      document.querySelector('#information').style.display = 'none';
    }
  });

  // 페이지 로딩 시 main.html을 로드
  const initialUrlToInclude = 'index/main.html';
  const initialTargetSelector = '#mainContent';
  includeHTML(initialUrlToInclude, initialTargetSelector);

});
