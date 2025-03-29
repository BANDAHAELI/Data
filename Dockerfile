FROM node:lts-buster

RUN git clone https://github.com/shani-kh/Data /root/Data

WORKDIR /root/Data

RUN npm install

EXPOSE 9090

CMD ["node", "index.js"]
