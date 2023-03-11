const productsArr = [];
for (let i = 1; i <= 1000; i++) {
  const productObj = {
    name: `san pham so ${i}`,
    image:
      'https://salt.tikicdn.com/cache/750x750/ts/product/d8/9a/5d/7d1f6e507378b6a76584fce46425ada8.jpg.webp',
    description: `${i} Bên Bờ Sinh Tử - Gieo Nhân Lành Để Nhận Quả Lành - trang bị cho mình một hành trang tốt đẹp ở tương lai, ở những cõi tái sinh sau này`,
    brand: 'Tritueviet',
    category: 'book',
    price: 120000,
    countInStock: 200,
    rating: 0,
    numReviews: 0,
  };

  productsArr.push(productObj);
}

module.exports = productsArr;
