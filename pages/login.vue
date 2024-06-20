<template>



</template>

<script setup>

import { createClient } from '@supabase/supabase-js'
const supabase = createClient('process.env.SUPABASE_URL', 'process.env.SUPABASE_KEY')

const { data, error } = await supabase.auth.signInWithOAuth({
  provider: 'google',
})

</script>

<style></style>