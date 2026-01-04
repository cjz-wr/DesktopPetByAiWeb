document.addEventListener('DOMContentLoaded', function() {
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
    
    // 页面加载时的欢迎消息
    console.log('%c🚀 DesktopPetByAi 智能桌面宠物助手', 'font-size: 18px; font-weight: bold; color: #4CAF50;');
    console.log('%c项目地址: https://github.com/cjz-wr/DesktopPetByAi', 'color: #666;');
    console.log('%c项目状态: 测试版 - 功能可扩展性较强', 'color: #666;');
    console.log('%c感谢您对开源项目的支持！', 'color: #666;');
});