const button = document.getElementById('loveButton');
const canvas = document.getElementById('fireworksCanvas');
const ctx = canvas.getContext('2d');
const loveMessage = document.getElementById('loveMessage');
const welcomeMessage = document.getElementById('welcomeMessage');
const clickSound = document.getElementById('clickSound');
const fireworkSound = document.getElementById('fireworkSound');
const sparklesContainer = document.querySelector('.sparkles');

let clickCount = 0;
let allParticles = [];
let resizeTimeout;

// 初始化画布大小
function initCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

initCanvas();

// 创建漂浮的心形
function createHearts() {
    const heartsContainer = document.querySelector('.hearts');

    for (let i = 0; i < 25; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.classList.add('heart');
            heart.style.left = `${Math.random() * 100}%`;
            heart.style.top = `${Math.random() * 100}%`;
            heart.style.animationDelay = `${Math.random() * 5}s`;
            heart.style.animationDuration = `${Math.random() * 15 + 10}s`;
            heart.style.opacity = Math.random() * 0.6 + 0.4;
            const size = Math.random() * 25 + 15;
            // 设置CSS变量控制尺寸
            heart.style.setProperty('--heart-size', `${size}px`);
            heart.style.width = `${size}px`;
            heart.style.height = `${size}px`;
            heartsContainer.appendChild(heart);
        }, i * 600);
    }
}

// 创建闪烁星星
function createStars() {
    const starsContainer = document.querySelector('.stars');

    for (let i = 0; i < 200; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.animationDelay = `${Math.random() * 3}s`;
        star.style.animationDuration = `${Math.random() * 4 + 2}s`;
        const size = Math.random() * 3 + 1;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        starsContainer.appendChild(star);
    }
}

// 创建弥散光点
function createSparkles() {
    for (let i = 0; i < 40; i++) {
        setTimeout(() => {
            const sparkle = document.createElement('div');
            sparkle.classList.add('sparkle');
            
            // 随机位置
            const centerX = Math.random() * window.innerWidth;
            const centerY = Math.random() * window.innerHeight;
            
            // 随机弥散方向
            const angle = Math.random() * Math.PI * 2;
            const distance = Math.random() * 200 + 100;
            const tx = Math.cos(angle) * distance;
            const ty = Math.sin(angle) * distance;
            
            sparkle.style.left = `${centerX}px`;
            sparkle.style.top = `${centerY}px`;
            sparkle.style.setProperty('--tx', `${tx}px`);
            sparkle.style.setProperty('--ty', `${ty}px`);
            sparkle.style.animationDuration = `${Math.random() * 2 + 1}s`;
            sparkle.style.opacity = Math.random() * 0.7 + 0.3;
            const size = Math.random() * 5 + 2;
            sparkle.style.width = `${size}px`;
            sparkle.style.height = `${size}px`;
            sparklesContainer.appendChild(sparkle);
            
            // 光点消失后移除
            setTimeout(() => {
                sparkle.remove();
            }, (parseFloat(sparkle.style.animationDuration) * 1000));
        }, i * 200);
    }
}

// 绘制心形函数
function drawHeart(x, y, size, color, rotation) {
    ctx.save();
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.translate(x, y);
    ctx.rotate(rotation);
    ctx.scale(size, size);
    
    // 心形路径
    ctx.moveTo(0, 0);
    ctx.bezierCurveTo(0, -2, -2, -3, -3, -3);
    ctx.bezierCurveTo(-5, -3, -5, 0, -5, 1);
    ctx.bezierCurveTo(-5, 3, -2, 5, 0, 7);
    ctx.bezierCurveTo(2, 5, 5, 3, 5, 1);
    ctx.bezierCurveTo(5, 0, 5, -3, 3, -3);
    ctx.bezierCurveTo(2, -3, 0, -2, 0, 0);
    
    ctx.fill();
    ctx.restore();
}

// 文本爆发效果
function launchTextExplosion(text, x, y) {
    const particles = [];
    const particleCount = 50;
    const color = 'rgba(255, 255, 255, 0.8)'; // 修改为带透明度的白色

    for (let i = 0; i < particleCount; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 8 + 4;
        particles.push({
            text: text,
            x: x,
            y: y,
            angle: angle,
            speed: speed,
            life: Math.random() * 100 + 80,
            size: Math.random() * 3 + 1,
            alpha: 0.8,
            color: color // 使用带透明度的白色
        });
    }

    allParticles = allParticles.concat(particles);

    if (!window.fireworksAnimationRunning) {
        animateFireworks();
        window.fireworksAnimationRunning = true;
    }
}

// 烟花动画更新，支持文本粒子
function animateFireworks() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    for (let i = 0; i < allParticles.length; i++) {
        const particle = allParticles[i];
        particle.x += Math.cos(particle.angle) * particle.speed;
        particle.y += Math.sin(particle.angle) * particle.speed;
        particle.life -= 1;
        particle.alpha = particle.life / 100;

        if (particle.life > 0) {
            ctx.globalAlpha = particle.alpha;
            
            if (particle.text) {
                ctx.shadowBlur = 20;
                ctx.shadowColor = 'rgba(255, 255, 255, 0.8)';
                ctx.fillStyle = particle.color || 'rgba(255, 255, 255, 0.8)'; // 确保有默认颜色
                ctx.font = `${particle.size * 10}px Arial`;
                ctx.fillText(particle.text, particle.x, particle.y);
                ctx.shadowBlur = 0;
            } else if (particle.type === 'heart') {
                drawHeart(particle.x, particle.y, particle.size, particle.color, particle.rotation);
            } else {
                ctx.fillStyle = particle.color || 'rgba(255, 255, 255, 0.8)'; // 确保有默认颜色
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                ctx.fill();
            }
            ctx.globalAlpha = 1;
        }
    }
    
    allParticles = allParticles.filter(particle => particle.life > 0);
    
    if (allParticles.length > 0) {
        requestAnimationFrame(animateFireworks);
    } else {
        window.fireworksAnimationRunning = false;
    }
}

// 发射烟花
function launchFireworks() {
    try {
        fireworkSound.currentTime = 0;
        fireworkSound.play();
    } catch (e) {
        console.log("Audio play failed:", e);
    }
    
    const centerX = Math.random() * canvas.width;
    const centerY = Math.random() * canvas.height;
    const colors = ['#ff85c0', '#ff5c9d', '#ff3d7f', '#ffffa5', '#ffd5ff', '#a5ffff'];
    const particles = [];
    
    // 随机选择烟花类型
    const type = Math.random() > 0.5 ? 'circle' : 'heart';
    const particleCount = Math.floor(Math.random() * 120) + 100; // 100-220个粒子
    
    for (let i = 0; i < particleCount; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 8 + 4;
        const color = colors[Math.floor(Math.random() * colors.length)];
        particles.push({
            x: centerX,
            y: centerY,
            angle: angle,
            speed: speed,
            color: color,
            life: Math.random() * 100 + 80,
            size: Math.random() * 5 + 1,
            type: type,
            rotation: Math.random() * Math.PI * 2,
            rotationSpeed: (Math.random() - 0.5) * 0.1,
            alpha: 1
        });
    }

    // 将新粒子添加到全局数组
    allParticles = allParticles.concat(particles);

    // 如果动画未运行，则启动动画
    if (!window.fireworksAnimationRunning) {
        animateFireworks();
        window.fireworksAnimationRunning = true;
    }
}

// 点击事件处理
button.addEventListener('click', () => {
    try {
        clickSound.currentTime = 0;
        clickSound.play();
    } catch (e) {
        console.log("Audio play failed:", e);
    }
    
    clickCount++;
    
    // 根据点击次数显示不同消息
    let msg = `今天想了小欣${clickCount}次`;
    if (clickCount === 10) {
        msg = "好想见你💕";
        launchTextExplosion(msg, canvas.width / 2, canvas.height / 2); // 触发文本爆发
    } else if (clickCount === 20) {
        msg = "超级想你💘";
        launchTextExplosion(msg, canvas.width / 2, canvas.height / 2); // 触发文本爆发
    } else if (clickCount === 30) {
        msg = "爱你💖";
        launchTextExplosion(msg, canvas.width / 2, canvas.height / 2); // 触发文本爆发
    } else if (clickCount === 40) {
        msg = "你好呀亲爱的🌎";
        launchTextExplosion(msg, canvas.width / 2, canvas.height / 2); // 触发文本爆发
    // } else if (clickCount >= 50) {
    //     msg = "别点啦，快去学习！💕";
    }

    // 更新中心示爱消息
    loveMessage.textContent = msg;
    loveMessage.classList.add('visible');

    // 发射新烟花
    launchFireworks();
    createSparkles();
    
    // 点击按钮动画
    button.style.transform = 'scale(0.9)';
    setTimeout(() => {
        button.style.transform = 'scale(1.1)';
    }, 100);
});

// 触摸事件支持
button.addEventListener('touchstart', () => {
    button.style.transform = 'scale(0.9)';
});
button.addEventListener('touchend', () => {
    button.style.transform = 'scale(1.1)';
});

// 窗口大小调整
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        initCanvas();
        if (allParticles.length > 0) {
            animateFireworks();
        }
    }, 200);
});

// 加载动画
window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    loader.style.opacity = '0';
    setTimeout(() => {
        loader.style.display = 'none';
    }, 1000);
});

// 个性化欢迎消息
function getWelcomeMessage() {
    const now = new Date();
    const hour = now.getHours();
    let message = '';

    if (hour < 5) {
        message = '小欣凌晨好~ 快睡觉！💤';
    } else if (hour < 12) {
        message = '小欣早上好~ 今天也很爱你🌞';
    } else if (hour < 18) {
        message = '小欣下午好~ 想你了💕';
    } else {
        message = '小欣晚上好~ 🌙';
    }

    return message;
}

// DOM加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    createHearts();
    createStars();
    createSparkles();
    setInterval(createSparkles, 2000);
    
    const welcomeMsg = getWelcomeMessage();
    welcomeMessage.textContent = welcomeMsg;
    welcomeMessage.classList.add('visible');

    setTimeout(() => {
        welcomeMessage.classList.remove('visible');
    }, 3000);
});