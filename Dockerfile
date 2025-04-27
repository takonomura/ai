FROM node:22.15 AS base

RUN apt-get update \
	&& apt-get install -y --no-install-recommends mecab libmecab-dev mecab-ipadic-utf8 \
	&& rm -rf /var/lib/apt/lists/*

FROM base AS build-dic

RUN apt-get update \
	&& apt-get install -y --no-install-recommends git make curl xz-utils file \
	&& rm -rf /var/lib/apt/lists/*

RUN git clone --depth 1 https://github.com/yokomotod/mecab-ipadic-neologd.git /tmp/mecab-ipadic-neologd \
	&& cd /tmp/mecab-ipadic-neologd \
	&& ./bin/install-mecab-ipadic-neologd -y -u \
	&& rm -rf /tmp/mecab-ipadic-neologd

FROM base

RUN apt-get update \
	&& apt-get install -y --no-install-recommends tini \
	&& rm -rf /var/lib/apt/lists/*

COPY --from=build-dic /usr/lib/x86_64-linux-gnu/mecab/dic/mecab-ipadic-neologd /usr/lib/x86_64-linux-gnu/mecab/dic/mecab-ipadic-neologd
RUN echo "dicdir = /usr/lib/x86_64-linux-gnu/mecab/dic/mecab-ipadic-neologd/" > /etc/mecabrc

WORKDIR /ai

COPY . ./

RUN npm install && npm run build || test -f ./built/index.js

ENTRYPOINT ["/usr/bin/tini", "--"]
CMD ["npm", "start"]
