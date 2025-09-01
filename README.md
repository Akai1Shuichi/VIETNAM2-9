# 🇻🇳 Flag Animation Web App

Ứng dụng web hiển thị lá cờ Việt Nam bay phấp phới, phủ toàn màn hình, với hiệu ứng uốn lượn mượt mà. Có thể tùy chỉnh tốc độ uốn lượn và phát nhạc nền.

## 🚀 Hướng dẫn sử dụng

1. Mở file `index.html` bằng trình duyệt bất kỳ.
2. Lá cờ sẽ tự động phủ toàn màn hình và bay phấp phới.
3. Sử dụng thanh trượt **Tốc độ uốn lượn** để điều chỉnh tốc độ chuyển động của lá cờ.
4. Chọn nhạc từ danh sách, phát/tạm dừng hoặc chuyển bài bằng các nút điều khiển.

## 🎵 Thay đổi nhạc

- Để thay đổi danh sách nhạc, hãy chỉnh sửa các thẻ `<option>` trong phần `<select id="musicSelect">` của file `index.html`.
- Đường dẫn nhạc có thể là link trực tuyến hoặc file local (nên đặt trong thư mục `assets`).
- Nếu dùng file local, hãy đảm bảo file nhạc đã được copy vào thư mục `assets` của dự án.

**Ví dụ:**

```html
<select id="musicSelect">
  <option value="assets/song1.mp3">Tên bài hát 1</option>
  <option value="https://example.com/song2.mp3">Tên bài hát 2</option>
</select>
```

## 🌐 Deploy web

Bạn có thể deploy web bằng các dịch vụ như:

- GitHub Pages
- [Netlify](https://www.netlify.com)
- [Vercel](https://vercel.com)
- [Render](https://render.com/)

---

# VIETNAM2-9
