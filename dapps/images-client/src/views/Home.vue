<template lang="pug">
h1 home
  ul.images
    li(v-for="img in images")
      router-link(:to="`/image/31/${img.name}`") {{ img.title }}
</template>
<script>
// @ is an alias to /src
import config from '../../src/lib/config'

export default {
  name: 'Home',
  data () {
    return config
  },
  components: {
  }
}
</script>
