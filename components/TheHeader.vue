<template>
  <header>
    <div class="hamburger-menu">
      <input type="checkbox" id="menu-btn-check" />
      <label for="menu-btn-check" class="menu-btn"><span></span></label>
      <!--ここからメニュー-->
      <div class="menu-content">
        <ul>
          <li>
            <NuxtLink v-bind:to="{ name: 'index' }" class="header_link">
              TOP
            </NuxtLink>
          </li>
          <li>
            <NuxtLink v-bind:to="{ name: 'countries' }" class="header_link">
              世界の国一覧
            </NuxtLink>
          </li>
        </ul>
      </div>
      <!--ここまでメニュー-->
    </div>
  </header>
</template>

<script setup></script>

<style scoped>
.menu-btn {
  position: fixed;
  top: 10px;
  right: 10px;
  display: flex;
  height: 60px;
  width: 60px;
  justify-content: center;
  align-items: center;
  z-index: 90;
}
.menu-btn span,
.menu-btn span:before,
.menu-btn span:after {
  content: '';
  display: block;
  height: 3px;
  width: 25px;
  border-radius: 3px;
  background-color: #000000;
  position: absolute;
}
.menu-btn span:before {
  bottom: 8px;
}
.menu-btn span:after {
  top: 8px;
}
#menu-btn-check:checked ~ .menu-btn span {
  /*メニューオープン時は真ん中の線を透明にする*/
  background-color: rgba(255, 255, 255, 0);
}
#menu-btn-check:checked ~ .menu-btn span::before {
  bottom: 0;
  transform: rotate(45deg);
}
#menu-btn-check:checked ~ .menu-btn span::after {
  top: 0;
  transform: rotate(-45deg);
}
#menu-btn-check {
  display: none;
}

.menu-content ul {
  padding: 70px 10px 0;
}
.menu-content ul li {
  border-bottom: solid 1px #ffffff;
  list-style: none;
}
.menu-content ul li .header_link {
  display: block;
  width: 100%;
  font-size: 15px;
  box-sizing: border-box;
  color: #ffffff;
  text-decoration: none;
  padding: 9px 15px 10px 0;
  position: relative;
}
.menu-content ul li a::before {
  content: '';
  width: 7px;
  height: 7px;
  border-top: solid 2px #ffffff;
  border-right: solid 2px #ffffff;
  transform: rotate(45deg);
  position: absolute;
  right: 11px;
  top: 16px;
}

.menu-content {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 100%; /*leftの値を変更してメニューを画面外へ*/
  z-index: 80;
  background-color: #000000;
  transition: all 0.5s; /*アニメーション設定*/
  opacity: 80%;
}

#menu-btn-check:checked ~ .menu-content {
  left: 0; /*メニューを画面内へ*/
}

.disable-css {
  all: unset !important;
}
</style>
