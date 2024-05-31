const express = require('express');
const kafka = require('kafka-node');
const mongoose = require('mongoose');
const senderInit = require('./controller/emailConfig');

const app = express();

app.use(express.json());


// Função para esperar Kafka estar disponível
const waitForKafka = async (client) => {
  let retries = 10;
  while (retries) {
    try {
      await client.connect();
      console.log("Kafka is ready");
      break;
    } catch (err) {
      retries -= 1;
      console.log(`Kafka not ready, retries left: ${retries}`);
      await new Promise(res => setTimeout(res, 5000));
    }
  }
  if (!retries) throw new Error("Kafka is not available");
};

const dbsAreRunning = async () => {
  mongoose.connect(process.env.MONGO_URL);

  const client = new kafka.KafkaClient({ kafkaHost: process.env.KAFKA_BOOTSTRAP_SERVERS });
  const consumer = new kafka.Consumer(client, [{ topic: process.env.KAFKA_TOPIC, partition: 0 }], {
    autoCommit: false
  });

  // Espera Kafka estar disponível antes de prosseguir
  await waitForKafka(consumer);

  consumer.on('message', async (message) => {
    const data = JSON.parse(message.value);
    const orderId = data._id
    // Montando mensagem do email
    const text = `
<div style="padding: 10px;">
  <p>Oi Natalia, você recebeu um novo pedido.</p>
  <div style="display: block; width: 900px; white-space: nowrap; overflow-x: auto; margin: 10px 10px 10px 10px;">
    <a method="POST" href="http://localhost:8080/confirm?id=${orderId}" style="background-color: #ed3380;
      border: none;
      color: white;
      padding: 15px 32px;
      text-align: center;
      text-decoration: none;
      display: inline-block;
      font-size: 16px;
      margin: 4px 2px;
      cursor: pointer;">CONFIRMAR</a>
  </div>
  <br />
  <footer>
    <img
      src="https://firebasestorage.googleapis.com/v0/b/tec-integracao.appspot.com/o/LOGO-rosa.png?alt=media&token=38c0db5a-cfd0-4124-9c3d-75e44b740e98"
      alt="nato sabor" width="80" />
    <br/>
  </footer>
</div> `;

    // Configurações do email
    const msg = {
      from: `Nato Sabor`,
      to: "paulo.victor.ig@hotmail.com",
      subject: "Novo pedido NATO",
      html: text,
    }

    const sender = await senderInit()
    await new Promise((resolve, reject) => {
      sender.sendMail(msg, (error, info) => {
        if (error) {
          reject(error);
        } else {
          resolve(info);
        }
      });
    });
  });

  consumer.on('error', (err) => {
    console.log('Error:', err);
  });
}
setTimeout(dbsAreRunning, 10000);




app.listen(process.env.PORT, () => {
  console.log('Server 2 is running on port', process.env.PORT);
});