import { Player } from './player.js';
import EnemyManager from './enemyManager.js';
import Tools from './tools.js';

// 主程序
function main() {
    const canvas = document.getElementById('world');
    const ctx = canvas.getContext('2d');
    const restartButton = document.getElementById('restartButton');

    // 初始化游戏状态
    const enemyManager = new EnemyManager(50); // 最大敌人数量
    const player = new Player(); // 创建玩家实例
    let isGameRunning = true;

    // 设置 Canvas 尺寸为视口大小
    resizeCanvas();

    // 监听窗口大小改变事件
    window.addEventListener('resize', resizeCanvas);

    // 监听鼠标移动事件，更新玩家位置
    canvas.addEventListener('mousemove', (event) => {
        const rect = canvas.getBoundingClientRect();
        player.updatePlayerPosition(event.clientX - rect.left, event.clientY - rect.top);
    });

    // 监听重新开始按钮点击事件
    restartButton.addEventListener('click', () => {
        reset();
        update(ctx, canvas);
    });

    // 游戏更新函数
    function update(ctx, canvas) {
        if (!isGameRunning) return;

        // 清空画布
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // 绘制玩家
        player.draw(ctx);

        // 更新敌人状态
        enemyManager.updateEnemies(ctx, canvas);
        enemyManager.addEnemy();

        // 检查碰撞
        for (let i = enemyManager.getEnemies().length - 1; i >= 0; i--) {
            const enemy = enemyManager.getEnemies()[i];
            if (Tools.iscolliding(player, enemy)) {
                enemyManager.removeEnemyAt(i);
                player.reduceHealth(1);
                if (!player.isPlayerAlive()) {
                    gameOver();
                    return;
                }
            }
        }

        // 请求下一帧动画
        requestAnimationFrame(() => update(ctx, canvas));
    }

    // 游戏结束
    function gameOver() {
        isGameRunning = false;
        restartButton.style.display = "block";
        canvas.style.cursor = "auto"; // 恢复光标为默认状态
        console.log("游戏结束！");
    }

    // 重置游戏状态
    function reset() {
        isGameRunning = true;
        enemyManager.enemies = [];
        player.resetHealth();
        player.updatePlayerPosition(window.innerWidth / 2, window.innerHeight / 2); // 重置玩家位置
        restartButton.style.display = "none"; // 隐藏重新开始按钮
    }

    // 动态调整 Canvas 大小
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    // 开始游戏循环
    update(ctx, canvas);
}

// 确保页面加载完成后运行主程序
window.onload = main;