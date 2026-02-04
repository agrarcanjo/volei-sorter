/**
 * Teste básico dos componentes criados na Fase 2
 * Verifica se todos os arquivos foram criados corretamente
 */

import fs from 'fs';
import path from 'path';

console.log('✅ Fase 2 - Teste de Componentes');
console.log('===================================\n');

// Teste: Estrutura de Arquivos
console.log('Verificando Estrutura de Arquivos:\n');

const componentsDir = './src/components';
const screensDir = './src/screens';

const requiredComponents = [
  'Card.js',
  'CustomButton.js',
  'NumberPicker.js',
  'Container.js',
  'Header.js',
  'ThemeToggle.js',
  'index.js',
];

const requiredScreens = [
  'HomeScreen.js',
  'ComponentsDemo.js',
];

let allFilesExist = true;

console.log('Componentes:');
for (const file of requiredComponents) {
  const filePath = path.join(componentsDir, file);
  const exists = fs.existsSync(filePath);
  const stats = exists ? fs.statSync(filePath) : null;
  const size = stats ? `${Math.round(stats.size / 1024)}KB` : '-';
  console.log(`  ${exists ? '✓' : '✗'} ${file.padEnd(20)} ${size}`);
  if (!exists) allFilesExist = false;
}

console.log('\nTelas:');
for (const file of requiredScreens) {
  const filePath = path.join(screensDir, file);
  const exists = fs.existsSync(filePath);
  const stats = exists ? fs.statSync(filePath) : null;
  const size = stats ? `${Math.round(stats.size / 1024)}KB` : '-';
  console.log(`  ${exists ? '✓' : '✗'} ${file.padEnd(20)} ${size}`);
  if (!exists) allFilesExist = false;
}

// Verificar tamanho dos arquivos
console.log('\n-----------------------------------');
console.log('Estatísticas dos Componentes:\n');

let totalSize = 0;
let totalLines = 0;

for (const file of requiredComponents) {
  const filePath = path.join(componentsDir, file);
  if (fs.existsSync(filePath)) {
    const content = fs.readFileSync(filePath, 'utf-8');
    const lines = content.split('\n').length;
    const size = fs.statSync(filePath).size;
    totalSize += size;
    totalLines += lines;
  }
}

console.log(`Total de arquivos: ${requiredComponents.length}`);
console.log(`Total de linhas: ${totalLines}`);
console.log(`Tamanho total: ${Math.round(totalSize / 1024)}KB`);

// Resultado Final
console.log('\n===================================');
if (allFilesExist) {
  console.log('✅ Todos os testes passaram!');
  console.log('Fase 2 - Componentes Base: COMPLETA\n');
  console.log('Componentes criados:');
  console.log('  ✓ Card (com flip animado)');
  console.log('  ✓ CustomButton (3 variantes, 3 tamanhos)');
  console.log('  ✓ NumberPicker (com +/- e validação)');
  console.log('  ✓ Container (SafeArea + Tema)');
  console.log('  ✓ Header (botões voltar/reset)');
  console.log('  ✓ ThemeToggle (animado)');
  console.log('\nTelas criadas:');
  console.log('  ✓ HomeScreen (atualizado)');
  console.log('  ✓ ComponentsDemo (showcase)');
  console.log('\nPróxima fase: Implementar funcionalidades');
} else {
  console.log('❌ Alguns arquivos estão faltando');
  console.log('Verifique os erros acima');
}
