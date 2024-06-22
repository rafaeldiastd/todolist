<template>

  <div class="bg-woodsmoke-950 min-h-screen pb-20">
    <div class="bg-woodsmoke-975 p-6 flex justify-center gap-3 items-center">
      <span v-if="user" class="text-woodsmoke-50 font-semibold">Seja bem vindo, {{ user.user_metadata.full_name
        }}</span>
      <ButtonDefault v-if="user" @click="signOut" variant="secondary" texto="Sair" size="xs" />
      <ButtonDefault v-if="!user" @click="signIn" variant="secondary" texto="Entrar com o Google" size="xs" />
    </div>

    <div class="flex flex-wrap justify-center items-center gap-5 p-20 text-woodsmoke-50">
      <div v-for="countTask in tasksData.countTasks">
        <div class="flex flex-col justify-center items-center gap-2">
          {{ countTask.quantidade }}
          <PillStatus :status=countTask.nome />
        </div>
      </div>

    </div>

    <div v-if="!user" class="flex flex-col gap-2">
      <span class="text-woodsmoke-400 font-semibold text-xl text-center">Nenhuma tarefa encontrada!</span>
      <span class="text-woodsmoke-400 font-light text-sm text-center">Entre na sua conta para cadastrar e gerenciar suas
        tarefas 👀</span>
    </div>

    <div v-if="user" class="container mx-auto">
      <div class="grid grid-cols-8 gap-3 items-center justify-center p-8">
        <input maxlength="100" type="text" v-model="newText" @keyup.enter="createNewTask" placeholder="Nova tarefa"
          class="col-span-8 sm:col-span-4 min-h-11 text-woodsmoke-400 placeholder:text-woodsmoke-400 px-5 py-2 rounded-xl ring-1 ring-woodsmoke-700 font-light bg-woodsmoke-900 focus:outline-none focus:ring-1 focus:ring-woodsmoke-600 focus:invalid:ring-carnation-500" />
        <select v-model="newStatus"
          class="col-span-8 sm:col-span-2 min-h-11 text-woodsmoke-400 px-5 py-2 rounded-xl border-r-[15px] border-transparent ring-1 ring-woodsmoke-700 font-light bg-woodsmoke-900 focus:outline-none focus:ring-1 focus:ring-woodsmoke-600 focus:invalid:ring-carnation-500">
          <option value="Padrão">Padrão</option>
          <option value="Importante">Importante</option>
          <option value="Fazendo">Fazendo</option>
          <option value="Parado">Parado</option>
          <option value="Finalizado">Finalizado</option>
        </select>
        <ButtonDefault class="col-span-8 sm:col-span-2" texto="Cadastrar" @click="createNewTask" withIcon icon="save">
        </ButtonDefault>
      </div>

      <div v-if="tasksData.tasks.length === 0" class="p-6 flex justify-center">
        <span class="text-woodsmoke-400 font-semibold text-xl text-center">Nenhuma tarefa encontrada!<br>Isso é bom,
          certo? 👀</span>
      </div>

      <div v-for="(task, index) in tasksData.tasks" :key="index">
        <div :class="['grid grid-cols-8 justify-between py-4 px-5 rounded mb-1 min-h-20',
          task.checked ? 'bg-woodsmoke-975' : 'bg-woodsmoke-900']">

          <div v-if="task.isEditing" class="col-span-8 sm:col-span-4 grid grid-cols-6 items-center gap-3">
            <input maxlength="100" type="text" v-model="editText"
              @keyup.enter="tasksData.saveTask(editText, editStatus, task)"
              class="col-span-6 sm:col-span-4 text-woodsmoke-400 placeholder:text-woodsmoke-400 px-5 py-2 rounded-xl ring-1 ring-woodsmoke-700 font-light bg-woodsmoke-900 focus:outline-none focus:ring-1 focus:ring-woodsmoke-600 focus:invalid:ring-carnation-500" />

            <select v-model="editStatus"
              class="col-span-6 sm:col-span-2  text-woodsmoke-400 px-5 py-2 rounded-xl border-r-[15px] border-transparent ring-1 ring-woodsmoke-700 font-light bg-woodsmoke-900 focus:outline-none focus:ring-1 focus:ring-woodsmoke-600 focus:invalid:ring-carnation-500">
              <option value="Padrão">Padrão</option>
              <option value="Importante">Importante</option>
              <option value="Fazendo">Fazendo</option>
              <option value="Parado">Parado</option>
              <option value="Finalizado">Finalizado</option>
            </select>
          </div>

          <div v-else class="grid sm:col-span-4 col-span-8 items-center gap-3">
            <label class=" items-center grid grid-cols-6 gap-3 cursor-pointer">
              <input type="checkbox" v-model="task.checked" hidden
                @change="tasksData.toggleStatus(task.id)" />
              <div :class="['w-4 h-4 rounded items-center transition-colors duration-200 col-span-1',
                task.checked ? 'bg-royal-green-500' : 'bg-woodsmoke-600']">
                <svg v-if="task.checked" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor" class="w-4 h-4 text-royal-green-950">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div class="flex items-center col-span-5"
                :class="[task.checked ? 'line-through text-woodsmoke-400' : 'text-woodsmoke-50']">
                {{ task.text }}
              </div>
            </label>

          </div>

          <PillStatus :status="task.status"
            class="col-span-2 sm:col-span-1 flex items-center justify-start sm:justify-center" />

          <span class="text-xs flex items-center p-2 col-span-2 sm:col-span-1 text-woodsmoke-400">{{ formatDate(task.created_at)
            }}</span>

          <div class="gap-3 col-span-4 sm:col-span-2 flex items-center justify-end py-3">
            <ButtonDefault v-if="task.isEditing" @click.stop="tasksData.saveTask(editText, editStatus, task)"
              texto="Salvar" variant="secondary" withIcon icon="save" size="xs" />

            <ButtonDefault @click.stop="editTask(task)" variant="secondary" withIcon icon="edit" size="xs" />
            <ButtonDefault @click.stop="tasksData.deleteTask(task.id)" variant="danger" withIcon icon="trash"
              size="xs" />
          </div>
        </div>
      </div>
    </div>
  </div>


</template>

<script setup>

import ButtonDefault from '@/components/ButtonDefault.vue'
import { tasksStore } from '@/stores/TaskStore';
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/pt-br'

dayjs.locale('pt-br');
dayjs.extend(relativeTime);


function formatDate(dataCriada) {
  const dataFormatada = dayjs(dataCriada).fromNow()
  return dataFormatada;
}

const supabase = useSupabaseClient()
const { data: { user } } = await supabase.auth.getUser()

const tasksData = tasksStore()

const newText = ref('')
const newStatus = ref('Padrão')
const editText = ref('')
const editStatus = ref('Padrão')

const createNewTask = () => {
  tasksData.createTask(newText.value, newStatus.value, false)
  newText.value = ''
}

function closeAllEditTasks() {
  tasksData.tasks.forEach(task => {
    task.isEditing = false;
  });
}

function editTask(task) {
  closeAllEditTasks();
  task.isEditing = true;
  editText.value = task.text;
  editStatus.value = task.status;
}

onBeforeMount(tasksData.getTasks)

const signIn = async () => {
  reloadNuxtApp({
    path: '/login',
    ttl: 1000
  })
}

const signOut = async () => {
  await supabase.auth.signOut()
  reloadNuxtApp({
    path: '/',
    ttl: 1000
  })
}

</script>
