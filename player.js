import Point from './point.js';

class Player extends Point {
    constructor() {
        super();
        this.size = 20; // 玩家大小
        this.health = 999; // 玩家生命值
        this.position.x = 0; // 玩家初始位置
        this.position.y = 0;

        this.trail = []; // 拖尾点数组
        this.maxTrailLength = 5; // 拖尾最大长度
        this.trailDistanceThreshold = 10; // 拖尾采样间隔（像素），这里设置为10像素
        this.lastSamplePosition = this.clonePosition(); // 上次采样位置
    }

    updatePlayerPosition(x, y) {
        this.position.x = x;
        this.position.y = y;
        this.updateTrail();
    }

    updateTrail() {
        // 计算当前点与上次采样点之间的距离
        const distance = Math.sqrt(
            (this.position.x - this.lastSamplePosition.x) ** 2 +
            (this.position.y - this.lastSamplePosition.y) ** 2
        );

        // 如果移动的距离大于采样间隔，则记录新的位置
        if (distance >= this.trailDistanceThreshold) {
            this.trail.push(this.clonePosition()); // 记录当前玩家位置
            this.lastSamplePosition = this.clonePosition(); // 更新上次采样位置
        }

        // 如果拖尾点超过最大长度，移除最早的点
        if (this.trail.length > this.maxTrailLength) {
            this.trail.shift();
        }
    }

    draw(ctx) {
        // 绘制玩家主体
        ctx.beginPath();
        ctx.fillStyle = "#b1eaff";
        ctx.arc(this.position.x, this.position.y, this.size / 2, 0, Math.PI * 2);
        ctx.fill();

        // 绘制拖尾
        ctx.strokeStyle = "#b1ea0f";
        ctx.lineWidth = 2;
        ctx.beginPath();
        for (let i = 0; i < this.trail.length; i++) {
            const trailPoint = this.trail[i];
            ctx.globalAlpha = 1 - (i / this.maxTrailLength); // 设置当前拖尾点的透明度
            ctx.arc(trailPoint.x, trailPoint.y, this.size / 2, 0, Math.PI * 2); // 绘制一个圆
        }
        ctx.stroke();
        ctx.globalAlpha = 1; // 重置透明度
    }

    reduceHealth(amount) {
        this.health -= amount;
        if (this.health <= 0) {
            this.health = 0;
        }
    }

    resetHealth() {
        this.health = 3;
    }

    isPlayerAlive() {
        return this.health > 0;
    }
}

export { Player };