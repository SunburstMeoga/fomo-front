<template>
    <div class="text-text w-11/12 mr-auto ml-auto sm:flex sm:items-baseline sm:w-10/12">
        <div class="text-2xl font-bold sm:text-3xl">
            {{ titleWord }}
        </div>
        <div class="leading-4 text-ls sm:pl-2 sm:text-lg">
            {{ secondTitle }}
        </div>
    </div>
</template>

<script>
export default {
    props: {
        titleWord: {
            type: String,
            default: ''
        },
        secondTitle: {
            type: String,
            default: ''
        }
    }
}
</script>

<style scoped></style>
