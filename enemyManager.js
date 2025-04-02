// enemyManager.js
import Enemy from './enemy.js';

class EnemyManager {
    constructor(maxEnemies) {
        this.maxEnemies = maxEnemies; // 最大敌人数量
        this.enemies = []; // 存储敌人数组
    }

    // 添加敌人
    addEnemy() {
        if (this.enemies.length < this.maxEnemies) {
            this.enemies.push(new Enemy());
        }
    }

    // 移除敌人
    removeEnemyAt(index) {
        this.enemies.splice(index, 1);
    }

    // 更新敌人状态
    updateEnemies(ctx, canvas) {
        for (let i = this.enemies.length - 1; i >= 0; i--) {
            const enemy = this.enemies[i];

            // 检查敌人是否超出屏幕范围
            if (!Enemy.checkEnemyPosition(enemy, canvas.width, canvas.height)) {
                this.removeEnemyAt(i);
                continue;
            }

            // 绘制敌人
            Enemy.drawEnemy(ctx, enemy);
        }
    }

    // 获取敌人数组
    getEnemies() {
        return this.enemies;
    }
}

export default EnemyManager;