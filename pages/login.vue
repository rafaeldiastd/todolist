<template>



</template>

<script setup>

const supabase = useSupabaseClient()
supabase.createClient('process.env.SUPABASE_URL', 'process.env.SUPABASE_KEY')

const { data, error } = await supabase.auth.signInWithOAuth({
  provider: 'google',
})

</script>

<style></style>