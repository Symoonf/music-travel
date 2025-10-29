    // 音乐数据 - 存储所有歌曲信息（包括歌曲名，歌手，图片，音频文件）
            const musicList = [
                {
                title: "Still the Same",
                artist: "塞壬唱片-MSR",
                cover: "img/still the same.jpg",
                audio: "mp3/Still the same.mp3" 
                },
            {
                title: "我们明日见",
                artist: "塞壬唱片-MSR",
                cover: "img/see you soon.jpg",
                audio: "mp3/See you soon.mp3"
            },
            {
                title: "speed of light",
                artist: "塞壬唱片-MSR",
                cover: "img/speed of light.jpg",
                audio: "mp3/Speed of light.mp3"
            },
            {
                title: "不义之财",
                artist: "塞壬唱片-MSR",
                cover: "img/Ill-gotten gains.jpg",
                audio: "mp3/The suvivor.mp3"
            },
            {
                title: "Morning Dew",
                artist: "塞壬唱片-MSR",
                cover: "img/morning dew.jpg",
                audio: "mp3/Morning dew.mp3"
            },
            {
                title: "Halo Universalization",
                artist: "塞壬唱片-MSR",
                cover: "img/All sentient beings.jpg",
                audio: "mp3/Halo Universalization.mp3"
            },
            {
                title: "反常光谱",
                artist: "塞壬唱片-MSR",
                cover: "img/Normal.jpg",
                audio: "mp3/Normal.mp3"
            },
            {
                title: "浸春芜",
                artist: "塞壬唱片-MSR",
                cover: "img/浸春芜.jpg",
                audio: "mp3/浸春芜.mp3"
            },
            {
                title: "Misty Memory",
                artist: "塞壬唱片-MSR",
                cover: "img/Misty Memory.jpg",
                audio: "mp3/Misty Memory.mp3"
            },
            {
                title: "Little Wish",
                artist: "塞壬唱片-MSR",
                cover: "img/Little Wish.jpg",
                audio: "mp3/Little Wish.mp3"
            }
            ];
            
            // 当前播放索引 - 记录当前播放的是哪首歌
            let currentIndex = 0;
            // 是否正在播放 - 记录播放状态
            let isPlaying = false;
            // 音频元素 - 获取页面中的audio标签
            const audioPlayer = document.getElementById('audio-player');
            
            // 页面加载完成后执行
            document.addEventListener('DOMContentLoaded', function() {
                // 存储用户数据在本地 - 从本地存储获取用户数据，如果没有就设为空数组
                let users = JSON.parse(localStorage.getItem('users')) || [];
                
                // 获取DOM元素 - 获取页面中的各种元素
                // 登录模态框（弹窗）
                const loginModal = document.getElementById('login-modal');
                // 获取：<div class="modal" id="login-modal">...</div>
                // 作用：登录/注册的弹出窗口

                const loginBtn = document.getElementById('login-btn');
                // 获取：<button class="auth-btn" id="login-btn">登录 / 注册</button>
                // 作用：页面右上角的登录按钮

                const welcomeLoginBtn = document.getElementById('welcome-login-btn');
                // 获取：<button class="auth-btn" id="welcome-login-btn">立即开始</button>
                // 作用：欢迎区域中间的"立即开始"按钮

                const closeBtn = document.getElementById('close-btn');
                // 获取：<span class="close-btn" id="close-btn">&times;</span>
                // 作用：登录框右上角的X关闭按钮

                const formTitle = document.getElementById('form-title');
                // 获取：<h1 id="form-title">登录</h1>
                // 作用：显示"登录"或"注册"标题

                const actionBtn = document.getElementById('action-btn');
                // 获取：<button class="input-btn" id="action-btn">登录</button>
                // 作用：登录/注册表单的提交按钮

                const toggleLink = document.getElementById('toggle-link');
                // 获取：<a id="toggle-link">立即注册</a>
                // 作用：在登录和注册模式间切换的链接

                const toggleText = document.querySelector('.sign-up');
                // 获取：<div class="sign-up">还没账户？<a>立即注册</a></div>
                // 作用：包含切换链接的整个区域

                const messageBox = document.getElementById('message');
                // 获取：<div class="message" id="message"></div>
                // 作用：显示登录成功/失败等提示信息

                const usernameInput = document.getElementById('username');
                // 获取：<input type="text" placeholder="用户名" id="username">
                // 作用：用户输入用户名的文本框

                const passwordInput = document.getElementById('password');
                // 获取：<input type="password" placeholder="密码" id="password">
                // 作用：用户输入密码的文本框

                const userSection = document.getElementById('user-section');
                // 获取：<div class="user-section" id="user-section">...</div>
                // 作用：显示用户名和退出按钮的区域

                const mainContent = document.getElementById('main-content');
                // 获取：<div class="main-content" id="main-content">...</div>
                // 作用：登录后显示的音乐内容区域

                const welcomeSection = document.getElementById('welcome-section');
                // 获取：<div class="welcome-section" id="welcome-section">...</div>
                // 作用：未登录时显示的欢迎界面
                
                // 当前模式：login 或 register - 记录当前是登录模式还是注册模式
                let currentMode = 'login';
                
                // 检查用户是否已登录 - 从本地存储获取当前用户
                const currentUser = localStorage.getItem('currentUser');
                
                // 如果用户已登录，显示用户信息和主内容
                if (currentUser) {
                    showUserInfo(currentUser);
                    showMainContent();
                }
                
                // 打开登录框
                function openModal() {
                    loginModal.style.display = 'flex'; // 显示登录框
                    // 添加淡入动画
                    setTimeout(() => {
                        //在登入框中找到login-box,
                        loginModal.querySelector('.login-box').style.opacity = '1';
                        loginModal.querySelector('.login-box').style.transform = 'translateY(0)';
                    }, 10);
                }
                
                // 关闭登录框
                function closeModal() {
                    loginModal.querySelector('.login-box').style.opacity = '0';
                    loginModal.querySelector('.login-box').style.transform = 'translateY(-20px)';
                    setTimeout(() => {
                        loginModal.style.display = 'none';
                        hideMessage();
                    }, 300);
                }
                
                // 切换登录/注册模式
                function toggleMode() {
                    if (currentMode === 'login') {
                        currentMode = 'register'; // 切换到注册模式
                        formTitle.textContent = '注册';
                        actionBtn.textContent = '注册';
                        toggleText.innerHTML = '已有账户？<a id="toggle-link">立即登录</a>';
                    } else {
                        currentMode = 'login'; // 切换到登录模式
                        formTitle.textContent = '登录';
                        actionBtn.textContent = '登录';
                        toggleText.innerHTML = '还没账户？<a id="toggle-link">立即注册</a>';
                    }
                    
                    // 重新绑定点击事件 - 因为重新生成了链接，需要重新绑定事件
                    document.getElementById('toggle-link').addEventListener('click', toggleMode);
                    
                    // 清空输入和消息
                    usernameInput.value = '';
                    passwordInput.value = '';
                    hideMessage();
                }
                
                // 显示消息
                function showMessage(text, type) {
                    messageBox.textContent = text; // 设置消息内容
                    messageBox.className = `message ${type}`; // 设置消息样式类
                    messageBox.style.display = 'block'; // 显示消息
                    
                    // 3秒后自动隐藏
                    setTimeout(hideMessage, 3000);
                }
                
                // 隐藏消息
                function hideMessage() {
                    messageBox.style.display = 'none'; // 隐藏消息
                }
                
                // 登录功能
                function login(username, password) {
                    // 查找用户 - 在用户数组中查找匹配的用户名和密码
                    const user = users.find(u => u.username === username && u.password === password);
                    
                    if (user) {
                        showMessage('登录成功！', 'success'); // 显示成功消息
                        // 保存当前用户 - 将用户名保存到本地存储
                        localStorage.setItem('currentUser', username);
                        
                        // 显示用户信息和主内容
                        setTimeout(() => {
                            showUserInfo(username);
                            showMainContent();
                            closeModal();
                        }, 1000);
                    } else {
                        showMessage('用户名或密码错误！', 'error'); // 显示错误消息
                    }
                }
                
                // 注册功能
                function register(username, password) {
                    // 验证用户名是否已存在
                    const existingUser = users.find(u => u.username === username);
                    
                    if (existingUser) {
                        showMessage('用户名已存在！', 'error');
                        return; // 如果用户名已存在，直接返回
                    }
                    
                    // 验证输入是否为空
                    if (!username || !password) {
                        showMessage('用户名和密码不能为空！', 'error');
                        return; // 如果用户名或密码为空，直接返回
                    }
                    
                    // 添加新用户 - 将新用户添加到用户数组
                    users.push({ username, password });
                    
                    // 保存到本地存储 - 将更新后的用户数组保存到本地存储
                    localStorage.setItem('users', JSON.stringify(users));
                    
                    showMessage('注册成功！', 'success');
                    
                    // 自动切换到登录模式
                    setTimeout(() => {
                        toggleMode();
                    }, 1500);
                }
                
                // 显示用户信息
                function showUserInfo(username) {
                    userSection.innerHTML = `
                        <div class="user-info">
                            <span class="user-name">${username}</span>
                            <button class="logout-btn" id="logout-btn">退出</button>
                        </div>
                    `;
                    
                    // 绑定退出按钮事件
                    document.getElementById('logout-btn').addEventListener('click', logout);
                }
                
                // 退出登录
                function logout() {
                    localStorage.removeItem('currentUser'); // 从本地存储移除当前用户
                    userSection.innerHTML = '<button class="auth-btn" id="login-btn">登录 / 注册</button>';
                    
                    // 重新绑定登录按钮事件
                    document.getElementById('login-btn').addEventListener('click', openModal);
                    
                    // 显示欢迎区域，隐藏主内容
                    welcomeSection.style.display = 'block';
                    mainContent.style.display = 'none';
                    
                    // 停止播放音乐
                    stopMusic();
                }
                
                // 显示主内容，隐藏欢迎区域
                function showMainContent() {
                    welcomeSection.style.display = 'none'; // 隐藏欢迎区域
                    mainContent.style.display = 'block'; // 显示主内容
                }
                
                // 绑定事件 - 为各种按钮绑定点击事件
                loginBtn.addEventListener('click', openModal);
                welcomeLoginBtn.addEventListener('click', openModal);
                closeBtn.addEventListener('click', closeModal);
                
                // 登录/注册按钮点击事件
                actionBtn.addEventListener('click', () => {
                    const username = usernameInput.value.trim(); // 获取用户名并去除空格
                    const password = passwordInput.value.trim(); // 获取密码并去除空格
                    
                    if (currentMode === 'login') {
                        login(username, password); // 登录模式
                    } else {
                        register(username, password); // 注册模式
                    }
                });
                
                // 切换模式链接点击事件
                toggleLink.addEventListener('click', toggleMode);
                
                // 支持回车键登录/注册
                document.addEventListener('keypress', (e) => {
                    if (e.key === 'Enter' && loginModal.style.display === 'flex') {
                        actionBtn.click(); // 如果按下回车键且登录框显示，触发登录/注册按钮点击
                    }
                });
                
                // 点击模态框外部关闭
                window.addEventListener('click', (e) => {
                    if (e.target === loginModal) {
                        closeModal(); // 如果点击的是模态框背景，关闭模态框
                    }
                });
                
                // 导航栏交互
                document.querySelectorAll('.nav-item').forEach(item => {
                    item.addEventListener('click', function() {
                        //移除状态 - 移除所有导航项的活动状态
                        document.querySelector('.nav-item.active').classList.remove('active');
                        //为当前项添加状态 - 为点击的导航项添加活动状态
                        this.classList.add('active');
                    });
                });
                
                // 音乐播放器相关元素 - 获取播放器相关的DOM元素
                const playBtn = document.getElementById('play-btn');
                // 引用：<button class="control-btn" id="play-btn">
                //        <i class="fa fa-play"></i> ← 这个图标会动态变化
                //      </button>
                // 功能：点击时在播放▶和暂停❚❚之间切换
    
                const prevBtn = document.getElementById('prev-btn');
                // 引用：<button class="control-btn" id="prev-btn">
                //        <i class="fa fa-step-backward"></i> ⏮
                //      </button>
                // 功能：切换到播放列表中的前一首歌曲

                const nextBtn = document.getElementById('next-btn');
                // 引用：<button class="control-btn" id="next-btn">
                //        <i class="fa fa-step-forward"></i> ⏭
                //      </button>
                // 功能：切换到播放列表中的下一首歌曲

                const volumeSlider = document.getElementById('volume-slider');
                // 引用：<input type="range" min="0" max="100" value="80" 
                //        class="volume-slider" id="volume-slider">
                // 功能：通过拖拽调节音量大小（0-100）

                const volumeIcon = document.querySelector('.volume-icon');
                // 引用：<span class="volume-icon">
                //        <i class="fa fa-volume-up"></i> 🔊 ← 这个图标会动态变化
                //      </span>
                // 功能：显示当前音量状态（静音/小音量/大音量）

                const songTitle = document.getElementById('song-title');
                // 引用：<span class="song-title" id="song-title">Still the Same</span>
                // 功能：显示当前播放的歌曲名称

                const songArtist = document.getElementById('song-artist');
                // 引用：<span class="song-artist" id="song-artist">塞壬唱片-MSR</span>
                // 功能：显示当前歌曲的演唱者或制作人

                const songCover = document.getElementById('song-cover');
                // 引用：<img src="img/still the same.jpg" alt="歌曲封面" 
                //        class="song-cover" id="song-cover">
                // 功能：显示当前歌曲的专辑封面或相关图片
                
                // 初始化音量 - 设置音频元素的初始音量
                audioPlayer.volume = volumeSlider.value / 100;
                
                // 播放/暂停按钮点击事件
                playBtn.addEventListener('click', togglePlay);
                
                // 上一首按钮点击事件
                prevBtn.addEventListener('click', playPrev);
                
                // 下一首按钮点击事件
                nextBtn.addEventListener('click', playNext);
                
                // 音量滑块事件
                volumeSlider.addEventListener('input', function() {
                    audioPlayer.volume = this.value / 100; // 设置音频音量
                    
                    // 更新音量图标
                    updateVolumeIcon();
                });
                
                // 音乐卡片点击事件
                document.querySelectorAll('.music-card').forEach(card => {
                    card.addEventListener('click', function() {
                        const index = parseInt(this.getAttribute('data-index')); // 获取歌曲索引
                        playSong(index); // 播放指定歌曲
                    });
                });
                
                // 音频播放事件
                audioPlayer.addEventListener('play', function() {
                    // 获取当前用户是否已登录
                    const currentUser = localStorage.getItem('currentUser');
                    
                    // 如果用户未登录
                    if (!currentUser) {
                        audioPlayer.pause(); // 暂停播放
                        openModal(); // 弹出登录框
                    }
                });
                
                // 音频播放结束事件 - 当前歌曲播放结束后自动播放下一首
                audioPlayer.addEventListener('ended', playNext);
                
                // 切换播放/暂停
                function togglePlay() {
                    if (audioPlayer.paused) {
                        audioPlayer.play().then(() => {
                            isPlaying = true; // 设置播放状态为true
                            updatePlayButton(); // 更新播放按钮图标
                        }).catch(error => {
                            console.log('播放失败:', error);
                            // 显示错误提示
                            alert('播放失败，请检查音频链接是否正确');
                        });
                    } else {
                        audioPlayer.pause(); // 暂停播放
                        isPlaying = false; // 设置播放状态为false
                        updatePlayButton(); // 更新播放按钮图标
                    }
                }
                
                // 播放上一首
                function playPrev() {
                    currentIndex = (currentIndex - 1 + musicList.length) % musicList.length; // 计算上一首索引
                    playCurrentSong(); // 播放当前歌曲
                }
                
                // 播放下一首
                function playNext() {
                    currentIndex = (currentIndex + 1) % musicList.length; // 计算下一首索引
                    playCurrentSong(); // 播放当前歌曲
                }
                
                // 播放指定歌曲
                function playSong(index) {
                    currentIndex = index; // 设置当前播放索引
                    playCurrentSong(); // 播放当前歌曲
                }
                
                // 播放当前选中的歌曲
                function playCurrentSong() {
                    // 获取当前用户是否已登录
                    const currentUser = localStorage.getItem('currentUser');
                    
                    // 如果用户未登录
                    if (!currentUser) {
                        openModal(); // 弹出登录框
                        return; // 直接返回，不播放音乐
                    }
                    
                    const song = musicList[currentIndex]; // 获取当前歌曲信息
                    audioPlayer.src = song.audio; // 设置音频源
                    audioPlayer.play().then(() => {
                        isPlaying = true; // 设置播放状态为true
                        updatePlayerUI(song); // 更新播放器UI
                        updatePlayButton(); // 更新播放按钮图标
                    }).catch(error => {
                        console.log('播放失败:', error);
                        isPlaying = false; // 设置播放状态为false
                        updatePlayButton(); // 更新播放按钮图标
                        // 显示错误提示
                        alert('播放失败，请检查音频链接是否正确');
                    });
                }
                
                // 停止播放音乐
                function stopMusic() {
                    audioPlayer.pause(); // 暂停播放
                    isPlaying = false; // 设置播放状态为false
                    updatePlayButton(); // 更新播放按钮图标
                }
                
                // 更新播放器UI
                function updatePlayerUI(song) {
                    songTitle.textContent = song.title; // 更新歌曲标题
                    songArtist.textContent = song.artist; // 更新艺术家
                    songCover.src = song.cover; // 更新封面图片
                }
                
                // 更新播放按钮图标
                function updatePlayButton() {
                    const icon = playBtn.querySelector('i'); // 获取播放按钮图标
                    if (isPlaying) {
                        icon.className = 'fa fa-pause'; // 播放中显示暂停图标
                    } else {
                        icon.className = 'fa fa-play'; // 暂停中显示播放图标
                    }
                }
                
                // 更新音量图标
                function updateVolumeIcon() {
                    const icon = volumeIcon.querySelector('i'); // 获取音量图标
                    const volume = audioPlayer.volume; // 获取当前音量
                    
                    if (volume === 0) {
                        icon.className = 'fa fa-volume-off'; // 静音
                    } else if (volume < 0.5) {
                        icon.className = 'fa fa-volume-down'; // 低音量
                    } else {
                        icon.className = 'fa fa-volume-up'; // 高音量
                    }
                }
                
                // 初始化播放器
                function init() {
                    // 设置初始歌曲
                    const initialSong = musicList[currentIndex];
                    updatePlayerUI(initialSong); // 更新播放器UI
                }
                
                // 初始化播放器
                init();
            });