import mongoose from 'mongoose';
import app from './app';
import Comment from './module/comment';

const DB = process.env.DATABASE_URL.replace('<PASSWORD>', process.env.PASSWORD);
const DATABASE_LOCAL = process.env.DATABASE_LOCAL;
mongoose
  .connect(DATABASE_LOCAL, {
    // v6 not suppot affter config so we use v5.5.2
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then((con) => {
    console.log('DB connection successful !');
  })
  .catch((err) => {
    console.log(err);
  });

const io = require('socket.io')(app, {
  cors: {
    origin: process.env.HOST_CLIENT,
  },
});

let users = [];
io.on('connection', (socket) => {
  console.log(`✅ ${socket.id}`);

  socket.on('join_product', (room) => {
    const user = { id: socket.id, room: room };

    const check = users.every((user) => user.id !== socket.id);

    if (check) {
      socket.join(room);
      users.push(user);
    } else {
      users.map((user) => {
        if (user.id === socket.id) {
          if (user.room !== room) {
            socket.leave(user.room);
            socket.join(room);
            user.room = room;
          }
        }
      });
    }

    console.log(users);
  });

  socket.on('createComment', async (data) => {
    const { username, content, product_id, createdAt, rating, send } = data;
    const newComment = new Comment({
      username,
      content,
      product_id,
      createdAt,
      rating,
    });

    if (send === 'replyComment') {
      const { _id, username, content, product_id, createdAt, rating } = newComment;
      const id_comment = product_id;
      const comment = await Comment.findById(id_comment);

      if (comment) {
        comment.reply.push({ _id, username, content, createdAt, rating });
        await comment.save();
        io.to(comment.product_id).emit('sendReplyToClient', comment);
      }
    } else {
      await newComment.save();
      io.to(newComment.product_id).emit('sendCommentToClient', newComment);
    }
  });

  socket.on('disconnect', () => {
    console.log(`🤕${socket.id} disconnected`);
    users = users.filter((user) => user.id !== socket.id);
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`\n\n\nRunning on PORT 👉 http://localhost/${PORT} 🙉\n\n\n`);
});
