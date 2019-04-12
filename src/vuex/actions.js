//test
export const increment = ({commit}) => {
    commit('INCREMENT')
}
export const decrement = ({commit}) => {
    commit('DECREMENT')
}

export const setAccount = ({commit}, platform) => {
    commit('SET_ACCOUNT', platform)
}
