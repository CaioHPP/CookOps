// Script de teste para verificar se as APIs estão funcionando
const axios = require('axios');

const BASE_URL = 'http://localhost:3000';

async function testAPI() {
  try {
    console.log('🧪 Testando APIs do CookOps...\n');

    // Test 1: Check if backend is running
    console.log('1. Verificando se o backend está online...');
    const healthCheck = await axios.get(`${BASE_URL}/`);
    console.log('✅ Backend está online!');

    // Test 2: Test authentication (optional, may require actual login)
    console.log('\n2. Testando endpoints disponíveis...');
    
    // Just check if endpoints are accessible (might get 401, which is expected)
    const endpoints = [
      '/boards',
      '/pedidostatus',
      '/empresas',
    ];

    for (const endpoint of endpoints) {
      try {
        await axios.get(`${BASE_URL}${endpoint}`);
        console.log(`✅ ${endpoint} - Acessível`);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          console.log(`🔐 ${endpoint} - Protegido por autenticação (esperado)`);
        } else {
          console.log(`❌ ${endpoint} - Erro: ${error.message}`);
        }
      }
    }

    console.log('\n🎉 Teste completo!');
    
  } catch (error) {
    console.error('❌ Erro nos testes:', error.message);
    console.log('\n💡 Verifique se o backend está rodando na porta 3000');
  }
}

testAPI();
