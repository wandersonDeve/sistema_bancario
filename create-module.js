const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Digite o nome do módulo: ', (moduleName) => {
  const moduleDir = path.join(__dirname, 'src', 'modules', moduleName);
  const appModulePath = path.join(__dirname, 'src', 'app.module.ts');

  if (!fs.existsSync(moduleDir)) {
    fs.mkdirSync(moduleDir, { recursive: true });
  }

  const subDirs = ['dto', 'entities', 'repository'];
  subDirs.forEach(dir => {
    const dirPath = path.join(moduleDir, dir);
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath);
    }
  });

  const files = [
    { 
      name: `${moduleName}.module.ts`, 
      content: `import { Module } from '@nestjs/common';\nimport { ${moduleName.charAt(0).toUpperCase() + moduleName.slice(1)}Controller } from './${moduleName}.controller';\nimport { ${moduleName.charAt(0).toUpperCase() + moduleName.slice(1)}Service } from './${moduleName}.service';\nimport { ${moduleName.charAt(0).toUpperCase() + moduleName.slice(1)}Repository } from './repository/${moduleName}.repository';\nimport { TypeOrmModule } from '@nestjs/typeorm';\nimport { ${moduleName.charAt(0).toUpperCase() + moduleName.slice(1)}Entity } from './entities/${moduleName}.entity';\n\n@Module({\n  imports: [TypeOrmModule.forFeature([${moduleName.charAt(0).toUpperCase() + moduleName.slice(1)}Repository, ${moduleName.charAt(0).toUpperCase() + moduleName.slice(1)}Entity])],\n  controllers: [${moduleName.charAt(0).toUpperCase() + moduleName.slice(1)}Controller],\n  providers: [${moduleName.charAt(0).toUpperCase() + moduleName.slice(1)}Service, ${moduleName.charAt(0).toUpperCase() + moduleName.slice(1)}Repository],\n})\nexport class ${moduleName.charAt(0).toUpperCase() + moduleName.slice(1)}Module {}` 
    },

    // Controller
    { name: `${moduleName}.controller.ts`, content: `import { Controller, Get } from '@nestjs/common';\nimport { ${moduleName.charAt(0).toUpperCase() + moduleName.slice(1)}Service } from './${moduleName}.service';\n\n@Controller('${moduleName}')\nexport class ${moduleName.charAt(0).toUpperCase() + moduleName.slice(1)}Controller {\n  constructor(private readonly ${moduleName.charAt(0).toUpperCase() + moduleName.slice(1)}Service: ${moduleName.charAt(0).toUpperCase() + moduleName.slice(1)}Service) {}\n\n  @Get()\n  findAll() {\n    return this.${moduleName.charAt(0).toUpperCase() + moduleName.slice(1)}Service.findAll();\n  }\n}` },

    // Service
    { name: `${moduleName}.service.ts`, content: `import { Injectable } from '@nestjs/common';\nimport { ${moduleName.charAt(0).toUpperCase() + moduleName.slice(1)}Repository } from './repository/${moduleName}.repository';\n\n@Injectable()\nexport class ${moduleName.charAt(0).toUpperCase() + moduleName.slice(1)}Service {\n  constructor(private readonly ${moduleName.charAt(0).toUpperCase() + moduleName.slice(1)}Repository: ${moduleName.charAt(0).toUpperCase() + moduleName.slice(1)}Repository) {}\n\n  findAll() {\n    return this.${moduleName.charAt(0).toUpperCase() + moduleName.slice(1)}Repository.find();\n  }\n}` },

    // DTO
    { name: `dto/${moduleName}.dto.ts`, content: `export class ${moduleName.charAt(0).toUpperCase() + moduleName.slice(1)}Dto {\n  name: string;\n}` },

    // Entity
    { name: `entities/${moduleName}.entity.ts`, content: `import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';\n\n@Entity()\nexport class ${moduleName.charAt(0).toUpperCase() + moduleName.slice(1)}Entity {\n  @PrimaryGeneratedColumn()\n  id: number;\n\n  @Column()\n  name: string;\n}` },

    // Repository
    { name: `repository/${moduleName}.repository.ts`, content: `import { Injectable } from '@nestjs/common';\nimport { InjectRepository } from '@nestjs/typeorm';\nimport { Repository } from 'typeorm';\nimport { ${moduleName.charAt(0).toUpperCase() + moduleName.slice(1)}Entity } from '../entities/${moduleName}.entity';\n\n@Injectable()\nexport class ${moduleName.charAt(0).toUpperCase() + moduleName.slice(1)}Repository {\n  constructor(\n    @InjectRepository(${moduleName.charAt(0).toUpperCase() + moduleName.slice(1)}Entity)\n    private ${moduleName.charAt(0).toUpperCase() + moduleName.slice(1)}Repository: Repository<${moduleName.charAt(0).toUpperCase() + moduleName.slice(1)}Entity>,\n  ) {}\n}` }
  ];

  files.forEach(file => {
    const filePath = path.join(moduleDir, file.name);
    fs.writeFileSync(filePath, file.content);
  });

  const appModuleContent = fs.readFileSync(appModulePath, 'utf-8');

  const moduleImport = `import { ${moduleName.charAt(0).toUpperCase() + moduleName.slice(1)}Module } from './modules/${moduleName}/${moduleName}.module';`;
  if (!appModuleContent.includes(moduleImport)) {
    const newAppModuleContent = appModuleContent.replace(
      'import { Module } from \'@nestjs/common\';',
      `import { Module } from '@nestjs/common';\n${moduleImport}`
    );

    const finalAppModuleContent = newAppModuleContent.replace(
      'imports: [',
      `imports: [\n    ${moduleName.charAt(0).toUpperCase() + moduleName.slice(1)}Module,`
    );

    fs.writeFileSync(appModulePath, finalAppModuleContent);
    console.log(`O módulo ${moduleName} foi adicionado ao app.module.ts com sucesso.`);
  } else {
    console.log(`O módulo ${moduleName} já está presente no app.module.ts.`);
  }

  console.log(`Estrutura do módulo ${moduleName} criada com sucesso em src/modules/${moduleName}!`);
  rl.close();
});
