FROM docker.io/faasjs/node AS build

WORKDIR /app

COPY . .

RUN npm install && npm run build && npm prune --omit=dev && npm cache clean --force

FROM docker.io/faasjs/node

COPY --from=build /app /app

WORKDIR /app

EXPOSE 3000

ENV NODE_ENV=production
ENV PORT=3000
ENV HOST=0.0.0.0

CMD ["npm", "run", "server"]
