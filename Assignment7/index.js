let currentScore = 0; // 记录分数
let userGesture = ""; // 用户手势
let pcGesture = ""; // 电脑的手势

//遮罩和弹窗
const cover = document.querySelector("#cover");
const modal = document.querySelector("#modal");
// 分数
const score = document.querySelector("#score");

// 获取剪刀石头布按钮（3个）
const btnList = document.querySelectorAll(".page1-btn");
// 初始页面和变化后的页面
const page1 = document.querySelector("#page1");
const page2 = document.querySelector("#page2");

// 变化后的两个按钮
const userBtn = document.querySelector("#userBtn");
const pcBtn = document.querySelector("#pcBtn");
// 结果文本
const resultText = document.querySelector("#resultText");

// 给初始页面三个按钮添加点击事件
for (let btn of btnList) {
    btn.addEventListener("click", () => {

        userGesture = btn.id;

        //生成[0,2]的随机数
        let index = Math.floor(3 * Math.random());
        pcGesture = btnList[index].id;

        // 根据输赢改变分数
        currentScore += judge(userGesture, pcGesture);
        score.innerText = currentScore;

        // 隐藏page1，显示page2
        page1.classList.toggle("hide");
        page2.classList.toggle("hide");
        // 添加对应手势的样式
        userBtn.classList.add(userGesture);
        pcBtn.classList.add(pcGesture);
        document.querySelector("#userImg").src = "./images//" + userGesture + ".svg";
        document.querySelector("#pcImg").src = "./images//" + pcGesture + ".svg";
        // 赢的一方添加filter样式
        if (judge(userGesture, pcGesture) == 1) {
            userBtn.classList.add("win");
            resultText.innerText = "您赢了";
        } else if (judge(userGesture, pcGesture) == -1) {
            pcBtn.classList.add("win");
            resultText.innerText = "您输了";
        } else {
            resultText.innerText = "打平手";
        }
    });
}
// 给查看规则按钮添加点击事件
document.querySelector("#rules").addEventListener("click", () => {
    cover.style.display = "block";
    modal.style.display = "block";
});

// 点击再来一局
document.querySelector("#again").addEventListener("click", () => {
    // 清除两个按钮的filter样式
    userBtn.classList.remove("win");
    pcBtn.classList.remove("win");
    // 边框样式清除
    userBtn.classList.remove(userGesture);
    pcBtn.classList.remove(pcGesture);
    // 显示page1，隐藏page2
    page1.classList.toggle("hide");
    page2.classList.toggle("hide");
});

// 点击关闭规则窗口
document.querySelector("#close").addEventListener("click", () => {
    cover.style.display = "none";
    modal.style.display = "none";
});

// 判断输赢
let judge = (user, pc) => {
    if (user === pc) {
        return 0;
    }
    if (
        (user === "rock" && pc === "scissors") ||
        (user === "scissors" && pc === "paper") ||
        (user === "paper" && pc === "rock")
    ) {
        return 1;
    } else {
        return -1;
    }
};
