<script setup>
import { onMounted, ref, watch, onUpdated } from 'vue';
import {
    app,
    auth,
    database,
    ref as refDb,
    set,
    push,
    onValue
} from '../firebaseConfig'
import { remove } from 'firebase/database';
let chat = ref("");
let histories = ref([]);
let historyKey = ref([]);
const studentId = "Specton";
const bottomEl = ref(null);
const db = refDb(database, 'all_chat/');

const onSend = () => {
    if (chat.value != '' && historyKey.value != '') {
        push(refDb(database, `all_chat/${historyKey.value}`), {
            "user": studentId,
            "message": chat.value,
            "dataTime": new Date().toISOString()
        });
        chat.value = "";
    }
}
onValue(db, (snapshot) => {
    const data = snapshot.val();
    histories.value = data;
});
onUpdated(histories, (newHistories, oldHistories) => {
    bottomEl.value.scrollIntoview({ behavier: 'smooth' });
});
const selectGroup = (key) => {
    historyKey.value = key;
}

let groupChatName = ref("")
const createGroup = () => {
    if (groupChatName.value != '') {
        push(refDb(database, `all_chat/${groupChatName.value}`), {
            "user": studentId,
            "message": '',
            "dateTime": new Date().toISOString()
        });
        groupChatName.value = '';
    }
}

const delGroup =(data) =>{
    remove(refDb(database, `all_chat/${data}`));
}
</script>


<template>
    <div class="flex gap-4">
        <div class=" bg-transparent h-[90vh] w-[30%]">
            <div class="overflow-y-scroll w-full h-[90%]">
                <div class="card card-side bg-base-100 shadow-xl w-full mb-4" style="cursor: pointer;"
                    v-for="(group, index) in histories" :key="index" data-theme="night" @click="selectGroup(index)">
                    <div class="card-body">
                        <h2 class="card-title">{{ index }}</h2>
                        <p>{{ group[Object.keys(group)[Object.keys(group).length - 1]].message }}</p>
                        <button class="btn" @click="delGroup(index)">❌</button>
                    </div>
                </div>
            </div>
            <div class="w-full h [10%]">
                <button class="btn w-full h-full" data-theme="luxury" onclick="my_modal_2.showModal()">Add Gruop</button>
                <dialog id="my_modal_2" class="modal">
                    <div class="modal-box">
                        <label class="label">
                            <span class="label-text">Group Name</span>
                        </label>
                        <input v-model="groupChatName" type="text" placeholder="Name"
                            class="input input-bordered input-accent w-full" />
                        <div class="modal-action">
                            <form method="dialog">
                                <button class="btn btn-accent mb-4 mx-4" @click="createGroup()">Create</button>
                                <button class="btn btn-error">Close</button>
                            </form>
                        </div>
                    </div>
                </dialog>
            </div>
        </div>
        <div class="bg-transparent h-[90vh] w-[70%]">
            <div class="overflow-y-scroll h-[90%] p-5 card" data-theme="night">
                <div v-for="(history, index) in histories[historyKey]"
                    :class="`chat ${history.user == studentId ? 'chat-end' : 'chat-start'}`" :key="index">
                    <div class="chat-header">
                        {{ history.user }}
                        <time class="text-xs opacity-50">{{ history.dataTime }}</time>
                    </div>
                    <div class="chat-bubble">{{ history.message }}</div>
                </div>
                <div ref="bottomEl"></div>
            </div>
            <div class="flex h-[10%] gap-4 ">
                <input v-on:keyup.enter="onSend" v-model="chat" type="text" placeholder="ข้อความ"
                    class="input input-bordered input-primary w-[80%]" />
                <button @click="onSend" class="btn btn-primary w-[20%]">Send</button>
            </div>
        </div>
    </div>
</template>
<style scoped></style>
