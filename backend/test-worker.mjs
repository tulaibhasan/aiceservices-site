/**
 * Test script for Cloudflare Worker logic in backend/src/index.js
 */
import worker from './src/index.js';

async function runTests() {
  console.log('--- Running Worker Unit & Integration Tests ---');
  let passed = 0;
  let failed = 0;

  function assert(condition, name) {
    if (condition) {
      console.log(`[PASS] ${name}`);
      passed++;
    } else {
      console.error(`[FAIL] ${name}`);
      failed++;
    }
  }

  // Test 1: Health check
  try {
    const req = new Request('http://localhost:8787/health', { method: 'GET' });
    const res = await worker.fetch(req, {}, {});
    const data = await res.json();
    assert(res.status === 200, 'Health check returns status 200');
    assert(data.status === 'online', 'Health check body status is online');
    assert(res.headers.get('Access-Control-Allow-Origin') === '*', 'Health check has CORS headers');
  } catch (e) {
    console.error('Test 1 failed with exception:', e);
    failed++;
  }

  // Test 2: CORS Preflight
  try {
    const req = new Request('http://localhost:8787/get-token', {
      method: 'OPTIONS',
      headers: { Origin: 'https://example.com' },
    });
    const res = await worker.fetch(req, {}, {});
    assert(res.status === 204, 'OPTIONS returns 204');
    assert(res.headers.get('Access-Control-Allow-Origin') === 'https://example.com', 'CORS reflects request origin');
  } catch (e) {
    console.error('Test 2 failed with exception:', e);
    failed++;
  }

  // Test 3: Missing GEMINI_API_KEY
  try {
    const req = new Request('http://localhost:8787/get-token', { method: 'POST' });
    const res = await worker.fetch(req, {}, {});
    const data = await res.json();
    assert(res.status === 500, 'Returns 500 when GEMINI_API_KEY is not set');
    assert(data.error && data.error.includes('GEMINI_API_KEY'), 'Returns clear error message about missing secret');
  } catch (e) {
    console.error('Test 3 failed with exception:', e);
    failed++;
  }

  // Test 4: /chat validation and missing key
  try {
    const req = new Request('http://localhost:8787/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: 'Hello' }),
    });
    const res = await worker.fetch(req, {}, {});
    const data = await res.json();
    assert(res.status === 500, '/chat returns 500 when GEMINI_API_KEY is not set');
    assert(data.error && data.error.includes('GEMINI_API_KEY'), '/chat error notes missing secret');
  } catch (e) {
    console.error('Test 4 failed with exception:', e);
    failed++;
  }

  // Test 5: /book-appointment endpoint
  try {
    const req = new Request('http://localhost:8787/book-appointment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        service_name: 'Digital Strategy & Advisory',
        date: '2026-09-25',
        time: '14:00',
        client_name: 'Acme Corp',
        client_email: 'contact@acme.com',
      }),
    });
    const res = await worker.fetch(req, {}, {});
    const data = await res.json();
    assert(res.status === 200, '/book-appointment returns 200');
    assert(data.status === 'confirmed', '/book-appointment status is confirmed');
    assert(data.bookingId && data.bookingId.includes('-APP-'), '/book-appointment returns formatted booking ID');
    assert(data.calendarUrl && data.calendarUrl.includes('calendar.google.com'), '/book-appointment generates calendar URL');
  } catch (e) {
    console.error('Test 5 failed with exception:', e);
    failed++;
  }

  // Test 6: Unknown route
  try {
    const req = new Request('http://localhost:8787/unknown-path', { method: 'GET' });
    const res = await worker.fetch(req, {}, {});
    assert(res.status === 404, 'Returns 404 for unknown route');
  } catch (e) {
    console.error('Test 6 failed with exception:', e);
    failed++;
  }

  console.log(`\nResults: ${passed} passed, ${failed} failed.`);
  if (failed > 0) {
    process.exit(1);
  }
}

runTests();
