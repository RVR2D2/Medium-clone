<template>
	<ul class="error-messages">
		<li v-for="errorMessage in errorMessages" :key="errorMessage">{{errorMessage}}</li>
	</ul>
</template>

<script>
export default {
	name: "McvValidationsError",
	props: {
		validationsError: {
			type: Object,
			required: true
		}
	},
	computed: {
		errorMessages() {
			return Object.keys(this.validationsError).map((name) => {
				const messages = this.validationsError[name].join(', ')
				return `${name} ${messages}`
			})
		}
	}
}
</script>

<style scoped>

</style>