



document.addEventListener('DOMContentLoaded', () => {

    const loginBtn = document.getElementById('login-btn');
    const loginModal = document.getElementById('login-modal');
    const closeBtn = document.querySelector('.close-btn');
    const loginForm = document.getElementById('login-form');

    
    loginBtn.addEventListener('click', () => {
        loginModal.style.display = 'flex';
    });

    
    closeBtn.addEventListener('click', () => {
        loginModal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === loginModal) {
            loginModal.style.display = 'none';
        }
    });


    loginForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const username = document.getElementById('username').value;
        
        alert(`Login attempted for user: ${username}`);
        loginModal.style.display = 'none';
        loginForm.reset();
    });  


    const courseListEl = document.getElementById('course-list');
    const courseSearchEl = document.getElementById('course-search');
    const courseSelectEl = document.getElementById('courseSelect');

    const coursesData = [
        { id: 'webdev', title: 'Full-Stack Web Development', description: 'Learn to build modern websites from scratch.' },
        { id: 'datasci', title: 'Data Science with Python', description: 'Master data analysis, machine learning, and visualization.' },
        { id: 'uxdesign', title: 'UI/UX Design Fundamentals', description: 'Create intuitive and beautiful user interfaces.' },
        { id: 'marketing', title: 'Digital Marketing Mastery', description: 'Strategies for SEO, social media, and online advertising.' },
        { id: 'cybersec', title: 'Cybersecurity Essentials', description: 'Understand security principles and protect systems.' },
    ];

    function displayCourses(filter = '') {
        courseListEl.innerHTML = '';
        const filteredCourses = coursesData.filter(course =>
            course.title.toLowerCase().includes(filter.toLowerCase())
        );

        filteredCourses.forEach(course => {
            const card = document.createElement('div');
            card.classList.add('course-card');
            card.innerHTML = `
                <h3>${course.title}</h3>
                <p>${course.description}</p>
            `;
            courseListEl.appendChild(card);
        });
    }

    function populateCourseSelect() {
        coursesData.forEach(course => {
            const option = document.createElement('option');
            option.value = course.id;
            option.textContent = course.title;
            courseSelectEl.appendChild(option);
        });
    }

    displayCourses();
    populateCourseSelect();

    courseSearchEl.addEventListener('input', (event) => {
        displayCourses(event.target.value);
    });


    const admissionForm = document.getElementById('admission-form');
    const formSteps = document.querySelectorAll('.form-step');
    const nextBtns = document.querySelectorAll('.next-step-btn');
    const prevBtns = document.querySelectorAll('.prev-step-btn');
    const reviewDetailsEl = document.getElementById('review-details');
    let currentStep = 0;

    
    function showStep(stepIndex) {
        formSteps.forEach((step, index) => {
            step.style.display = index === stepIndex ? 'block' : 'none';
        });
    }

    
    function validateStep(stepIndex) {
        const currentInputs = formSteps[stepIndex].querySelectorAll('input[required], select[required]');
        let valid = true;
        currentInputs.forEach(input => {
            if (!input.value.trim()) {
                input.style.borderColor = 'red';
                valid = false;
            } else {
                input.style.borderColor = '#ccc';
            }
        });
        return valid;
    }

    
    nextBtns.forEach(button => {
        button.addEventListener('click', () => {
            if (validateStep(currentStep)) {
                if (currentStep === 1) { 
                    updateReviewDetails();
                }
                currentStep++;
                showStep(currentStep);
            }
        });
    });

    
    prevBtns.forEach(button => {
        button.addEventListener('click', () => {
            currentStep--;
            showStep(currentStep);
        });
    });

    
    function updateReviewDetails() {
        const fullName = document.getElementById('fullName').value;
        const email = document.getElementById('email').value;
        const courseSelected = courseSelectEl.options[courseSelectEl.selectedIndex].textContent;

        reviewDetailsEl.innerHTML = `
            <p><strong>Full Name:</strong> ${fullName}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Course:</strong> ${courseSelected}</p>
        `;
    }

   
    admissionForm.addEventListener('submit', (event) => {
        event.preventDefault();
        
        alert('Application Submitted Successfully! Thank you.');
        admissionForm.reset();
        currentStep = 0;
        showStep(currentStep);
    });

    
    showStep(currentStep);


    const revealableSections = document.querySelectorAll('.revealable');

    const observerOptions = {
        root: null, 
        rootMargin: '0px',
        threshold: 0.1 
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
               
                entry.target.classList.add('is-visible');
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

   
    revealableSections.forEach(section => {
        observer.observe(section);
    });

});
