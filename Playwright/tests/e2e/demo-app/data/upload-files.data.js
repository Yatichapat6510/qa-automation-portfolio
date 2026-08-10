// In-memory upload payloads used only by the demo-app interaction workflow spec.
export const avatarImage = {
  name: 'avatar.jpg',
  mimeType: 'image/jpeg',
  buffer: Buffer.from('demo image'),
};

export const documentPdf = {
  name: 'document.pdf',
  mimeType: 'application/pdf',
  buffer: Buffer.from('demo pdf'),
};

export const supportingDocuments = [
  { name: 'doc1.pdf', mimeType: 'application/pdf', buffer: Buffer.from('document 1') },
  { name: 'doc2.pdf', mimeType: 'application/pdf', buffer: Buffer.from('document 2') },
];
