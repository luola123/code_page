<script setup>
import {onMounted, ref} from 'vue'

const songs = ["打上花火", "Mojito", "Super_Star", "离人"]
const songIndex = ref(0)
const title = ref('')
const mp3 = ref('./music/打上花火.mp3')
const img = ref('./src/assets/img/打上花火.jpg')
const progress = ref('')

const musicContainer = ref()
const playBtn = ref()
const audio = ref()

const loadSong = (song) => {
  progress.value = '0%'
  title.value = song
  mp3.value = `./music/${song}.mp3`
  img.value = `./src/assets/img/${song}.jpg`
}
const playSong = () => {
  musicContainer.value.classList.add('play')
  playBtn.value.querySelector('i.fas').classList.remove('fa-play')
  playBtn.value.querySelector('i.fas').classList.add('fa-pause')
  audio.value.play()
}
const pauseSong = () => {
  musicContainer.value.classList.remove('play')
  playBtn.value.querySelector('i.fas').classList.add('fa-play');
  playBtn.value.querySelector('i.fas').classList.remove('fa-pause');
  audio.value.pause()
}
const prevSong = () => {
  pauseSong()
  songIndex.value--
  if (songIndex.value < 0) {
    songIndex.value = songs.length - 1
  }
  loadSong(songs[songIndex.value])
}
const nextSong = () => {
  pauseSong()
  songIndex.value++
  if (songIndex.value > songs.length - 1) {
    songIndex.value = 0
  }
  loadSong(songs[songIndex.value])
}
const updateProgress = (e) => {
  const {duration, currentTime} = e.target
  const progressPercent = (currentTime / duration) * 100
  progress.value = `${progressPercent}%`
}
const setProgress = (e) => {
  const width = musicContainer.value.clientWidth
  const clickX = e.offsetX
  const duration = audio.value.duration
  audio.value.currentTime = (clickX / width) * duration
}
const isPlaying = () => {
  musicContainer.value.classList.contains('play') ? pauseSong() : playSong()
}
onMounted(() => {
  loadSong(songs[songIndex.value])
})
</script>

<template>
  <div id="music">
    <h1 style="color:rgb(252, 249, 251)">Music Player</h1>

    <div class="music-container" id="music-container" ref="musicContainer">
      <!-- 音乐信息 -->
      <div class="music-info">
        <!-- 音乐标题 -->
        <h4 id="title">{{ title }}</h4>
        <!-- 音乐播放进度条 -->
        <div class="progress-container" id="progress-container" @click="setProgress">
          <div class="progress" id="progress" :style="{width: progress}"></div>
        </div>
      </div>

      <!-- 默认第一首音乐 -->
      <audio :src="mp3" id="audio" ref="audio" @timeupdate="updateProgress" @ended="nextSong"></audio>

      <!-- 音乐封面 -->
      <div class="img-container">
        <img :src="img" alt="music-cover" id="music-cover">
      </div>
      <!-- 播放控制 -->
      <div class="navigation">
        <button id="prev" class="action-btn" @click="prevSong">
          <i class="fas fa-backward"></i>
        </button>
        <button id="play" class="action-btn action-btn-big" ref="playBtn" @click="isPlaying">
          <i class="fas fa-play"></i>
        </button>
        <button id="next" class="action-btn" @click="nextSong">
          <i class="fas fa-forward"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>

#music {
  background-image: linear-gradient(0deg,
      rgba(247, 247, 247, 1) 23.8%,
      #0decfc);
  height: 100vh;
  display: flex;
  /* 沿垂直主轴上下垂直排列 */
  flex-direction: column;
  /* 主轴水平居中 */
  align-items: center;
  /* 主轴垂直居中 */
  justify-content: center;
  font-family: 'Lato', sans-serif;
  margin: 0;
}

.music-container {
  background-color: #fff;
  border-radius: 15px;
  box-shadow: 0 20px 20px 0 rgba(8, 182, 212, 0.822);
  display: flex;
  padding: 20px 30px;
  position: relative;
  margin: 70px 0;
  z-index: 10;
}

.img-container {
  position: relative;
  width: 110px;
}

.img-container::after {
  content: "";
  background-color: #fff;
  border-radius: 50%;
  position: absolute;
  bottom: 100%;
  left: 50%;
  width: 15px;
  height: 15px;
  /* 旋转 */
  transform: translate(-50%, 50%);
}

.img-container img {
  border-radius: 50%;
  height: 110px;
  width: inherit;
  object-fit: cover;
  position: absolute;
  bottom: 0;
  left: 0;
  /* 封面360°旋转，默认不动 */
  animation: rotate 3s linear infinite;
  animation-play-state: paused;
}

.music-container.play .img-container img {
  /* 播放 */
  animation-play-state: running;
}

/* 定义旋转动画 */
@keyframes rotate {
  from {
    transform: rotate(0);
  }

  to {
    transform: rotate(360deg);
  }
}

.navigation {
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
}

.action-btn {
  /* 取消默认样式 */
  border: 0;
  background-color: #fff;
  /* ----- */
  color: #0decfc;
  font-size: 20px;
  cursor: pointer;
  padding: 10px;
  margin: 0 20px;
}

.action-btn:focus {
  /* 取消默认样式 */
  outline: 0;
}

.action-btn.action-btn-big {
  color: #0cdae9;
  font-size: 30px;
}

.music-info {
  position: absolute;
  top: 0;
  left: 20px;
  /* 父元素宽度-40px */
  width: calc(100% - 40px);
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 15px 15px 0 0;
  padding: 10px 10px 10px 150px;
  /* 没播放时默认隐藏 */
  opacity: 0;
  transform: translateY(0%);
  transition: transform 0.3s ease-in, opacity 0.3s ease-in;
  z-index: 0;
}

.music-info h4 {
  /* 取消默认边距 */
  margin: 0;
}

.music-container.play .music-info {
  opacity: 1;
  transform: translateY(-100%);
}


.progress-container {
  background-color: #fff;
  border-radius: 5px;
  cursor: pointer;
  margin: 10px 0;
  height: 4px;
  width: 100%;
}

.progress {
  background-color: #0decfc;
  border-radius: 5px;
  height: 100%;
  /* 一开始进度条长度为0 */
  width: 0;
  transition: width 0.1s linear;

}
</style>
