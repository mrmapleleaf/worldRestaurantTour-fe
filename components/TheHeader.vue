<template>
  <header>
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
        <li>
          <NuxtLink v-bind:to="{ name: 'restaurants' }" class="header_link">
            レストラン一覧
          </NuxtLink>
        </li>
        <li>
          <NuxtLink
            v-bind:to="{ name: 'restaurants-register' }"
            class="header_link"
          >
            レストラン登録
          </NuxtLink>
        </li>
      </ul>
    </div>
  </header>
</template>

<script setup></script>

<style lang="css" scoped>
.menu-content {
  background: #ffbb70;
  height: 50px;
  display: flex;
}
ul {
  display: flex;
}
li {
  list-style: none;
  margin-left: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.header_link {
  color: white;
  font-weight: bold;
  text-decoration: none;
}
</style>
