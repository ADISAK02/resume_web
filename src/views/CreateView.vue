<script setup>
import { onMounted, ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
let name = ref(''),
    price = ref(0),
    routerName = ref(''),
    _id = ref('');
const router = useRouter();
onMounted(() => {
    routerName.value = router.currentRoute.value.name;
    _id.value = router.currentRoute.value.params?.id;
    if(routerName.value == "edit") {
        initEdit();
    }
});
const API_PATH = import.meta.env.VITE_API_PATH;
const initEdit = async () => {
    const { data } = await axios.get(`${API_PATH}/getproduct/${_id.value}`);
    name.value = data.data.name;
    price.value = data.data.price;
}
const submit = async () => {
    const req = {
        name:name.value, price:price.value
    };
    if (routerName.value == "Create") {
        await axios.post(
            `${API_PATH}/create`,
            req
        ).then((response) => {
            name.value = '';
            price.value = '';
        });
    } else {
        await axios.post(
            `${API_PATH}/update/${_id.value}`,
            req
        ).then((response) => {
            router.push({name : 'home', replace: true});
        });
    }
}
    
</script>

<template>
    <div class="m-auto container">
        <div class="mockup-window border border-base-300" data-theme="aqua">
            <div class="flex px-4 py-16 border-t border-base-300">
                <input type="text" placeholder="Name" class="input input-bordered w-full max-w-xs mr-3" v-model="name" />
                <input type="text" placeholder="Price" class="input input-bordered w-full max-w-xs mr-3" v-model="price" />
                <button class="btn btn-outline bg-success" v-on:click="submit()">submit?</button>
            </div>
        </div>
    </div>
</template>

<style scoped></style>
