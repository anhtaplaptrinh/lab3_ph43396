const exp = require('constants')
const express = require('express')
const app = express()
const port = 3000

app.listen(port, ()=> {
  console.log(`server dang chay tren cong ${port}`);
})
app.use(express.json());

const uri = 'mongodb+srv://anhttph43396:1234565ATT@lab3-anhttph43396.9jz7xzv.mongodb.net/db';

const spModel = require('./sanpham');
const mongoose = require('mongoose');

app.get('/',async (req,res)=> {
  await mongoose.connect(uri);

  let sanphams = await spModel.find();
  console.log(sanphams);
  res.send(sanphams);
})

app.post('/add_sp', async (req, res) => {
  await mongoose.connect(uri);

  try {
      const newSanphamData = req.body;

      const newSanpham = await spModel.create(newSanphamData);

      const sanphams = await spModel.find();

      res.send(sanphams);
  } catch (error) {
      console.error('Lỗi khi thêm sản phẩm:', error);
      res.status(500).send('Lỗi máy chủ nội bộ');
  }
});
app.delete('/xoa/:id', async (req, res) => {
  await mongoose.connect(uri);

  let id = req.params.id;
  let kq = await spModel.deleteOne({ _id: id });

  const sanphams = await spModel.find();

  res.send(sanphams);
})

app.put('/sua/:id', async (req, res) => {
  try {
      const id = req.params.id;
      const updatedFields = req.body;
      console.log(updatedFields);
      const updatedSanpham = await spModel.findByIdAndUpdate(id, updatedFields, { new: true });

      if (!updatedSanpham) {
          return res.status(404).send('Sản phẩm không tồn tại');
      }

      res.send(updatedSanpham);
  } catch (error) {
      console.error('Lỗi khi cập nhật sản phẩm:', error);
      res.status(500).send('Lỗi máy chủ nội bộ');
  }
});
