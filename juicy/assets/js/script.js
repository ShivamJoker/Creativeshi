document.addEventListener('DOMContentLoaded',()=>{

    const arrowRight = document.querySelector('.sliderRightBtn')
    const arrowLeft = document.querySelector('.sliderLeftBtn')
    const juiceSlider = document.querySelector('.juice-slider')
    const menuBtn = document.querySelector('.menuBtn')
    
    arrowRight.addEventListener('click',()=>{
        juiceSlider.scrollBy({
            top: 0,
            left: window.innerWidth*1.2,
            behavior: 'smooth'
          });
    })
    arrowLeft.addEventListener('click',()=>{
        juiceSlider.scrollBy({
            top: 0,
            left: -window.innerWidth*1.2,
            behavior: 'smooth'
          });
    })


    // toggle nav bar
    menuBtn.addEventListener('click', ()=>{
        menuBtn.parentElement.classList.toggle('navHeight')
    })

    // scroll into view of sections
    const menuLis = document.querySelectorAll(".main-nav> li")

    menuLis.forEach(e=>{
        e.addEventListener('click',()=>{
            const elementName = e.innerText.toLowerCase();
            console.log(elementName);
            
            const elementToScroll = document.querySelector("."+elementName);
            console.log(elementToScroll);
            
            elementToScroll.scrollIntoView({
                behavior: "smooth"
            })
        })
    })


    // remove the loader and show main page
    const main = document.querySelector('main')
    const header = document.querySelector('header')
    const loader = document.querySelector('.loader')
    const map = document.querySelector('.map')

    header.style.display = 'none';

    setTimeout(() => {
        loader.style.transform = "translateY(-120%)"
    }, 1500);
    setTimeout(() => {
        main.style.display = 'block';
        header.style.display = '';
    }, 1200);
    setTimeout(() => {
        const mapframe = '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.113832481085!2d-122.40144168459793!3d37.78737197975715!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085807d2e1b0dcb%3A0x87c3fb254ad8b947!2sJuice+Shop!5e0!3m2!1sen!2sin!4v1549209753671" width="100%" height="100%" frameborder="0" style="border:0" allowfullscreen></iframe>'
        map.innerHTML += mapframe;
    }, 2000);

})

