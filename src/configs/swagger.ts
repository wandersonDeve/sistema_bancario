import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('Sistema Bancário')
  .setDescription('Documentação da API do Sistema Bancário.')
  .build();
