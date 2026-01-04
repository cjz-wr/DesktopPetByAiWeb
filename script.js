// 移动端菜单切换
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');

if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });
    
    // 点击外部关闭移动端菜单
    document.addEventListener('click', (event) => {
        if (!mobileMenu.contains(event.target) && !mobileMenuButton.contains(event.target)) {
            mobileMenu.classList.add('hidden');
        }
    });
}

// 回到顶部按钮
const backToTopButton = document.getElementById('back-to-top');

if (backToTopButton) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopButton.classList.remove('hidden');
        } else {
            backToTopButton.classList.add('hidden');
        }
    });
    
    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// 导航栏滚动效果
const header = document.querySelector('header');

if (header) {
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('shadow-medium');
            header.classList.remove('shadow-soft');
        } else {
            header.classList.add('shadow-soft');
            header.classList.remove('shadow-medium');
        }
    });
}

// 滚动动画
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-slide-up');
        }
    });
}, observerOptions);

// 观察所有需要动画的元素
document.querySelectorAll('.staggered-animation > *').forEach(el => {
    observer.observe(el);
});

// 页面加载时添加动画类
window.addEventListener('load', () => {
    document.querySelectorAll('.animate-on-load').forEach(el => {
        el.classList.add('animate-fade-in');
    });
});

// 平滑滚动锚点链接
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // 关闭移动端菜单
            if (mobileMenu) {
                mobileMenu.classList.add('hidden');
            }
        }
    });
});

// 微信赞赏弹窗功能
const wechatButton = document.getElementById('wechatButton');
const wechatModal = document.getElementById('wechatModal');
const closeModal = document.getElementById('closeModal');

if (wechatButton && wechatModal && closeModal) {
    // 打开弹窗
    wechatButton.addEventListener('click', (e) => {
        e.preventDefault();
        wechatModal.classList.remove('hidden');
        document.body.style.overflow = 'hidden'; // 防止背景滚动
    });
    
    // 关闭弹窗 - 点击关闭按钮
    closeModal.addEventListener('click', () => {
        wechatModal.classList.add('hidden');
        document.body.style.overflow = ''; // 恢复背景滚动
    });
    
    // 关闭弹窗 - 点击弹窗外部区域
    wechatModal.addEventListener('click', (e) => {
        if (e.target === wechatModal) {
            wechatModal.classList.add('hidden');
            document.body.style.overflow = ''; // 恢复背景滚动
        }
    });
    
    // 关闭弹窗 - 按ESC键
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !wechatModal.classList.contains('hidden')) {
            wechatModal.classList.add('hidden');
            document.body.style.overflow = ''; // 恢复背景滚动
        }
    });
}

// 页面加载时的欢迎消息
window.addEventListener('load', () => {
    console.log('%c🚀 DesktopPetByAi 智能桌面宠物助手', 'font-size: 18px; font-weight: bold; color: #4CAF50;');
    console.log('%c项目地址: https://github.com/cjz-wr/DesktopPetByAi', 'color: #666;');
    console.log('%c项目状态: 测试版 - 功能可扩展性较强', 'color: #666;');
    console.log('%c感谢您对开源项目的支持！', 'color: #666;');
});