/**
 * سكربت تفاعلي خفيف لتطبيق "قطّة"

 ح* يدعم فتح القائمة للجوال، تفعيل أكورديون الأسئلة، وظهور العناصر التدريجي عند السكرول.
 */


document.addEventListener('DOMContentLoaded', () => {

    // --- 1. تفعيل منيو الجوال (Mobile Menu Toggle) ---
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // إغلاق المنيو عند الضغط على أي رابط خارجي لتسهيل الـ UX
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // --- 2. أكورديون الأسئلة الشائعة (FAQ Accordion) ---
// --- 2. أكورديون الأسئلة الشائعة (FAQ Accordion) ---
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const questionButton = item.querySelector('.faq-question');
    
    questionButton.addEventListener('click', () => {
        // نتحقق أولاً إذا كان هذا السؤال مضغوطاً ومفتوحاً بالفعل
        const isExpanded = item.classList.contains('faq-expanded');
        
        // إغلاق كافة الأسئلة المفتوحة الأخرى (إخفاء الإجابات السابقة)
        faqItems.forEach(i => i.classList.remove('faq-expanded'));
        
        // إذا كان السؤال الحالي مغلقاً، نقوم بفتحه وإظهار إجابته تلقائياً
        if (!isExpanded) {
            item.classList.add('faq-expanded');
        }
    });
});
    // --- 3. حركة ظهور العناصر التلقائي أثناء السكرول (Scroll Reveal Animation) ---
    // الاعتماد على التقنية الحديثة النظيفة IntersectionObserver بدلاً من scroll events الثقيلة
    const revealElements = document.querySelectorAll('.reveal');
    

    const revealOptions = {
        threshold: 0.1,     // يبدأ الأنيميشن عندما يظهر 10% من العنصر بالشاشة
        rootMargin: "0px 0px -50px 0px" // تفعيل الحركة قبل الوصول للعنصر بقليل
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // فك تتبع العنصر بعد أن يظهر لمرة واحدة لضمان سلاسة الأداء
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });

    // --- 4. حركة تفاعلية لمك أب الجوال (Micro-interaction Example) ---
    // جعل زر التذكير داخل شاشة الجوال يغير النص ودياً عند الضغط عليه لمحاكاة حقيقية
    const appActionBtn = document.querySelector('.app-action-btn');
    if (appActionBtn) {
        appActionBtn.addEventListener('click', function() {
            this.textContent = "⚡ تم إرسال نغزة لخالد!";
            this.style.backgroundColor = "var(--accent-color)";
            
            setTimeout(() => {
                this.textContent = "نغزة للتذكير ⚡";
                this.style.backgroundColor = "var(--primary-color)";
            }, 3000);
        });
    }
});
