const exp = require('constants')
const express = require('express')
// const Upload = require('./upload');
const app = express();
const port = 3000

app.listen(port, () => {
    console.log(`Server đang chạy ở cổng ${port}`)
})

// app.use(express.urlencoded())
app.use(express.json());

const api = require('./api')
app.use('/api', api)

const uri = 'mongodb+srv://anhttph43396:1234565ATT@lab3-anhttph43396.9jz7xzv.mongodb.net/db'

const spModel = require('./sanpham')
const mongoose = require('mongoose');

app.get('/', async (req, res) => {
    await mongoose.connect(uri)

    let sanphams = await spModel.find();

    res.send(sanphams)
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
    try {
      const { id } = req.params;
      const result = await spModel.findOneAndDelete({ _id: id });
      if (result) {
        res.status(201).json({ success: true, message: "Xóa thành công", data: result });
      } else {
        res.status(500).json({ success: false, message: "Lỗi khi xóa sản phẩm" });
      }
    } catch (error) {
        res.status(505).json({ success: false, message: "Lỗi "});
    }
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

// app.post('/upload_image', Upload.array('image', 5), async (req, res) => {
//     await mongoose.connect(uri);
    
//     try {
//       const data = req.body;
//       const files = req.files;

//       console.log(JSON.stringify(data));

//       const urlImages = files.map(file => `${req.protocol}://${req.get("host")}/uploads/${file.filename}`);

//       const newSanPham = new spModel({
//         ten: data.ten,
//         image: urlImages,
//         gia: data.gia,
//         soluong: data.soluong,
//         tonkho: data.tonkho
//       });
  
//       const result = await newSanPham.save();
  
//       if (result) {
//         res.json({
//           "status": "200",
//           "messenger": "Thêm thành công",
//           "data": result,
//         });
//       } else {
//         res.json({
//           "status": "400",
//           "messenger": "Lỗi, thêm không thành công",
//           "data": [],
//         });
//       }
// } catch (error) {
//       console.log(error);
//       res.status(500).json({
//         "status": "500",
//         "messenger": "Lỗi máy chủ nội bộ",
//         "data": [],
//       });
//     }
//   });

module.exports = {
  uri: uri
}
