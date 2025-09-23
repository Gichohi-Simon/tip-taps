import '@tiptap/core'

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    image: {
      /**
       * Insert or update an image
       */
      setImage: (options: { src: string; alt?: string; title?: string }) => ReturnType
    }
  }
}
