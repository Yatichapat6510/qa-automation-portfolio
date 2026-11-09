// ข้อมูลผู้ใช้ทดสอบของ Sauce Labs My Demo App รวมไว้ที่เดียว (เป็นบัญชีสาธารณะของแอปตัวอย่าง ไม่ใช่ข้อมูลลับ)
// โหลดผ่าน onFlowStart ของแต่ละ flow แล้วเรียกใช้เป็น ${output.users.valid.username}
// ถ้าต้องเปลี่ยนไปใช้ environment อื่น ให้แก้ที่ไฟล์นี้ไฟล์เดียว ไม่ต้องไล่แก้ทุก flow
output.users = {
  valid: { username: 'bod@example.com', password: '10203040' },
  locked: { username: 'alice@example.com', password: '10203040' },
  // Username ที่มีแต่ช่องว่าง ใช้ทดสอบว่าแอป trim ค่าก่อนตรวจ
  whitespaceUsername: { username: '   ', password: '10203040' },
};
