import { useFunc } from '@faasjs/func'
import { createReadStream } from 'node:fs'

export default useFunc(() => {
  return async ({ event }) => {
    event.raw.response.setHeader(
      'Content-Disposition',
      'attachment; filename="download.func.ts"'
    )
    event.raw.response.setHeader('Content-Type', 'text/plain')

    const stream = createReadStream(`${__dirname}/download.func.ts`)

    await new Promise((resolve, reject) => {
      stream.on('open', () => stream.pipe(event.raw.response))

      stream.on('error', err => {
        event.raw.setStatus(500)
        event.raw.setBody('Internal Server Error')
        reject(err)
      })

      stream.on('end', resolve)
    })

    event.raw.response.end()
  }
})
