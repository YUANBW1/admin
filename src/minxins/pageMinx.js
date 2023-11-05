export default {
  data() {
    var page = { page_size: 10, page_index: 1, total: 0 }
    return {
      page: page,
      data: []
    }
  },
  mounted() {
    this.refresh()
  },

  methods: {

    async refresh(search) {
      this.loading = true
      const arg = {
        ...search,
        ...this.page
      }
      for (const item in arg) {
        if (arg[item] === '') delete arg[item]
      }
      console.log(arg)
      const { errorCode, errorMsg, data } = await this.getList(arg)

      console.log(data)
      if (errorCode == 0) {
        console.log(data.page_index)
        this.data = data.list
        this.page.total = data.total
        this.page_index = data.page_index
      }
      this.loading = false
    },
    getList(params) {
      return {
        data: '方法未实现'
      }
    }
  }
}
