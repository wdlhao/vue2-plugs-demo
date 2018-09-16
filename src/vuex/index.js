import {mapGetters, mapMutations, mapActions} from 'vuex'

/* 只写组件中的script部分 */
export default {
  computed: {
    ...mapGetters([
      name,
      age
    ])
  },
  methods: {
    ...mapMutations({
      setName: 'SET_NAME',
      setAge: 'SET_AGE'
    }),
    ...mapActions([
      nameAsyn
    ])
  }
}
