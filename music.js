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
    // 获取DOM元素 - 获取页面中的各种元素
    const userSection = document.getElementById('user-section');
    const loginBtn = document.getElementById('login-btn');
    
    // 检查用户是否已登录 - 从本地存储获取当前用户
    const currentUser = localStorage.getItem('currentUser');
    
    // 如果用户已登录，显示用户信息
    if (currentUser) {
        showUserInfo(currentUser);
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
        
        // 停止播放音乐
        stopMusic();
    }
    
    // 绑定事件 - 为各种按钮绑定点击事件
    loginBtn.addEventListener('click', openModal);
    
    // 导航栏交互
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', function() {
            //移除状态 - 移除所有导航项的活动状态
            document.querySelector('.nav-item.active').classList.remove('active');
            //为当前项添加状态 - 为点击的导航项添加活动状态
            this.classList.add('active');
        });
    });
    
    // 绑定所有专辑封面的点击事件
    const albumCovers = document.querySelectorAll('.album-cover');
    albumCovers.forEach(cover => {
        cover.addEventListener('click', function() {
            // 1. 获取当前封面绑定的歌曲索引（从data-index属性）
            const coverIndex = parseInt(this.getAttribute('data-index'));
            // 2. 验证索引有效性（防止超出musicList范围）
            if (!isNaN(coverIndex) && coverIndex >= 0 && coverIndex < musicList.length) {
                // 3. 更新当前播放索引并播放对应歌曲
                currentIndex = coverIndex;
                playCurrentSong();
            }
        });
    });

    // 音乐播放器相关元素 - 获取播放器相关的DOM元素
    const playBtn = document.getElementById('play-btn');
    // 引用：<button class="control-btn" id="play-btn">
    //        <i class="fa fa-play"></i> ← 这个图标会动态变化
    //      </button>
    // 点击时在播放和暂停之间切换

    const prevBtn = document.getElementById('prev-btn');
    // 引用：<button class="control-btn" id="prev-btn">
    //        <i class="fa fa-step-backward"></i> ⏮
    //      </button>
    // 切换到播放列表中的前一首歌曲

    const nextBtn = document.getElementById('next-btn');
    // 引用：<button class="control-btn" id="next-btn">
    //        <i class="fa fa-step-forward"></i> ⏭
    //      </button>
    // 切换到播放列表中的下一首歌曲

    const volumeSlider = document.getElementById('volume-slider');
    // 引用：<input type="range" min="0" max="100" value="80" 
    //        class="volume-slider" id="volume-slider">
    // 通过拖拽调节音量大小（0-100）

    const volumeIcon = document.querySelector('.volume-icon');
    // 引用：<span class="volume-icon">
    //        <i class="fa fa-volume-up"></i> 🔊 ← 这个图标会动态变化
    //      </span>
    // 显示当前音量状态（静音/小音量/大音量）

    const songTitle = document.getElementById('song-title');
    // 引用：<span class="song-title" id="song-title">Still the Same</span>
    // 显示当前播放的歌曲名称

    const songArtist = document.getElementById('song-artist');
    // 引用：<span class="song-artist" id="song-artist">塞壬唱片-MSR</span>
    // 显示当前歌曲的演唱者或制作人

    const songCover = document.getElementById('song-cover');
    // 引用：<img src="img/still the same.jpg" alt="歌曲封面" 
    //        class="song-cover" id="song-cover">
    // 显示当前歌曲的专辑封面或相关图片
    
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
    
    // 打开登录模态框（简化版本）
    function openModal() {
        alert('请在首页登入后重试');
    }
});