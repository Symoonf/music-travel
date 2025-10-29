document.addEventListener('DOMContentLoaded', function () {
    let elements = document.getElementById('elements');
    let text = document.getElementById('text');
    let titleText = document.getElementById('titleText');

    // 创建图形元素
    let shapecount = 15;
    let shapesvgs = [
        // 八分音符
        '<svg viewBox="0 0 24 24"><path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/></svg>',
        // 四分音符
        '<svg viewBox="0 0 24 24"><path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V3h-2z"/></svg>',
        // 二分音符
        '<svg viewBox="0 0 24 24"><path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V3h-2zM9 19c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z"/></svg>',
    ];

    // 创建15个图形
    for (let i = 0; i < shapecount; i++) {
        let shape = document.createElement('div');
        shape.className = 'shape';
        let shapetype = shapesvgs[i % 3];
        shape.innerHTML = shapetype;
        elements.appendChild(shape);
    }

    let shapes = document.querySelectorAll('.shape');

    // 更新进度
    let progress = 0;
    let progressinterval = setInterval(() => {
        progress += 1;
        text.textContent = progress + '%';

        let activecount = Math.floor((progress / 100) * shapecount);

        for (let i = 0; i < shapes.length; i++) {
            if (i < activecount) {
                shapes[i].classList.add('active');
            } else {
                shapes[i].classList.remove('active');
            }
        }

        if (progress >= 100) {
            clearInterval(progressinterval);
            
            // 进度条完成后停留1秒，然后直接跳转
            setTimeout(() => {
                window.location.href = 'main_test.html';
            }, 1000); // 停留1秒
        }
    }, 15);
});