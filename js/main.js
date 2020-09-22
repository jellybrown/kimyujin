(function () {
    const galleryList = document.querySelectorAll(".gallery_list li a");
    const blackBg = document.querySelector(".black_bg");
    const blackContent = document.querySelectorAll(".black_bg > div");


    for (let i = 0; i < galleryList.length; i++) {

        galleryList[i].addEventListener("click", function (e) {
            e.preventDefault();
            blackBg.classList.add("active");
            this.classList.add("on");
            blackContent[i].classList.add("on")
        })
    }

    blackBg.addEventListener("click", function () {
        this.classList.remove("active")
    })


}());