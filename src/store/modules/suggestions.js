// This module contains code relative to suggestions
import Vue from 'vue'
import store from '@/store/index.js'
import debounce from 'lodash/debounce'
import filterMixin from '@/components/mixins/filters'

const state = {
  storedSuggestions: {},
  baseAdressSuggestions: process.env.BASE_ADDRESS_SIRENE_SUGGESTIONS,
  querySuggestions: '',
  suggestActive: ''
}

const getters = {
  suggestionAdressToGet: state => {
    return state.baseAdressSuggestions + state.querySuggestions
  }
}

const mutations = {
  setQuerySuggestions (state, query) {
    state.querySuggestions = query
  },
  setStoredSuggestions (state, suggestions) {
    state.storedSuggestions = suggestions
  }
}
const actions = {
  executeSearchSuggestions: debounce(function () {
    Vue.http.get(this.getters.suggestionAdressToGet).then(response => {
      store.dispatch('filterAndStoreSuggestions', response.body)
    }, response => {
      store.commit('setStoredSuggestions', '')
    })
  }, 50), // delay between suggestion searches
  filterAndStoreSuggestions: function (state, suggestionsObject) {
    const suggestionsArray = suggestionsObject.suggestions
    const filteredSuggestions = suggestionsArray.map(filterMixin.filters.removeExtraChars)
    store.commit('setStoredSuggestions', filteredSuggestions)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
