const button = document.getElementById('loveButton');
const canvas = document.getElementById('fireworksCanvas');
const ctx = canvas.getContext('2d');
const loveMessage = document.getElementById('loveMessage');
const welcomeMessage = document.getElementById('welcomeMessage');
let clickCount = 0;
let allParticles = [];

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// 创建漂浮的心形
function createHearts() {
    const heartsContainer = document.querySelector('.hearts');

    for (let i = 0; i < 15; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.classList.add('heart');
            heart.style.left = `${Math.random() * 100}%`;
            heart.style.top = `${Math.random() * 100}%`;
            heart.style.animationDelay = `${Math.random() * 5}s`;
            heart.style.opacity = Math.random() * 0.5 + 0.3;
            heart.style.width = `${Math.random() * 20 + 10}px`;
            heart.style.height = heart.style.width;
            heartsContainer.appendChild(heart);
        }, i * 1000);
    }
}

// 创建闪烁星星
function createStars() {
    const starsContainer = document.querySelector('.stars');

    for (let i = 0; i < 100; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.animationDelay = `${Math.random() * 2}s`;
        star.style.width = `${Math.random() * 3 + 1}px`;
        star.style.height = star.style.width;
        starsContainer.appendChild(star);
    }
}

// 绘制心形函数
function drawHeart(x, y, size) {
    ctx.save();
    ctx.beginPath();
    ctx.translate(x, y);
    ctx.rotate(Math.PI);
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

// 发射烟花
function launchFireworks() {
    const centerX = Math.random() * canvas.width;
    const centerY = Math.random() * canvas.height;
    const colors = ['#ff0000', '#ff69b4', '#ff1493', '#ffff00', '#ff00ff', '#00ffff'];
    const particles = [];
    
    // 随机选择烟花类型
    const type = Math.random() > 0.5 ? 'circle' : 'heart';
    const particleCount = Math.floor(Math.random() * 50) + 50; // 50-100个粒子
    
    for (let i = 0; i < particleCount; i++) {
        const angle = type === 'circle' ? Math.random() * Math.PI * 2 : (Math.PI * 2 * i) / particleCount;
        const speed = Math.random() * 5 + 2;
        const color = colors[Math.floor(Math.random() * colors.length)];
        particles.push({
            x: centerX,
            y: centerY,
            angle: angle,
            speed: speed,
            color: color,
            life: Math.random() * 50 + 50,
            size: Math.random() * 3 + 1,
            type: type,
            rotation: Math.random() * Math.PI * 2, // 初始旋转角度
            rotationSpeed: (Math.random() - 0.5) * 0.1 // 旋转速度
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

// 烟花动画
function animateFireworks() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // 更新并绘制所有粒子
    allParticles.forEach((particle, index) => {
        particle.x += Math.cos(particle.angle) * particle.speed;
        particle.y += Math.sin(particle.angle) * particle.speed;
        particle.life -= 1;

        // 更新旋转角度
        if (particle.type === 'heart') {
            particle.rotation += particle.rotationSpeed;
        }
        
        if (particle.life > 0) {
            ctx.fillStyle = particle.color;
            
            if (particle.type === 'heart') {
                // 绘制旋转的心形
                ctx.save();
                ctx.translate(particle.x, particle.y);
                ctx.rotate(particle.rotation);
                drawHeart(0, 0, particle.size);
                ctx.restore();
            } else {
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }
    });
    
    // 移除生命周期结束的粒子
    allParticles = allParticles.filter(particle => particle.life > 0);
    
    // 显示消息
    loveMessage.classList.add('visible');
    
    // 如果还有粒子，继续动画
    if (allParticles.length > 0) {
        requestAnimationFrame(animateFireworks);
    } else {
        window.fireworksAnimationRunning = false;
    }
}

// 点击事件处理
button.addEventListener('click', () => {
    clickCount++;
    
    // 根据点击次数显示不同消息
    let msg = `今天想了小欣${clickCount}次`;
    if (clickCount === 10) msg = "好想见你！";
    if (clickCount === 20) msg = "超级想你！";
    if (clickCount === 30) msg = "我爱你！";
    
    loveMessage.textContent = msg;
    loveMessage.classList.remove('visible');
    
    // 发射新烟花
    launchFireworks();
    
    // 点击按钮动画
    button.style.transform = 'scale(0.9)';
    setTimeout(() => {
        button.style.transform = 'scale(1.1)';
    }, 100);
});

// 窗口大小调整
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    // 重绘所有烟花
    if (allParticles.length > 0) {
        animateFireworks();
    }
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

    if (hour < 12) {
        message = '小欣早上好~';
    } else if (hour < 18) {
        message = '小欣下午好~';
    } else {
        message = '小欣晚上好~';
    }

    return message;
}

// DOM加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    createHearts();
    createStars();
    
    const welcomeMsg = getWelcomeMessage();
    welcomeMessage.textContent = welcomeMsg;
    welcomeMessage.classList.add('visible');

    setTimeout(() => {
        welcomeMessage.classList.remove('visible');
    }, 2000);
});