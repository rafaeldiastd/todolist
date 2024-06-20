<template>



</template>

<script setup>

const supabase = useSupabaseClient()

supabase.auth.signInWithOAuth({
  provider: 'google',
})

</script>

<style></style>