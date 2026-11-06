# Personal Learning Portfolio

เว็บไซต์ Personal Learning Portfolio เป็น Web Application สำหรับสร้าง Portfolio ส่วนตัว เพื่อบันทึกประสบการณ์การเรียนรู้ ทักษะ สิ่งที่ได้ลงมือทำ และสิ่งที่ได้เรียนรู้จากแต่ละกิจกรรมหรือโปรเจกต์

## 1. Project Description

เว็บไซต์นี้ช่วยให้ผู้ใช้สามารถสร้างและจัดการ Portfolio ของตนเองได้ โดยไม่จำเป็นต้องมีผลงานขนาดใหญ่ก่อนเริ่มต้น สามารถบันทึกประสบการณ์และพัฒนาการเรียนรู้ของตนเองได้อย่างเป็นระบบ ข้อมูลทั้งหมดถูกเก็บไว้ใน Local Storage ของเบราว์เซอร์ผู้ใช้เอง จึงไม่ต้องสมัครสมาชิกและไม่มีเซิร์ฟเวอร์หรือฐานข้อมูลฝั่งหลังบ้าน

## 2. Technologies Used

* HTML5 – ใช้สร้างโครงสร้างเว็บไซต์
* CSS3 – ใช้ตกแต่งและจัดรูปแบบเว็บไซต์
* JavaScript (Vanilla JS) – ใช้จัดการข้อมูลและการทำงานต่าง ๆ ของเว็บไซต์
* Bootstrap 5.3.3 – ใช้ช่วยในการออกแบบหน้าตาเว็บไซต์ (โหลดจาก CDN)
* Local Storage – ใช้จัดเก็บข้อมูลภายใน Browser

## 3. Project Structure

```
CS100_POWER_UP_Checkpoint_Instruction_G17/
│
├── css/
│   └── style.css
│
├── js/
│   └── app.js
│
├── index.html
├── sample-portfolio-1.json
├── sample-portfolio-2.json
└── README.md
```

## 4. Requirements

ก่อนเปิดใช้งานเว็บไซต์ ควรมีสิ่งต่อไปนี้

* Web Browser เช่น Google Chrome, Microsoft Edge หรือ Firefox
* โปรแกรม Visual Studio Code (แนะนำ)
* Internet Connection สำหรับโหลด Bootstrap จาก CDN

## 5. How to Run the Website

**วิธีที่ 1: เปิดผ่าน Visual Studio Code (แนะนำ)**

1. ดาวน์โหลดโปรเจกต์จาก GitHub โดยกดปุ่ม Code และเลือก Download ZIP
2. แตกไฟล์ ZIP ที่ดาวน์โหลดมา
3. เปิดโปรแกรม Visual Studio Code
4. เลือก File > Open Folder
5. เลือกโฟลเดอร์โปรเจกต์ที่แตกไฟล์ไว้
6. คลิกขวาที่ไฟล์ `index.html` แล้วเลือก Open with Live Server
7. เว็บไซต์จะเปิดขึ้นใน Web Browser โดยอัตโนมัติ

**วิธีที่ 2: เปิดผ่าน Web Browser โดยตรง**

1. ดาวน์โหลดและแตกไฟล์โปรเจกต์ (หรือ `git clone` repo นี้)
2. เข้าไปในโฟลเดอร์โปรเจกต์ที่แตกไฟล์ไว้
3. ดับเบิลคลิกไฟล์ `index.html`
4. เว็บไซต์จะเปิดขึ้นใน Web Browser ทันที (ไม่ต้องรันคำสั่งใดๆ)

## 6. How to Test the Website

สามารถทดลองใช้งานฟังก์ชันต่าง ๆ ของเว็บไซต์ได้ตามขั้นตอนดังนี้

### 6.1 Create Portfolio (พร้อม Item แรก)

ฟอร์มของเว็บไซต์นี้รวม "ข้อมูลโปรไฟล์" กับ "Portfolio Item แรก" ไว้ในฟอร์มเดียว ต้องกรอกให้ครบทั้งสองส่วนแล้วกดบันทึกพร้อมกัน

1. เลือก Portfolio ในช่อง Select Portfolio (Portfolio 1 หรือ Portfolio 2)
2. กรอก Display Name, What I Enjoy, What I've Tried, What I'm Curious About
3. เลื่อนลงมากรอก Portfolio Item: Title, Type, Date, Role, Description
4. กรอก Skills อย่างน้อย 1 รายการ (คั่นด้วยเครื่องหมายจุลภาค เช่น `HTML, CSS`)
5. กรอก Reflection ให้ครบทั้ง 4 ส่วน: What I Did, What I Learned, Challenge, Next Step
6. กรอก Evidence link อย่างน้อย 1 ลิงก์ โดยต้องขึ้นต้นด้วย `http://` หรือ `https://` (คั่นหลายลิงก์ด้วยจุลภาคได้เช่นกัน)
7. กดปุ่ม **Create Portfolio**
8. ตรวจสอบว่าข้อความ "Portfolio saved!" ขึ้น และ item ที่สร้างไปปรากฏในส่วน View Portfolio

### 6.2 Switch Between Portfolios

* เปลี่ยน dropdown **Select Portfolio** เป็น Portfolio อีกอัน → ฟอร์มด้านบนจะโหลดข้อมูลโปรไฟล์ของ Portfolio นั้น (หรือว่างถ้ายังไม่เคยสร้าง) และ dropdown ในส่วน View Portfolio จะสลับตามโดยอัตโนมัติ
* การแก้ไขโปรไฟล์ทำได้โดยแก้ข้อความในฟอร์มแล้วกด Create Portfolio อีกครั้ง (จะบันทึกโปรไฟล์ใหม่พร้อมเพิ่ม item ใหม่ไปด้วย)

> หมายเหตุ: เวอร์ชันนี้ยังไม่มีปุ่ม Edit/Delete สำหรับ Portfolio หรือ Item ที่สร้างไปแล้วโดยตรง

### 6.3 Add Another Portfolio Item

1. เลือก Portfolio ที่ต้องการ (ข้อมูลโปรไฟล์จะโชว์อยู่แล้ว)
2. กรอกข้อมูล Portfolio Item ใหม่ให้ครบตามข้อ 6.1 ข้อ 3-6
3. กดปุ่ม Create Portfolio อีกครั้ง
4. ตรวจสอบว่าตัวนับ Items ใน View Portfolio เพิ่มขึ้น และเห็น item การ์ดใหม่เพิ่มเข้ามา

### 6.4 Skills and Evidence (หลายรายการ)

* ช่อง Skills และ Evidence ไม่มีปุ่มเพิ่ม/ลบช่องแยก แต่ให้พิมพ์หลายรายการในช่องเดียว คั่นด้วยเครื่องหมายจุลภาค เช่น `HTML, CSS, JavaScript` หรือ `https://github.com, https://example.com`
* ระบบจะตัดช่องว่างและรายการซ้ำออกให้อัตโนมัติ

### 6.5 Form Validation

* ลองปล่อยช่องที่จำเป็น (required) ว่างไว้แล้วกด Create Portfolio → ช่องนั้นจะขึ้นกรอบแดงพร้อมข้อความแจ้ง และฟอร์มจะไม่ถูกบันทึก
* ลองใส่วันที่ที่ไม่มีจริง หรือ Evidence link ที่ไม่ขึ้นต้นด้วย `http://`/`https://` → ระบบจะแจ้ง error และไม่บันทึกเช่นกัน

### 6.6 Clear Form

* กดปุ่ม **Clear** จะล้างเฉพาะช่องในส่วน Add Portfolio Item (Title, Type, Date, ..., Evidence, Photo, File) ส่วนข้อมูลโปรไฟล์ด้านบนจะไม่ถูกล้าง

### 6.7 Upload Photo / File Evidence

1. ที่ช่อง Upload Photo เลือกไฟล์รูปภาพได้ (เลือกได้หลายไฟล์)
2. ที่ช่อง Upload Files เลือกไฟล์เอกสาร เช่น .pdf, .docx
3. กด Create Portfolio
4. ตรวจสอบว่าการ์ด item ใน View Portfolio แสดงรูปภาพจริง (thumbnail) ในหัวข้อ Photos และลิงก์ดาวน์โหลดไฟล์จริงในหัวข้อ Files

### 6.8 Data Storage Test

1. สร้าง Portfolio และเพิ่ม Portfolio Item อย่างน้อย 1 รายการ
2. Refresh หน้าเว็บไซต์ (F5)
3. ตรวจสอบว่าข้อมูลที่บันทึกไว้ (โปรไฟล์และ item ทั้งหมด) ยังคงแสดงผลอยู่ครบถ้วน

> หมายเหตุ: เว็บไซต์จัดเก็บข้อมูลด้วย Local Storage ข้อมูลจึงถูกเก็บไว้ในเบราว์เซอร์และอุปกรณ์ที่ใช้งานเท่านั้น ไม่ได้จัดเก็บบน Server กลาง

## 7. Notes

* ควรเชื่อมต่ออินเทอร์เน็ตเพื่อให้ Bootstrap CDN ทำงานได้ (จำเป็นแค่ตอนเปิดครั้งแรก เบราว์เซอร์จะแคชไว้ให้ในครั้งถัดไป)
* ไม่จำเป็นต้องติดตั้ง Backend หรือ Database เพิ่มเติม
* หากเปิดเว็บไซต์บนอุปกรณ์หรือ Browser อื่น จะไม่สามารถเห็นข้อมูล Local Storage จากอุปกรณ์เดิมได้โดยอัตโนมัติ
* Local Storage มีโควตาจำกัดประมาณ 5MB ต่อเว็บไซต์ การแนบรูป/ไฟล์ขนาดใหญ่หรือจำนวนมากอาจทำให้บันทึกไม่ได้ (จะขึ้นข้อความ "Could not save: browser storage is full.")
* รองรับ Portfolio ได้ 2 รายการ (Portfolio 1, Portfolio 2) ตาม dropdown ที่มีให้

## 8. GitHub Repository

Repository: https://github.com/kiatkong-mongkolklee/CS100_POWER_UP_Checkpoint_Instruction_G17
