class Tools {
    static iscolliding(player, enemy) {
        const distance = player.distanceTo(enemy);
        return distance < (player.size / 2 + enemy.size / 2);
    }
}

export default Tools;