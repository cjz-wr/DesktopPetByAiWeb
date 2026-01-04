// 检查并绑定微信赞赏功能的函数
function initializeWechatButton() {
    const wechatButton = document.getElementById('wechatButton');
    const wechatModal = document.getElementById('wechatModal');
    const closeModal = document.getElementById('closeModal');
    
    // 打开弹窗
    if (wechatButton && wechatModal) {
        // 移除可能已存在的事件监听器
        const newButton = wechatButton.cloneNode(true);
        wechatButton.parentNode.replaceChild(newButton);
        const clonedButton = document.getElementById('wechatButton'); // 获取新的按钮元素
        clonedButton.addEventListener('click', (e) => {
            e.preventDefault();
            wechatModal.classList.remove('hidden');
            document.body.style.overflow = 'hidden'; // 防止背景滚动
        });
    }
    
    // 关闭弹窗 - 点击关闭按钮
    if (closeModal && wechatModal) {
        closeModal.addEventListener('click', () => {
            wechatModal.classList.add('hidden');
            document.body.style.overflow = ''; // 恢复背景滚动
        });
    }
    
    // 关闭弹窗 - 点击弹窗外部区域
    if (wechatModal) {
        wechatModal.addEventListener('click', (e) => {
            if (e.target === wechatModal) {
                wechatModal.classList.add('hidden');
                document.body.style.overflow = ''; // 恢复背景滚动
            }
        });
    }
    
    // 关闭弹窗 - 按ESC键
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && wechatModal && !wechatModal.classList.contains('hidden')) {
            wechatModal.classList.add('hidden');
            document.body.style.overflow = ''; // 恢复背景滚动
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {
    // 先尝试直接初始化
    setTimeout(initializeWechatButton, 100); // 给组件加载留一些时间

    // 同时监听所有组件是否加载完成
    const components = [
        { id: 'header-container', file: 'components/header.html' },
        { id: 'hero-container', file: 'components/hero.html' },
        { id: 'overview-container', file: 'components/overview.html' },
        { id: 'structure-container', file: 'components/structure.html' },
        { id: 'features-container', file: 'components/features.html' },
        { id: 'installation-container', file: 'components/installation.html' },
        { id: 'contribute-container', file: 'components/contribute.html' },
        { id: 'footer-container', file: 'components/footer.html' }
    ];
    
    let loadedCount = 0;
    const totalComponents = components.length;
    
    components.forEach(component => {
        fetch(component.file)
            .then(response => response.text())
            .then(html => {
                document.getElementById(component.id).innerHTML = html;
                
                // 为每个组件的内容添加动画类
                const container = document.getElementById(component.id);
                const animatedElements = container.querySelectorAll('.animate-on-load');
                animatedElements.forEach(el => {
                    el.classList.add('animate-fade-in');
                });
                
                loadedCount++;
                // 检查是否所有组件都已加载
                if (loadedCount === totalComponents) {
                    // 所有组件都加载完成后，确保按钮事件被绑定
                    setTimeout(initializeWechatButton, 50);
                }
            })
            .catch(error => console.error(`Error loading ${component.file}:`, error));
    });
});