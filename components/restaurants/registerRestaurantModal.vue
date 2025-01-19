<template>
  <div class="modal-overlay" @click="close">
    <div class="modal" @click.stop>
      <div class="modal-header">
        <div @click="close">
          <span class="close-btn"></span>
        </div>
      </div>
      <div class="header-text">
        <p>行ったレストランを登録しよう！</p>
      </div>
      <div class="modal-actions">
        <registerFormContainer></registerFormContainer>
        <div>後で登録する</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import registerFormContainer from '~/components/restaurants/registerFormContainer.vue';

const modalStore = useModalStore();

const close = () => {
  modalStore.closeModal();
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}
.modal {
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 33%;
  text-align: center;
}
.modal-actions button {
  margin: 5px;
}
.modal-header {
  display: flex;
  justify-content: end;
}
.close-btn-area {
  border-radius: 5px;
}
.close-btn {
  margin-left: auto;
  display: block;
  position: relative;
  width: 30px;
  height: 30px;
  background: #fff;
}
.close-btn::before,
.close-btn::after {
  /* 共通設定 */
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 5px; /* 棒の幅（太さ） */
  height: 20px; /* 棒の高さ */
  background: #333;
  border-radius: 2.5px; /* 棒の四隅の丸み*/
}

.close-btn::before {
  transform: translate(-50%, -50%) rotate(45deg);
}
.close-btn::after {
  transform: translate(-50%, -50%) rotate(-45deg);
}
</style>
