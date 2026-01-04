// 安装页面特定的JavaScript逻辑
document.addEventListener('DOMContentLoaded', function() {
    // 安装页面特定的逻辑可以放在这里
    // 例如：下载按钮的点击统计、安装步骤动画等
    
    console.log('DesktopPetByAi 安装页面加载完成');
    
    // 下载按钮点击事件（如果需要）
    const downloadButtons = document.querySelectorAll('a[href*="DesktopPetByAi.exe"]');
    downloadButtons.forEach(button => {
        button.addEventListener('click', function() {
            console.log(`下载按钮被点击: ${this.textContent}`);
            // 这里可以添加下载统计代码
        });
    });
});