<template>
  <div class="bg-woodsmoke-950 min-h-screen pb-20">
    <div v-if="!user" class="bg-royal-blue-400 text-sm flex justify-center items-center p-2">Faça o login para conseguir
      salvar suas tarefas!</div>
    <div class="bg-woodsmoke-975 p-6 flex justify-between gap-3 items-center">
      <span v-if="user" class="text-woodsmoke-50 font-semibold">Seja bem vindo, {{ user.user_metadata.full_name
        }}</span>

      <span v-if="!user" class="text-woodsmoke-50 font-semibold">Seja bem vindo</span>

      <NuxtLink v-if="!user" to="/login">
        <ButtonDefault variant="secondary" texto="Entrar" size="xs" />
      </NuxtLink>

      <ButtonDefault v-if="user" @click="signOut" variant="secondary" texto="Sair" size="xs" />


    </div>

    <div class="flex flex-wrap justify-center items-center gap-5 p-20 text-woodsmoke-50">
      <div class="flex flex-col justify-center items-center gap-2">
        {{ countTasks.Padrão }}
        <PillStatus status="Padrão" />
      </div>
      <div class="flex flex-col justify-center items-center gap-2">
        {{ countTasks.Fazendo }}
        <PillStatus status="Fazendo" />
      </div>
      <div class="flex flex-col justify-center items-center gap-2">
        {{ countTasks.Importante }}
        <PillStatus status="Importante" />
      </div>
      <div class="flex flex-col justify-center items-center gap-2">
        {{ countTasks.Parado }}
        <PillStatus status="Parado" />
      </div>
      <div class="flex flex-col justify-center items-center gap-2">
        {{ countTasks.Finalizado }}
        <PillStatus status="Finalizado" />
      </div>
    </div>

    <div v-if="user" class="container mx-auto">
      <div class="grid grid-cols-8 gap-3 items-center justify-center p-8">
        <input type="text" v-model="createText" placeholder="Nova tarefa"
          class="col-span-8 sm:col-span-4 min-h-11 text-woodsmoke-400 placeholder:text-woodsmoke-400 px-5 py-2 rounded-xl ring-1 ring-woodsmoke-700 font-light bg-woodsmoke-900 focus:outline-none focus:ring-1 focus:ring-woodsmoke-600 focus:invalid:ring-carnation-500" />
        <select v-model="createStatus"
          class="col-span-8 sm:col-span-2 min-h-11 text-woodsmoke-400 px-5 py-2 rounded-xl border-r-[15px] border-transparent ring-1 ring-woodsmoke-700 font-light bg-woodsmoke-900 focus:outline-none focus:ring-1 focus:ring-woodsmoke-600 focus:invalid:ring-carnation-500">
          <option value="Padrão">Padrão</option>
          <option value="Importante">Importante</option>
          <option value="Fazendo">Fazendo</option>
          <option value="Parado">Parado</option>
          <option value="Finalizado">Finalizado</option>
        </select>
        <ButtonDefault class="col-span-8 sm:col-span-2" texto="Cadastrar" @click="createTask" withIcon icon="save">
        </ButtonDefault>
      </div>

      <div v-if="tasks.length === 0" class="p-6 flex justify-center">
        <span class="text-woodsmoke-400 font-semibold text-xl text-center">Nenhuma tarefa encontrada!<br>Isso é bom,
          certo? 👀</span>
      </div>

      <div v-for="(task, index) in tasks" :key="index">
        <div :class="['grid grid-cols-6 justify-between py-4 px-5 rounded mb-1 min-h-20',
          task.checked ? 'bg-woodsmoke-975' : 'bg-woodsmoke-900']">

          <div v-if="task.isEditing" class="col-span-6 sm:col-span-3 grid grid-cols-6 items-center gap-3">
            <input type="text" v-model="newText"
              class="col-span-6 sm:col-span-4 text-woodsmoke-400 placeholder:text-woodsmoke-400 px-5 py-2 rounded-xl ring-1 ring-woodsmoke-700 font-light bg-woodsmoke-900 focus:outline-none focus:ring-1 focus:ring-woodsmoke-600 focus:invalid:ring-carnation-500" />

            <select v-model="newStatus"
              class="col-span-6 sm:col-span-2  text-woodsmoke-400 px-5 py-2 rounded-xl border-r-[15px] border-transparent ring-1 ring-woodsmoke-700 font-light bg-woodsmoke-900 focus:outline-none focus:ring-1 focus:ring-woodsmoke-600 focus:invalid:ring-carnation-500">
              <option value="Padrão">Padrão</option>
              <option value="Importante">Importante</option>
              <option value="Fazendo">Fazendo</option>
              <option value="Parado">Parado</option>
              <option value="Finalizado">Finalizado</option>
            </select>
          </div>

          <div v-else class="col-span-6 sm:col-span-3 grid items-center gap-3">
            <label class="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" v-model="task.checked" hidden @change="toggleStatus(task.id)" />
              <div :class="['w-4 h-4 rounded items-center transition-colors duration-200',
                task.checked ? 'bg-royal-green-500' : 'bg-woodsmoke-600']">
                <svg v-if="task.checked" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor" class="w-4 h-4 text-royal-green-950">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div class=" flex items-center justify-center"
                :class="[task.checked ? 'line-through text-woodsmoke-400' : 'text-woodsmoke-50']">
                <span class="text-xs flex items-center p-2 text-woodsmoke-400">{{ task.id }} </span>{{ task.text }}
              </div>
            </label>
          </div>

          <PillStatus :status="task.status"
            class="col-span-2 sm:col-span-2 flex items-center justify-start sm:justify-center" />
          <div class="gap-3 col-span-4 sm:col-span-1 flex items-center justify-end py-3">
            <ButtonDefault v-if="task.isEditing" @click.stop="saveTask(task)" texto="Salvar" variant="secondary"
              withIcon icon="save" size="xs" />
           
            <ButtonDefault @click="editTask(task)" variant="secondary" withIcon icon="edit" size="xs" />
            <ButtonDefault @click="deleteTask(task.id)" variant="danger" withIcon icon="trash" size="xs" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import ButtonDefault from '@/components/ButtonDefault.vue'
import { reactive, computed, onBeforeMount, ref } from 'vue';

const supabase = useSupabaseClient()
const { data: { user } } = await supabase.auth.getUser()


const signOut = async () => {
  await supabase.auth.signOut()
  reloadNuxtApp({
    path: '/',
    ttl: 1000
  })
}

const newText = ref('')
const newStatus = ref('')
const createText = ref('')
const createStatus = ref('Padrão')
const tasks = ref([])
const countTasks = ref({
  Padrão: 0,
  Importante: 0,
  Fazendo: 0,
  Parado: 0,
  Finalizado: 0,
})

onBeforeMount(getTasks);

async function toggleStatus(id) {
  const { data, error } = await supabase
    .from('tasks')
    .select('checked')
    .eq('id', id)
    .single(); // Certifique-se de que retorna apenas uma tarefa

  if (error) {
    console.error('Error fetching task:', error);
    return;
  }

  const currentStatus = data.checked;

  console.log(data);

  let newStatus = currentStatus ? "Padrão" : "Finalizado";

  const { data: updateData, error: updateError } = await supabase
    .from('tasks')
    .update({ checked: !currentStatus, status: newStatus })
    .eq('id', id);

  if (updateError) {
    console.error('Error updating task:', updateError);
    return;
  }

  getCountTasks();
  getTasks();
}


async function deleteTask(id) {
  const { error } = await supabase
    .from('tasks')
    .delete()
    .eq('id', id)

  getCountTasks()
  getTasks()

};

function closeEdit(task) {
  task.isEditing = false;
};

async function editTask(task) {

 this.tasks.forEach(t => {
    if (t !== task) {
      t.isEditing = false;
    }
  });

  task.isEditing = true;
  newText.value = task.text
  newStatus.value = task.status

};

async function saveTask(task) {

  const { data, error } = await supabase
    .from('tasks')
    .update({ text: newText.value, status: newStatus.value })
    .eq('id', task.id)
    .select()

  getCountTasks()
  getTasks()
  task.isEditing = false;
};

async function createTask() {
  const newTask = {
    text: createText.value,
    status: createStatus.value,
    checked: false,
    isEditing: false,
  };

  const { data, error } = await supabase
    .from('tasks')
    .insert([
      { text: newTask.text, status: newTask.status, checked: false, user_id: user.id },
    ])
    .select()

  // Reset the form inputs
  createText.value = '';
  createStatus.value = 'Padrão'; // Reset the status to default (Padrão)

  getCountTasks()
  getTasks()

};

async function getTasks() {

  if (!user) {
    return;
  }

  const { data, error } = await supabase
    .from('tasks')
    .select('*')
    .order('created_at', { ascending: true })
    .eq('user_id', user.id);


  if (error) {
    console.error('Error fetching tasks:', error);
    return; // Return early if an error occurs
  }
  tasks.value = data;

  console.log(tasks);
  getCountTasks();
}

async function getCountTasks() {
  const { data, error } = await supabase
    .from('tasks')
    .select('status')
    .eq('user_id', user.id);

  countTasks.value = {
    Padrão: tasks.value.filter(task => task.status === 'Padrão').length,
    Importante: tasks.value.filter(task => task.status === 'Importante').length,
    Fazendo: tasks.value.filter(task => task.status === 'Fazendo').length,
    Parado: tasks.value.filter(task => task.status === 'Parado').length,
    Finalizado: tasks.value.filter(task => task.status === 'Finalizado').length,
  };
}

</script>
