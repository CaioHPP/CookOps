// Test script for Board management APIs
const baseURL = 'http://localhost:3000';

// Mock authentication token - replace with a real token
const authToken = 'your-jwt-token-here';

const headers = {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${authToken}`
};

async function testBoardAPIs() {
  console.log('🧪 Testing Board Management APIs...\n');

  try {
    // Test 1: Get boards by empresa
    console.log('1️⃣ Testing GET /boards/empresa');
    const boardsResponse = await fetch(`${baseURL}/boards/empresa`, {
      method: 'GET',
      headers
    });
    
    if (boardsResponse.ok) {
      const boards = await boardsResponse.json();
      console.log('✅ Boards fetched successfully:', boards.length, 'boards found');
      
      if (boards.length > 0) {
        const testBoard = boards[0];
        console.log('📋 Test board:', testBoard.titulo);
        
        // Test 2: Toggle active status
        console.log('\n2️⃣ Testing PUT /boards/:id/toggle-active');
        const toggleResponse = await fetch(`${baseURL}/boards/${testBoard.id}/toggle-active`, {
          method: 'PUT',
          headers
        });
        
        if (toggleResponse.ok) {
          const updatedBoard = await toggleResponse.json();
          console.log('✅ Board status toggled successfully');
          console.log('📝 New title:', updatedBoard.titulo);
        } else {
          console.log('❌ Failed to toggle board status:', toggleResponse.status);
        }

        // Test 3: Set as default
        console.log('\n3️⃣ Testing PUT /boards/:id/set-default');
        const defaultResponse = await fetch(`${baseURL}/boards/${testBoard.id}/set-default`, {
          method: 'PUT',
          headers
        });
        
        if (defaultResponse.ok) {
          console.log('✅ Board set as default successfully');
        } else {
          console.log('❌ Failed to set board as default:', defaultResponse.status);
        }

        // Test 4: Delete/Inactivate board
        console.log('\n4️⃣ Testing DELETE /boards/:id');
        const deleteResponse = await fetch(`${baseURL}/boards/${testBoard.id}`, {
          method: 'DELETE',
          headers
        });
        
        if (deleteResponse.ok) {
          console.log('✅ Board delete/inactivate operation completed');
        } else {
          console.log('❌ Failed to delete/inactivate board:', deleteResponse.status);
        }
      }
    } else {
      console.log('❌ Failed to fetch boards:', boardsResponse.status);
    }

  } catch (error) {
    console.error('💥 Test failed with error:', error.message);
  }

  console.log('\n🏁 Board API tests completed!');
}

// Note: This script requires authentication
// Run this in the browser console when logged in, or update the authToken variable
console.log('⚠️  To run this test, you need to:');
console.log('1. Be logged in to the application');
console.log('2. Open browser developer tools');
console.log('3. Run: testBoardAPIs()');
console.log('4. Or update the authToken variable with a valid JWT token');

// Export for browser console use
if (typeof window !== 'undefined') {
  window.testBoardAPIs = testBoardAPIs;
}
