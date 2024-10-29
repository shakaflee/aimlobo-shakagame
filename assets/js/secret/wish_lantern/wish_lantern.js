



window.onload = function() {
    // 页面资源加载完毕后执行的代码
    // 基础设置
    const bgCanvasWidth = 1024; // 背景画布的宽度 - pc
    const bgCanvasHeight = 512; // 背景画布的高度 - pc

    const wishContentInLang = data[returnLangFromUrl()];

    const bgm = newSound('/audio/secret/wish/quiet-stars-ai-203565', true, 0.5);

    // 许愿记录存储与读取
    const keyName_1_00 = 'secret_wish_lantern';
    const keyName_1_01 = 'wish_record';

    const bonusLuckyPoint = 1; // 每次许愿奖励的幸运值


    // 获取元素
    const infoIconForceClose = document.querySelector('.tips_icon_force_close');
    const btnStartGame = infoIconForceClose.querySelector('.btn_get_it');

    const container = document.getElementById('container');
    const wishContentOther = document.querySelector('.wish_content_other');
    const wishContentOtherTxt = document.querySelector('.wish_content_other_txt');
    const btnCloseWishContentOther = document.querySelector('.btn_close_wish_content_other');

    const btnOpenWishContentMy = document.querySelector('.btn_open_wish_content_my');
    const wishContentMy = document.querySelector('.wish_content_my');
    const userInput = document.getElementById('userInput');
    const btnCloseWishContentMy = document.querySelector('.btn_close_wish_content_my');

    const btnOpenWishContentRecordIndex = document.querySelector('.btn_open_wish_content_record_index');
    const wishContentRecordIndex = document.querySelector('.wish_content_record_index');
    const varWishContentRecordIndex = document.querySelector('.var_wish_content_record_index');
    const btnCloseWishContentRecordIndex = document.querySelector('.btn_close_wish_content_record_index');


    const wishContentRecordContent = document.querySelector('.wish_content_record_content');
    const varWishContentRecordContent = document.querySelector('.var_wish_content_record_content');
    const btnCloseWishContentRecordContent = document.querySelector('.btn_close_wish_content_record_content');




    // 画布 - 背景
    const canvas = document.getElementById("bg_canvas");
    const ctx = canvas.getContext("2d");

    // 读取设备信息 - 屏幕高度和宽度
    const screenWidth = window.screen.width;
    const screenHeight = window.screen.height;

    // console.log("屏幕宽度:", screenWidth);
    // console.log("屏幕高度:", screenHeight);

    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    // console.log("窗口宽度:", windowWidth);
    // console.log("窗口高度:", windowHeight);

    // 读取设备信息 - 分辨率
    const dpr = window.devicePixelRatio || 1;

    // 读取设备信息 - rem
    const rem = parseFloat(getComputedStyle(document.documentElement).fontSize);
    // console.log("1rem 等于：", rem, "px");

    // 函数 - 设置container 和 canvas 的高度和宽度 - 一个屏幕的宽度和高度 - 针对屏幕宽度< 1024的设备
    setContainerWidthAndHeight();
    function setContainerWidthAndHeight() {

        if (screenWidth < 1024) {
            container.style.width = `${windowWidth - rem}px`; // 这里要减去 1rem是因为css中的main设置了最大宽度, 这里利用的宽度是窗口宽度和高度，是因为移动端读取窗口的高度比读取设备的高度更适合，设备的高度因为顶部和底部的原因会高于窗口高度
            container.style.height = `${windowHeight}px`;

            canvas.width = (windowWidth - rem) * dpr; 
            canvas.height = windowHeight * dpr; 

            canvas.style.width = `${windowWidth - rem}px`;
            canvas.style.height = `${windowHeight}px`;

        } else {
            container.style.width = `${bgCanvasWidth}px`;
            container.style.height = `${bgCanvasHeight}px`;

            canvas.width = bgCanvasWidth * dpr;
            canvas.height = bgCanvasHeight * dpr;

            canvas.style.width = `${bgCanvasWidth}px`;
            canvas.style.height = `${bgCanvasHeight}px`;
        }
    }


    // 画背景图
    // 画背景图
    // 画背景图

    // const rect = canvas.getBoundingClientRect();
    // canvas.width = rect.width * dpr;
    // canvas.height = rect.height * dpr;

    ctx.scale(dpr, dpr);

    var img = new Image();

    // User Variables - customize these to change the image being scrolled, its
    // direction, and the speed.

    img.src = "/image/secret/wish_lantern/bg.jpg";
    var CanvasXSize = canvas.width;
    var CanvasYSize = canvas.height;
    var numberOfLights = screenWidth >= 1024 ? 60 : 30; // 生成孔明灯的数量
    var scale = 0.7;
    var y = 0; // vertical offset

    // Main program

    var dx = 0.25; // 这里是水平移动的距离 - 可以理解为控制画面移动速度
    var imgW;
    var imgH;
    var x = 0;
    var clearX;
    var clearY;


    function draw() {
        ctx.clearRect(0, 0, clearX, clearY); // 清除画布

        if (imgW <= CanvasXSize) {
            if (x > CanvasXSize) {
                x = -imgW + x;
            }
            if (x > 0) {
                ctx.drawImage(img, -imgW + x, y, imgW, imgH);
            }
            if (x - imgW > 0) {
                ctx.drawImage(img, -imgW * 2 + x, y, imgW, imgH);
            }
        } else {
            if (x > CanvasXSize) {
                x = CanvasXSize - imgW;
            }
            if (x > CanvasXSize - imgW) {
                ctx.drawImage(img, x - imgW + 1, y, imgW, imgH);
            }
        }
        ctx.drawImage(img, x, y, imgW, imgH);
        x += dx;
        requestAnimationFrame(draw); // 使用 requestAnimationFrame 进行动画刷新
    }
    
    img.onload = function () {
        imgW = img.width * scale;
        imgH = img.height * scale;

        if (imgW > CanvasXSize) {
            x = CanvasXSize - imgW;
        }
        if (imgW > CanvasXSize) {
            clearX = imgW;
        } else {
            clearX = CanvasXSize;
        }
        if (imgH > CanvasYSize) {
            clearY = imgH;
        } else {
            clearY = CanvasYSize;
        }

        requestAnimationFrame(draw); // 初始化时启动动画
    };

    // 画背景图 - end
    // 画背景图 - end
    // 画背景图 - end

    // 生成孔明灯
    // 生成孔明灯
    // 生成孔明灯

    // 生成星星
    function generateStars(containerSelector) {
        var starContainer = document.querySelector(containerSelector);

        var screenW = 300; // 和css设置的pool大小相关
        var screenH = 420;
        
        for (var i = 0; i < 50; i++) {
            var span = document.createElement('span');
            span.setAttribute('class', 'star_item');
            starContainer.appendChild(span);
        
            var x = Math.random() * screenW;
            var y = Math.random() * screenH;
        
            span.style.left = x + 'px';
            span.style.top = y + 'px';
        
            var scale = Math.random() * 1.5;
            span.style.transform = 'scale(' + scale + ')';
        
            var rate = Math.random() * 1.5;
            span.style.animation = 'flash 1s infinite alternate';
            span.style.animationDelay = rate + 's';
        }
    }


    // 生成随机数的辅助函数
    function getRandom(min, max) {
        return Math.random() * (max - min) + min;
    }

    // 生成随机小方块（这里改成了随机生成图片）
    function createRandomImages(numImages) {
        for (let i = 0; i < numImages; i++) {
            const img = document.createElement('img');
            const size = getRandom(30, 120); // 图片的随机大小
            img.src = '/image/secret/wish_lantern/light.svg'; // 设置图片路径

            // 随机生成透明度
            // img.style.opacity = getRandom(0.8, 1).toFixed(2);
            img.style.opacity = 1;

            // 设置图片的样式
            img.classList.add('image');
            img.style.width = `${size}px`;
            img.style.height = `${size}px`;

            // 随机生成图片的位置，确保不会出现在边界
            let left, top;
            do {
                left = getRandom(0, container.clientWidth - size);
                top = getRandom(0, container.clientHeight - size);
            } while (checkCollision(left, top, size));

            // 设置初始位置
            img.style.position = 'absolute';
            img.style.left = `${left}px`;
            img.style.top = `${top}px`;

            // 给每张图片添加点击事件
            img.addEventListener('click', () => {

                // 关闭其他
                wishContentMy.classList.remove('active');
                wishContentRecordIndex.classList.remove('active');
                wishContentRecordContent.classList.remove('active');

                // 获得签文内容， 并生成签印的第一个字符
                // 将 \n 替换为 <br> 实现换行 -- 具体内容部分需要显示原格式的内容
                const randomContent = wishContentInLang[Math.floor(Math.random() * wishContentInLang.length)];
                const formattedText = randomContent.replace(/\n/g, '<br>');
                wishContentOtherTxt.innerHTML = formattedText;
                // wishContentOtherTxt.textContent = wishContentInLang[Math.floor(Math.random() * wishContentInLang.length)];

                // 当触发时显示元素并激活动画
                if (wishContentOther.style.display === 'none' || !wishContentOther.style.display) {

                    wishContentOther.style.display = 'flex'; // 确保元素显示
                }

                setTimeout(() => {
                    wishContentOther.classList.add('active'); // 切换 active 类实现动画
                }, 10); // 加一点延迟，确保 display 切换生效

            });

            // 将图片添加到容器中
            container.appendChild(img);

            // 让图片从左到右移动
            moveImage(img);
        }
    }

    // 检查图片是否与其他图片碰撞
    function checkCollision(left, top, size) {
        const images = document.querySelectorAll('.image');
        for (let image of images) {
            const imgRect = image.getBoundingClientRect();
            const padding = 10; // 图片间隔

            if (
                left < imgRect.right + padding &&
                left + size > imgRect.left - padding &&
                top < imgRect.bottom + padding &&
                top + size > imgRect.top - padding
            ) {
                return true;
            }
        }
        return false;
    }


    // 图片从下到上移动
    function moveImage(image) {
        const speed = getRandom(0.2, 0.7); // 随机速度
        let top = parseFloat(image.style.top);

        function animate() {
            top -= speed;
            if (top < -image.offsetHeight) { // 如果图片超出上边界，重置位置到底部
                top = container.clientHeight;
            }
            image.style.top = `${top}px`;
            requestAnimationFrame(animate);
        }
        animate();
    }




    // 生成孔明灯 - end
    // 生成孔明灯 - end
    // 生成孔明灯 - end


    // 许愿记录
    // 初始化用户数据
    function initUserData() {

        const userData = readValueFromRecordInLocal(keyName_1_00, keyName_1_01);

        if (userData === DEFAULT_VALUE_NULL) {

            const records = [];

            writeValueToRecordInLocal(keyName_1_00, keyName_1_01, records);
        }

        
    }










    // 进入页面按顺序执行
    // 进入页面按顺序执行
    // 进入页面按顺序执行


    // 初始化用户数据
    initUserData();

    // 用户开启游戏
    infoIconForceClose.click();


    btnStartGame.addEventListener('click', () => {

        bgm.play();

        // 生成灯笼
        createRandomImages(numberOfLights); 

        // 生成星星
        generateStars('.wish_content_other');
        generateStars('.wish_content_my');
        generateStars('.wish_content_record_index');
        generateStars('.wish_content_record_content');

        
    });

    btnCloseWishContentOther.addEventListener('click', () => {

        wishContentOther.classList.remove('active');

    });

    btnOpenWishContentMy.addEventListener('click', () => {

        siteBgmSelect.play();

        // 关闭其他
        wishContentOther.classList.remove('active');
        wishContentRecordIndex.classList.remove('active');
        wishContentRecordContent.classList.remove('active');

        userInput.value = '';

        // 当触发时显示元素并激活动画
        if (wishContentMy.style.display === 'none' || !wishContentMy.style.display) {
            
            wishContentMy.style.display = 'flex'; // 确保元素显示
        }

        setTimeout(() => {
            wishContentMy.classList.add('active'); // 切换 active 类实现动画
        }, 10); // 加一点延迟，确保 display 切换生效

    });

    btnCloseWishContentMy.addEventListener('click', () => {

        // 获取并去除输入值两端的空白
        const userInputValue = userInput.value.trim();

        // 如果有输入值 - 不为空
        if (userInputValue !== '') {

            // 读取现有记录
            let records = readValueFromRecordInLocal(keyName_1_00, keyName_1_01);

            // 创建新的记录
            const newData = userInputValue;

            // 插入新记录到数组头部
            records.unshift(newData);

            // 保留最新的10条记录
            // if (records.length > 10) {
            //     records.pop(); // 移除最后一条
            // }

            // 更新本地存储
            writeValueToRecordInLocal(keyName_1_00, keyName_1_01, records);

            // 增加幸运值和游戏次数
            updateUserLuckyPointToLocal(bonusLuckyPoint);

            updateUserGameTimeToLocal(1);
        }

        wishContentMy.classList.remove('active');

    });

    btnOpenWishContentRecordIndex.addEventListener('click', () => {

        siteBgmSelect.play();

        // 关闭其他
        wishContentMy.classList.remove('active');
        wishContentOther.classList.remove('active');
        wishContentRecordContent.classList.remove('active');

        // 清空 varWishContentRecordIndex 以避免重复添加记录
        varWishContentRecordIndex.innerHTML = '';

        // 获取用户许愿记录
        const userWishRecords = readDataFromLocal(keyName_1_00);

        if (userWishRecords && userWishRecords[keyName_1_01]) {
            userWishRecords[keyName_1_01].forEach(record => {
                // 创建一个新元素来显示记录
                const recordElement = document.createElement('div');
                recordElement.classList.add('record_item');

                // 创建记录图标元素
                const recordIcon = document.createElement('div');
                recordIcon.classList.add('record_icon');
                const iconImage = document.createElement('img');
                iconImage.src = '/image/secret/wish_lantern/light.svg';
                recordIcon.appendChild(iconImage);
    
                // 创建记录内容元素
                const recordContent = document.createElement('div');
                recordContent.classList.add('record_content');
                recordContent.textContent = record; // 索引部分就取纯文字

                
    
                // 将图标和内容添加到记录项中
                recordElement.appendChild(recordIcon);
                recordElement.appendChild(recordContent);

                

                // 添加点击事件，将点击的记录内容设置到 varWishContentRecordContent
                recordElement.addEventListener('click', () => {

                    // 将 \n 替换为 <br> 实现换行 -- 具体内容部分需要显示原格式的内容
                    const formattedText = record.replace(/\n/g, '<br>');
                    varWishContentRecordContent.innerHTML = formattedText;

                    // 当触发时显示元素并激活动画
                    if (wishContentRecordContent.style.display === 'none' || !wishContentRecordContent.style.display) {
                        
                        wishContentRecordContent.style.display = 'flex'; // 确保元素显示
                    }

                    setTimeout(() => {
                        wishContentRecordContent.classList.add('active'); // 切换 active 类实现动画
                    }, 10); // 加一点延迟，确保 display 切换生效

                });

                // 将记录元素添加到 varWishContentRecordIndex 中
                varWishContentRecordIndex.appendChild(recordElement);
            });
        }

        // 当触发时显示元素并激活动画
        if (wishContentRecordIndex.style.display === 'none' || !wishContentRecordIndex.style.display) {
            
            wishContentRecordIndex.style.display = 'flex'; // 确保元素显示
        }

        setTimeout(() => {
            wishContentRecordIndex.classList.add('active'); // 切换 active 类实现动画
        }, 10); // 加一点延迟，确保 display 切换生效

    });

    btnCloseWishContentRecordIndex.addEventListener('click', () => {

        wishContentRecordIndex.classList.remove('active');

    });

    btnCloseWishContentRecordContent.addEventListener('click', () => {

        wishContentRecordContent.classList.remove('active');

    });






    // 进入页面按顺序执行 -- end
    // 进入页面按顺序执行 -- end
    // 进入页面按顺序执行 -- end
};