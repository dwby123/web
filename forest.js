function makeChoice() {
    const nameInput = document.getElementById("nameInput").value;
    if (nameInput === "金属铜条") {
        window.location.href = "f1.html"; // 解锁成功，跳转到指定页面
    } else {
        alert("必须找到钥匙");
    }
}