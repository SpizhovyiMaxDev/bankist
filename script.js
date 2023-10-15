


class App{
     /* MODAL WINDOW*/ 
          modal = document.querySelector('.modal');
          overlay = document.querySelector('.overlay');
          btnCloseModal = document.querySelector('.btn--close-modal');
          btnsOpenModal = document.querySelectorAll('.btn--show-modal');
          btnSubmitModal = document.querySelector('.btn--submit-modal');
          header = document.querySelector('.header');
     /* LINKS */
          #linkContainer = document.querySelector('.nav__links');
          #nav = document.querySelector('.nav');
     /* TABS */
          tabContatiner = document.querySelector('.operations__tab-container');
     /* SECTIONS */
          sections = document.querySelectorAll('.section');
          #sectionObserver;
     /* IMAGES */ 
          imgs = document.querySelectorAll('img[data-src]');
          #imageObserver;
     /* SLIDER */
          #slides = document.querySelectorAll('.slide');
          btnNext = document.querySelector('.slider__btn--right');
          btnPrev = document.querySelector('.slider__btn--left');
          dotContainer = document.querySelector('.dots');
          #lastSlide = this.#slides.length - 1;
          #count = 0;
     /*Animate Mobile Nav*/
          btnOpenNav = document.querySelector('.navigation-btn');

     constructor(){
     /* MODAL WINDOW */
         this.btnsOpenModal.forEach(btn => btn.addEventListener('click', this._openModal.bind(this)));
         this.btnCloseModal.addEventListener('click', this._closeModal.bind(this));
         document.addEventListener('keydown', this._closeModalOnEscapePress.bind(this));
     /* LINKS */
         this.#linkContainer.addEventListener('click', this._scrollSection.bind(this));
         this.#nav.addEventListener('mouseover', this._hoverLink.bind(this, 0.6));
         this.#nav.addEventListener('mouseout', this._hoverLink.bind(this, 1));
     /* TABS */ 
          this.tabContatiner.addEventListener('click', this._showTab.bind(this));
     /* SECTION OBSERVER */
     this.#sectionObserver = new IntersectionObserver(
          this._animateSection.bind(this)
          , {
          root:null,
          treshold:0.15
     });
     this.sections.forEach(section =>{
          this.#sectionObserver.observe(section);
          section.classList.add('section--hidden');
     });
     /* IMAGE OBSERVER */ 
     this.#imageObserver = new IntersectionObserver(
          this._showImage.bind(this)
          , {
               root:null,
               treshold:0, 
               rootMargin:'-100px'  
          });
     this.imgs.forEach(img=>{
          this.#imageObserver.observe(img);
     });

     /* SLIDER */
      this._goToSlide(0);
      this._createDot();
      this._activeDot(0);

      this.btnNext.addEventListener('click', this._nextSlide.bind(this));
      this.btnPrev.addEventListener('click', this._prevSlide.bind(this));
      this.dotContainer.addEventListener('click', this._clickDotActive.bind(this));

     /*Animate Mobile Nav*/
     this.btnOpenNav.addEventListener('click', this._toggleNav.bind(this));
}

     /* MODAL WINDOW */ 
     _openModal(){
          this.modal.classList.remove('hidden');
          this.overlay.classList.remove('hidden');
     };

     _closeModal(){
        this.modal.classList.add('hidden');
        this.overlay.classList.add('hidden');
     };

     _closeModalOnEscapePress(e){
          if(e.key === 'Escape' && !this.modal.classList.contains('hidden')){
             this._closeModal();
          }
     };
     /* LINKS */
     _scrollSection(e){
          e.preventDefault(); 
          const link = e.target.closest('.nav__link');
          if(!link)return;
          this.header.classList.remove('nav-open');
          const id = link.getAttribute('href');
          window.innerWidth > 944 ?
          document.querySelector(id).scrollIntoView({behavior:'smooth'}) :
          setTimeout(() => document.querySelector(id).scrollIntoView({behavior:'smooth'}), 500)
     };

     _hoverLink(opacityNum, e){
         const link = e.target.closest('.nav__link');
                if(!link)return;
               const links = e.target.closest('.nav').querySelectorAll('.nav__link');
               const img = e.target.closest('.nav').querySelector('img');
          
          
               links.forEach(el=>{
                    if(el !== link){
                         el.style.opacity = opacityNum;
                    }
               });
               img.style.opacity = opacityNum;
     };
     
     _showTab(e){
               const tab = e.target.closest('.operations__tab');
               if(!tab)return;
               const tabNumber = tab.dataset.tab;
            
               document.querySelectorAll('.operations__content').forEach(content => content.classList.remove('operations__content--active'));
               document.querySelectorAll('.operations__tab').forEach(tab => tab.classList.remove('operations__tab--active'));
            
               document.querySelector(`.operations__tab--${tabNumber}`).classList.add('operations__tab--active');
               document.querySelector(`.operations__content--${tabNumber}`).classList.add('operations__content--active');
     }
     /* SECTION OBSERVER */
     _animateSection(entries, observer){
               const [entry] = entries;
               if(!entry.isIntersecting)return;
               entry.target.classList.remove('section--hidden')
               observer.unobserve(entry.target)
     }
     /* IMAGE OBSERVER */ 
     _showImage(entries, observer){
                    const [entry] = entries;
                    // if(!entry.isIntersecting)return;
                    // entry.target.src = entry.target.dataset.src;
                         
                    // entry.target.addEventListener('load', function(){
                    //      entry.target.classList.remove('lazy-img');
                    // });
                    // observer.unobserve(entry.target);
                    if(entry.isIntersecting){
                    entry.target.src = entry.target.dataset.src;
               
                    entry.target.addEventListener('load', function(){
                         entry.target.classList.remove('lazy-img');
                    });  
                    }else{
                         entry.target.classList.add('lazy-img');
                    }
     }

     /* SLIDER */

     _goToSlide(slideNumber){
          this.#slides.forEach((slide, index) => slide.style.transform = `translateX(${100 * (index - slideNumber)}%)`);
     };


     _createDot(){
          this.#slides.forEach((_, i) => this.dotContainer.insertAdjacentHTML('beforeend', `<button class = "dots__dot" data-slide = "${i}"></button>`));
     }

     _activeDot(numberDot){
          document.querySelectorAll('.dots__dot').forEach(dot => dot.classList.remove('dots__dot--active'));
          document.querySelector(`.dots__dot[data-slide = "${numberDot}"]`).classList.add('dots__dot--active');
     };

     _nextSlide(){
          if(this.#count === this.#lastSlide){
               this.#count = 0
          }else{
               this.#count++;
          }
          this._goToSlide(this.#count);
          this._activeDot(this.#count);
          console.log(this.#count)
     };

     _prevSlide(){
          if(this.#count === 0){
               this.#count = this.#lastSlide
          }else{
               this.#count--;
          }
               this._goToSlide(this.#count);
               this._activeDot(this.#count);
               console.log(this.#count)
     }

     _clickDotActive(e){
              const dot = e.target.closest('.dots__dot');
               if(!dot)return;
               const slideNum = dot.dataset.slide;
               this._goToSlide(slideNum);
               this._activeDot(slideNum);
     };


     _toggleNav(e){
       e.stopPropagation();
       this.header.classList.toggle('nav-open');
     }
}

const app = new App();