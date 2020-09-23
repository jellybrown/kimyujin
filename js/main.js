window.addEventListener('DOMContentLoaded', function () {


    // gallery 모달 활성화
    const galleryList = document.querySelectorAll(".gallery_list li a");
    const blackBg = document.querySelector(".black_bg");
    const blackContent = document.querySelectorAll(".black_bg > div");


    for (let i = 0; i < galleryList.length; i++) {

        galleryList[i].addEventListener("click", function (e) {
            e.preventDefault();
            blackBg.classList.add("active");
            for (let j = 0; j < galleryList.length; j++) { //전체적으로 먼저 on제거
                galleryList[j].classList.remove("on")
                blackContent[j].classList.remove("on")
            }
            this.classList.add("on"); //클릭한 아이에게만 on
            blackContent[i].classList.add("on")
        })
    }

    blackBg.addEventListener("click", function () {
        this.classList.remove("active")
    })


    // 여기서부터 jquery


    //열자마자 전체의 스크롤 비활성화
    $('html, body').css({
        'overflow': 'hidden'
    });

    // 메뉴 활성화 
    $('.toggle').click(function (e) {
        e.preventDefault();
        $(this).toggleClass('active');
        $('nav').toggleClass('active');
    })


    //메뉴바(nav)에서 클릭시 이동 
    const menu = $('.menu li');
    const section = $('body >section');
    let currentIdx = 0;

    const btns = $('.slide_btn');
    const prevBtn = btns.find('.prev');
    const nextBtn = btns.find('.next');

    var btnOn; //setTimeOut
    menu.click(function (e) { //nav메뉴 클릭하면
        e.preventDefault();
        $('html, body').css({
            'overflow': 'visible'
        });

        clearTimeout(btnOn); //메뉴클릭시마다 btns 숨기기
        const idx = $(this).index();
        currentIdx = idx;
        const thisSection = section.eq(idx);
        const topValue = thisSection.offset().top;

        $('html').stop().animate({
            scrollTop: topValue
        }, 300, function () {
            $('nav').removeClass('active');
            $('.toggle').removeClass('active')
        })

        btnOn = setTimeout(function () {
            btns.eq(currentIdx).addClass('active')
        }, 1000)
        $('html, body').css({
            'overflow': 'hidden'
        });
    })

    //처음 창이 열렸을때 btns 활성화
    if (currentIdx == 0) {
        btnOn = setTimeout(function () {
            btns.eq(currentIdx).addClass('active')
        }, 1000)
    }



    prevBtn.click(function () { //이전버튼 클릭시
        $('html, body').css({
            'overflow': 'visible'
        });
        btns.eq(currentIdx).removeClass('active') //현재idx의 btns 활성화 없애기
        const prevTop = section.eq(currentIdx - 1).offset().top;
        $('html').stop().animate({
            scrollTop: prevTop
        })
        $('nav').removeClass('active');
        $('.toggle').removeClass('active');
        //이동한뒤 nav,toggle 활성화 없애기
        currentIdx -= 1;
        btnOn = setTimeout(function () {
            btns.eq(currentIdx).addClass('active')
        }, 1000) //현재idx가 변경된 후, btns가 1초뒤에 active

        $('html, body').css({
            'overflow': 'hidden'
        });

    })


    nextBtn.click(function () { //다음버튼 클릭시
        $('html, body').css({
            'overflow': 'visible'
        });
        btns.eq(currentIdx).removeClass('active')
        const nextTop = section.eq(currentIdx + 1).offset().top;
        $('html').stop().animate({
            scrollTop: nextTop
        })
        $('nav').removeClass('active');
        $('.toggle').removeClass('active');

        currentIdx += 1;
        btnOn = setTimeout(function () {
            btns.eq(currentIdx).addClass('active')
        }, 1000)
        $('html, body').css({
            'overflow': 'hidden'
        });
    })

    //창 resize시 창맞추기, 맞춰지면 btns 활성화
    $(window).resize(function () {
        const currentTop = section.eq(currentIdx).offset().top;
        $('html').stop().animate({
            scrollTop: currentTop
        }, 100 / 1000, function () {
            btnOn = setTimeout(function () {
                btns.eq(currentIdx).addClass('active')
            }, 1000)
        })


    })

})