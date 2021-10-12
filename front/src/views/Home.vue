<template>
	<div>
		<Navigation />
		<h1>Bienvenue sur le réseau de Groupomania</h1>
		<Posts />
	</div>
</template>

<script>
import Navigation from "../components/Navigation.vue";
export default {
	name: "Home",
	components: {
		Navigation,
	},
};
</script>

<style scoped></style>
