<template>
	<div class="feed">
		<div v-if="isLoading" class="feed__loading">
			<img src="../assets/loading.svg" alt="loading">
		</div>
		<div v-if="error">Something bad happened</div>
		<div v-if="feed">
			<div class="article-preview" v-for="(article, index) in feed.articles" :key="index">
				<div class="article-meta">
					<router-link :to="{
						name: 'userProfile', params: {slug: article.author.username}}">
						<img :src="article.author.image" alt="user"/>
					</router-link>
					<div class="info">
						<router-link
							:to="{
							name: 'userProfile',
							params: {slug: article.author.username}
						}"
							class="author"
						>
							{{ article.author.username }}
						</router-link>
						<span class="date">{{ article.createdAt }}</span>
					</div>
					<div class="pull-xs-right">
						ADD TO FAVORITES
					</div>
				</div>
				<router-link :to="{name: 'article', params: {slug: article.slug}}" class="preview-link">
					<h1>{{ article.title }}</h1>
					<p>{{ article.description }}</p>
					<span>Read more...</span>
					TAG LIST
				</router-link>
			</div>
			<McvPagination
				:total="total"
				:limit="limit"
				:currentPage="currentPage"
				:url="url"
			/>
		</div>
	</div>
</template>

<script>
import {mapState} from 'vuex'
import {actionTypes} from '@/store/modules/feed'
import McvPagination from '@/components/Pagination'

export default {
	name: "McvFeed",
	components: {
		McvPagination
	},
	props: {
		apiUrl: {
			type: String,
			required: true
		}
	},
	data() {
		return {
			total: 500,
			limit: 10,
			currentPage: 5,
			url: '/'
		}
	},
	computed: {
		...mapState({
			isLoading: state => state.feed.isLoading,
			feed: state => state.feed.data,
			error: state => state.feed.error
		})
	},
	mounted() {
		this.$store.dispatch(actionTypes.getFeed, {apiUrl: this.apiUrl})
	}
}
</script>

<style scoped>
.feed__loading {
	display: flex;
	justify-content: center;
}
</style>