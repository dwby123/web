const canvas = document.getElementById('fireworksCanvas');
const ctx = canvas.getContext('2d');
const loveMessage = document.getElementById('loveMessage');
const sparklesContainer = document.querySelector('.sparkles');
const heartsContainer = document.querySelector('.hearts');
const starsContainer = document.querySelector('.stars');
const background = document.querySelector('.background'); // 添加背景选择器

let clickCount = 1;
let allParticles = [];
let resizeTimeout;
let fireworksEnabled = false;

// 初始化画布大小
function initCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

initCanvas();

// 创建漂浮的心形
function createHearts() {
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
            heart.style.setProperty('--heart-size', `${size}px`);
            heart.style.width = `${size}px`;
            heart.style.height = `${size}px`;
            heartsContainer.appendChild(heart);
        }, i * 600);
    }
}

// 创建闪烁星星
function createStars() {
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
        star.style.opacity = Math.random() * 0.7 + 0.3; // 修改这里，让星星的透明度变化更平滑
        starsContainer.appendChild(star);
    }
}

// 创建弥散光点
function createSparkles() {
    for (let i = 0; i < 40; i++) {
        const sparkle = document.createElement('div');
        sparkle.classList.add('sparkle');
        const centerX = Math.random() * window.innerWidth;
        const centerY = Math.random() * window.innerHeight;
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
    const color = 'rgba(255, 255, 255, 0.8)';
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
            color: color
        });
    }
    allParticles = allParticles.concat(particles);
    if (!window.fireworksAnimationRunning) {
        animateFireworks();
        window.fireworksAnimationRunning = true;
    }
}

// 烟花动画更新
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
                ctx.fillStyle = particle.color;
                ctx.font = `${particle.size * 10}px Arial`;
                ctx.fillText(particle.text, particle.x, particle.y);
                ctx.shadowBlur = 0;
            } else if (particle.type === 'heart') {
                particle.rotation += particle.rotationSpeed;
                drawHeart(particle.x, particle.y, particle.size, particle.color, particle.rotation);
            } else {
                ctx.fillStyle = particle.color;
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
// function launchFireworks(x, y) {
//     const colors = ['#ff85c0', '#ff5c9d', '#ff3d7f', '#ffffa5', '#ffd5ff', '#a5ffff'];
//     const particles = [];
//     const type = Math.random() > 0.5 ? 'circle' : 'heart';
//     const particleCount = Math.floor(Math.random() * 120) + 100;
//     for (let i = 0; i < particleCount; i++) {
//         const angle = Math.random() * Math.PI * 2;
//         const speed = Math.random() * 6 + 2; // 修改这里，让烟花速度更慢
//         const color = colors[Math.floor(Math.random() * colors.length)];
//         particles.push({
//             x: x,
//             y: y,
//             angle: angle,
//             speed: speed,
//             color: color,
//             life: Math.random() * 100 + 80,
//             size: Math.random() * 3 + 1, // 修改这里，让烟花更小
//             type: type,
//             rotation: Math.random() * Math.PI * 2,
//             rotationSpeed: (Math.random() - 0.5) * 0.1,
//             alpha: 1
//         });
//     }
//     allParticles = allParticles.concat(particles);
//     if (!window.fireworksAnimationRunning) {
//         animateFireworks();
//         window.fireworksAnimationRunning = true;
//     }
// }
// 点击放烟花 → 改成放漂浮爱心
function launchFireworks(x, y) {
    const hearts = [];
    const count = 18;                 // 一次放 18 颗，可随意调
    for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.3;
        const speed = Math.random() * 0.6 + 0.6; // 很慢
        const life = Math.random() * 180 + 220;  // 飘得更久
        hearts.push({
            x: x,
            y: y,
            angle: angle,
            speed: speed,
            life: life,
            size: Math.random() * 3 + 0.8,
            color: ['#ff85c0', '#ff5c9d', '#ffd5ff', '#a5ffff'][Math.floor(Math.random() * 4)],
            rotation: Math.random() * Math.PI * 2,
            rotationSpeed: (Math.random() - 0.5) * 0.03,
            type: 'heart'
        });
    }
    allParticles = allParticles.concat(hearts);
    if (!window.fireworksAnimationRunning) {
        animateFireworks();
        window.fireworksAnimationRunning = true;
    }
}

/* ========== 长按逻辑 ========== */
let pressTimer = null;          // 长按定时器
const RELEASE_INTERVAL = 120;   // 每 120 ms 补一颗爱心

function startRelease(e) {
    if (pressTimer) return;     // 防止重复触发
    const x = e.clientX ?? e.touches[0].clientX;
    const y = e.clientY ?? e.touches[0].clientY;
    pressTimer = setInterval(() => launchFireworks(x, y), RELEASE_INTERVAL);
}

function stopRelease() {
    clearInterval(pressTimer);
    pressTimer = null;
}

/* 鼠标 */
document.addEventListener('mousedown', startRelease);
document.addEventListener('mouseup', stopRelease);
document.addEventListener('mouseleave', stopRelease);

/* 触屏 */
document.addEventListener('touchstart', startRelease, {passive:true});
document.addEventListener('touchend', stopRelease);
document.addEventListener('touchcancel', stopRelease);

// 对话逻辑
const dialogues = [
    { text: "早安，亲爱的", effects: [] },
    { text: "又见面了", effects: [] },
    { text: "抱不到你的时候", effects: [] },
    { text: "我就在这小小的手机里", effects: [] },
    { text: "期待...", effects: [] }, 
    { text: "你是我的旅行青蛙吗？", effects: ["showBackground:default"] },
    { text: "向我炫耀你的背包", effects: [] },
    { text: "告诉我你的见闻", effects: [] },
    { text: "为我分享\n让你感到快乐的一切", effects: [] },
    { text: "衔起细碎的,", effects: [] },
    { text: "闪着光的,世界的瓦片", effects: [] },
    { text: "一路到我身边", effects: [] },
    { text: "拓展我宇宙的疆界...", effects: ["createStars"] },
    { text: "我亲爱的", effects: [] },
    { text: "了不起的你", effects: [] },
    { text: "在秋千上大声呼喊了吗？", effects: [] },
    { text: "带着笑", effects: [] },
    { text: "自由", effects: [] },
    { text: "随心所欲地", effects: [] },
    { text: "运用自己的肢体了吗？", effects: [] },
    { text: "我喜欢你舒展地", effects: [] },
    { text: "像棵秋天的树", effects: [] },
    { text: "快意、张扬、坦荡", effects: ["createSparkles"] },
    { text: "喜欢你笑", effects: [] },
    { text: "那表情勾画人类清晰的轮廓", effects: [] },
    { text: "我喜欢你是舒展的。", effects: [] },
    { text: "世界正在下雨", effects: [] },
    { text: "我们根系生长", effects: ["createHearts"] },
    { text: "又是这些漂浮的心", effects: [] },
    { text: "亲爱的", effects: [] },
    { text: "上一个网页它们也这样漂浮", effects: [] },
    { text: "一个矩形，两个圆形", effects: [] },
    { text: "一颗心的底层代码", effects: [] },
    { text: "不过是最基础的形态", effects: [] },
    { text: "由你自由拼接", effects: [] },
    { text: "你要它是心脏", effects: [] },
    { text: "它便是了", effects: ["unlockFireworks"] },
    { text: "今天也玩得开心，宝贝", effects: ["unlockFireworks"] },
];

/* ========== 文字切换 + 随机变化 ========== */
function randomizeMessageStyle() {
    const msg = document.getElementById('loveMessage');
    const fs = 22 + Math.floor(Math.random() * 5 - 2);        // 20-24px
    const weight = Math.random() > .5 ? 700 : 400;            // 粗/正常
    const hue = Math.floor(Math.random() * 360);              // 0-359°
    const shadow = `
    0 0  8px  hsl(${hue},100%,75%),
    0 0 16px  hsl(${hue},100%,65%),
    0 0 24px  hsl(${hue},100%,55%),
    0 0 32px  hsl(${hue},100%,45%)`;
    const dur = (Math.random() * 0.8 + 1.2).toFixed(2);     // 1.2-2s

    msg.style.fontSize = `${fs}px`;
    msg.style.fontWeight = weight;
    msg.style.textShadow = shadow;
    msg.style.transition = `all ${dur}s cubic-bezier(0.22,0.61,0.36,1)`;
}

function showNextDialogue() {
    const currentDialogue = dialogues[clickCount];
    if (!currentDialogue) return;

    loveMessage.innerHTML = currentDialogue.text.replace(/\n/g, '<br>');
    randomizeMessageStyle();
    loveMessage.classList.add('visible');

    currentDialogue.effects.forEach(effect => {
        if (effect === "createStars") createStars();
        else if (effect === "createHearts") createHearts();
        else if (effect === "createSparkles") createSparkles();
        else if (effect === "unlockFireworks") fireworksEnabled = true;
        else if (effect.startsWith("showBackground")) {
            const className = effect.split(":")[1] || "default";
            background.className = "background background--" + className;
            background.style.display = 'block';
            background.style.opacity = '0';
            setTimeout(() => {
                background.style.opacity = '1';
            }, 100);
        }
    });
}

// 点击事件处理
document.addEventListener('click', (event) => {
    if (clickCount >= dialogues.length) {
        if (fireworksEnabled) {
            const x = event.clientX;
            const y = event.clientY;
            launchFireworks(x, y);
        }
    } else {
        loveMessage.classList.remove('visible');
        setTimeout(() => {
            showNextDialogue();
            clickCount++;
        }, 1000); // 修改这里，增加文字切换时间
    }
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


// // 用户首次点击（或按键）后取消静音，让声音真正响起
// function unmute() {
// const audio = document.getElementById('bgm');
// audio.muted = false;
// // 只监听一次，避免重复触发
// document.removeEventListener('click', unmute);
// document.removeEventListener('keydown', unmute);
// }
// document.addEventListener('click', unmute);
// document.addEventListener('keydown', unmute);