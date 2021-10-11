<template>
	<div>
		<McvTopBar />
		<router-view></router-view>
	</div>
</template>

<script>
import McvTopBar from '@/components/TopBar'

export default {
	components: {
		McvTopBar
	},
}
</script>
