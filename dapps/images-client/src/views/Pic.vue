<template lang="pug">
.pic
  h1 image
  h2 {{ name }} {{ file }} {{ parsed }}
  h3 {{ done }} / {{ currentChunk }} / {{ chunks }}
  template(v-if="done")
    img(:src="createImageURL(blob)")
</template>
<script>
import config from '../lib/config'
import { parseFileName, createImageURL } from '../lib/utils'
import Files from '../lib/Files'
export default {
  name: 'pic',
  props: ['name', 'chain'],
  data () {
    return {
      chunks: undefined,
      currentChunk: undefined,
      blob: new Uint8Array()
    }
  },
  async created () {
    const { parsed, client } = this
    const { address } = parsed
    if (!client || !address) return
    let chunks = await client.getNoChunks(address)
    chunks = chunks || 0
    this.chunks = chunks
    for (let i = 0; i < chunks; i++) {
      this.currentChunk = i + 1
      const data = await client.getChunk(address, i)
      const { blob } = this
      const newBlob = new Uint8Array(blob.length + data.length)
      newBlob.set(blob)
      newBlob.set(data, blob.length)
      this.blob = newBlob
    }
  },
  computed: {
    done () {
      const { chunks, currentChunk, blob } = this
      return blob && chunks && chunks === currentChunk
    },
    net () {
      const { chain } = this
      return chain ? config.networks[chain] : undefined
    },
    client () {
      const { net } = this
      return net.node ? Files(net.node) : undefined
    },
    parsed () {
      const { name } = this
      return (name) ? parseFileName(name) : undefined
    },
    file () {
      const { parsed } = this
      return (parsed) ? config.images[parsed.address] : undefined
    },
    mimeType () {
      const parsed = this.parsed || {}
      const { extension } = parsed
      return extension ? `image/${extension}` : undefined
    }
  },
  methods: {
    createImageURL (typedArray) {
      return createImageURL(typedArray, this.mimeType)
    }
  }
}
</script>
