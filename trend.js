// 音乐数据
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
        
        // 当前播放索引
        let currentIndex = 0;
        // 是否正在播放
        let isPlaying = false;
        // 音频元素
        const audioPlayer = document.getElementById('audio-player');
        
        // 页面加载完成后执行
        document.addEventListener('DOMContentLoaded', function() {
            // 用户登录状态管理
            let users = JSON.parse(localStorage.getItem('users')) || [];
            const loginBtn = document.getElementById('login-btn');
            const userSection = document.getElementById('user-section');
            const currentUser = localStorage.getItem('currentUser');
            
            if (currentUser) {
                showUserInfo(currentUser);
            }
            
            function showUserInfo(username) {
                userSection.innerHTML = `
                    <div class="user-info">
                        <span class="user-name">${username}</span>
                        <button class="logout-btn" id="logout-btn">退出</button>
                    </div>
                `;
                document.getElementById('logout-btn').addEventListener('click', logout);
            }
            
            function logout() {
                localStorage.removeItem('currentUser');
                userSection.innerHTML = '<button class="auth-btn" id="login-btn">登录 / 注册</button>';
                document.getElementById('login-btn').addEventListener('click', function() {
                    alert('登录功能已简化');
                });
                stopMusic();
            }
            
            loginBtn.addEventListener('click', function() {
                alert('登录功能已简化');
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
            
            
            // 音乐播放器功能
            const playBtn = document.getElementById('play-btn');
            const prevBtn = document.getElementById('prev-btn');
            const nextBtn = document.getElementById('next-btn');
            const volumeSlider = document.getElementById('volume-slider');
            const volumeIcon = document.querySelector('.volume-icon');
            const songTitle = document.getElementById('song-title');
            const songArtist = document.getElementById('song-artist');
            const songCover = document.getElementById('song-cover');
            
            audioPlayer.volume = volumeSlider.value / 100;
            
            playBtn.addEventListener('click', togglePlay);
            prevBtn.addEventListener('click', playPrev);
            nextBtn.addEventListener('click', playNext);
            
            volumeSlider.addEventListener('input', function() {
                audioPlayer.volume = this.value / 100;
                updateVolumeIcon();
            });
            
            audioPlayer.addEventListener('ended', playNext);
            
            function togglePlay() {
                if (audioPlayer.paused) {
                    audioPlayer.play().then(() => {
                        isPlaying = true;
                        updatePlayButton();
                    }).catch(error => {
                        console.log('播放失败:', error);
                        alert('播放失败，请检查音频链接');
                    });
                } else {
                    audioPlayer.pause();
                    isPlaying = false;
                    updatePlayButton();
                }
            }
            
            function playPrev() {
                currentIndex = (currentIndex - 1 + musicList.length) % musicList.length;
                playCurrentSong();
            }
            
            function playNext() {
                currentIndex = (currentIndex + 1) % musicList.length;
                playCurrentSong();
            }
            
            function playCurrentSong() {
                const song = musicList[currentIndex];
                audioPlayer.src = song.audio;
                audioPlayer.play().then(() => {
                    isPlaying = true;
                    updatePlayerUI(song);
                    updatePlayButton();
                }).catch(error => {
                    console.log('播放失败:', error);
                    isPlaying = false;
                    updatePlayButton();
                });
            }
            
            function stopMusic() {
                audioPlayer.pause();
                isPlaying = false;
                updatePlayButton();
            }
            
            function updatePlayerUI(song) {
                songTitle.textContent = song.title;
                songArtist.textContent = song.artist;
                songCover.src = song.cover;
            }
            
            function updatePlayButton() {
                const icon = playBtn.querySelector('i');
                icon.className = isPlaying ? 'fa fa-pause' : 'fa fa-play';
            }
            
            function updateVolumeIcon() {
                const icon = volumeIcon.querySelector('i');
                const volume = audioPlayer.volume;
                
                if (volume === 0) {
                    icon.className = 'fa fa-volume-off';
                } else if (volume < 0.5) {
                    icon.className = 'fa fa-volume-down';
                } else {
                    icon.className = 'fa fa-volume-up';
                }
            }
            
            // 初始化播放器
            updatePlayerUI(musicList[currentIndex]);
        });