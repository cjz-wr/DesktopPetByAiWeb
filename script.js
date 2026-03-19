// 移动端菜单切换
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');

if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
        mobileMenuButton.querySelector('i').classList.toggle('fa-bars');
        mobileMenuButton.querySelector('i').classList.toggle('fa-times');
    });
    
    // 点击外部关闭移动端菜单
    document.addEventListener('click', (event) => {
        if (!mobileMenu.contains(event.target) && !mobileMenuButton.contains(event.target)) {
            mobileMenu.classList.add('hidden');
            mobileMenuButton.querySelector('i').classList.add('fa-bars');
            mobileMenuButton.querySelector('i').classList.remove('fa-times');
        }
    });
}

// 添加背景音乐控制功能
document.addEventListener('DOMContentLoaded', function() {
    const audio = document.getElementById('background-music');
    
    // 创建音乐控制按钮
    const musicControl = document.createElement('div');
    musicControl.id = 'music-control';
    musicControl.style.position = 'fixed';
    musicControl.style.top = '80px';  // 修改为右上角位置
    musicControl.style.right = '20px';
    musicControl.style.zIndex = '9999';
    musicControl.style.background = '#fff';
    musicControl.style.borderRadius = '50%';
    musicControl.style.width = '50px';
    musicControl.style.height = '50px';
    musicControl.style.display = 'flex';
    musicControl.style.alignItems = 'center';
    musicControl.style.justifyContent = 'center';
    musicControl.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
    musicControl.style.cursor = 'pointer';
    musicControl.style.border = '1px solid #eee';
    musicControl.style.transition = 'transform 0.3s ease';  // 添加过渡效果
    
    // 默认显示播放图标
    musicControl.innerHTML = '<i id="music-icon" class="fa fa-music" style="font-size: 20px; color: #4CAF50;"></i>';
    
    document.body.appendChild(musicControl);
    
    // 保存原始状态
    let isPlaying = false;
    
    // 点击音乐控制按钮切换播放/暂停
    musicControl.addEventListener('click', function() {
        const musicIcon = document.getElementById('music-icon');
        
        if (!isPlaying) {
            // 如果当前没有播放，则尝试播放
            audio.play()
                .then(() => {
                    console.log('背景音乐开始播放');
                    isPlaying = true;
                    musicIcon.className = 'fa fa-music rotating-music'; // 应用旋转类
                    // 添加旋转动画到CSS
                    addRotationAnimation();
                })
                .catch(e => {
                    console.error('播放背景音乐失败:', e);
                    isPlaying = false;
                });
        } else {
            // 如果当前正在播放，则暂停
            audio.pause();
            isPlaying = false;
            musicIcon.className = 'fa fa-music'; // 暂停时移除旋转类
        }
    });
    
    // 当音频结束时自动重新开始（确保循环播放）
    audio.addEventListener('ended', function() {
        audio.currentTime = 0;
        // 如果之前是播放状态，继续播放
        if (isPlaying) {
            audio.play();
        }
    });
    
    // 添加旋转动画的CSS
    function addRotationAnimation() {
        if (!document.querySelector('#rotating-music-style')) {
            const style = document.createElement('style');
            style.id = 'rotating-music-style';
            style.textContent = `
                @keyframes rotate {
                    from {
                        transform: rotate(0deg);
                    }
                    to {
                        transform: rotate(360deg);
                    }
                }
                
                .rotating-music {
                    animation: rotate 3s linear infinite;
                }
            `;
            document.head.appendChild(style);
        }
    }
});

// 回到顶部按钮
const backToTopButton = document.getElementById('back-to-top');

if (backToTopButton) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopButton.classList.remove('hidden');
            backToTopButton.classList.add('animate-fade-in');
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
            header.classList.add('shadow-medium', 'bg-white/95');
            header.classList.remove('shadow-soft', 'bg-white/90');
        } else {
            header.classList.add('shadow-soft', 'bg-white/90');
            header.classList.remove('shadow-medium', 'bg-white/95');
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
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// 观察所有需要动画的元素
document.querySelectorAll('.animate-on-scroll').forEach(el => {
    observer.observe(el);
});

// 页面加载时添加动画类
window.addEventListener('load', () => {
    document.querySelectorAll('.animate-on-load').forEach(el => {
        el.classList.add('animate-fade-in');
    });
    
    // 为所有需要滚动动画的元素添加类
    document.querySelectorAll('section > .container > div, .card-hover, .transform').forEach(el => {
        if (!el.classList.contains('no-animate')) {
            el.classList.add('animate-on-scroll');
            observer.observe(el);
        }
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
                if (mobileMenuButton) {
                    mobileMenuButton.querySelector('i').classList.add('fa-bars');
                    mobileMenuButton.querySelector('i').classList.remove('fa-times');
                }
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

// 视频播放器功能
document.addEventListener('DOMContentLoaded', function() {
    const video = document.getElementById('demoVideo');
    const videoPlayButton = document.getElementById('videoPlayButton');
    const playPauseBtn = document.getElementById('playPauseBtn');
    const muteBtn = document.getElementById('muteBtn');
    const fullscreenBtn = document.getElementById('fullscreenBtn');
    const videoTime = document.getElementById('videoTime');
    
    if (video) {
        // 自定义播放按钮点击事件
        videoPlayButton.addEventListener('click', function() {
            video.play();
            videoPlayButton.style.display = 'none';
            updatePlayButtonIcon();
        });
        
        // 视频播放/暂停时隐藏自定义播放按钮
        video.addEventListener('play', function() {
            videoPlayButton.style.display = 'none';
            updatePlayButtonIcon();
        });
        
        video.addEventListener('pause', function() {
            if (video.paused) {
                videoPlayButton.style.display = 'flex';
            }
            updatePlayButtonIcon();
        });
        
        // 播放/暂停按钮
        playPauseBtn.addEventListener('click', function() {
            if (video.paused) {
                video.play();
                videoPlayButton.style.display = 'none';
            } else {
                video.pause();
            }
            updatePlayButtonIcon();
        });
        
        // 静音按钮
        muteBtn.addEventListener('click', function() {
            video.muted = !video.muted;
            updateMuteButtonIcon();
        });
        
        // 全屏按钮
        fullscreenBtn.addEventListener('click', function() {
            if (!document.fullscreenElement) {
                const videoContainer = video.closest('.relative');
                if (videoContainer.requestFullscreen) {
                    videoContainer.requestFullscreen();
                } else if (videoContainer.webkitRequestFullscreen) {
                    videoContainer.webkitRequestFullscreen();
                } else if (videoContainer.msRequestFullscreen) {
                    videoContainer.msRequestFullscreen();
                }
            } else {
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                } else if (document.webkitExitFullscreen) {
                    document.webkitExitFullscreen();
                } else if (document.msExitFullscreen) {
                    document.msExitFullscreen();
                }
            }
        });
        
        // 更新播放按钮图标
        function updatePlayButtonIcon() {
            const icon = playPauseBtn.querySelector('i');
            if (video.paused) {
                icon.className = 'fa fa-play text-lg';
            } else {
                icon.className = 'fa fa-pause text-lg';
            }
        }
        
        // 更新静音按钮图标
        function updateMuteButtonIcon() {
            const icon = muteBtn.querySelector('i');
            if (video.muted) {
                icon.className = 'fa fa-volume-mute text-lg';
            } else {
                icon.className = 'fa fa-music text-lg';
            }
        }
        
        // 更新时间显示
        function updateTime() {
            const currentTime = formatTime(video.currentTime);
            const duration = formatTime(video.duration);
            videoTime.textContent = `${currentTime} / ${duration}`;
        }
        
        video.addEventListener('timeupdate', updateTime);
        
        // 视频加载完成后更新时间
        video.addEventListener('loadedmetadata', function() {
            updateTime();
        });
        
        // 格式化时间显示
        function formatTime(seconds) {
            if (isNaN(seconds)) return '0:00';
            const mins = Math.floor(seconds / 60);
            const secs = Math.floor(seconds % 60);
            return `${mins}:${secs.toString().padStart(2, '0')}`;
        }
        
        // 初始化按钮状态
        updatePlayButtonIcon();
        updateMuteButtonIcon();
        
        // 视频结束事件
        video.addEventListener('ended', function() {
            videoPlayButton.style.display = 'flex';
            updatePlayButtonIcon();
        });
        
        // 全屏变化事件
        document.addEventListener('fullscreenchange', handleFullscreenChange);
        document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
        document.addEventListener('msfullscreenchange', handleFullscreenChange);
        
        function handleFullscreenChange() {
            const icon = fullscreenBtn.querySelector('i');
            if (document.fullscreenElement || 
                document.webkitFullscreenElement || 
                document.msFullscreenElement) {
                icon.className = 'fa fa-compress text-lg';
            } else {
                icon.className = 'fa fa-expand text-lg';
            }
        }
    }
});

// 页面加载时的欢迎消息
window.addEventListener('load', () => {
    console.log('%c🚀 DesktopPetByAi 智能桌面宠物助手', 'font-size: 18px; font-weight: bold; color: #4CAF50;');
    console.log('%c项目地址: https://github.com/cjz-wr/DesktopPetByAi', 'color: #666;');
    console.log('%c项目状态: 测试版 - 功能可扩展性较强', 'color: #666;');
    console.log('%c感谢您对开源项目的支持！', 'color: #666;');
    
    // 添加悬停效果
    document.querySelectorAll('.transform').forEach(el => {
        el.addEventListener('mouseenter', function() {
            if (this.classList.contains('hover:-translate-y-2')) {
                this.style.transform = 'translateY(-8px)';
            }
        });
        
        el.addEventListener('mouseleave', function() {
            if (this.classList.contains('hover:-translate-y-2')) {
                this.style.transform = '';
            }
        });
    });
});

// 防抖函数
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// 滚动时添加动画
window.addEventListener('scroll', debounce(() => {
    const scrolled = window.scrollY;
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrolled > sectionTop - window.innerHeight / 1.5 && 
            scrolled < sectionTop + sectionHeight) {
            section.classList.add('active');
        }
    });
}, 100));