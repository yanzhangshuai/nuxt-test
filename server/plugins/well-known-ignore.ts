export default defineNitroPlugin((nitroApp) => {
  const originalWarn = console.warn

  console.warn = (...args) => {
    if (args[0].includes('well-known')) {
      return
    }
    originalWarn(...args)
  }

})
