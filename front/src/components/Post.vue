<template>
	<div @click="onClick()" class="post">
		<h3>
			{{ post.title }}
			<i @click="$emit('delete-post', post.id)" class="fas fa-times"></i>
		</h3>
		<p>{{ post.content }}</p>
	</div>
</template>

<script>
export default {
	name: "Post",
	props: {
		post: { Object },
	},
	methods: {
		onClick() {
			console.log("click");
		},
	},
};
</script>

<style scoped>
.fas {
	color: red;
}
.post {
	background: #f4f4f4;
	margin: 5px;
	padding: 10px 20px;
	cursor: pointer;
}
.post h3 {
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-bottom: 20px;
}
</style>
