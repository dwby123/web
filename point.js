// Point 类：表示一个二维平面上的点
class Point {
    constructor(x = 0, y = 0) {
        this.position = { x: x, y: y }; // 初始化点的位置，默认为 (0, 0)
    }

    // 计算当前点到另一个点的距离
    distanceTo(other) {
        const dx = other.position.x - this.position.x; // 计算 x 轴上的差值
        const dy = other.position.y - this.position.y; // 计算 y 轴上的差值
        return Math.sqrt(dx * dx + dy * dy); // 使用勾股定理计算距离
    }

    // 克隆当前点的位置
    clonePosition() {
        return { x: this.position.x, y: this.position.y }; // 返回一个新的对象，包含当前点的位置
    }
}
export default Point;