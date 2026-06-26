<template>
  <div class="video-grid">
    <div
      v-for="v in videos"
      :key="v.id"
      class="video-card"
      @click="active = v"
    >
      <div class="thumb">
        <img :src="`https://img.youtube.com/vi/${v.id}/hqdefault.jpg`" :alt="v.title" />
        <div class="play-overlay">
          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
        </div>
      </div>
      <div class="video-info">
        <div class="video-title">{{ v.title }}</div>
        <div class="video-meta">{{ v.duration }}</div>
      </div>
    </div>

    <!-- lightbox -->
    <transition name="fade">
      <div v-if="active" class="lightbox" @click.self="active = null">
        <div class="lightbox-inner">
          <button class="close-btn" @click="active = null">✕</button>
          <iframe
            :src="`https://www.youtube.com/embed/${active.id}?autoplay=1`"
            allow="autoplay; encrypted-media"
            allowfullscreen
          />
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'VideoGrid',
  props: { videos: { type: Array, required: true } },
  data() { return { active: null } },
}
</script>

<style scoped>
.video-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 20px;
}

.video-card {
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.18s, border-color 0.18s, box-shadow 0.18s;
}

.video-card:hover {
  transform: translateY(-4px);
  border-color: rgba(255,255,255,0.18);
  box-shadow: 0 8px 28px rgba(0,0,0,0.4);
}

.thumb {
  position: relative;
  aspect-ratio: 16/9;
  overflow: hidden;
}

.thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.3s;
}

.video-card:hover .thumb img { transform: scale(1.04); }

.play-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0,0,0,0.32);
  transition: background 0.2s;
}

.video-card:hover .play-overlay { background: rgba(0,0,0,0.48); }

.play-overlay svg {
  width: 48px;
  height: 48px;
  color: #fff;
  filter: drop-shadow(0 2px 8px rgba(0,0,0,0.6));
}

.video-info { padding: 12px 14px 14px; }

.video-title {
  font-size: 14px;
  font-weight: 600;
  color: #e0d0b0;
  line-height: 1.4;
  margin-bottom: 4px;
}

.video-meta {
  font-size: 12px;
  color: rgba(255,255,255,0.35);
  letter-spacing: 0.04em;
}

/* lightbox */
.lightbox {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.85);
  z-index: 200;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.lightbox-inner {
  position: relative;
  width: 100%;
  max-width: 900px;
  aspect-ratio: 16/9;
}

.lightbox-inner iframe {
  width: 100%;
  height: 100%;
  border: none;
  border-radius: 10px;
}

.close-btn {
  position: absolute;
  top: -40px;
  right: 0;
  background: none;
  border: none;
  color: #fff;
  font-size: 22px;
  cursor: pointer;
  opacity: 0.7;
  transition: opacity 0.15s;
}
.close-btn:hover { opacity: 1; }

.fade-enter-active, .fade-leave-active { transition: opacity 0.25s; }
.fade-enter-from, .fade-leave-to       { opacity: 0; }
</style>
