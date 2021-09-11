FROM faasjs/vscode:alpine

RUN npm config set registry https://registry.npmjs.org
RUN yarn config set registry https://registry.yarnpkg.com

COPY ./bin/start.sh /bin/start
COPY ./bin/_start.sh /bin/_start.sh
RUN echo "source /bin/_start.sh" >> /root/.zshrc
