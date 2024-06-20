<template>



</template>

<script setup>
const supabase = useSupabaseClient()

const { data, error } = await supabase.auth.signInWithOAuth({
  provider: 'google',
})

</script>

<style></style>