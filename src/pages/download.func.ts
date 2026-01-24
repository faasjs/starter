import { createReadStream } from 'node:fs'
import { useFunc } from '@faasjs/func'

export default useFunc(() => {
  return async () => {
    const stream = createReadStream(`${__dirname}/download.func.ts`)

    return new Response(
      new ReadableStream({
        async start(controller) {
          stream
            .on('data', chunk => controller.enqueue(chunk))
            .on('error', err => {
              controller.error(err)
            })
            .on('end', () => controller.close())
        },
      }),
      {
        headers: {
          'Content-Disposition': 'attachment; filename="download.func.ts"',
          'Content-Type': 'text/plain',
        },
      }
    )
  }
})
