import { db } from '../server/db';
import { certificates, admins } from '../shared/schema';
import { eq } from 'drizzle-orm';

export default async function handler(req: any, res: any) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const { url, method } = req;
    const urlPath = new URL(url, 'http://localhost').pathname;

    // Certificate verification endpoint
    if (method === 'GET' && urlPath.match(/^\/api\/certificates\/verify\/(.+)$/)) {
      const reportNumber = urlPath.split('/').pop();
      
      const certificate = await db
        .select()
        .from(certificates)
        .where(eq(certificates.reportNumber, reportNumber!))
        .limit(1);

      if (certificate.length > 0) {
        return res.status(200).json({
          found: true,
          certificate: certificate[0]
        });
      } else {
        return res.status(404).json({
          found: false,
          certificate: null
        });
      }
    }

    // Admin login endpoint
    if (method === 'POST' && urlPath === '/api/admin/login') {
      const { username, password } = req.body;
      
      const admin = await db
        .select()
        .from(admins)
        .where(eq(admins.username, username))
        .limit(1);

      if (admin.length > 0 && admin[0].password === password) {
        return res.status(200).json({ success: true });
      } else {
        return res.status(401).json({ success: false, message: 'Invalid credentials' });
      }
    }

    // Get all certificates endpoint
    if (method === 'GET' && urlPath === '/api/certificates') {
      const allCertificates = await db.select().from(certificates);
      return res.status(200).json(allCertificates);
    }

    // For all other routes, serve a simple HTML page
    if (method === 'GET') {
      const html = `
        <!DOCTYPE html>
        <html>
        <head>
          <title>GIL Diamond Verification</title>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <style>
            body { font-family: Arial, sans-serif; margin: 0; padding: 20px; background: #f5f5f5; }
            .container { max-width: 800px; margin: 0 auto; background: white; padding: 40px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
            h1 { color: #1e40af; text-align: center; margin-bottom: 30px; }
            .form-group { margin-bottom: 20px; }
            label { display: block; margin-bottom: 5px; font-weight: bold; }
            input { width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 4px; }
            button { background: #1e40af; color: white; padding: 10px 20px; border: none; border-radius: 4px; cursor: pointer; }
            button:hover { background: #1d4ed8; }
            .result { margin-top: 20px; padding: 15px; border-radius: 4px; }
            .success { background: #d4edda; border: 1px solid #c3e6cb; color: #155724; }
            .error { background: #f8d7da; border: 1px solid #f5c6cb; color: #721c24; }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>GIL Diamond Verification Platform</h1>
            <div class="form-group">
              <label for="reportNumber">Enter Certificate Report Number:</label>
              <input type="text" id="reportNumber" placeholder="e.g., GIL-2025-123456">
            </div>
            <button onclick="verifyCertificate()">Verify Certificate</button>
            <div id="result"></div>
          </div>
          
          <script>
            async function verifyCertificate() {
              const reportNumber = document.getElementById('reportNumber').value;
              const resultDiv = document.getElementById('result');
              
              if (!reportNumber) {
                resultDiv.innerHTML = '<div class="result error">Please enter a report number</div>';
                return;
              }
              
              try {
                const response = await fetch('/api/certificates/verify/' + reportNumber);
                const data = await response.json();
                
                if (data.found) {
                  resultDiv.innerHTML = '<div class="result success"><strong>Certificate Found!</strong><br>Report: ' + data.certificate.reportNumber + '<br>Shape: ' + data.certificate.shape + '<br>Carat: ' + data.certificate.caratWeight + '</div>';
                } else {
                  resultDiv.innerHTML = '<div class="result error">Certificate not found</div>';
                }
              } catch (error) {
                resultDiv.innerHTML = '<div class="result error">Error verifying certificate</div>';
              }
            }
          </script>
        </body>
        </html>
      `;
      
      res.setHeader('Content-Type', 'text/html');
      return res.status(200).send(html);
    }

    return res.status(404).json({ message: 'Not found' });

  } catch (error) {
    console.error('Handler error:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}