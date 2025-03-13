function makeChoice(choice) {
    const description = document.getElementById("game-description");
    const choice1 = document.getElementById("choice1");
    const choice2 = document.getElementById("choice2");

    if (choice === "left") {
        // 清空当前描述内容
        description.innerHTML = "";
        const paragraph1 = document.createElement("p");
        paragraph1.textContent = "你迈开双脚向左走去，这条路显然要宽些，使你有了一点信心。";
        const paragraph2 = document.createElement("p");
        paragraph2.textContent = "地面上的落叶柔软厚实，你怀抱着谨慎的态度向前，盯着脚下认真地往前走。\n"
         +"路的尽头有了光亮，你听到水流的声音。继续往前走，拨开最后一支扰人的枝叶，一条河流出现在你面前。";
        const paragraph3 = document.createElement("p");
        paragraph3.textContent = "突然开阔的视野使你心情愉悦，河流干净莹润，头顶毫无遮挡的星空投射在水上，夜风拂过，密布的树林变成河边柔软的草地。\n"
        +"一种巨大的自由使你感到幸福，你想象着自己马上就可以在这一片秘境中最大限度地使用自己的身体，你觉得向上或是向下都已不重要，\n"
        +"游和飞不过是同一个动作的两种形式...";
        description.appendChild(paragraph1);
        description.appendChild(paragraph2);
        description.appendChild(paragraph3);
        // 更新按钮文本和逻辑
        choice1.textContent = "飞进星河";
        choice1.onclick = () => makeChoice("x");
        choice2.textContent = "去河里游泳";
        choice2.onclick = () => makeChoice("h");
    } else if (choice === "x") {
        description.textContent = "是的，你做到了，你在群星之间，成为了它们的核心，你被一种磅礴的、通灵般的满足笼罩，\n"
        +"你在空中上升，无数光芒在你周身飞旋，就好像是...某种结局式的演出？故事本像童话一样结束，知道你意识到真的有幽灵一样的按钮仍在纠缠着你。";
        choice1.style.display = "none";
        choice2.textContent = "幽灵一样的按钮";
        choice2.onclick = () => makeChoice("return");
    } else if (choice === "h") {
        description.textContent = "你一下扎身水底，沁凉的河让你觉得白日的烦恼在一瞬间消散了，只有现在的体验弥足珍贵，\n"
        +"你不愿意再去想过去和未来，也不再去想自己怎么会在这里...然而你只享受了很短一段时间，突然意识到自己眼前竟一直有这么一个或两个可悲的按钮，告诉你一切并没有结束。";
        choice1.style.display = "none";
        choice2.textContent = "可悲的按钮";
        choice2.onclick = () => makeChoice("return");
    }
    
    
    else if (choice === "right") {
        // 清空当前描述内容
        description.innerHTML = "";
        const paragraph1 = document.createElement("p");
        paragraph1.textContent = "出于习惯，就像你总喜欢先吃掉不喜欢的菜，你迈开双脚向右走去，这片林子因为你的走动好像被惊醒了。";
        const paragraph2 = document.createElement("p");
        paragraph2.textContent = "地面上腐败的树叶令人作呕，踩在上面像是踩在人不断揉搓变得通红充血的眼皮，你强忍着不适向前走去。";
        const paragraph3 = document.createElement("p");
        paragraph3.textContent = "一片林中空地出现在你面前，从逼仄的小路出现，让你觉得终于能重新呼吸，你甚至可以听到自己呼气声。\n"
        +"不，不是的，那不是你的呼吸！空地中心一头黑色的怪物正伏在那里，你看到它的身体随着呼吸起伏，经受短暂的惊吓之后你忽然放松了下来。\n";
        +"这样离谱的事情，梦中之梦而已，你怀着戏谑的心态盘算自己有多少种方式刺激自己从梦中醒来。";
        // 将段落插入到描述容器中
        description.appendChild(paragraph1);
        description.appendChild(paragraph2);
        description.appendChild(paragraph3);
        // 更新按钮文本和逻辑
        choice1.textContent = "掐一下自己";
        choice1.onclick = () => makeChoice("qzj");
        choice2.textContent = "掐一下怪物";
        choice2.onclick = () => makeChoice("qgw");
    } else if (choice === "qzj") {
        description.textContent = "你并没有就此醒来，关于未知的恐惧被成倍放大然后释放，铺天盖地笼罩了你，你再没有办法做出任何动作...";
        choice1.style.display = "none";
        choice2.textContent = "下一个循环";
        choice2.onclick = () => makeChoice("return");
    } else if (choice === "qgw") {
        description.textContent = "怪物在你走到半途就突然醒来扑向你，你甚至没看清它的样子...";
        choice1.style.display = "none";
        choice2.textContent = "试图从梦中惊醒";
        choice2.onclick = () => makeChoice("return");
    }


    // 返回
    else if (choice === "return") {
        // 返回首页的逻辑
        description.textContent = "在人生的中途，我发现我已经迷失了正路，走进了一座幽暗的森林……";
        choice1.style.display = "none";
        choice2.style.display = "none";
        setTimeout(() => {
            window.location.href = "index.html"; // 重新加载首页
        }, 2000); // 2秒后返回首页
    }
}