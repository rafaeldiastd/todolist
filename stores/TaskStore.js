export const tasksStore = defineStore('tasksStore', {
  state: () => ({
    tasks: [],
    countTasks: [
      {
        nome: 'Padrão',
        quantidade: 0
      },
      {
        nome: 'Importante',
        quantidade: 0
      },
      {
        nome: 'Fazendo',
        quantidade: 0
      },
      {
        nome: 'Parado',
        quantidade: 0
      },
      {
        nome: 'Finalizado',
        quantidade: 0
      }],
    alert: false
  }),

  actions: {

    updateCountTasks() {
      this.countTasks.forEach(item => {
        item.quantidade = this.tasks.filter(task => task.status === item.nome).length
      })
    },

    async getTasks() {

      const supabase = useSupabaseClient()
      const { data: { user } } = await supabase.auth.getUser()

      if (!user) {
        reloadNuxtApp({
          path: '/',
          ttl: 1000
        })
      } else {

        const { data, error } = await supabase
          .from('tasks')
          .select('*')
          .order('created_at', { ascending: true })
          .eq('user_id', user.id);


        if (error) {
          console.error('Error fetching tasks:', error);
          return; // Return early if an error occurs
        }
        if (data) {
          this.tasks = data
          this.updateCountTasks()
        }
      }
    },

    async createTask(text, status, checked) {
      const supabase = useSupabaseClient()
      const { data: { user } } = await supabase.auth.getUser()

      const { data, error } = await supabase
        .from('tasks')
        .insert([
          { text: text, status: status, checked: checked, user_id: user.id },
        ])
        .select()

      this.alert = true
      this.getTasks()

    },

    async deleteTask(id) {

      const supabase = useSupabaseClient()
      const { data: { user } } = await supabase.auth.getUser()

      const { error } = await supabase
        .from('tasks')
        .delete()
        .eq('id', id)

      this.getTasks()
    },

    async saveTask(text, status, task) {

      const supabase = useSupabaseClient()
      const { data: { user } } = await supabase.auth.getUser()

      const { data, error } = await supabase
        .from('tasks')
        .update({ text: text, status: status, checked: false })
        .eq('id', task.id)
        .select()

      this.getTasks()
    },

    closeEdit(task) {
      task.isEditing = false;
    },

    async toggleStatus(id) {

      const supabase = useSupabaseClient()
      const { data: { user } } = await supabase.auth.getUser()

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
      let newStatus = currentStatus ? "Padrão" : "Finalizado";

      const { data: updateData, error: updateError } = await supabase
        .from('tasks')
        .update({ checked: !currentStatus, status: newStatus })
        .eq('id', id);

      if (updateError) {
        console.error('Error updating task:', updateError);
        return;
      }

      this.getTasks()

    }

  }
})
