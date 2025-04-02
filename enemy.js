import Point from './point.js';

class Enemy extends Point {
    constructor() {
        super();
        this.size = 6 + 4 * Math.random();
        this.speed = 3 + 2 * Math.random();
        Enemy.initializeEnemy(this, window.innerWidth, window.innerHeight);
    }

    // 初始化敌人位置
    static initializeEnemy(enemy, worldWidth, worldHeight) {
        if (Math.random() < 0.5) {
            // 50% 的概率，敌人从屏幕上方进入
            enemy.position.x = Math.random() * worldWidth; // 随机生成 x 坐标
            enemy.position.y = -enemy.size; // y 坐标在屏幕上方边界
        } else {
            // 50% 的概率，敌人从屏幕右侧进入
            enemy.position.x = worldWidth + enemy.size; // x 坐标在屏幕右侧边界
            enemy.position.y = Math.random() * worldHeight; // 随机生成 y 坐标
        }
    }

    // 检查敌人位置并更新其状态
    static checkEnemyPosition(enemy, worldWidth, worldHeight) {
        // 模拟敌人移动
        enemy.position.y += enemy.speed;
        enemy.position.x -= enemy.speed;

        // 检查敌人是否超出屏幕范围
        if (enemy.position.x < -enemy.size || enemy.position.y > worldHeight + enemy.size) {
            return false; // 超出屏幕范围，返回 false 表示需要删除
        }
        return true; // 仍在屏幕范围内
    }

    // 绘制敌人
    static drawEnemy(ctx, enemy) {
        ctx.beginPath(); // 开始绘制路径
        ctx.fillStyle = "#ff0000"; // 设置敌人颜色为红色
        ctx.arc(enemy.position.x, enemy.position.y, enemy.size / 2, 0, Math.PI * 2); // 绘制圆形敌人
        ctx.fill(); // 填充颜色
    }
}

export default Enemy;