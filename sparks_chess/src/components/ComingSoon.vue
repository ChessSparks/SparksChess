<template>
  <div class="coming-soon">
    <div class="cs-inner">
      <div class="cs-title">Videos Coming Soon</div>
      <p class="cs-desc">
        SparksChess tutorial videos are in production.<br>
        Subscribe to the channel to be notified when they drop.
      </p>
      <a class="cs-btn" href="https://www.youtube.com/@SparksChess" target="_blank" rel="noopener">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
        </svg>
        Watch on YouTube
      </a>
    </div>
  </div>
</template>

<script>
export default { name: 'ComingSoon' }
</script>

<style scoped>
.coming-soon {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 320px;
  padding: 40px 20px;
}

.cs-inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  text-align: center;
  max-width: 440px;
  padding: 48px 40px;
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 20px;
  backdrop-filter: blur(10px);
}

.cs-title {
  font-size: 26px;
  font-weight: 800;
  color: #e0d0b0;
  letter-spacing: -0.01em;
}

.cs-desc {
  font-size: 15px;
  color: rgba(255,255,255,0.5);
  line-height: 1.7;
  margin: 0;
}

.cs-btn {
  display: inline-flex;
  align-items: center;
  gap: 9px;
  margin-top: 8px;
  padding: 11px 26px;
  border-radius: 999px;
  background: rgba(239,68,68,0.14);
  border: 1px solid rgba(239,68,68,0.4);
  color: #f87171;
  font-size: 14px;
  font-weight: 700;
  text-decoration: none;
  letter-spacing: 0.04em;
  transition: all 0.2s;
}

.cs-btn:hover {
  background: rgba(239,68,68,0.24);
  border-color: rgba(239,68,68,0.65);
  color: #fca5a5;
  transform: translateY(-1px);
  box-shadow: 0 6px 24px rgba(239,68,68,0.18);
}
</style>
