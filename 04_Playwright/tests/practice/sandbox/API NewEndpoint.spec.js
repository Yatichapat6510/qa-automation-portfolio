import { test, expect } from '@playwright/test';
import Ajv from 'ajv';

const ajv = new Ajv();
const userSchema = {
    type: 'object',
    properties: {
        id: { type: 'number' },
        name: { type: 'string' }
    },
    required: ['id', 'name'],
    additionalProperties: true
};


// GET Test

test('GET Request', async ({request}) => {
    const response = await request.get(
        'https://jsonplaceholder.typicode.com/users/7'
    );

    expect(response.status()).toBe(200);

    const data = await response.json();
    console.log(data);

    // Basic Validation
    expect(data.id).toBe(7);
    // หมายเหตุ: user id 7 ใน jsonplaceholder ชื่อ "Kurtis Weissnat" ไม่ใช่ "Apple MacBook Pro 16"
    // ต้องแก้ค่าที่ expect ให้ตรงกับข้อมูลจริงของ endpoint ใหม่ด้วย

    // Schema Validation (ใช้ userSchema เดิมได้ เพราะ id/name ยังมีอยู่)
    const validate = ajv.compile(userSchema);
    const valid = validate(data);
    expect(valid).toBe(true);
});


// POST Test
test('POST Request', async ({request}) => {
    const response = await request.post(
        'https://jsonplaceholder.typicode.com/users',
        {
            data: {
                name: 'John',
                job: 'QA Engineer'
            }
        }
    );

    expect(response.status()).toBe(201);

    const data = await response.json();
    console.log(data);

    expect(data.name).toBe('John');
    expect(data.job).toBe('QA Engineer');
});