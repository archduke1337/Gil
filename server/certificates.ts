import fs from 'fs';
import path from 'path';
import https from 'https';
import { expressApp } from './index';
import { log } from './vite';

interface CertificateConfig {
  key: string;
  cert: string;
  ca?: string[];
}

class CertificateManager {
  private certPath: string;
  private keyPath: string;
  private caPath: string;
  private config: CertificateConfig | null = null;

  constructor() {
    this.certPath = path.join(__dirname, 'certs', 'certificate.pem');
    this.keyPath = path.join(__dirname, 'certs', 'private.key');
    this.caPath = path.join(__dirname, 'certs', 'ca.pem');
  }

  public loadCertificates(): CertificateConfig | null {
    try {
      // Check if certificates exist
      if (!fs.existsSync(this.keyPath) || !fs.existsSync(this.certPath)) {
        log('SSL certificates not found. Server will run in HTTP mode only.', 'ssl');
        log('To enable HTTPS, place your SSL certificates in the server/certs directory:', 'ssl');
        log('- certificate.pem: Your SSL certificate', 'ssl');
        log('- private.key: Your private key', 'ssl');
        log('- ca.pem: (Optional) Your CA certificate chain', 'ssl');
        return null;
      }

      // Load certificates
      this.config = {
        key: fs.readFileSync(this.keyPath, 'utf8'),
        cert: fs.readFileSync(this.certPath, 'utf8')
      };

      // Load CA certificate if exists
      if (fs.existsSync(this.caPath)) {
        this.config.ca = [fs.readFileSync(this.caPath, 'utf8')];
      }

      log('SSL certificates loaded successfully', 'ssl');
      return this.config;
    } catch (error) {
      log(`Error loading SSL certificates: ${error}`, 'ssl');
      return null;
    }
  }

  public startHttpsServer(port: number = 443): https.Server | null {
    const config = this.loadCertificates();
    if (!config) return null;

    try {
      const httpsServer = https.createServer(config, expressApp);
      httpsServer.listen(port, () => {
        log(`HTTPS server running on port ${port}`, 'ssl');
      });

      return httpsServer;
    } catch (error) {
      log(`Error starting HTTPS server: ${error}`, 'ssl');
      return null;
    }
  }
}

export const certificateManager = new CertificateManager();