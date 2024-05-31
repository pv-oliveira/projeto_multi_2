const express = require('express');
const kafka = require('kafka-node');
const cors = require("cors");
const mongoose = require('mongoose');
const senderInit = require('./controller/emailConfig');

const app = express();
const client = new kafka.KafkaClient({ kafkaHost: process.env.KAFKA_BOOTSTRAP_SERVERS });

app.use(cors());
app.use(express.json());

const createTopic = (topicName) => {
  return new Promise((resolve, reject) => {
    client.createTopics(
      [
        {
          topic: topicName,
          partitions: 1,
          replicationFactor: 1,
        },
      ],
      (error, result) => {
        if (error) {
          return reject(error);
        }
        resolve(result);
      }
    );
  });
};

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
  mongoose.connect(process.env.DB_URL);
  const Pedido = new mongoose.model('Pedidos', { user: { email: String, name: String, address: String }, amount: Number, products: Array, status: String });

  const producer = new kafka.Producer(client);

  // Espera Kafka estar disponível antes de prosseguir
  await waitForKafka(producer);
  const topic = process.env.KAFKA_TOPIC

  try {
    await createTopic(topic);
    console.log(`Topic ${topic} created`);
  } catch (err) {
    console.error(`Failed to create topic ${topic}`, err);
  }

  producer.on('ready', () => {
    console.log('Kafka Producer is connected and ready.');
  });

  producer.on('error', (err) => {
    console.error('Kafka Producer error:', err);
  });

  // Definir as rotas somente após garantir que tudo está pronto
  app.get('/', (req, res) => {
    res.send('Producer is ready');
  });

  app.post('/', async (req, res) => {
    console.log('Producer is ready');
    const data = req.body;
    data.status = "PENDENTE"

    const pedido = await new Pedido(data);
    const saved_pedido = await pedido.save();

    producer.send([{ topic: process.env.KAFKA_TOPIC, messages: JSON.stringify(saved_pedido) }], async (err, data) => {
      if (err) {
        console.log('Error:', err);
      } else {
        console.log('mensagem enviada:', data);
      }
      res.send({message: "Pedido recebido com sucesso!"});
    });
  });

  // Rota para receber a confirmação
  app.get('/confirm', async (req, res) => {
    const { id } = req.query;
    console.log('Pedido confirmado com ID:', id);
    const filter = { _id: id };
    const update = { status: "CONFIRMADO" };

    const data = await Pedido.findOneAndUpdate(filter, update);
    console.log(data);

    const text = `
<div style="padding: 10px;">
  <p>Olá, ${data.user.name}!</p>
  <div style="display: block; width: 900px; white-space: nowrap; overflow-x: auto; margin: 10px 10px 10px 10px;">
    <h1>Pedido confirmado!</h1>
    <p>Muito obrigado por ter feito seu pedido conosco, já estamos preparando tudo para você!</p>
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
      to: data.user.email,
      subject: "Seu pedido está a caminho",
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

    res.send('Confirmação recebida!');
  });
}
setTimeout(dbsAreRunning, 5000);




app.listen(process.env.PORT, () => {
  console.log('Server is running on port', process.env.PORT);
});