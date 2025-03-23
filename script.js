'use strict';

// Wait for the DOM to fully load before running the script
document.addEventListener('DOMContentLoaded', function () {
    // Initialize EmailJS with your public key
    emailjs.init("q2Nw3DYLF960Vt1fX"); // Your public key

    // Opening or closing side bar
    const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }

    const sidebar = document.querySelector("[data-sidebar]");
    const sidebarBtn = document.querySelector("[data-sidebar-btn]");

    if (sidebarBtn && sidebar) {
        sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });
    }

    // Activating Modal-testimonial
    const testimonialsItem = document.querySelectorAll('[data-testimonials-item]');
    const modalContainer = document.querySelector('[data-modal-container]');
    const modalCloseBtn = document.querySelector('[data-modal-close-btn]');
    const overlay = document.querySelector('[data-overlay]');

    const modalImg = document.querySelector('[data-modal-img]');
    const modalTitle = document.querySelector('[data-modal-title]');
    const modalText = document.querySelector('[data-modal-text]');

    const testimonialsModalFunc = function () {
        modalContainer.classList.toggle('active');
        overlay.classList.toggle('active');
    }

    if (testimonialsItem.length > 0) {
        for (let i = 0; i < testimonialsItem.length; i++) {
            testimonialsItem[i].addEventListener('click', function () {
                modalImg.src = this.querySelector('[data-testimonials-avatar]').src;
                modalImg.alt = this.querySelector('[data-testimonials-avatar]').alt;
                modalTitle.innerHTML = this.querySelector('[data-testimonials-title]').innerHTML;
                modalText.innerHTML = this.querySelector('[data-testimonials-text]').innerHTML;

                testimonialsModalFunc();
            });
        }
    }

    // Activating close button in modal-testimonial
    if (modalCloseBtn) {
        modalCloseBtn.addEventListener('click', testimonialsModalFunc);
    }
    if (overlay) {
        overlay.addEventListener('click', testimonialsModalFunc);
    }

    // Activating Filter Select and filtering options
    const select = document.querySelector('[data-select]');
    const selectItems = document.querySelectorAll('[data-select-item]');
    const selectValue = document.querySelector('[data-select-value]');
    const filterBtn = document.querySelectorAll('[data-filter-btn]');

    if (select) {
        select.addEventListener('click', function () { elementToggleFunc(this); });
    }

    if (selectItems.length > 0) {
        for (let i = 0; i < selectItems.length; i++) {
            selectItems[i].addEventListener('click', function () {
                let selectedValue = this.innerText.toLowerCase();
                selectValue.innerText = this.innerText;
                elementToggleFunc(select);
                filterFunc(selectedValue);
            });
        }
    }

    const filterItems = document.querySelectorAll('[data-filter-item]');

    const filterFunc = function (selectedValue) {
        for (let i = 0; i < filterItems.length; i++) {
            if (selectedValue == "all") {
                filterItems[i].classList.add('active');
            } else if (selectedValue == filterItems[i].dataset.category) {
                filterItems[i].classList.add('active');
            } else {
                filterItems[i].classList.remove('active');
            }
        }
    }

    // Enabling filter button for larger screens
    let lastClickedBtn = filterBtn[0];

    if (filterBtn.length > 0) {
        for (let i = 0; i < filterBtn.length; i++) {
            filterBtn[i].addEventListener('click', function () {
                let selectedValue = this.innerText.toLowerCase();
                selectValue.innerText = this.innerText;
                filterFunc(selectedValue);

                lastClickedBtn.classList.remove('active');
                this.classList.add('active');
                lastClickedBtn = this;
            });
        }
    }

    // Enabling Contact Form
    const form = document.querySelector('[data-form]');
    const formInputs = document.querySelectorAll('[data-form-input]');
    const formBtn = document.querySelector('[data-form-btn]');

    if (form && formInputs.length > 0 && formBtn) {
        for (let i = 0; i < formInputs.length; i++) {
            formInputs[i].addEventListener('input', function () {
                if (form.checkValidity()) {
                    formBtn.removeAttribute('disabled');
                } else {
                    formBtn.setAttribute('disabled', '');
                }
            });
        }

        // Send email using EmailJS
        form.addEventListener('submit', function (event) {
            event.preventDefault(); // Prevent the default form submission

            // Get form data
            const formData = {
                from_name: form.querySelector('[name="fullname"]').value,
                from_email: form.querySelector('[name="email"]').value,
                message: form.querySelector('[name="message"]').value
            };

            // Send email using EmailJS
            emailjs.send('drake_email0', 'template_qxmtpb5', formData)
                .then(function (response) {
                    console.log('SUCCESS!', response.status, response.text);
                    alert('🎉 Done! We’ve caught your message.');
                    form.reset(); // Reset the form after successful submission
                }, function (error) {
                    console.log('FAILED...', error);
                    alert('📡 Signal lost! Please try resending.');
                });
        });
    }

    // Enabling Page Navigation
    const navigationLinks = document.querySelectorAll('[data-nav-link]');
    const pages = document.querySelectorAll('[data-page]');

    if (navigationLinks.length > 0 && pages.length > 0) {
        for (let i = 0; i < navigationLinks.length; i++) {
            navigationLinks[i].addEventListener('click', function () {
                for (let i = 0; i < pages.length; i++) {
                    if (this.innerHTML.toLowerCase() == pages[i].dataset.page) {
                        pages[i].classList.add('active');
                        navigationLinks[i].classList.add('active');
                        window.scrollTo(0, 0);
                    } else {
                        pages[i].classList.remove('active');
                        navigationLinks[i].classList.remove('active');
                    }
                }
            });
        }
    }
});
