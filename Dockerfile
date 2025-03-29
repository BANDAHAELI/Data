FROM node:lts-buster

RUN git clone https://github.com/BANDAHAELI/Data /root/Data
WORKDIR /root/Data

RUN npm install

COPY . .

EXPOSE 9090

CMD ["node", "index.js"]
