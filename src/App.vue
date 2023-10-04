<!-- <template> -->
  <!-- <div class="section" data-theme="cupcake">
    <div class="flex h-screen">
      <div class="m-auto">
          <h3 class="text-9xl">Resume</h3>
          <div class="mockup-window border bg-base-300">
            <center><img src="./assets/6314110015.jpg" width=200 height=200></center>
              <div class="text-3xl flex justify-center bg-base-200">ข้อมูลส่วนตัว</div>
              <div class="flex justify-center bg-base-200 ">Name : Adisak Suwannarat</div>
              <div class="flex justify-center bg-base-200">Nicname : Top</div>
              <div class="flex justify-center bg-base-200">Age : 22</div>
              <div class="flex justify-center bg-base-200">Phone Number : 0927941208</div>
              <div class="flex justify-center bg-base-200">Email : sopy820236108@gmail.com</div>
          </div>
        </div>    
      </div>
    </div>
  <div class="section" data-theme="aqua">
    <div class="flex h-screen">
      <div class="m-auto">
        <h3>section two</h3>
      </div>    
    </div>
  </div>
  <div class="section" data-theme="holloween">
    <div class="flex h-screen">
      <div class="m-auto">
        <h3>section three</h3>
      </div>    
    </div>
  </div> -->


  <!-- <div class="overflow-x-auto">
    <table class="table">
      <thead>
        <tr>
          <th></th>
          <th>#</th>
          <th>Name</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>

        <tr>
          <th></th>
          <td>1 <br>2 <br> 3 <br> 4 <br>5 <br>6 <br>7 <br> 8 <br> 9 <br> 10</td>

          <td>
            <div v-for="product in products" :key="product._id">
              {{ product.name }}
            </div>
          </td>
          <div v-for="product in products" :key="product._id">
            {{ product.price }}
          </div>
        </tr>

      </tbody>
    </table>
  </div>
</template>

<script setup>
import axios from 'axios'
import { ref, onMounted } from 'vue';
let products = ref()
onMounted(async () => {
  products.value = await getAllProduct();
  console.log(products)
})

const getAllProduct = async () => {
  let data = [];
  data = await axios.get('http://localhost:5000/getallproduct').then((response) => {
    return response.data;
  });
  return data;
}

</script>

<style scoped>
.section {
  height: 100vh;
}
</style> -->

<template>
  <header>
    <div class="navbar bg-base-100">
      <div class="navbar-start">
        <div class="dropdown">
          <label tabindex="0" class="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </label>
          <ul tabindex="0" class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
            <li v-for="menu in menuList" :key="menu.name"><RouterLink :to="menu.path">{{ menu.name }}</RouterLink>
            </li>
          </ul>
        </div>
        <a class="btn btn-ghost normal-case text-xl">daisyUI</a>
      </div>
      <div class="navbar-center hidden lg:flex">
        <ul class="menu menu-horizontal px-1">
          <li v-for="menu in menuList" :key="menu.name"><RouterLink :to="menu.path">{{ menu.name }}</RouterLink>
          </li>
        </ul>
      </div>
      <!-- <div class="navbar-end">
          <a class="btn">Button</a>
        </div> -->
    </div>
  </header>
  <div class="container mx-auto">
    <RouterView :key="router.currentRoute.value.name"/>
  </div>
</template>

<script setup>
import { RouterView, RouterLink } from 'vue-router';
import router from './router';
const menuList = [
  { path: "/", name: "home" },
  { path: "/create", name: "create" },
  { path: "/chat", name: "Chat"}
]

</script>

<style scoped></style>